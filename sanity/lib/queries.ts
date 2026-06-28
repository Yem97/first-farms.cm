import { groq } from 'next-sanity'

export const productsQuery = groq`*[_type == "product" && available == true] | order(_createdAt desc)`
export const featuredProductsQuery = groq`*[_type == "product" && available == true && featured == true] | order(_createdAt desc)[0...4]`
export const trainingEventsQuery = groq`*[_type == "trainingEvent"] | order(date asc) {
  _id, title, slug, date, location, region, topic, description,
  trainer, registrationOpen, spotsAvailable,
  "image": image { ..., "assetUrl": asset->url }
}`
export const upcomingTrainingsQuery = groq`*[_type == "trainingEvent"] | order(date asc)[0...3] {
  _id, title, slug, date, location, region, topic, description,
  trainer, registrationOpen, spotsAvailable,
  "image": image { ..., "assetUrl": asset->url }
}`
export const testimonialsQuery = groq`*[_type == "testimonial" && featured == true]`
export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc)`
export const advertPackagesQuery = groq`*[_type == "advertPackage"] | order(price asc)`
