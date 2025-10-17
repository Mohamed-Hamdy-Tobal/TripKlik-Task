import { create } from "zustand";

const useBookingStore = create((set, get) => ({
  searchParams: { tripType: "oneway" },
  selectedFares: {},
  currentItinerary: null,
  passengers: [],
  currentStep: 0,

  setSearchParams: (params) => set({ searchParams: params }, false, "setSearchParams"),

  setTripType: (tripType) =>
    set({
      searchParams: { tripType },
      selectedFares: {},
      currentItinerary: null,
    }),

  selectFareForTrip: (tripIndex, fare) =>
    set((state) => ({
      selectedFares: {
        ...state.selectedFares,
        [tripIndex]: fare,
      },
    })),

  clearFareForTrip: (tripIndex) =>
    set((state) => {
      const updated = { ...state.selectedFares };
      delete updated[tripIndex];
      return { selectedFares: updated };
    }),

  setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),

  setPassengers: (passengers) => set({ passengers }),

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1),
    })),

  reset: () =>
    set({
      searchParams: { tripType: "oneway" },
      selectedFares: {},
      currentItinerary: null,
      passengers: [],
      currentStep: 0,
    }),

  getCombinationKey: () => {
    const { selectedFares } = get();
    const keys = Object.keys(selectedFares)
      .map(Number)
      .sort((a, b) => a - b)
      .map((key) => selectedFares[key]?.itinerary_id)
      .filter(Boolean);
    return keys.length ? keys.join("_") : null;
  },

  isReadyForReview: () => {
    const { selectedFares, searchParams } = get();
    const tripType = searchParams.tripType;
    const requiredCount = tripType === "oneway" ? 1 : tripType === "round" ? 2 : 3;
    return Object.keys(selectedFares).length === requiredCount;
  },

  getTotalSelectedPrice: () => {
    const { selectedFares } = get();
    return Object.values(selectedFares).reduce((sum, fare) => {
      return sum + Number(fare.starts_from_price || 0);
    }, 0);
  },
}));

export default useBookingStore;
