'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Action = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'logout'
type Role = 'vendor' | 'customer'

export function SmallSwitches({ action, role }: { action: Action; role: Role }) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const redirectTo = sp.get('redirect_to') || '/my-account'

  function setParam(next: Partial<{ action: Action; role: Role }>) {
    const params = new URLSearchParams(sp.toString())
    if (next.action) params.set('action', next.action)
    if (next.role) params.set('role', next.role)
    if (!params.get('redirect_to')) params.set('redirect_to', redirectTo)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      {/* Action switches */}
      <div
        className="inline-flex rounded-md border bg-white p-1 shadow-sm"
        role="tablist"
        aria-label="Auth action"
      >
        <TabButton isActive={action === 'login'} onClick={() => setParam({ action: 'login' })}>
          Login
        </TabButton>
        <TabButton
          isActive={action === 'register'}
          onClick={() => setParam({ action: 'register' })}
        >
          Register
        </TabButton>
        <TabButton
          isActive={action === 'forgot-password'}
          onClick={() => setParam({ action: 'forgot-password' })}
        >
          Forgot
        </TabButton>
        <TabButton
          isActive={action === 'reset-password'}
          onClick={() => setParam({ action: 'reset-password' })}
        >
          Reset
        </TabButton>
        <TabButton isActive={action === 'logout'} onClick={() => setParam({ action: 'logout' })}>
          Logout
        </TabButton>
      </div>

      {/* Role switches (only meaningful for register) */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Role:</span>
        <div
          className="inline-flex rounded-md border bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="Account role"
        >
          <TabButton
            isActive={role === 'custom'}
            onClick={() =>
              setParam({ role: 'custom', action: action === 'logout' ? 'register' : action })
            }
          >
            Customer
          </TabButton>
          <TabButton
            isActive={role === 'vendor'}
            onClick={() =>
              setParam({ role: 'vendor', action: action === 'logout' ? 'register' : action })
            }
          >
            Vendor
          </TabButton>
        </div>
      </div>

      {/* Quick links underneath */}
      <div className="flex flex-wrap gap-3 text-sm">
        <a
          className="underline"
          href={`${pathname}?action=login&redirect_to=${encodeURIComponent(redirectTo)}`}
        >
          Go to Login
        </a>
        <a
          className="underline"
          href={`${pathname}?action=register&role=custom&redirect_to=${encodeURIComponent(redirectTo)}`}
        >
          Create Customer
        </a>
        <a
          className="underline"
          href={`${pathname}?action=register&role=vendor&redirect_to=${encodeURIComponent(redirectTo)}`}
        >
          Create Vendor
        </a>
        <a
          className="underline"
          href={`${pathname}?action=forgot-password&redirect_to=${encodeURIComponent(redirectTo)}`}
        >
          Forgot Password
        </a>
      </div>
    </div>
  )
}

function TabButton({
  isActive,
  onClick,
  children,
}: React.PropsWithChildren<{
  isActive: boolean
  onClick: () => void
}>) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        'h-9 rounded-md px-3 text-sm',
        isActive
          ? 'bg-[#feba02] text-black hover:bg-[#f1b301]' // booking-like yellow active
          : 'hover:bg-muted',
      )}
      aria-pressed={isActive}
    >
      {children}
    </Button>
  )
}
