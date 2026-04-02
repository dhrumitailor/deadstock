// import { supabaseServer as supabase } from "@/lib/supabaseServer";

// export async function getProducts() {
//   const { data, error } = await supabase.from("products").select("*");

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   return data;

// }
// // lib/data.ts
// import { supabaseServer } from "./supabaseServer"; // Ensure this path is correct

// export async function searchProducts(query: string) {
//   const { data, error } = await supabaseServer
//     .from("products")
//     .select("*")
//     .ilike("title", `%${query}%`);

//   if (error) {
//     console.error("Search error:", error.message);
//     return []; // Return empty array so the UI doesn't crash
//   }

//   return data || []; // Ensure we always return an array
// }


//after sorting 
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export async function getProducts() {
  // Added .order() to ensure the Admin Inventory shows newest first
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function searchProducts(query: string) {
  // Added .order() here so the Shop Page and Search results show newest first
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Search error:", error.message);
    return [];
  }

  return data || [];
}