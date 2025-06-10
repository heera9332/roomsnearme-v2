export interface IRoom {
  _id?: string;
  title: string;
  content?: string;
  price: number;
  available?: boolean;
  type?: string;
  tags?: string[];
  meta?: Record<string, any>;
  lat: number;
  lng: number;
  city: string;
  state: string;
  status: string;
  images: string[]; 
  featuredImage: string;
  maxCapacity: number;
  googleMapLink?: string;
  createdAt?: Date[];
  updatedAt?: Date[];
}
