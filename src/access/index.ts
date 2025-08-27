import { Access, PayloadRequest } from 'payload';

type Role = "customer" | "admin" | "vendor";

export const hasRole = (req: PayloadRequest, role: Role): boolean => {
  const roles = req?.user?.roles;
  if (!Array.isArray(roles)) return false;
  return roles.some(r => String(r).toLowerCase() === role);
};

export const isAdmin: Access = ({ req }: { req: PayloadRequest }) => {
  return hasRole(req, "admin");
};

export const isVendor: Access = ({ req }: { req: PayloadRequest }) => {
  return hasRole(req, "vendor");
};

export const isCustomer: Access = ({ req }: { req: PayloadRequest }) => {
  return hasRole(req, "customer");
};

export const isLoggedIn: Access = ({ req }: { req: PayloadRequest }) => {
  return !!req.user;
};

export const canReadOwnBooking: Access = async ({ req }) => {
  const userId = req?.user?.id;
  if (!userId) return false;
  if (hasRole(req, "admin")) return true;

  return {
    or: [
      { user: { equals: userId } },
      { vendor: { equals: userId } },
    ],
  };
};

export const canUpdateBooking: Access = async ({ req }) => {
  const userId = req?.user?.id;
  if (!userId) return false;
  if (hasRole(req, "admin")) return true;

  return {
    vendor: {
      equals: userId,
    },
  };
};


export const isPlatformAdmin = ({ req }: { req: PayloadRequest }) =>
  Boolean(req.user?.roles?.includes('admin'))

export const userTenantIds = (req: PayloadRequest): string[] =>
  Array.isArray(req.user?.memberships)
    ? req.user.memberships.map((m: any) => String(m.tenant))
    : []

export const isTenantMember = (req: PayloadRequest, tenantId: string) =>
  userTenantIds(req).includes(String(tenantId))

export const hasTenantRole = (req: PayloadRequest, tenantId: string, role: 'tenant_admin' | 'vendor' | 'customer') => {
  const m = (req.user?.memberships || []).find((x: any) => String(x.tenant) === String(tenantId))
  return m?.roles?.includes(role)
}
