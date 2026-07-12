// Shared row types for the AgriTech Hub platform (Supabase).
// Kept hand-written for app code; can later be replaced by
// `supabase gen types typescript` output if desired.

export type UserRole = "member" | "admin";
export type ProductStatus = "pending" | "approved" | "rejected";
export type BoardType = "directors" | "supervisory";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  region: string | null;
  farming_type: string | null;
  avatar_url: string | null;
  bio: string | null;
  suspended: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  unit: string | null;
  category: string | null;
  region: string | null;
  farmer_name: string | null;
  whatsapp_number: string | null;
  image_url: string | null;
  status: ProductStatus;
  available: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  author_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TrainingEvent {
  id: string;
  title: string;
  slug: string | null;
  event_date: string | null;
  location: string | null;
  region: string | null;
  topic: string | null;
  description: string | null;
  trainer: string | null;
  image_url: string | null;
  registration_open: boolean;
  spots_available: number | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  farmer_name: string | null;
  region: string | null;
  photo_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  board: BoardType;
  photo_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface AdvertPackage {
  id: string;
  name: string;
  price: number | null;
  currency: string;
  description: string | null;
  features: string[];
  sort_order: number;
  created_at: string;
}
