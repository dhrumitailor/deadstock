// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: Request) {
//   const { amount } = await request.json();

//   const options = {
//     amount: amount * 100, // Razorpay works in paise (₹1 = 100 paise)
//     currency: "INR",
//     receipt: "receipt_" + Math.random().toString(36).substring(7),
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     return NextResponse.json(order);
//   } catch (error) {
//     return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   // Use the Secret Key for the backend
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: Request) {
//   try {
//     const { amount } = await request.json();

//     const options = {
//       amount: amount * 100, // Convert Rupees to Paise
//       currency: "INR",
//       receipt: "receipt_" + Math.random().toString(36).substring(7),
//     };

//     const order = await razorpay.orders.create(options);
//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Razorpay Error:", error);
//     return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
//   }
// }
// app/api/razorpay/route.ts
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: Request) {
//   try {
//     const { amount } = await request.json();

//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     const options = {
//       amount: Math.round(amount * 100), // Ensures no decimal issues
//       currency: "INR",
//       receipt: "rcpt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     return NextResponse.json(order);
//   } catch (error: any) {
//     console.error("RAZORPAY SERVER ERROR:", error);
//     return NextResponse.json({ error: error.message || "Order creation failed" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects paise (Amount * 100)
      currency: "INR",
      receipt: "rcpt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("RAZORPAY_ERROR:", error);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}