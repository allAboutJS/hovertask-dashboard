import { createSlice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { Product } from "../../../types";

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    user_id: 1,
    category_id: 101,
    description: "Ergonomic wireless mouse with USB receiver.",
    stock: 30,
    price: 19.99,
    currency: "USD",
    images: ["/images/mouse.jpg", "/images/mouse-side.jpg"],
    rating: 4.5,
    reviews_count: 120,
    discount: 5,
    payment_method: "PayPal",
    meet_up_preference: "Public Park",
    delivery_fee: 2.99,
    estimated_delivery_date: "2025-04-10",
    phone_number: "123-456-7890",
    email: "seller1@example.com",
    social_media_link: "https://twitter.com/seller1"
  },
  {
    id: "2",
    name: "Bluetooth Headphones",
    user_id: 2,
    category_id: 102,
    description: "Noise-cancelling over-ear Bluetooth headphones.",
    stock: 15,
    price: 59.99,
    currency: "USD",
    images: ["/images/headphones.jpg"],
    rating: 4.7,
    reviews_count: 89,
    discount: null,
    payment_method: "Credit Card",
    meet_up_preference: "Home Delivery",
    delivery_fee: 5,
    estimated_delivery_date: "2025-04-12",
    phone_number: "987-654-3210",
    email: "audio@soundgear.com",
    social_media_link: null
  },
  {
    id: "3",
    name: "Digital Drawing Tablet",
    user_id: 3,
    category_id: 103,
    description: "Professional drawing tablet with pen support.",
    stock: 10,
    price: 129.99,
    currency: "USD",
    images: ["/images/tablet.jpg"],
    rating: 4.8,
    reviews_count: 67,
    discount: 10,
    payment_method: "Crypto",
    meet_up_preference: "Tech Hub",
    delivery_fee: 4.5,
    estimated_delivery_date: "2025-04-09",
    phone_number: null,
    email: "artistpro@example.com",
    social_media_link: "https://instagram.com/artistpro"
  },
  {
    id: "4",
    name: "Yoga Mat",
    user_id: 4,
    category_id: 104,
    description: "Eco-friendly non-slip yoga mat for all levels.",
    stock: 50,
    price: 25,
    currency: "USD",
    images: ["/images/yoga-mat.jpg"],
    rating: 4.2,
    reviews_count: 140,
    discount: 2.5,
    payment_method: "Bank Transfer",
    meet_up_preference: "Gym Center",
    delivery_fee: 1.99,
    estimated_delivery_date: "2025-04-15",
    phone_number: "555-123-9876",
    email: "fitlife@yoga.com",
    social_media_link: null
  },
  {
    id: "5",
    name: "Gaming Keyboard",
    user_id: 5,
    category_id: 101,
    description: "RGB mechanical keyboard for gamers.",
    stock: 8,
    price: 75,
    currency: "USD",
    images: ["/images/keyboard.jpg", "/images/keyboard-backlight.jpg"],
    rating: 4.9,
    reviews_count: 102,
    discount: 15,
    payment_method: "PayPal",
    meet_up_preference: null,
    delivery_fee: 3,
    estimated_delivery_date: "2025-04-11",
    phone_number: null,
    email: "techguy@gearhub.com",
    social_media_link: null
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    user_id: 6,
    category_id: 105,
    description: "Insulated bottle keeps drinks cold for 24 hrs.",
    stock: 100,
    price: 12.99,
    currency: "USD",
    images: ["/images/bottle.jpg"],
    rating: 4.3,
    reviews_count: 210,
    discount: null,
    payment_method: "Cash",
    meet_up_preference: "Coffee Shop",
    delivery_fee: 2,
    estimated_delivery_date: "2025-04-14",
    phone_number: "888-777-6666",
    email: null,
    social_media_link: null
  },
  {
    id: "7",
    name: "Laptop Stand",
    user_id: 7,
    category_id: 106,
    description: "Adjustable aluminum stand for laptops up to 17 inches.",
    stock: 25,
    price: 29.95,
    currency: "USD",
    images: ["/images/laptop-stand.jpg"],
    rating: 4.6,
    reviews_count: 75,
    discount: 5,
    payment_method: "Credit Card",
    meet_up_preference: null,
    delivery_fee: 2.99,
    estimated_delivery_date: "2025-04-10",
    phone_number: null,
    email: "seller@techproducts.com",
    social_media_link: null
  },
  {
    id: "8",
    name: "LED Desk Lamp",
    user_id: 8,
    category_id: 107,
    description: "Dimmable LED desk lamp with USB charging port.",
    stock: 20,
    price: 18.5,
    currency: "USD",
    images: ["/images/lamp.jpg"],
    rating: 4.4,
    reviews_count: 98,
    discount: 3,
    payment_method: "Mobile Money",
    meet_up_preference: "Office",
    delivery_fee: 1.5,
    estimated_delivery_date: "2025-04-13",
    phone_number: "333-222-1111",
    email: null,
    social_media_link: "https://facebook.com/lampstore"
  },
  {
    id: "9",
    name: "Portable SSD - 1TB",
    user_id: 9,
    category_id: 108,
    description: "High-speed portable solid-state drive.",
    stock: 12,
    price: 89.99,
    currency: "USD",
    images: ["/images/ssd.jpg"],
    rating: 4.9,
    reviews_count: 115,
    discount: 10,
    payment_method: "Crypto",
    meet_up_preference: "Public Cafe",
    delivery_fee: 3.5,
    estimated_delivery_date: "2025-04-12",
    phone_number: null,
    email: "sales@storagehub.com",
    social_media_link: null
  },
  {
    id: "10",
    name: "Mini Projector",
    user_id: 10,
    category_id: 109,
    description: "Compact projector for home theater experience.",
    stock: 7,
    price: 149.99,
    currency: "USD",
    images: ["/images/projector.jpg", "/images/projector-demo.jpg"],
    rating: 4.6,
    reviews_count: 53,
    discount: null,
    payment_method: "PayPal",
    meet_up_preference: "Home Delivery",
    delivery_fee: 6,
    estimated_delivery_date: "2025-04-16",
    phone_number: "777-444-5555",
    email: "contact@visionpro.com",
    social_media_link: "https://linkedin.com/in/projectorstore"
  }
];

const productsSlice = createSlice<
  { value: Product[] | null },
  SliceCaseReducers<{ value: Product[] | null }>,
  string,
  SliceSelectors<{ value: Product[] | null }>,
  string
>({
  name: "products",
  initialState: {
    value: products
  },
  reducers: {
    setProducts(state, action: { payload: Product[] }) {
      state.value = action.payload;
    }
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
