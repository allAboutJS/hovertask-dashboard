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

export interface Product {
  name: string;
  price: number;
  discount: number;
  reviews_count: number;
  rating: number;
  available_units: number;
  featured_image_url: string;
}

export interface ProductProps extends Product {
  horizontal?: boolean;
  responsive?: boolean;
  version?: "bordered";
  buttonText?: string;
}

export enum TaskByline {
  social_media = "Like and Comment on a Post",
  video_marketing = "Share Video on Social Media",
  micro_influence = "Micro Influence",
  telegram = "Complete a Telegram Task",
  promotion = "Promote a Post or Brand"
}
