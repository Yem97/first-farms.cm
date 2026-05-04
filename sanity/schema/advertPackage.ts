import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'advertPackage',
  title: 'Advertising Packages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      description: 'e.g. Basic, Standard, Premium',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 30 days',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      description: 'Marks the recommended plan',
      initialValue: false,
    }),
  ],
})
