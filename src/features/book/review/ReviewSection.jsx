import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Mail, Phone, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { useGetTripFares } from "@/hooks/services/tripFares";
import useBookingStore from "@/store/bookingStore";
import FlightDetailsCard from "./FlightDetailsCard";
import PriceBreakdownCard from "./PriceBreakdownCard";
import { config } from "@/config/config";
import { STATIC_DATA } from "@/data/staticData";
import StatusMessage from "@/components/feedback/StatusMessage";
import { ReviewSkeleton } from "@/components/loading/ReviewSkeleton";

const passengerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
});

export const ReviewSection = ({ onNext }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const { is_dev } = config;
  const { tripFares: apiTripFares = [], isLoading: faresLoading, error: faresError } = useGetTripFares();

  const tripFares = is_dev ? apiTripFares : STATIC_DATA.tripFares;
  const { selectedFares, currentItinerary, setPassengers, passengers } = useBookingStore();

  const form = useForm({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      firstName: passengers?.[0]?.firstName || "",
      lastName: passengers?.[0]?.lastName || "",
      email: passengers?.[0]?.email || "",
      phone: passengers?.[0]?.phone || "",
      dateOfBirth: passengers?.[0]?.dateOfBirth || "",
    },
  });

  const getFlightDetails = (tripIndex) => {
    const fare = selectedFares[tripIndex];
    if (!fare) return null;
    return tripFares.find((t) => t.fareFamilies.some((f) => f.itinerary_id === fare.itinerary_id));
  };

  const onSubmit = (data) => {
    setPassengers([data]);
    onNext();
  };

  if (faresLoading && is_dev) return <ReviewSkeleton />;

  if (faresError && is_dev)
    return <StatusMessage variant="error" message="Failed to load flight data. Please try again." />;

  if (!tripFares.length)
    return <StatusMessage variant="warning" message="No flight fares available for the selected criteria." />;

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">{t("Review Your Booking")}</h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t("Please review your flight details and enter passenger information")}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">✈️ {t("Flight Details")}</h3>

          <div className="space-y-4">
            {Object.entries(selectedFares)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([tripIndex, fare]) => (
                <FlightDetailsCard
                  key={tripIndex}
                  tripIndex={Number(tripIndex)}
                  fare={fare}
                  flight={getFlightDetails(Number(tripIndex))}
                  currentItinerary={currentItinerary}
                />
              ))}
          </div>
        </div>

        {currentItinerary && <PriceBreakdownCard itinerary={currentItinerary} />}

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {t("Passenger Information")}
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("First Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter First Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Last Name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("Enter Last Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email Address")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="example@example.com" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Phone Number")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="+971 50 123 4567" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("Date of Birth")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start  font-normal", !field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : t("Pick a date")}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          fromYear={1940}
                          toYear={2025}
                          initialFocus
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full flex items-center justify-between mt-6 flex-col sm:flex-row gap-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-fit">
                  {language === "en" ? <ArrowLeft /> : <ArrowRight />} {t("Back to Flights")}
                </Button>

                <Button type="submit" className="bg-primary text-white w-full sm:w-fit">
                  {t("Continue to Payment")} {language === "en" ? <ArrowRight /> : <ArrowLeft />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
