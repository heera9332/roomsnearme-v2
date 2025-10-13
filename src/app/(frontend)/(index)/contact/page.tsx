// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

const PATH = "/contact";
const TITLE = "Contact Us";
const DESCRIPTION =
  "Get in touch with Rooms Near Me for questions, support, partnerships, or feedback.";

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
      "contact",
      "support",
      "help",
      "rooms near me",
      "roomsnearme",
      "customer service",
      "partnerships",
      "feedback",
    ],
    category: "travel",
  };
}

export default function ContactPage() {
  const updatedAt = "2025-10-14";

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@roomsnearme.in",
        telephone: "+91-80855-89371",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "general inquiries",
        email: "admin@roomsnearme.in",
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
      { "@type": "ListItem", position: 2, name: "Contact", item: PATH },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: {updatedAt}</p>
      <p className="text-gray-600 mb-6">
        Need help or have questions? Fill out the form below and we&apos;ll get back to you shortly.
      </p>
      <div className="max-w-7xl">
        <ContactForm />
      </div>

      <section className="mt-8 text-sm text-gray-600">
        <p>
          Email:{" "}
          <a href="mailto:support@roomsnearme.in" className="underline">
            support@roomsnearme.in
          </a>{" "}
          • Phone:{" "}
          <a href="tel:+918085589371" className="underline">
            +91 80855 89371
          </a>
        </p>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactJsonLd, orgJsonLd, breadcrumbJsonLd]),
        }}
      />
    </div>
  );
}
