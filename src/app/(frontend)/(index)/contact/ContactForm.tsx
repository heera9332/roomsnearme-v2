'use client'

import { axios } from '@/lib/axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const submissionData = Object.entries(formData).map(([field, value]) => ({
        field,
        value,
      }))

      submissionData.push({
        field: 'source',
        value: `${window.location.host}/contact`,
      })

      const payload = {
        form: '684f1a6cff465186eb34d0cc',
        submissionData,
      }

      const response = await axios.post(`/api/form-submissions`, payload)

      if (response?.data) {
        toast.success('Your message has been sent!')
        setFormData({ name: '', email: '', phone: '', message: '' })
      }
    } catch (error) {
      toast.error('Something went wrong while sending the message.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-md p-6 space-y-4 border"
    >
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Name
        </label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-medium mb-1">
          Phone
        </label>
        <input
          required
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          Message
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="w-full border rounded px-3 py-2 resize-none"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
