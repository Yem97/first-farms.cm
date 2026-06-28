export default {
  name: 'wellnessProduct',
  title: 'Wellness Products',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Product Name' },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Herbal Remedy', value: 'herbal' },
          { title: 'Natural Wellness', value: 'natural wellness' },
          { title: 'Medicinal Plant', value: 'medicinal plant' },
          { title: 'Essential Oil', value: 'essential oil' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'price', type: 'string', title: 'Price (XAF)' },
    { name: 'image', type: 'image', title: 'Product Image', options: { hotspot: true } },
    { name: 'producer', type: 'string', title: 'Producer / Licensed Practitioner' },
    { name: 'region', type: 'string', title: 'Region of Origin' },
    {
      name: 'certified',
      type: 'boolean',
      title: 'Certified / Licensed Producer',
      initialValue: false,
      description: 'Only list certified or legally recognized producers.',
    },
    { name: 'whatsappNumber', type: 'string', title: 'WhatsApp Contact (e.g. 237XXXXXXXX)' },
    { name: 'available', type: 'boolean', title: 'Currently Available', initialValue: true },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
}
