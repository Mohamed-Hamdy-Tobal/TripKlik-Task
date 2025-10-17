import { useState, useEffect } from "react";
import { Plus, Trash2, CalendarDays, RotateCcw, Search, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useBookingStore from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const formatDate = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
};

const defaultSegment = () => ({ from: "", to: "", date: "" });

export default function SearchForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSearchParams, reset } = useBookingStore();

  const [tripType, setTripType] = useState("oneway");
  const [segments, setSegments] = useState([defaultSegment()]);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("economy");

  useEffect(() => {
    if (tripType === "oneway") {
      setSegments([segments[0] || defaultSegment()]);
      setReturnDate(null);
    } else if (tripType === "round") {
      setSegments([segments[0] || defaultSegment()]);
    } else if (tripType === "multi") {
      setSegments(segments.length >= 2 ? segments : [defaultSegment(), defaultSegment()]);
      setReturnDate(null);
    }
  }, [tripType]);

  const updateSegment = (index, patch) => {
    setSegments((prev) => prev.map((seg, i) => (i === index ? { ...seg, ...patch } : seg)));
  };

  const addSegment = () => setSegments([...segments, defaultSegment()]);
  const removeSegment = (i) => setSegments((prev) => prev.filter((_, idx) => idx !== i));

  const isValid = () => {
    if (tripType === "oneway") {
      const s = segments[0];
      return s.from && s.to && s.date;
    }
    if (tripType === "round") {
      const s = segments[0];
      return s.from && s.to && s.date && returnDate;
    }
    if (tripType === "multi") {
      return segments.every((s) => s.from && s.to && s.date);
    }
    return false;
  };

  const handleSearch = () => {
    const normalized = {
      tripType,
      trips:
        tripType === "round"
          ? [
              { ...segments[0], date: formatDate(segments[0].date) },
              {
                from: segments[0].to,
                to: segments[0].from,
                date: formatDate(returnDate),
              },
            ]
          : segments.map((s) => ({ ...s, date: formatDate(s.date) })),
      passengers,
      cabin,
      createdAt: new Date().toISOString(),
    };
    setSearchParams(normalized);
    navigate("/trips");
  };

  const tripLabel = {
    oneway: t("One Way"),
    round: t("Round Trip"),
    multi: t("Multi Destination"),
  };

  const isMulti = tripType === "multi";

  return (
    <div className="p-6 md:p-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-blue-100">
      <div className="flex flex-col items-center mb-8">
        <Plane className="text-primary mb-2" size={36} />
        <h2 className="text-2xl font-semibold text-slate-800">{t("Search for Flights")}</h2>
        <p className="text-slate-500 text-sm">{t("Find your next journey")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {["oneway", "round", "multi"].map((tType) => (
          <Button
            key={tType}
            variant={tripType === tType ? "default" : "outline"}
            onClick={() => setTripType(tType)}
            className={`px-6 py-2 rounded-full transition-all ${
              tripType === tType
                ? "bg-primary text-white shadow-md hover:bg-blue-700"
                : "border-gray-300 text-gray-700 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {tripLabel[tType]}
          </Button>
        ))}
      </div>

      {!isMulti ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${tripType === "round" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4 mb-6`}
        >
          <div className="flex flex-col gap-2">
            <Label>{t("From")}</Label>
            <Input
              placeholder={t("Example: CAI")}
              value={segments[0]?.from || ""}
              onChange={(e) => updateSegment(0, { from: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("To")}</Label>
            <Input
              placeholder={t("Example: DXB")}
              value={segments[0]?.to || ""}
              onChange={(e) => updateSegment(0, { to: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("Departure Date")}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-sm">
                  <span>{segments[0]?.date ? formatDate(segments[0].date) : t("Select Date")}</span>
                  <CalendarDays size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="">
                <Calendar
                  className="w-full"
                  mode="single"
                  selected={segments[0]?.date || null}
                  onSelect={(d) => updateSegment(0, { date: d })}
                />
              </PopoverContent>
            </Popover>
          </div>

          {tripType === "round" && (
            <div className="flex flex-col gap-2">
              <Label>{t("Return Date")}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between text-sm">
                    <span>{returnDate ? formatDate(returnDate) : t("Select Date")}</span>
                    <CalendarDays size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="">
                  <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} className="w-full" />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <Label>{t("From")}</Label>
                <Input value={seg.from} onChange={(e) => updateSegment(idx, { from: e.target.value })} placeholder={t("Example: CAI")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>{t("To")}</Label>
                <Input value={seg.to} onChange={(e) => updateSegment(idx, { to: e.target.value })} placeholder={t("Example: DXB")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>{t("Date")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between text-sm">
                      <span>{seg.date ? formatDate(seg.date) : t("Select Date")}</span>
                      <CalendarDays size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <Calendar
                      className="w-full"
                      mode="single"
                      selected={seg.date || null}
                      onSelect={(d) => updateSegment(idx, { date: d })}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSegment(idx)}
                  disabled={segments.length <= 1}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
                {idx === segments.length - 1 && (
                  <Button onClick={addSegment} variant="outline" size="icon" className="text-primary hover:bg-blue-50 hover:text-blue-600">
                    <Plus size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 items-end">
        <div className="flex flex-col gap-2">
          <Label>{t("Passengers")}</Label>
          <Select value={String(passengers)} onValueChange={(v) => setPassengers(Number(v))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("Cabin")}</Label>
          <Select value={cabin} onValueChange={setCabin}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("Select Cabin")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">{t("Economy")}</SelectItem>
              <SelectItem value="business">{t("Business")}</SelectItem>
              <SelectItem value="first">{t("First Class")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 col-span-2 mt-5">
          <Button
            variant="outline"
            onClick={() => {
              setSegments([defaultSegment()]);
              setTripType("oneway");
              setPassengers(1);
              setCabin("economy");
              setReturnDate(null);
              reset();
            }}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 flex items-center gap-2 hover:text-black"
          >
            <RotateCcw size={16} className="mr-2" />
            {t("Reset")}
          </Button>

          <Button
            disabled={!isValid()}
            onClick={handleSearch}
            className="bg-primary text-white hover:bg-blue-700 flex items-center gap-2 shadow-md"
          >
            <Search size={16} />
            {t("Search Flights")}
          </Button>
        </div>
      </div>
    </div>
  );
}
