// Public service catalogue shared by the website and enquiry handler.
export const services = [
  { id: 'itinerary', title: 'Itinerary planning', fee: 349, image: 'thailand', description: 'A personalised day-by-day itinerary for Thailand or another country, built around your dates, budget and interests.' },
  { id: 'hotels-cabs', title: 'Hotels + cab bookings', fee: 1999, image: 'himachal', description: 'Help arranging your hotel stays and cab bookings. Review your options and the actual travel costs before confirming.' },
  { id: 'hotels-flights', title: 'Hotels + flight bookings', fee: 1499, image: 'bali', description: 'Help arranging your hotel stays and flights. Choose the options that fit your travel dates, route and budget.' },
] as const;
