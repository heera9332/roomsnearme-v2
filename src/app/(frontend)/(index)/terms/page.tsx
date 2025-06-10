import React from "react";

function Rooms() {
  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4">
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6">
          Our
          <a href="/privacy" className="text-blue-500 underline mx-2">
            Privacy Policy
          </a>{" "}
          also governs your use of our Website and explains how we collect,
          safeguard, and disclose information that results from your use of our
          web pages. Your agreement with us includes these Terms and our Privacy
          Policy (“Agreements”). You acknowledge that you have read and
          understood the Agreements and agree to be bound by them.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you guarantee that you are above
          the age of 18 and that the information you provide is accurate,
          complete, and current at all times. Inaccurate, incomplete, or
          obsolete information may result in the immediate termination of your
          account on the Website.
        </p>
        <p className="mb-6">
          You are responsible for maintaining the confidentiality of your
          account and password, including but not limited to restricting access
          to your computer and/or account. You agree to accept responsibility
          for any and all activities or actions that occur under your account
          and/or password, whether your password is used on our Website or a
          third-party service.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="mb-6">
          The Website and its original content (excluding content provided by
          users), features, and functionality are and will remain the exclusive
          property of <strong>Rooms Near Me</strong> and its licensors. The
          Website is protected by copyright and other applicable laws both
          domestically and internationally.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account and bar access to the Website
          immediately, without prior notice or liability, at our sole
          discretion, for any reason whatsoever and without limitation,
          including but not limited to a breach of these Terms.
        </p>
        <p className="mb-6">
          If you wish to terminate your account, you may simply discontinue
          using the Website.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Amendments to Terms</h2>
        <p className="mb-6">
          We may amend these Terms at any time by posting the amended terms on
          this site. It is your responsibility to review these Terms
          periodically.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-6">
          Please send your feedback, comments, or requests for technical support
          by email:
          <a
            href="mailto:admin@roomsnearme.in"
            className="text-blue-500 underline mx-2"
          >
            admin@roomsnearme.in
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Rooms;
