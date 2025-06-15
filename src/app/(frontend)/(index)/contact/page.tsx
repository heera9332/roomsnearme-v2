import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Need help or have questions? Fill out the form below and we&apos;ll get back to you shortly.
      </p>
      <div className='max-w-7xl'>
        <ContactForm />
      </div>
    </div>
  )
}
