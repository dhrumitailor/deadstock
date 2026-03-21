import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-100 border-t border-brand-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif mb-4">Join the club</h3>
            <p className="text-brand-600 mb-4 text-sm max-w-sm">
              Get exclusive deals and early access to new products.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border border-brand-900 px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-brand-900 rounded-full"
              />
              <button className="bg-brand-900 text-brand-100 px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-brand-600">
              <li><Link href="/shop" className="hover:text-brand-900">All Products</Link></li>
              <li><Link href="/shop?category=jackets" className="hover:text-brand-900">Jackets</Link></li>
              <li><Link href="/shop?category=pants" className="hover:text-brand-900">Pants</Link></li>
              <li><Link href="/shop?category=hoodies" className="hover:text-brand-900">Hoodies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm text-brand-600">
              <li><Link href="/about" className="hover:text-brand-900">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-900">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-900">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="hover:text-brand-900">Terms & Policies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-500">
            © {new Date().getFullYear()} deadstockdept. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-xs border border-brand-200 px-3 py-1 bg-white rounded-md">
              <span>🇮🇳 INR ˅</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
