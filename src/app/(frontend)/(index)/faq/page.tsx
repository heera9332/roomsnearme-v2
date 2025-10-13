// app/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

const PATH = "/faq";
const TITLE = "FAQ – Frequently Asked Questions";
const DESCRIPTION =
  "Quick answers to common questions about Rooms Near Me: accounts, booking, payments, cancellations, refunds, safety, and support.";

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
      "rooms near me faq",
      "booking help",
      "payment methods",
      "refund policy",
      "cancellation policy",
      "safety and verification",
      "account help",
      "support",
    ],
    category: "travel",
  };
}

export default function FAQPage() {
  const updatedAt = "2025-10-14";

  const qa = [
    {
      q: "How do I create an account?",
      a: "Click “Sign Up” in the header and follow the steps. Verify your email/phone to activate your account.",
      id: "create-account",
    },
    {
      q: "How do I search for rooms?",
      a: "Use the search bar on the homepage. Filter by price, dates, location and amenities to refine results.",
      id: "search-rooms",
    },
    {
      q: "How do I make a booking?",
      a: "Open a room page, select your dates, review price breakdown and click “Book Now”. You’ll get a confirmation email after payment.",
      id: "make-booking",
    },
    {
      q: "Which payment methods are supported?",
      a: "We accept major cards, UPI and popular wallets in India. Availability may vary by region or property.",
      id: "payment-methods",
    },
    {
      q: "Are there extra fees or taxes?",
      a: "Prices show base rate; applicable taxes and service fees are shown in checkout before you pay.",
      id: "fees-taxes",
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Policies vary by property. See the “Cancellation Policy” on the room page and in checkout. Refunds follow the host’s policy and your payment method’s timelines.",
      id: "cancellation-refund",
    },
    {
      q: "Can I modify dates or guests after booking?",
      a: "In many cases yes. Go to My Bookings → Manage. Changes depend on availability and may affect pricing.",
      id: "modify-booking",
    },
    {
      q: "How do I contact the host?",
      a: "Use the “Contact Host” button on the room page or your booking details page after you book.",
      id: "contact-host",
    },
    {
      q: "Is my data safe?",
      a: "We use industry-standard encryption and follow strict privacy practices. Review our Privacy Policy for details.",
      id: "data-security",
    },
    {
      q: "How are reviews handled?",
      a: "Only verified guests can leave reviews after checkout. We moderate for authenticity and policy compliance.",
      id: "reviews",
    },
    {
      q: "Accessibility and special requests?",
      a: "Filter for accessibility features or message the host for specific needs before booking.",
      id: "accessibility",
    },
    {
      q: "How do I reach support?",
      a: "Email support@roomsnearme.in or use the Help Center. Urgent issues: call +91-80855-89371.",
      id: "reach-support",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FAQ",
    description: DESCRIPTION,
    url: PATH,
    dateModified: updatedAt,
    isPartOf: { "@type": "WebSite", name: "Rooms Near Me", url: "/" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: PATH },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4">
      <header className="mb-2">
        <h1 className="font-semibold text-2xl">Frequently Asked Questions</h1>
        <p className="text-sm text-gray-500">Last updated: {updatedAt}</p>
      </header>

      <nav aria-label="FAQ table of contents" className="mt-6 mb-8">
        <ul className="grid md:grid-cols-2 gap-2 list-disc list-inside">
          {qa.map((item) => (
            <li key={item.id}>
              <a className="underline" href={`#${item.id}`}>
                {item.q}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="space-y-6">
        {qa.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{item.q}</h2>
            <p className="mt-2 text-gray-700">{item.a}</p>
          </article>
        ))}
      </section>

      <footer className="mt-10 text-sm text-gray-600">
        Need more help? Visit our{" "}
        <Link href="/help" className="underline text-blue-600">
          Help Center
        </Link>
        , read our{" "}
        <Link href="/privacy" className="underline text-blue-600">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline text-blue-600">
          Terms of Service
        </Link>
        , or email{" "}
        <a href="mailto:support@roomsnearme.in" className="underline">
          support@roomsnearme.in
        </a>
        .
      </footer>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, webPageJsonLd, breadcrumbJsonLd]),
        }}
      />
    </div>
  );
}
