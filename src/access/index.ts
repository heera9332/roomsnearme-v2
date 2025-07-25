import { Access, PayloadRequest } from 'payload';

// Helper: check if user has a specific role
const hasRole = (req: PayloadRequest, role: "customer" | "admin" | "vendor") =>
  Array.isArray(req?.user?.roles) && req.user.roles.includes(role);

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

// User can read if they are involved in the booking (as customer or vendor or admin)
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

// User can update if they're admin or the vendor of the booking
export const canUpdateBooking: Access = async ({ req }) => {
  const userId = req.user?.id;

  if (hasRole(req, "admin")) return true;

  return {
    vendor: {
      equals: userId,
    },
  };
};
