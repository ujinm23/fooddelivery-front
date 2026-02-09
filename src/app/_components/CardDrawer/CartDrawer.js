"use client";
import { useState, useEffect, useCallback } from "react";
import OrderDetail from "@/app/_icons/Orderdetail";
import CartOrder from "./CartOrder";
import toast from "react-hot-toast";
import { orderApi } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "../LoginModal/LoginModal";
import { Empty } from "../empty";

export default function CartDrawer({
  isOpen,
  onClose,
  orders: externalOrders,
}) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();
  const { user, getUserId, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("cart");
  // Initialize from prop, but state will be managed independently
  const [orders, setOrders] = useState(() => externalOrders || []);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const userId = getUserId();
      if (!userId) return;
      const ordersData = await orderApi.getOrders(userId);
      setOrders(ordersData);
    } catch (err) {
      console.error("Orders fetch error:", err);
      toast.error("Захиалга авахад алдаа гарлаа");
    }
  }, [getUserId]);

  useEffect(() => {
    const loadOrders = async () => {
      if (isAuthenticated() && activeTab === "orders") {
        await fetchOrders();
      }
    };
    loadOrders();
  }, [user, activeTab, isAuthenticated, fetchOrders]);

  const shippingFee = 0.99;
  const itemsTotal = getTotalPrice();
  const totalPrice = (itemsTotal + shippingFee).toFixed(2);

  const handleCheckout = async () => {
    if (isProcessing) {
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    const userId = getUserId();
    if (!userId) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Хүргэлтийн хаяг оруулна уу");
      return;
    }

    setIsProcessing(true);

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
      clearCart();
      setDeliveryAddress(""); // Address цэвэрлэх
      setActiveTab("orders");

      toast.success(result.message || "Захиалга амжилттай үүслээ!");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.message || "Захиалга үүсгэхэд алдаа гарлаа");
    } finally {
      setIsProcessing(false);
    }
  };

  // Hydration error-ийг засах - зөвхөн client дээр render хийх
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed p-3 sm:p-4 md:p-7 top-0 right-0 h-full w-full sm:w-[90%] sm:max-w-[500px] lg:w-[535px] lg:max-w-[535px] rounded-3xl bg-[#404040]  z-50 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col h-full gap-1">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <OrderDetail />
            <h2 className="text-lg sm:text-xl text-white font-semibold p-2 sm:p-3">
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
                  : "text-[#404040]"
              }`}
            >
              Cart
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-4 py-2 rounded-full ${
                activeTab === "orders"
                  ? "bg-[#EF4444] text-white"
                  : "text-[#404040]"
              }`}
            >
              Order
            </button>
          </div>
        </div>

        {activeTab === "cart" && (
          <>
            <div className="bg-white flex-1 h-[200px] p-1 sm:p-4 md:p-5 rounded-2xl flex flex-col mb-1 overflow-hidden min-h-0">
              <h3 className="font-semibold text-[#404040] mb-3 sm:mb-4 text-sm sm:text-base flex-shrink-0">
                My cart
              </h3>

              <div className="flex-1 overflow-y-auto rounded-2xl min-h-0 pr-1">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center text-center justify-center h-full text-gray-500 py-6">
                    <Empty
                      title="Your cart is empty"
                      description="Hungry? 🍔 Add some delicious dishes to your cart and satisfy your cravings!"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-2 pb-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex gap-2 md:gap-3 flex-1 min-w-0">
                          <img
                            src={item.image}
                            className="w-10 h-10 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                            alt={item.name || item.foodName || "Food item"}
                          />
                          <div className="flex flex-col justify-between flex-1 min-w-0">
                            <p className="text-[#EF4444] font-medium text-sm md:text-base truncate">
                              {item.name || item.foodName || "No name"}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {item.ingredients ||
                                item.description ||
                                "No description"}
                            </p>
                            <div className="flex items-center gap-2 md:gap-3 mt-1">
                              <div className="flex">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="border w-6 h-6 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
                                >
                                  −
                                </button>
                                <span className="text-sm w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="border w-6 h-6 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 border border-red-400 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer hover:bg-red-50"
                          >
                            ✕
                          </button>

                          <span className="font-semibold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <p className="text-[#71717A] text-sm sm:text-base font-semibold mb-1">
                  Delivery location
                </p>
                <input
                  placeholder="Please share your complete address"
                  className="w-full h-14 sm:h-16 border rounded-xl text-xs sm:text-sm p-2 sm:p-3"
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-1 sm:p-4 md:p-5 flex-shrink-0">
              <div className=" border-gray-200 pt-1">
                <p className="font-medium text-[#404040] mb-1 text-xs sm:text-sm">
                  Payment info
                </p>
                <div className="flex justify-between text-xs mb-1">
                  <span>Items</span>
                  <span>${itemsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Shipping</span>
                  <span>${shippingFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-sm sm:text-base mb-1">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-2 sm:py-3 rounded-full text-sm sm:text-base cursor-pointer transition-colors ${
                    isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#EF4444] text-white hover:bg-[#dc2626]"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            {!isAuthenticated() ? (
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

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
