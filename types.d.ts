export interface AuthUserDAO {
  account_status: string;
  avatar: null | string;
  balance: number;
  country: string;
  created_at: string;
  currency: string;
  email: string;
  email_verified_at: null | string;
  fname: string;
  how_you_want_to_use: "earner" | "seller";
  id: number;
  lname: string;
  phone: string;
  referral_code: null | string;
  referral_username: null | string;
  referred_by: null | string;
  updated_at: string;
  username: string;
}

export interface Task {
  id: string;
  user_id: number;
  title: string;
  social_media_url: string | null;
  description: string;
  platforms: string;
  task_amount: number;
  task_type: number;
  task_count_total: number;
  task_count_remaining: number;
  priority: "low" | "medium" | "high";
  start_date: string;
  due_date: string;
  type_of_comment: string | null;
  religion: string | null;
  payment_per_task: number | null;
  no_of_participants: number | null;
  location: string | null;
  gender: string | null;
  status: "pending" | "completed" | "in-progress";
  completed: "Available" | "Not Available";
  created_at: string;
  updated_at: string;
  completion_percentage: number;
  posted_status: "old" | "new";
  category: "social_media" | "video_marketing" | "micro_influence" | "promotion" | "telegram";
}

interface Product {
  id: string;
  name: string;
  user_id: number;
  category_id: number;
  description: string;
  stock: number;
  price: number;
  currency: string;
  images: string[];
  rating: number;
  reviews_count: number;
  discount?: number | null;
  payment_method?: string | null;
  meet_up_preference?: string | null;
  delivery_fee?: number | null;
  estimated_delivery_date?: string | null;
  phone_number?: string | null;
  email?: string | null;
  social_media_link?: string | null;
}

export interface ProductCardProps extends Product {
  horizontal?: boolean;
  responsive?: boolean;
  version?: "bordered";
  buttonText?: string;
  onButtonClickAction?(): any;
  linkOverrideURL?: string;
}

export enum TaskByline {
  social_media = "Like and Comment on a Post",
  video_marketing = "Share Video on Social Media",
  micro_influence = "Micro Influence",
  telegram = "Complete a Telegram Task",
  promotion = "Promote a Post or Brand"
}

export interface ActivationState {
  facebook: boolean | string | undefined;
  twitter: boolean | string | undefined;
  instagram: boolean | string | undefined;
  tikTok: boolean | string | undefined;
}

export interface ProductSectionProps {
  heading?: string;
  products: Product[];
  vertical?: boolean;
  grid?: boolean;
  startComponent?: React.ReactNode;
  link?: string;
  useResponsiveCard?: boolean;
  loadAsyncProducts?: boolean;
}

export interface CartProduct extends Product {
  cartQuantity: number;
}
