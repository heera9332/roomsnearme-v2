'use client'
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!items.length)
    return (
      <div className="max-w-7xl mx-auto mt-16 p-6">
        <h2 className="text-2xl font-bold">Cart</h2>
        <p className="text-gray-700 my-4">Your cart is empty.</p>
        <Link href="/rooms" className="text-blue-600 underline">Continue Shopping</Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <table className="w-full mb-4 border">
        <thead className="">
          <tr>
            <th className="p-2 bg-gray-50">Room</th>
            <th className="p-2 bg-gray-50">Image</th>
            <th className="p-2 bg-gray-50">Quantity</th>
            <th className="p-2 bg-gray-50">Price</th>
            <th className="p-2 bg-gray-50">Total</th>
            <th className="p-2 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t">
              <td className="p-2">
                <Link href={`/rooms/${item.id}`} className="text-blue-700">{item.title}</Link>
              </td>
              <td className="p-2">
                <Image src={item.featuredImage?.url || "https://placehold.co/80"} alt={item.title} width={80} height={60} />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="w-16 border rounded"
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                />
              </td>
              <td className="p-2">₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
              <td className="p-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center my-4">
        <span className="text-xl font-bold">Total: ₹{total}</span>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            // You'd handle payment/order API here!
            alert("Order placed successfully!");
            clearCart();
            router.push("/rooms");
          }}
        >Process to checkout</button>
      </div>
      <button
        className="text-gray-600 hover:underline"
        onClick={() => clearCart()}
      >Clear Cart</button>
    </div>
  )
}
