// storage-adapter-import-placeholder
import path from 'path'
import sharp from 'sharp'
import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Posts } from '@/collections/Posts'
import { Tags } from '@/collections/Tags'
import { Comments } from '@/collections/Comments'
import { Categories } from '@/collections/Categories'
import { Bookings } from '@/collections/Bookings'
import { Rooms } from '@/collections/Rooms'
import { Reviews } from './collections/Reviews'

import { s3Storage } from '@payloadcms/storage-s3'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const emailTransport = nodemailerAdapter({
  defaultFromAddress: process.env.SMTP_FROM!,
  defaultFromName: 'Roomsnearme',
  transport: nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }),
}) 

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Posts, Categories, Tags, Comments, Rooms, Bookings, Reviews],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,

  email: emailTransport,

  plugins: [
    formBuilderPlugin({
      beforeEmail: (emails, ...rest) => {
        const submission = rest && rest[0] && rest[0].data ? rest[0].data : {}

        const fieldsHtml = Array.isArray(submission.submissionData)
          ? submission.submissionData
              .map((item) => `<p><strong>${item.field}:</strong> ${item.value}</p>`)
              .join('')
          : '<p><em>No submission data found</em></p>'

        // Extract user email from form data
        const userEmail = Array.isArray(submission.submissionData)
          ? submission.submissionData.find((item) => item.field === 'email')?.value
          : null

        // Email to admin (original recipients)
        const adminEmails = emails.map((email) => ({
          ...email,
          html: `
        <div>
          <p>New form submission received:</p>
          ${fieldsHtml}
        </div>
      `,
        }))

        // Email to user (confirmation)
        const userConfirmation = userEmail
          ? [
              {
                ...adminEmails[0], // Use the first email's config as template
                to: userEmail,
                subject: 'Thank you for your submission!',
                html: `
              <div>
                <p>Thank you for contacting us! We have received your message and will reply soon.</p>
                <hr>
                <p><strong>Here's a copy of what you submitted:</strong></p>
                ${fieldsHtml}
              </div>
            `,
              },
            ]
          : []

        // Return all emails (admin + user)
        return [...adminEmails, ...userConfirmation]
      },

      formSubmissionOverrides: {
        access: {
          create: () => true,
          update: ({ req }) => {
            return req.user?.roles?.includes('admin') || false
          },
          delete: ({ req }) => {
            return req.user?.roles?.includes('admin') || false
          },
          read: () => true,
        },
      },
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        date: true,
        payment: true,
      },
    }),

    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
