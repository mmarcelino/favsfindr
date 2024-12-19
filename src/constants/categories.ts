export const CATEGORIES = {
  bar: {
    color: '#EF4444', // red
    label: 'Bar'
  },
  pub: {
    color: '#F59E0B', // amber
    label: 'Pub'
  },
  garden: {
    color: '#10B981', // emerald
    label: 'Garden'
  },
  restaurant: {
    color: '#6366F1', // indigo
    label: 'Restaurant'
  },
  museum: {
    color: '#8B5CF6', // violet
    label: 'Museum'
  },
  beach: {
    color: '#3B82F6', // blue
    label: 'Beach'
  }
} as const;

export type CategoryType = keyof typeof CATEGORIES;