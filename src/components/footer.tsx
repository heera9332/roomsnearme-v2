import Image from "next/image";
import Link from "next/link";

// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="!text-white text-lg font-semibold mb-4">
            Rooms Near Me
          </h2>
          <p className="text-gray-500">
            Discover and book rooms easily with Rooms Near Me. Find affordable
            stays nearby, compare prices, and book instantly.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="!text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/rooms" className="hover:text-blue-400 transition">
                Rooms
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-blue-400 transition">
                Checkout
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-blue-400 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-blue-400 transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h3 className="!text-white text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/help" className="hover:text-blue-400 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-400 transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-and-policy"
                className="hover:text-blue-400 transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/cancellation"
                className="hover:text-blue-400 transition"
              >
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h3 className="!text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61554823514977"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={1000}
                height={1000}
                src="/icons/facebook.svg"
                alt="Facebook"
                className="h-6 w-6 hover:opacity-75"
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={1000}
                height={1000}
                src="/icons/twitter.svg"
                alt="Twitter"
                className="h-6 w-6 hover:opacity-75"
              />
            </Link>
            <Link
              href="https://instagram.com/heera9332"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={1000}
                height={1000}
                src="/icons/instagram.svg"
                alt="Instagram"
                className="h-6 w-6 hover:opacity-75"
              />
            </Link>
            <Link
              href="https://linkedin.com/in/heera9331/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={1000}
                height={1000}
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="h-6 w-6 hover:opacity-75"
              />
            </Link>
            <Link
              href="https://wa.me/+918085589371"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={1000}
                height={1000}
                src="/icons/whatsapp.svg"
                alt="WhatsApp"
                className="h-6 w-6 hover:opacity-75"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Rooms Near Me. All rights reserved.
      </div>
    </footer>
  );
}
