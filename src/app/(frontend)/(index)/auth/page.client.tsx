'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// shadcn/ui
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SmallSwitches } from '@/components/SmallSwitches'

// Booking.com-ish theme tokens
const colors = {
  blue: '#003580',
  lightBlue: '#009fe3',
  yellow: '#feba02',
  grayText: '#666666',
  bg: '#f2f6fa',
} // [6]

type Action = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'logout'
type Role = 'vendor' | 'customer'

// Schemas
const loginSchema = z.object({
  identifier: z.string().min(3, 'Enter email, username or mobile'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const baseRegister = {
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email required'),
  handle: z.string().min(3, 'Username or mobile is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
}

const vendorRegisterSchema = z.object({
  ...baseRegister,
})

const customRegisterSchema = z.object({
  ...baseRegister,
})

const forgotSchema = z.object({
  email: z.string().email('Valid email required'),
})

const resetSchema = z
  .object({
    token: z.string().min(10, 'Invalid reset token'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function AuthPage({
  initialAction = 'login',
  initialRole = 'customer',
  initialRedirectTo = '/my-account',
  initialToken = '',
}: {
  initialAction?: Action
  initialRole?: Role
  initialRedirectTo?: string
  initialToken?: string
}) {
  const sp = useSearchParams()
  const router = useRouter()

  // Use server-provided defaults but keep the UI reactive to URL changes
  const action = (sp.get('action') as Action) || initialAction
  const role = (sp.get('role') as Role) || initialRole
  const redirectTo = sp.get('redirect_to') || initialRedirectTo
  const token = sp.get('token') || initialToken

  // Handlers: replace with your API calls
  async function apiLogin(values: z.infer<typeof loginSchema>) {
    // await signIn or fetch('/api/auth/login', { body: JSON.stringify(values) })
    await new Promise((r) => setTimeout(r, 400))
    router.replace(redirectTo)
  }

  async function apiRegisterVendor(values: z.infer<typeof vendorRegisterSchema>) {
    await new Promise((r) => setTimeout(r, 400))
    router.replace(redirectTo)
  }

  async function apiRegisterCustom(values: z.infer<typeof customRegisterSchema>) {
    await new Promise((r) => setTimeout(r, 400))
    router.replace(redirectTo)
  }

  async function apiForgot(values: z.infer<typeof forgotSchema>) {
    await new Promise((r) => setTimeout(r, 400))
    router.replace('/auth?action=reset-password')
  }

  async function apiReset(values: z.infer<typeof resetSchema>) {
    await new Promise((r) => setTimeout(r, 400))
    router.replace('/auth?action=login')
  }

  async function apiLogout() {
    await new Promise((r) => setTimeout(r, 200))
    router.replace('/auth?action=login')
  }

  return (
    <div>
      <main className="mx-auto max-w-5xl px-4 py-4">
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold" style={{ color: colors.blue }}>
              {titleFor(action, role)}
            </h1>
            <p className="text-sm" style={{ color: colors.grayText }}>
              {subtitleFor(action, role)}
            </p>

            <AuthCard
              action={action}
              role={role}
              onLogin={apiLogin}
              onRegisterVendor={apiRegisterVendor}
              onRegisterCustom={apiRegisterCustom}
              onForgot={apiForgot}
              onReset={apiReset}
              onLogout={apiLogout}
            />

            <SmallSwitches action={action} role={role} />
          </div>

          <Aside />
        </div>
      </main>
    </div>
  )
}

function titleFor(action: Action, role: Role) {
  switch (action) {
    case 'login':
      return 'Sign in to your account'
    case 'register':
      return role === 'vendor' ? 'Create a vendor account' : 'Create a customer account'
    case 'forgot-password':
      return 'Forgot your password?'
    case 'reset-password':
      return 'Set a new password'
    case 'logout':
      return 'Sign out'
  }
}

function subtitleFor(action: Action, role: Role) {
  switch (action) {
    case 'login':
      return 'Access bookings, saved places, and more.'
    case 'register':
      return role === 'vendor'
        ? 'List properties and manage inquiries with a vendor account.'
        : 'Book faster and track your inquiries with a customer account.'
    case 'forgot-password':
      return 'Enter your email to receive a password reset link.'
    case 'reset-password':
      return 'Enter your new password to complete the reset.'
    case 'logout':
      return 'You can sign out of your account below.'
  }
}

type AuthCardProps = {
  action: Action
  role: Role
  onLogin: (v: z.infer<typeof loginSchema>) => Promise<void>
  onRegisterVendor: (v: z.infer<typeof vendorRegisterSchema>) => Promise<void>
  onRegisterCustom: (v: z.infer<typeof customRegisterSchema>) => Promise<void>
  onForgot: (v: z.infer<typeof forgotSchema>) => Promise<void>
  onReset: (v: z.infer<typeof resetSchema>) => Promise<void>
  onLogout: () => Promise<void>
}

function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('rounded-lg border bg-white shadow-sm', className)}>
      <div className="p-5">{children}</div>
    </div>
  )
}

function AuthCard({
  action,
  role,
  onLogin,
  onRegisterVendor,
  onRegisterCustom,
  onForgot,
  onReset,
  onLogout,
}: AuthCardProps) {
  switch (action) {
    case 'login':
      return <LoginForm onSubmit={onLogin} />
    case 'register':
      return role === 'vendor' ? (
        <VendorRegisterForm onSubmit={onRegisterVendor} />
      ) : (
        <CustomRegisterForm onSubmit={onRegisterCustom} />
      )
    case 'forgot-password':
      return <ForgotForm onSubmit={onForgot} />
    case 'reset-password':
      return <ResetForm onSubmit={onReset} />
    case 'logout':
      return <LogoutCard onSubmit={onLogout} />
  }
}

function LoginForm({ onSubmit }: { onSubmit: (v: z.infer<typeof loginSchema>) => Promise<void> }) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  })

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email, username or mobile</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com or 98xxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <a className="text-sm underline" href="/auth?action=forgot-password">
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full font-medium"
            style={{ background: colors.yellow, color: '#111' }}
          >
            Sign in
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        New here?{' '}
        <a className="underline" href="/auth?action=register&role=custom">
          Create a customer account
        </a>{' '}
        or{' '}
        <a className="underline" href="/auth?action=register&role=vendor">
          become a vendor
        </a>
        .
      </p>
    </Card>
  )
}

function VendorRegisterForm({
  onSubmit,
}: {
  onSubmit: (v: z.infer<typeof vendorRegisterSchema>) => Promise<void>
}) {
  const form = useForm<z.infer<typeof vendorRegisterSchema>>({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: { firstName: '', lastName: '', email: '', handle: '', password: '' },
  })

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="username or 98xxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full font-medium"
            style={{ background: colors.yellow, color: '#111' }}
          >
            Create vendor account
          </Button>
        </form>
      </Form>
      <p className="text-sm mt-3">
        Prefer a customer account?{' '}
        <a className="underline" href="/auth?action=register&role=custom">
          Register as customer
        </a>
      </p>
    </Card>
  )
}

function CustomRegisterForm({
  onSubmit,
}: {
  onSubmit: (v: z.infer<typeof customRegisterSchema>) => Promise<void>
}) {
  const form = useForm<z.infer<typeof customRegisterSchema>>({
    resolver: zodResolver(customRegisterSchema),
    defaultValues: { firstName: '', lastName: '', email: '', handle: '', password: '' },
  })

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="username or 98xxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full font-medium"
            style={{ background: colors.yellow, color: '#111' }}
          >
            Create customer account
          </Button>
        </form>
      </Form>
      <p className="text-sm mt-3">
        Want to list properties?{' '}
        <a className="underline" href="/auth?action=register&role=vendor">
          Become a vendor
        </a>
      </p>
    </Card>
  )
}

function ForgotForm({
  onSubmit,
}: {
  onSubmit: (v: z.infer<typeof forgotSchema>) => Promise<void>
}) {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  })
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full font-medium"
            style={{ background: colors.yellow, color: '#111' }}
          >
            Send reset link
          </Button>
        </form>
      </Form>
    </Card>
  )
}

function ResetForm({ onSubmit }: { onSubmit: (v: z.infer<typeof resetSchema>) => Promise<void> }) {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token: '', password: '', confirmPassword: '' },
  })
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset token</FormLabel>
                <FormControl>
                  <Input placeholder="Paste your token" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full font-medium"
            style={{ background: colors.yellow, color: '#111' }}
          >
            Reset password
          </Button>
        </form>
      </Form>
    </Card>
  )
}

function LogoutCard({ onSubmit }: { onSubmit: () => Promise<void> }) {
  return (
    <Card>
      <div className="space-y-4">
        <p>Are you sure you want to sign out?</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => history.back()}>
            Cancel
          </Button>
          <Button onClick={onSubmit} style={{ background: colors.yellow, color: '#111' }}>
            Sign out
          </Button>
        </div>
      </div>
    </Card>
  )
}

function Aside() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-lg font-semibold mb-1" style={{ color: colors.blue }}>
          Secure and simple
        </h3>
        <p className="text-sm" style={{ color: colors.grayText }}>
          Your data is protected with industry-standard security. Update your password anytime.
        </p>
      </Card>
      <Card>
        <h3 className="text-lg font-semibold mb-1" style={{ color: colors.blue }}>
          Vendor benefits
        </h3>
        <ul className="list-disc pl-5 text-sm" style={{ color: colors.grayText }}>
          <li>Verified listings and inquiries</li>
          <li>Easy property management</li>
          <li>No spam or fake emails allowed</li>
        </ul>
      </Card>
    </div>
  )
}
