export const STATIC_DATA = {
  tripFares: [
    {
      trip_index: 0,
      flight_id: "6301000",
      fareFamilies: [
        {
          code: "Light",
          itinerary_id: 6302000,
          starts_from_price: 150.0,
          amenities: [{ type: "cabin_baggage", description: "1PC 7KG", free: true }],
        },
        {
          code: "Flex",
          itinerary_id: 6302001,
          starts_from_price: 220.0,
          amenities: [{ type: "meal", description: "HOT MEAL INCLUDED", free: true }],
        },
      ],
    },

    {
      trip_index: 0,
      flight_id: "6301100",
      fareFamilies: [
        {
          code: "Eco Saver",
          itinerary_id: 6302100,
          starts_from_price: 280.0,
          amenities: [{ type: "seat_selection", description: "STANDARD SEAT", free: false }],
        },
        {
          code: "Prime Flex",
          itinerary_id: 6302101,
          starts_from_price: 360.0,
          amenities: [{ type: "seat_selection", description: "FRONT SEAT", free: true }],
        },
      ],
    },
    {
      trip_index: 1,
      flight_id: "6301101",
      fareFamilies: [
        {
          code: "Eco Saver",
          itinerary_id: 6302102,
          starts_from_price: 260.0,
          amenities: [{ type: "meal", description: "SNACK SERVICE", free: true }],
        },
        {
          code: "Prime Flex",
          itinerary_id: 6302103,
          starts_from_price: 350.0,
          amenities: [{ type: "changeable", description: "FREE DATE CHANGE", free: true }],
        },
      ],
    },

    {
      trip_index: 0,
      flight_id: "6301200",
      fareFamilies: [
        {
          code: "Basic",
          itinerary_id: 6302200,
          starts_from_price: 200.0,
          amenities: [],
        },
        {
          code: "Comfort",
          itinerary_id: 6302201,
          starts_from_price: 280.0,
          amenities: [{ type: "meal", description: "HOT MEAL", free: true }],
        },
      ],
    },
    {
      trip_index: 1,
      flight_id: "6301201",
      fareFamilies: [
        {
          code: "Basic",
          itinerary_id: 6302202,
          starts_from_price: 190.0,
          amenities: [],
        },
        {
          code: "Comfort",
          itinerary_id: 6302203,
          starts_from_price: 250.0,
          amenities: [{ type: "seat_selection", description: "WINDOW SEAT", free: false }],
        },
      ],
    },
    {
      trip_index: 2,
      flight_id: "6301202",
      fareFamilies: [
        {
          code: "Basic",
          itinerary_id: 6302204,
          starts_from_price: 210.0,
          amenities: [],
        },
        {
          code: "Comfort",
          itinerary_id: 6302205,
          starts_from_price: 270.0,
          amenities: [{ type: "meal", description: "SNACK INCLUDED", free: true }],
        },
      ],
    },
  ],

  availableCombinations: {
    6302000: { iti_id: 6303000, price: 150.0 },
    6302001: { iti_id: 6303001, price: 220.0 },

    "6302100_6302102": { iti_id: 6303100, price: 540.0 },
    "6302100_6302103": { iti_id: 6303101, price: 630.0 },
    "6302101_6302102": { iti_id: 6303102, price: 590.0 },
    "6302101_6302103": { iti_id: 6303103, price: 710.0 },

    "6302200_6302202_6302204": { iti_id: 6303200, price: 600.0 },
    "6302201_6302203_6302205": { iti_id: 6303201, price: 780.0 },
    "6302200_6302203_6302204": { iti_id: 6303202, price: 650.0 },
    "6302201_6302202_6302205": { iti_id: 6303203, price: 740.0 },
  },

  itineraries: [
    {
      id: 6303100,
      cabin_class: "Economy",
      passengers: [
        {
          id: 1,
          type: "ADT",
          prices: {
            currency: "AED",
            total: 540.0,
            base: 430.0,
            taxes: 110.0,
            total_currency: "AED540.00",
          },
        },
      ],
      trips: [
        { id: 6304100, departure: "CAI", arrival: "IST", flights: [6301100] },
        { id: 6304101, departure: "IST", arrival: "CAI", flights: [6301101] },
      ],
    },
    {
      id: 6303201,
      cabin_class: "Economy",
      passengers: [
        {
          id: 1,
          type: "ADT",
          prices: {
            currency: "AED",
            total: 780.0,
            base: 620.0,
            taxes: 160.0,
            total_currency: "AED780.00",
          },
        },
      ],
      trips: [
        { id: 6304200, departure: "CAI", arrival: "IST", flights: [6301200] },
        { id: 6304201, departure: "IST", arrival: "LHR", flights: [6301201] },
        { id: 6304202, departure: "LHR", arrival: "CAI", flights: [6301202] },
      ],
    },
  ],
};
