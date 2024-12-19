export const LOCATIONS = {
  lisbon: {
    center: [38.7223, -9.1393],
    label: 'Lisbon'
  },
  porto: {
    center: [41.1579, -8.6291],
    label: 'Porto'
  }
} as const;

export type LocationType = keyof typeof LOCATIONS;