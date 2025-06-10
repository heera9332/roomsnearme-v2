'use client'

import "./page.css";
import { useCartStore } from "@/store/cart-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";

const emptyBilling = {
  first_name: "",
  last_name: "",
  company: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  email: "",
  phone: "",
};
const emptyShipping = {
  first_name: "",
  last_name: "",
  company: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  // Main email, name, role for the user
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // Address info
  const [billing, setBilling] = useState({ ...emptyBilling });
  const [shipping, setShipping] = useState({ ...emptyShipping });
  const [shippingSame, setShippingSame] = useState(true);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleBillingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  }

  function handleShippingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  }

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();

    // If shippingSame, copy billing to shipping
    const shippingData = shippingSame ? { ...billing } : shipping;

    // Compose order data
    const order = {
      email,
      name,
      username,
      billing,
      shipping: shippingData,
      cart: items,
      total,
    };

    // For demo, just show order object
    alert("Order placed!\n" + JSON.stringify(order, null, 2));
    clearCart();
  }

  return (
    <div className="max-w-7xl mx-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: User, billing, shipping */}
      <form onSubmit={handleOrder} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-2">Checkout</h2>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="username">Mobile Number</Label>
            <Input name="setUsername" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Mobile number" />
          </div>
        </div>

        <fieldset className="border rounded p-4">
          <legend className="font-semibold px-1">Billing Address</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>First Name</Label>
              <Input name="first_name" value={billing.first_name} onChange={handleBillingChange} required />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input name="last_name" value={billing.last_name} onChange={handleBillingChange} required />
            </div>
            <div>
              <Label>Company</Label>
              <Input name="company" value={billing.company} onChange={handleBillingChange} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" value={billing.phone} onChange={handleBillingChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Address 1</Label>
              <Input name="address_1" value={billing.address_1} onChange={handleBillingChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Address 2</Label>
              <Input name="address_2" value={billing.address_2} onChange={handleBillingChange} />
            </div>
            <div>
              <Label>City</Label>
              <Input name="city" value={billing.city} onChange={handleBillingChange} required />
            </div>
            <div>
              <Label>State</Label>
              <Input name="state" value={billing.state} onChange={handleBillingChange} required />
            </div>
            <div>
              <Label>Postcode</Label>
              <Input name="postcode" value={billing.postcode} onChange={handleBillingChange} required />
            </div>
            <div>
              <Label>Country</Label>
              <Input name="country" value={billing.country} onChange={handleBillingChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Email</Label>
              <Input name="email" type="email" value={billing.email} onChange={handleBillingChange} required />
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-2">
          <Checkbox id="shipping-same" checked={shippingSame} onCheckedChange={v => setShippingSame(!!v)} />
          <Label htmlFor="shipping-same">Shipping address same as billing</Label>
        </div>

        {!shippingSame && (
          <fieldset className="border rounded p-4">
            <legend className="font-semibold px-1">Shipping Address</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>First Name</Label>
                <Input name="first_name" value={shipping.first_name} onChange={handleShippingChange} required />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input name="last_name" value={shipping.last_name} onChange={handleShippingChange} required />
              </div>
              <div>
                <Label>Company</Label>
                <Input name="company" value={shipping.company} onChange={handleShippingChange} />
              </div>
              <div className="md:col-span-2">
                <Label>Address 1</Label>
                <Input name="address_1" value={shipping.address_1} onChange={handleShippingChange} required />
              </div>
              <div className="md:col-span-2">
                <Label>Address 2</Label>
                <Input name="address_2" value={shipping.address_2} onChange={handleShippingChange} />
              </div>
              <div>
                <Label>City</Label>
                <Input name="city" value={shipping.city} onChange={handleShippingChange} required />
              </div>
              <div>
                <Label>State</Label>
                <Input name="state" value={shipping.state} onChange={handleShippingChange} required />
              </div>
              <div>
                <Label>Postcode</Label>
                <Input name="postcode" value={shipping.postcode} onChange={handleShippingChange} required />
              </div>
              <div>
                <Label>Country</Label>
                <Input name="country" value={shipping.country} onChange={handleShippingChange} required />
              </div>
            </div>
          </fieldset>
        )}

        <Button type="submit" className="w-full mt-4 text-lg">Place Order</Button>
      </form>

      {/* Right: Order summary */}
      <div>
        <div className="border rounded-lg shadow-sm p-6 bg-gray-50 sticky top-[80px]">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.length === 0 && (
              <div className="text-gray-500">Cart is empty.</div>
            )}
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <div>
                  <Image
                    src={item.featuredImage?.url || "https://placehold.co/80"}
                    alt={item.title}
                    width={80}
                    height={60}
                    className="rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </div>
                  {item.checkInDate && item.checkOutDate && (
                    <div className="text-xs text-gray-400">
                      {format(new Date(item.checkInDate), "MMM dd, yyyy")} – {format(new Date(item.checkOutDate), "MMM dd, yyyy")}
                    </div>
                  )}
                </div>
                <div className="font-bold">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
