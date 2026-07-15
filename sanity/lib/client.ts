import { createClient } from 'next-sanity'

// Sanity is being retired in favour of Supabase. When it isn't configured,
// fall back to a placeholder project id so the client still constructs at
// import time — every page wraps `client.fetch()` in try/catch and shows
// local fallback data when the fetch fails.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'not-configured'

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
