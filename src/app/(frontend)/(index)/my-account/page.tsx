// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserRound,
  CreditCard,
  Save as SaveIcon,
  BadgeCheck,
  HelpCircle,
  Loader2,
  Trash2,
} from "lucide-react";

import { axios } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

type NavItem = { href: string; label: string; icon: any };

const navItems: NavItem[] = [
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/profile#billing", label: "Billing", icon: CreditCard },
  { href: "/profile#shipping", label: "Shipping", icon: CreditCard },
  { href: "/profile/products-saved", label: "Saved products", icon: SaveIcon },
  { href: "/profile#packages", label: "Subscriptions", icon: BadgeCheck },
  { href: "/profile#help", label: "Help", icon: HelpCircle },
];

// --- Types that match your extended schema (partial) ---
type Address = {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
  email?: string; // billing
};

type Product = {
  _id: string;
  title?: string;
  image?: string;
  price?: number;
};

type UserMe = {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
  billing?: Address;
  shipping?: Address;
  shippingSameAsBilling?: boolean;
  savedProducts?: Product[];
  package?: { _id: string; name: string; label: string } | null;
};

export default function ProfilePage() {
  const pathname = usePathname();

  // data state
  const [me, setMe] = useState<UserMe | null>(null);

  // forms
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    website: "",
    avatarUrl: "",
  });

  const [billing, setBilling] = useState<Address>({});
  const [shipping, setShipping] = useState<Address>({});
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);

  // ui state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<null | "profile" | "billing" | "shipping">(null);
  const [msg, setMsg] = useState<null | { type: "success" | "error"; text: string }>(null);
 

  // helpers
  const setAddr =
    (target: "billing" | "shipping") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (target === "billing") setBilling((p) => ({ ...p, [name]: value }));
      else setShipping((p) => ({ ...p, [name]: value }));
    };

  const activeClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(href);
    return `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;
  };

  // save handlers
  const saveProfile = async () => {
    setSaving("profile");
    setMsg(null);
    try {
      const { data } = await axios.put("/api/users/me", {
        ...profile,
      });
      setMe(data.user);
      setMsg({ type: "success", text: "Profile updated." });
    } catch (e: any) {
      setMsg({ type: "error", text: e?.response?.data?.error || "Failed to update profile." });
    } finally {
      setSaving(null);
    }
  };

  const saveBilling = async () => {
    setSaving("billing");
    setMsg(null);
    try {
      const { data } = await axios.put("/api/users/me", {
        billing: billing,
        // keep flag if they want shipping copied later
        shippingSameAsBilling,
      });
      setMe(data.user);
      setMsg({ type: "success", text: "Billing address updated." });
    } catch (e: any) {
      setMsg({ type: "error", text: e?.response?.data?.error || "Failed to update billing." });
    } finally {
      setSaving(null);
    }
  };

  const saveShipping = async () => {
    setSaving("shipping");
    setMsg(null);
    try {
      const body: any = { shipping };
      // If they checked "same as billing", let backend copy on save
      if (shippingSameAsBilling) body.shippingSameAsBilling = true;

      const { data } = await axios.put("/api/users/me", body);
      setMe(data.user);
      if (shippingSameAsBilling) {
        // sync local UI with server-copied values
        setShipping(data.user.shipping || {});
      }
      setMsg({ type: "success", text: "Shipping address updated." });
    } catch (e: any) {
      setMsg({ type: "error", text: e?.response?.data?.error || "Failed to update shipping." });
    } finally {
      setSaving(null);
    }
  };

  const removeSaved = async (productId: string) => {
    setMsg(null);
    try {
      const { data } = await axios.post("/api/users/me", {
        action: "removeSavedProduct",
        productId,
      });
      setMe((prev) => (prev ? { ...prev, savedProducts: data.savedProducts } : prev));
      setMsg({ type: "success", text: "Removed from saved products." });
    } catch (e: any) {
      setMsg({ type: "error", text: e?.response?.data?.error || "Could not remove product." });
    }
  };

  const isLoading = loading;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white shadow-sm border rounded-xl p-4 h-fit md:sticky md:top-20">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={activeClass(href)}>
                <Icon className="w-4 h-4 text-gray-500" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="md:col-span-3 bg-white shadow-sm border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            {isLoading && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading…
              </span>
            )}
          </div>
          <Separator className="mb-6" />

          {msg && (
            <Alert className="mb-6" variant={msg.type === "error" ? "destructive" : "default"}>
              <AlertTitle>{msg.type === "error" ? "Oops" : "Success"}</AlertTitle>
              <AlertDescription>{msg.text}</AlertDescription>
            </Alert>
          )}

          {/* ========== Profile (About) ========== */}
          <section id="profile" className="mb-10">
            <h2 className="text-lg font-medium text-gray-800">Your Information</h2>
            <Separator className="my-4" />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                  placeholder="First name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                  placeholder="Last name"
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile((p) => ({ ...p, avatarUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={saveProfile} disabled={saving === "profile"}>
                {saving === "profile" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </section>

          {/* ========== Billing ========== */}
          <section id="billing" className="mb-10">
            <h2 className="text-lg font-medium text-gray-800">Billing</h2>
            <Separator className="my-4" />

            <AddressForm address={billing} setAddress={setAddr("billing")} kind="billing" />

            <div className="mt-4">
              <Button onClick={saveBilling} disabled={saving === "billing"}>
                {saving === "billing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  "Save billing"
                )}
              </Button>
            </div>
          </section>

          {/* ========== Shipping ========== */}
          <section id="shipping" className="mb-10">
            <h2 className="text-lg font-medium text-gray-800">Shipping</h2>
            <Separator className="my-4" />

            <div className="mb-4">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={shippingSameAsBilling}
                  onChange={(e) => setShippingSameAsBilling(e.target.checked)}
                />
                Shipping same as billing
              </label>
            </div>

            {!shippingSameAsBilling && (
              <AddressForm address={shipping} setAddress={setAddr("shipping")} kind="shipping" />
            )}

            <div className="mt-4">
              <Button onClick={saveShipping} disabled={saving === "shipping"}>
                {saving === "shipping" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  "Save shipping"
                )}
              </Button>
            </div>
          </section>

          {/* ========== Saved Products ========== */}
          <section id="products-saved" className="mb-10">
            <h2 className="text-lg font-medium text-gray-800">Saved Products</h2>
            <Separator className="my-4" />

            {me?.savedProducts && me.savedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {me.savedProducts.map((p) => (
                  <Card key={p._id} className="p-3 flex flex-col">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-50 mb-3">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.title || "Product"} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium line-clamp-2">{p.title || "Untitled product"}</div>
                      {typeof p.price === "number" && (
                        <div className="text-sm text-gray-600 mt-1">₹{p.price}</div>
                      )}
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => removeSaved(p._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                No saved products yet. Explore the{" "}
                <Link href="/" className="underline underline-offset-4">
                  catalog
                </Link>
                .
              </p>
            )}
          </section>

          {/* ========== Subscriptions ========== */}
          <section id="packages" className="mb-10">
            <h2 className="text-lg font-medium text-gray-800">Subscriptions</h2>
            <Separator className="my-4" />

            <div className="text-sm text-gray-700">
              {me?.package ? (
                <>
                  <div>
                    <span className="font-medium">{me.package.label}</span>{" "}
                    <span className="text-gray-500">({me.package.name})</span>
                  </div>
                  <div className="mt-2">
                    <Link href="/pricing" className="underline underline-offset-4 text-blue-700">
                      Change plan
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div>You’re on the free plan.</div>
                  <div className="mt-2">
                    <Link href="/pricing" className="underline underline-offset-4 text-blue-700">
                      Upgrade now
                    </Link>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ========== Help ========== */}
          <section id="help" className="mb-2">
            <h2 className="text-lg font-medium text-gray-800">Help</h2>
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">
              Need assistance? Visit{" "}
              <Link href="/help" className="underline underline-offset-4">
                Help Center
              </Link>{" "}
              or email support.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

/** Address form fragment */
function AddressForm({
  address,
  setAddress,
  kind,
}: {
  address: Address;
  setAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  kind: "billing" | "shipping";
}) {
  const prefix = (s: string) => `${kind}-${s}`;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Field id={prefix("firstName")} label="First name" name="firstName" value={address.firstName || ""} onChange={setAddress} />
      <Field id={prefix("lastName")} label="Last name" name="lastName" value={address.lastName || ""} onChange={setAddress} />
      <Field id={prefix("company")} label="Company" name="company" value={address.company || ""} onChange={setAddress} />
      <Field id={prefix("phone")} label="Phone" name="phone" value={address.phone || ""} onChange={setAddress} />
      <Field id={prefix("email")} label="Email" name="email" value={address.email || ""} onChange={setAddress} />
      <Field id={prefix("country")} label="Country (ISO-2)" name="country" value={address.country || ""} onChange={setAddress} />
      <Field id={prefix("state")} label="State/Region" name="state" value={address.state || ""} onChange={setAddress} />
      <Field id={prefix("city")} label="City" name="city" value={address.city || ""} onChange={setAddress} />
      <Field id={prefix("postcode")} label="Postcode" name="postcode" value={address.postcode || ""} onChange={setAddress} />
      <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
        <Field id={prefix("address1")} label="Address line 1" name="address1" value={address.address1 || ""} onChange={setAddress} />
        <Field id={prefix("address2")} label="Address line 2" name="address2" value={address.address2 || ""} onChange={setAddress} />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  name,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} value={value} onChange={onChange} />
    </div>
  );
}
