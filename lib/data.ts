import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}






// export interface Product {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   currency: string;
//   image: string;
//   images: string[];
//   condition: string;
//   size: string;
//   isPublished: boolean;
// }

// export const products: Product[] = [
//   {
//     id: "p1",
//     title: "Vintage Y2K Really Point Rhinestone All-Over-Print (AOP) Sherpa-Lined Zip Hoodie XL",
//     description: "Incredible vintage piece featuring all-over rhinestone detailing. Heavyweight material with warm sherpa lining. Perfect for that Y2K aesthetic.",
//     price: 7461,
//     currency: "₹",
//     image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&auto=format&fit=crop"],
//     condition: "Good - Minor wear on the cuffs",
//     size: "XL",
//     isPublished: true,
//   },
//   {
//     id: "p2",
//     title: "Vintage 00s Evisu Selvedge Denim Jeans Yellow Diacock 30",
//     description: "Classic Evisu denim with the iconic yellow hand-painted diacock across the back. Selvedge denim construction. Made in Japan.",
//     price: 13989,
//     currency: "₹",
//     image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&auto=format&fit=crop"],
//     condition: "Excellent - Paint is fully intact",
//     size: "30",
//     isPublished: true,
//   },
//   {
//     id: "p3",
//     title: "Vintage 00s Carhartt Double Knee Pant Distressed Paint Splash 33",
//     description: "Perfectly aged workwear. These Carhartt double knees have stunning natural fading, distressing, and authentic paint splatters from actual use.",
//     price: 10259,
//     currency: "₹",
//     image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&auto=format&fit=crop"],
//     condition: "Distressed - Paint stains, frayed hems",
//     size: "33",
//     isPublished: true,
//   },
//   {
//     id: "p4",
//     title: "Vintage 00s Arc'teryx Fission SV Gore-Tex Pro Jacket Black Technical Shell S/M",
//     description: "Highly sought-after early 2000s Arc'teryx piece. Fully waterproof Gore-Tex Pro shell. Great technical fit and minimal stealth look.",
//     price: 32612,
//     currency: "₹",
//     image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&auto=format&fit=crop"],
//     condition: "Excellent - Seam tape fully intact",
//     size: "S/M",
//     isPublished: true,
//   },
// ];
