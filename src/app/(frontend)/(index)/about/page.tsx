// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import React from "react";

const PATH = "/about";
const TITLE = "About Rooms Near Me";
const DESCRIPTION =
  "Learn about Rooms Near Me—our story, mission, and how we help you find verified, affordable rooms near your location with dedicated support.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    openGraph: {
      title: `${TITLE} | Rooms Near Me`,
      description: DESCRIPTION,
      url: PATH,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${TITLE} | Rooms Near Me`,
      description: DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    keywords: [
      "about",
      "rooms near me",
      "our story",
      "mission",
      "verified listings",
      "room rentals",
      "support",
    ],
    category: "travel",
  };
}

export default function AboutPage() {
  const updatedAt = "2025-10-14";

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: TITLE,
    description: DESCRIPTION,
    url: PATH,
    dateModified: updatedAt,
    isPartOf: { "@type": "WebSite", name: "Rooms Near Me", url: "/" },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rooms Near Me",
    url: "/",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@roomsnearme.in",
        telephone: "+91-80855-89371",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "About", item: PATH },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4">
      <header className="mb-2">
        <h1 className="font-semibold text-2xl">About us</h1>
        <p className="text-sm text-gray-500">Last updated: {updatedAt}</p>
      </header>

      <section className="my-4">
        <div className="my-2">
          <h3 className="font-semibold text-xl">About Rooms Near Me</h3>
          <p>
            Welcome to Rooms Near Me – your trusted online destination for
            finding the perfect room near your desired location. We believe that
            finding a comfortable, convenient, and affordable living space
            should be simple and stress-free.
          </p>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold">Our Story</h3>
          <p>
            Founded with a passion for connecting people with quality living
            spaces, Rooms Near Me was created to simplify the room rental
            experience. Our journey began when we recognized the challenges
            people face when searching for a reliable, well-located room. With
            our platform, we set out to bridge the gap between room seekers and
            property owners, ensuring that every listing is verified and meets
            high standards of comfort and convenience.
          </p>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
          <ul className="flex flex-col gap-2 list-disc ml-6">
            <li>
              <strong>Verified Listings:</strong> We work directly with
              property owners to ensure that you have access to genuine,
              high-quality rooms.
            </li>
            <li>
              <strong>Tailored Searches:</strong> Filter your search by
              location, amenities, and price, making it easy to find a room
              that fits your lifestyle.
            </li>
            <li>
              <strong>Dedicated Support:</strong> Our team is always here to
              assist you, from your first search to settling into your new
              home.
            </li>
          </ul>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold mb-2">How we works?</h3>
          <ul className="ml-4 flex flex-col gap-2 list-disc">
            <li>
              <strong>Search room</strong> - Find your room for rent that near
              you and fill the form.
            </li>
            <li>
              <strong>We will get back a call</strong>
            </li>
            <li>
              <strong>Share room location</strong>
            </li>
            <li>
              <strong>No advance payment</strong>
            </li>
            <li>
              <strong>No cancellation fee</strong>
            </li>
          </ul>
        </div>

        <div className="my-2">
          <h2 className="text-xl font-semibold mb2">Contact now</h2>
          <div className="inline-block">
            <a
              href="tel:+918085589371"
              className="mt-2 bg-primary text-white rounded-md px-4 py-2 flex gap-2 items-center justify-center"
            >
              <Phone size={20} />
              <span>Contact Support</span>
            </a>
            <p className="mt-2 text-sm text-gray-600">
              Or email{" "}
              <a href="mailto:support@roomsnearme.in" className="underline">
                support@roomsnearme.in
              </a>
              . Visit our{" "}
              <Link href="/help" className="underline text-blue-600">
                Help Center
              </Link>{" "}
              for quick answers.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutJsonLd, orgJsonLd, breadcrumbJsonLd]),
        }}
      />
    </div>
  );
}
