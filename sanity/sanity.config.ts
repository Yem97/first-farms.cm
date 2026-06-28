import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'
import FirstFarmsStudioLogo from './components/StudioLogo'

export default defineConfig({
  name: 'default',
  title: 'First Farms Cameroon',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  studio: {
    components: {
      logo: FirstFarmsStudioLogo,
    },
  },
})
