// app/help/page.tsx
import type { Metadata } from "next";
import { Mails, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const PATH = "/help";
const TITLE = "Help Center";
const DESCRIPTION =
  "Find answers, FAQs and support options for Rooms Near Me. Learn how to create an account, search rooms, and contact support.";

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
      "help center",
      "support",
      "faq",
      "rooms near me support",
      "account help",
      "booking help",
    ],
    category: "travel",
  };
}

export default function HelpPage() {
  const updatedAt = "2025-10-14";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Click the ‘Sign Up’ button in the top-right and follow the steps. Provide accurate details to keep your account secure and up to date.",
        },
      },
      {
        "@type": "Question",
        name: "How do I search for rooms?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Enter your location in the homepage search bar and apply filters for budget, dates and amenities to refine results.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact support?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Email support@roomsnearme.in or use the Contact Support buttons on this page to reach our team.",
        },
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
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
      { "@type": "ListItem", position: 2, name: "Help Center", item: PATH },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4">
      <div className="my-2">
        <h1 className="text-3xl font-bold">Rooms Near Me - Help Center</h1>
        <p className="text-sm text-gray-500 mt-1">Last updated: {updatedAt}</p>
      </div>

      <div className="w-full bg-gray-100 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 py-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How can we help you?</h2>
            <p className="mb-4">
              Welcome to our Help Center. Here you&apos;ll find answers to frequently asked
              questions and tips on how to make the most of Rooms Near Me.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 shadow rounded">
                <h4 className="font-semibold">How do I create an account?</h4>
                <p className="mt-2 text-gray-700">
                  Click the &apos;Sign Up&apos; button at the top right corner and follow the
                  instructions. Please provide accurate information.
                </p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h4 className="font-semibold">How do I search for rooms?</h4>
                <p className="mt-2 text-gray-700">
                  Enter your desired location in the homepage search bar. Use filters to refine
                  your search by budget, dates and amenities.
                </p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h4 className="font-semibold">How do I contact support?</h4>
                <p className="mt-2 text-gray-700">
                  Click the &apos;Contact Support&apos; button below or email{" "}
                  <a href="mailto:support@roomsnearme.in" className="text-blue-600 underline">
                    support@roomsnearme.in
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Additional Help</h3>
            <p className="text-gray-700 mb-4">
              For any other questions or issues, please reach out to our customer support team.
            </p>

            <a
              href="mailto:admin@roomsnearme.in"
              className="inline-block bg-primary text-white px-6 py-2 rounded shadow hover:bg-blue-500"
            >
              <div className="flex gap-2 items-center justify-center">
                <Mails size={20} />
                <span>Contact Support</span>
              </div>
            </a>

            <a
              href="tel:+918085589371"
              className="ml-2 inline-block bg-primary text-white px-6 py-2 rounded shadow hover:bg-blue-500"
            >
              <div className="flex gap-2 items-center justify-center">
                <Phone size={20} />
                <span>Call Support</span>
              </div>
            </a>

            <p className="mt-4 text-sm text-gray-500">
              You can also visit our{" "}
              <Link href="/privacy" className="underline text-blue-600">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="underline text-blue-600">
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </main>
      </div>

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
