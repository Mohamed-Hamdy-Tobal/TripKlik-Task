export const getValidFareIds = (targetTripIndex, { tripType, selectedFares, availableCombinations }) => {
  if (tripType === "oneway") return null;

  const currentSelections = { ...selectedFares };
  delete currentSelections[targetTripIndex];
  const selectedItineraryIds = Object.values(currentSelections).map((f) => String(f.itinerary_id));
  const validIds = new Set();

  Object.keys(availableCombinations).forEach((comboKey) => {
    const parts = comboKey.split("_");
    const expectedLength = tripType === "round" ? 2 : 3;

    if (selectedItineraryIds.length === 0) {
      if (parts.length === expectedLength) {
        validIds.add(parts[targetTripIndex]);
      }
    } else {
      const matches = selectedItineraryIds.every((id) => parts.includes(id));
      if (matches && parts.length === expectedLength) {
        validIds.add(parts[targetTripIndex]);
      }
    }
  });

  return validIds;
};
