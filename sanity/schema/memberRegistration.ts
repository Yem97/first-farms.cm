export default {
  name: 'memberRegistration',
  title: 'Member Registrations',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Full Name' },
    { name: 'phone', type: 'string', title: 'Phone Number' },
    { name: 'email', type: 'string', title: 'Email Address' },
    { name: 'region', type: 'string', title: 'Region' },
    { name: 'farmingType', type: 'string', title: 'Type of Farming' },
    {
      name: 'membershipTier',
      type: 'string',
      title: 'Membership Tier',
      options: {
        list: [
          { title: 'Individual Farmer', value: 'individual' },
          { title: 'Farmer Group', value: 'group' },
          { title: 'Premium Partner', value: 'premium' },
        ],
      },
    },
    {
      name: 'status',
      type: 'string',
      title: 'Application Status',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
    },
    { name: 'notes', type: 'text', title: 'Internal Notes', rows: 3 },
    { name: 'submittedAt', type: 'datetime', title: 'Submitted At' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'region', status: 'status' },
    prepare({ title, subtitle, status }: { title: string; subtitle: string; status: string }) {
      return {
        title: title || 'Unknown Applicant',
        subtitle: `${subtitle || 'No region'} — ${status || 'pending'}`,
      };
    },
  },
}
