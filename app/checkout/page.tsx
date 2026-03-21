"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // In a real app, integrate Stripe/Razorpay and clear cart here
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <CheckCircle className="text-green-500 mb-6" size={64} />
        <h1 className="text-3xl font-serif mb-4">Order Confirmed!</h1>
        <p className="text-brand-600 mb-8 max-w-md">
          Thank you for shopping at Aavis Closet. Your unique vintage piece is being prepared for shipping. We'll send a confirmation email shortly.
        </p>
        <Link href="/" className="inline-block bg-brand-900 text-brand-100 px-8 py-3 rounded-full hover:bg-brand-800 transition-colors">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <Link href="/cart" className="inline-flex items-center text-sm text-brand-500 hover:text-brand-900 mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to Cart
      </Link>
    
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-brand-100 p-6 md:p-8 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1">Email address</label>
              <input required type="email" id="email" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
            </div>
          </div>
        </div>

        <div className="bg-brand-100 p-6 md:p-8 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1">Full Name</label>
              <input required type="text" id="name" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-brand-700 mb-1">Street Address</label>
              <input required type="text" id="address" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-brand-700 mb-1">City</label>
              <input required type="text" id="city" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
            </div>
            <div>
              <label htmlFor="postal" className="block text-sm font-medium text-brand-700 mb-1">Postal Code</label>
              <input required type="text" id="postal" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium text-brand-700 mb-1">Country</label>
              <select required id="country" className="w-full px-4 py-2 border border-brand-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-900">
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-brand-100 p-6 md:p-8 rounded-lg">
          <h2 className="text-xl font-medium mb-6">Payment</h2>
          <p className="text-sm text-brand-600 mb-4">This is a demo store. No actual payment will be processed.</p>
          <div className="p-4 border border-brand-200 bg-white rounded-md text-sm text-center text-brand-500">
            Payment integration ready (e.g. Stripe/Razorpay)
          </div>
        </div>

        <button type="submit" className="w-full bg-brand-900 text-brand-100 py-4 px-8 rounded-full font-medium hover:bg-brand-800 transition-colors text-lg">
          Place Order
        </button>
      </form>
    </div>
  );
}
