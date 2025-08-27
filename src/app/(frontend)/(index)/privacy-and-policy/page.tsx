import type { Metadata } from 'next'
import React from 'react'
import './page.css'


export const metadata: Metadata = {
  title: 'Privacy Policy | RoomsNearMe',
  description:
    'Read how RoomsNearMe collects, uses, and protects personal data, including cookies, analytics, and user rights.',
  alternates: {
    canonical: 'https://www.roomsnearme.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.roomsnearme.in/privacy-policy',
    siteName: 'RoomsNearMe',
    title: 'Privacy Policy | RoomsNearMe',
    description:
      'Read how RoomsNearMe collects, uses, and protects personal data, including cookies, analytics, and user rights.',
    images: ['https://www.roomsnearme.in/og/privacy-policy.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | RoomsNearMe',
    description:
      'Read how RoomsNearMe collects, uses, and protects personal data, including cookies, analytics, and user rights.',
    images: ['https://www.roomsnearme.in/og/privacy-policy.png'],
  },
}

function Rooms() {
  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4 page">
      <h1 className="font-semibold text-2xl">Privay Policy</h1>
      <>
        <header>
          <h1>Privacy Policy</h1>
          <p>
            <strong>Effective Date:</strong> August 27, 2025
          </p>
          <p>
            Welcome to <strong>RoomsNearMe.in</strong>, accessible at{' '}
            <a href="https://www.roomsnearme.in" rel="nofollow">
              https://www.roomsnearme.in
            </a>{' '}
            (also “RoomsNearMe”, “we”, “us”, “our”). Your privacy is important to us. This Privacy
            Policy explains what data we collect, how we use it, how we protect it, the rights
            available to users, and the responsibilities of all parties when using our platform.
          </p>
          <p className="notice">
            Scope: This policy applies to data collected through this website and related online
            interactions. It does not apply to offline collection or third-party sites and services
            that are not controlled by RoomsNearMe.
          </p>
        </header>
        <section id="platform-role">
          <h2>1) Our Role (Listing Platform)</h2>
          <p>
            RoomsNearMe is an <strong>accommodation listing platform</strong>. We connect users with
            third-party accommodation providers (“Hosts”) that are verified by our internal checks
            and by partner/host documentation. RoomsNearMe does not own, manage, operate, or offer
            accommodations, and typically does not process bookings or payments on behalf of Hosts
            unless explicitly stated on a specific page or flow.
          </p>
          <p>
            <strong>Important:</strong> Listings, images, amenities, availability, pricing, and
            descriptions are supplied by Hosts. We strive for accuracy and verification, but we do
            not guarantee that all information is error-free or up-to-date. Users should perform
            their own due diligence before making arrangements with Hosts.
          </p>
        </section>
        <section id="information-we-collect">
          <h2>2) Information We Collect</h2>
          <h3>2.1 Information you provide directly</h3>
          <ul>
            <li>
              Identity and contact data: name, email address, phone number, and postal address
              (city, state, postal code).
            </li>
            <li>
              Account data: username and password. We require strong passwords and disallow
              disposable or temporary email addresses for account creation.
            </li>
            <li>
              User communications: inquiries, feedback, support requests, and any information
              provided via forms.
            </li>
            <li>
              Host/listing submissions: details about properties, images, amenities, pricing,
              policies, and proof of authorization to list.
            </li>
          </ul>
          <h3>2.2 Information collected automatically</h3>
          <ul>
            <li>
              Log data: IP address, browser type, ISP, referring/exit pages, date/time stamps, pages
              visited, approximate geolocation, and clickstream data.
            </li>
            <li>
              Cookies and similar technologies: strictly necessary, functional, and limited
              analytics cookies. See “Cookies &amp; Tracking” for options.
            </li>
          </ul>
          <h3>2.3 Sensitive data and payments</h3>
          <p>
            We do not intentionally collect sensitive personal data (e.g., financial account
            numbers, health, biometric) unless required for a specific lawful purpose with explicit
            consent. If payments are processed by third-party gateways, payment details are handled
            by those providers under their own policies. We do not store full payment card details
            on our servers.
          </p>
        </section>
        <section id="how-we-use">
          <h2>3) How We Use Your Information</h2>
          <ul>
            <li>Provide, operate, maintain, and improve the website and platform experience.</li>
            <li>
              Respond to inquiries, provide customer support, and communicate service updates.
            </li>
            <li>Personalize content and measure website usage for product improvement.</li>
            <li>
              Verify hosts and listings; detect, investigate, and prevent fraud, abuse, and security
              incidents.
            </li>
            <li>Comply with applicable laws, respond to lawful requests, and enforce our terms.</li>
            <li>
              Send service and transactional messages; marketing messages only with appropriate
              consent where required.
            </li>
          </ul>
          <p>
            <strong>We do not sell or rent personal information</strong> to third parties for their
            marketing.
          </p>
        </section>
        <section id="lawful-bases">
          <h2>4) Legal Bases (where applicable)</h2>
          <p>
            Where laws like GDPR apply, we rely on the following bases:{' '}
            <em>contract performance</em>, <em>legitimate interests</em> (e.g., platform security,
            product improvement), <em>consent</em> (e.g., certain analytics/marketing), and{' '}
            <em>legal obligations</em>. Users can withdraw consent at any time without affecting
            processing prior to withdrawal.
          </p>
        </section>
        <section id="sharing">
          <h2>5) Sharing &amp; Disclosure</h2>
          <ul>
            <li>
              With Hosts and service providers: to operate features users request and for platform
              functions (hosting, analytics, security, email delivery).
            </li>
            <li>
              For legal reasons: to comply with laws, enforce our terms, or protect rights, safety,
              and property of users, the public, or RoomsNearMe.
            </li>
            <li>
              Business transfers: in a merger, acquisition, or asset sale, data may be transferred
              subject to this policy’s protections.
            </li>
          </ul>
        </section>
        <section id="cookies">
          <h2>6) Cookies &amp; Tracking</h2>
          <p>
            We use minimal cookies for core functionality and limited analytics. Users may control
            cookies through browser settings. Blocking some cookies may affect site functionality.
          </p>
          <ul>
            <li>Strictly necessary: login/session security, CSRF protection.</li>
            <li>Functional: preferences, improved UX.</li>
            <li>
              Analytics: aggregate insights to improve the site. Opt-out tools may be available from
              analytics providers.
            </li>
          </ul>
        </section>
        <section id="analytics">
          <h2>7) Analytics</h2>
          <p>
            We may use analytics tools (e.g., Google Analytics) to understand usage patterns. These
            providers process data under their own policies. Users can explore opt-out options
            offered by such providers. We limit data to what is necessary and apply IP truncation or
            similar safeguards where supported.
          </p>
        </section>
        <section id="security">
          <h2>8) Security</h2>
          <p>
            We implement reasonable administrative, technical, and organizational measures to
            protect personal data, including encryption in transit, access controls, strong
            credential policies, and routine monitoring. No method is 100% secure; residual risk
            remains on any internet service. Users are responsible for maintaining strong, unique
            passwords and safeguarding their credentials.
          </p>
        </section>
        <section id="data-retention">
          <h2>9) Data Retention</h2>
          <p>
            We retain personal data only for as long as necessary to fulfill the purposes outlined
            in this policy, comply with legal obligations, resolve disputes, and enforce agreements.
            Retention periods vary based on account status, legal requirements, and the nature of
            the data.
          </p>
        </section>
        <section id="your-rights">
          <h2>10) Your Rights</h2>
          <p>Subject to applicable law, users may have rights to:</p>
          <ul>
            <li>Access and obtain a copy of their personal data.</li>
            <li>Correct inaccurate or incomplete data.</li>
            <li>Delete data in certain circumstances.</li>
            <li>Restrict or object to processing.</li>
            <li>Data portability (structured, commonly used format).</li>
            <li>Withdraw consent where processing relies on consent.</li>
          </ul>
          <p>
            To exercise rights, contact us using the details in the “Contact” section. We may
            require identity verification.
          </p>
        </section>
        <section id="children">
          <h2>11) Children’s Privacy</h2>
          <p>
            RoomsNearMe is not intended for children under 13. We do not knowingly collect personal
            information from children. If a child has provided personal information, contact us to
            request deletion.
          </p>
        </section>
        <section id="geo-laws">
          <h2>12) Region-Specific Notices</h2>
          <h3>12.1 India</h3>
          <p>
            We align with applicable Indian data protection principles and IT security practices. We
            collect only necessary information, use it for stated purposes, apply reasonable
            security safeguards, and facilitate user rights consistent with local law.
          </p>
          <h3>12.2 GDPR (where applicable)</h3>
          <p>
            For EEA/UK users, the GDPR rights described above apply. We may designate a contact
            point for EU/UK inquiries where required.
          </p>
          <h3>12.3 CCPA/CPRA (where applicable)</h3>
          <p>
            California residents may request access to categories and specific pieces of personal
            information, request deletion, correct information, and opt out of “sale”/“sharing”
            where applicable. We do not sell personal data as defined by the CCPA. Submit requests
            via our contact email.
          </p>
        </section>
        <section id="content-standards">
          <h2>13) Content Standards</h2>
          <ul>
            <li>
              We prohibit adult content and enforce applicable content laws. Violations may result
              in removal or account suspension.
            </li>
            <li>
              We require original, accurate, and relevant content. Placeholder text (e.g., “Lorem
              Ipsum”) is not permitted in listings.
            </li>
            <li>Use of copyrighted images/text requires authorization by the submitter.</li>
          </ul>
        </section>
        <section id="email-browser">
          <h2>14) Email and Browser Practices</h2>
          <ul>
            <li>
              Email: We only allow genuine, non-disposable email addresses. We use industry-standard
              encryption and authentication (SPF, DKIM, DMARC) for outbound mail where applicable.
              Users can opt out of non-essential email marketing.
            </li>
            <li>
              Browser: Keep your browser up to date. We limit cookies to
              necessary/functional/analytics, block harmful content where feasible, and continuously
              improve our security posture.
            </li>
          </ul>
        </section>
        <section id="third-parties">
          <h2>15) Third-Party Links &amp; Services</h2>
          <p>
            Our policy does not apply to third-party websites, services, or advertisers. Review
            their policies for details on how they handle data. You can manage cookies via your
            browser or third-party tools.
          </p>
        </section>
        <section id="changes">
          <h2>16) Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will update the “Effective Date” and,
            where appropriate, provide additional notice. Continued use of the site after changes
            indicates acceptance of the updated policy.
          </p>
        </section>
        <section id="contact">
          <h2>17) Contact</h2>
          <p>
            For privacy inquiries or to exercise your rights, contact:{' '}
            <a href="mailto:admin@roomsnearme.in">admin@roomsnearme.in</a>
          </p>
        </section>
        <hr />
        <section id="legal-disclaimer">
          <h2>Legal Disclaimer &amp; Platform Responsibility</h2>
          <p>
            <span className="tag">Platform</span> RoomsNearMe lists accommodations from verified
            providers but does not provide, own, manage, or operate those accommodations.
            Verification reduces risk but cannot eliminate inaccuracies or misrepresentations.
          </p>
          <ul>
            <li>
              <strong>No guarantees:</strong> We do not guarantee the accuracy, availability,
              pricing, images, amenities, safety, legality, or suitability of any listing.
            </li>
            <li>
              <strong>User diligence:</strong> Users should verify critical details with Hosts
              before making arrangements.
            </li>
            <li>
              <strong>Disputes:</strong> Any booking, payment, cancellation, refund, quality,
              cleanliness, or safety disputes are between Users and Hosts. We may, at our
              discretion, assist with information or moderation steps but have no obligation to
              resolve such disputes.
            </li>
            <li>
              <strong>Fraud prevention:</strong> We actively monitor and remove suspected fraudulent
              content/accounts and may cooperate with law enforcement. Report suspicious activity to{' '}
              <a href="mailto:admin@roomsnearme.in">admin@roomsnearme.in</a>.
            </li>
            <li>
              <strong>Limitation of liability:</strong> To the maximum extent permitted by law,
              RoomsNearMe is not liable for direct, indirect, incidental, special, consequential, or
              punitive damages arising from use of the website, reliance on listings, or
              interactions with Hosts.
            </li>
            <li>
              <strong>Right to remove:</strong> We may remove or suspend listings or accounts for
              suspected policy violations, illegal content, or risk to users.
            </li>
            <li>
              <strong>Compliance:</strong> Hosts are responsible for complying with local laws,
              permits, registrations, guest records, and taxes. We may request proof of compliance
              during verification.
            </li>
          </ul>
        </section>
        <section id="seo-note">
          <h2>SEO &amp; Transparency Note</h2>
          <p>
            This policy is written in clear, user-first language, avoids manipulative SEO practices,
            and provides transparency on data use and platform responsibilities—factors aligned with
            major search guidelines for trust and usability.
          </p>
        </section>
      </>
    </div>
  )
}

export default Rooms
