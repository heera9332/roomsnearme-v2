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
