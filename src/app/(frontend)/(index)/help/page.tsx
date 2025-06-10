import { Mails, Phone } from "lucide-react";
import React from "react";

function Rooms() {
  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4">
      <div className="my-2">
        <h1 className="text-3xl font-bold">Rooms Near Me - Help Center</h1>
      </div>

      <div className="w-full bg-gray-100 min-h-screen">
        {/* Header */}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              How can we help you?
            </h2>
            <p className="mb-4">
              Welcome to our Help Center. Here you'll find answers to frequently
              asked questions and tips on how to make the most of Rooms Near Me.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 shadow rounded">
                <h4 className="font-semibold">How do I create an account?</h4>
                <p className="mt-2 text-gray-700">
                  To create an account, click on the 'Sign Up' button at the top
                  right corner and follow the instructions. Please provide
                  accurate information.
                </p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h4 className="font-semibold">How do I search for rooms?</h4>
                <p className="mt-2 text-gray-700">
                  Simply enter your desired location in the search bar on the
                  homepage. You can use filters to refine your search based on
                  your preferences.
                </p>
              </div>
              <div className="bg-white p-4 shadow rounded">
                <h4 className="font-semibold">How do I contact support?</h4>
                <p className="mt-2 text-gray-700">
                  If you need assistance, please click the 'Contact Support'
                  button below or email us directly at support@roomsnearme.in.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Additional Help</h3>
            <p className="text-gray-700 mb-4">
              For any other questions or issues, please do not hesitate to reach
              out to our customer support team.
            </p>
            <a
              href="mailto:admin@roomsnearme.in"
              className="inline-block bg-primary text-white px-6 py-2 rounded shadow hover:bg-blue-500"
            >
              <div className="flex gap-2 cursor-pointer items-center justify-center">
                <Mails size={20} />
                <span>Contact Support</span>
              </div>
            </a>
            <a
              href="tel:+918085589371"
              className="ml-2 inline-block bg-primary text-white px-6 py-2 rounded shadow hover:bg-blue-500"
            >
              <div className="flex gap-2 cursor-pointer items-center justify-center">
                <Phone size={20} />
                <span>Contact Support</span>
              </div>
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Rooms;
