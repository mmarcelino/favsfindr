import { CategoryType } from '../constants/categories';
import { LocationType } from '../constants/locations';

export interface Place {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  location: LocationType;
  coordinates: [number, number]; // [latitude, longitude]
  image: string;
  rating: number;
  address: string;
  features?: string[];
  openingHours?: string;
  website?: string;
}