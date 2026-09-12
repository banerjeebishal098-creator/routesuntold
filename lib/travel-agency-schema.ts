// Enable structured data after replacing sample details with verified business facts.
export function travelAgencySchema(url: string, telephone: string, email: string) {
  return { '@context': 'https://schema.org', '@type': 'TravelAgency', name: 'Routes Untold', url, telephone, email, description: 'Personalised holidays and travel experiences.' };
}
