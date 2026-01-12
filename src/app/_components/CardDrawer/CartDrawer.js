"use client";
import { useState, useEffect } from "react";
import OrderDetail from "@/app/_icons/Orderdetail";
import CartOrder from "./CartOrder";
import toast from "react-hot-toast";
import { orderApi } from "@/lib/api";

export default function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  const [activeTab, setActiveTab] = useState("cart");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = user?._id || user?.id;
      const ordersData = await orderApi.getOrders(userId);
      setOrders(ordersData);
    } catch (err) {
      console.error("Orders fetch error:", err);
      toast.error("Захиалга авахад алдаа гарлаа");
    }
  };

  useEffect(() => {
    if (user && activeTab === "orders") {
      fetchOrders();
    }
  }, [user, activeTab]);

  const shippingFee = 0.99;
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalPrice = (itemsTotal + shippingFee).toFixed(2);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    if (!user) {
      toast.error("Захиалга хийхийн тулд нэвтэрнэ үү");
      return;
    }

    const userId = user._id || user.id;
    if (!userId) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Хүргэлтийн хаяг оруулна уу");
      return;
    }

    const orderData = {
      user: userId,
      foodOrderItems: cartItems.map((item) => ({
        food: item.id,
        quantity: item.quantity,
      })),
      totalPrice: Number(totalPrice),
      address: deliveryAddress.trim(),
    };

    try {
      const result = await orderApi.createOrder(orderData);

      await fetchOrders();
      onClearCart();
      setDeliveryAddress(""); // Address цэвэрлэх
      setActiveTab("orders");

      toast.success(result.message || "Захиалга амжилттай үүслээ!");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.message || "Захиалга үүсгэхэд алдаа гарлаа");
    }
  };

  return (
    <div
      className={`fixed p-7 top-0 right-0 h-full w-[535px] rounded-3xl bg-[#3A3A3C]/80 backdrop-blur-sm z-50 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col h-full gap-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <OrderDetail />
            <h2 className="text-xl text-white font-semibold p-3">
              Order detail
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white w-9 h-9 border rounded-full text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center rounded-full">
          <div className="flex bg-[#F4F4F5] w-full rounded-full p-1">
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 px-4 py-2 rounded-full ${
                activeTab === "cart"
                  ? "bg-[#EF4444] text-white"
                  : "text-[#18181B]"
              }`}
            >
              Cart
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-4 py-2 rounded-full ${
                activeTab === "orders"
                  ? "bg-[#EF4444] text-white"
                  : "text-[#18181B]"
              }`}
            >
              Order
            </button>
          </div>
        </div>

        {activeTab === "cart" && (
          <>
            <div className="bg-white flex-1 p-5 rounded-2xl flex flex-col mb-2 overflow-hidden">
              <h3 className="font-semibold text-[#18181B] mb-4">My cart</h3>

              <div className="flex-1 overflow-y-auto rounded-2xl  h-[532px] pr-1">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start mb-4"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        className="w-30 h-30 object-cover rounded-lg"
                        alt=""
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-[#EF4444] font-medium">
                          {item.foodName || item.name || "No name"}
                        </p>
                        <p className="text-xs text-gray-500 w-[150px] line-clamp-2">
                          {item.ingredients ||
                            item.description ||
                            "No description"}
                        </p>
                        <div className="flex items-center gap-3 mt-1 justify-between">
                          <div className="flex mb-2">
                            <button
                              onClick={() =>
                                onUpdateQty(item.id, item.quantity - 1)
                              }
                              className="border w-6 h-6 rounded-full flex justify-center items-center"
                            >
                              −
                            </button>
                            <span className="text-sm w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQty(item.id, item.quantity + 1)
                              }
                              className="border w-6 h-6 rounded-full flex justify-center items-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 border border-red-400 rounded-full w-6 h-6 flex justify-center items-center"
                      >
                        ✕
                      </button>

                      <span className="font-semibold text-sm mt-14">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[#71717A] text-xl font-semibold mb-2 mt-2">
                  Delivery location
                </p>
                <input
                  placeholder="Please share your complete address"
                  className="w-full h-20 border rounded-xl text-sm p-3"
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5">
              <p className="font-medium text-[#18181B] mb-3">Payment info</p>
              <div className="flex justify-between text-sm mb-2">
                <span>Items</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>${shippingFee}</span>
              </div>
              <hr className="my-4 border-dashed" />
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#EF4444] text-white rounded-full text-lg"
              >
                Checkout
              </button>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            {!user ? (
              <div className="bg-white flex-1 p-6 rounded-2xl flex flex-col items-center justify-center">
                <p className="text-gray-500 text-center mb-4">
                  Захиалгын түүх харахын тулд нэвтэрнэ үү
                </p>
                <button
                  onClick={() => {
                    setActiveTab("cart");
                    window.location.href = "/login";
                  }}
                  className="px-6 py-2 bg-[#EF4444] text-white rounded-full hover:bg-[#dc2626] transition-colors"
                >
                  Login
                </button>
              </div>
            ) : (
              <CartOrder orders={orders} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
