import { Access, PayloadRequest } from 'payload';

export const isAdmin: Access = ({ req }: { req: PayloadRequest }) => {
  return req?.user && req?.user?.role === 'admin';
};

export const isVendor: Access = ({ req }: { req: PayloadRequest }) => {
  return req?.user && req?.user?.role === 'vendor';
};

export const isCustomer: Access = ({ req }: { req: PayloadRequest }) => {
  return req?.user && req?.user?.role === 'customer';
};

export const isLoggedIn: Access = ({ req }: { req: PayloadRequest }) => {
  return !!req.user;
};

// User can read if they are involved in the booking (as customer or vendor)
export const canReadOwnBooking: Access = async ({ req }) => {
  const userId = req?.user?.id;
  const role = req?.user?.role;

  if (!userId) return false;
  if (role === 'admin') return true;

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
  const role = req.user?.role;

  if (role === 'admin') return true;

  return {
    vendor: {
      equals: userId,
    },
  };
};
