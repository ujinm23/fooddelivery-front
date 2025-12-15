"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import FoodDetailModal from "../_components/dishmodal/FoodDetailModal";
import Toast from "../_components/Toast/Toast";
import CartDrawer from "../_components/CardDrawer/CartDrawer";
import SuccessOrderModal from "../_components/SuccessOrderModal/SuccessOrderModal";
import { useRouter } from "next/navigation";

export default function MainPage({ isCartOpen, openCart, closeCart }) {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orders, setOrders] = useState([]);

  const shippingFee = 0.99;
  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://foodapp-back-k58d.onrender.com/api/categories"
      );
      setCategories(res.data);
    } catch (err) {
      console.log("Category load error:", err);
    }
  };

  useEffect(() => {
    getCategories();
    fetchOrders();
  }, []);

  const clearCart = () => {
    console.log("CLEAR CART CALLED");
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleAddToCart = (dish, count) => {
    const dishId = dish._id;

    setSelectedDish(null);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === dishId);

      if (existing) {
        return prev.map((item) =>
          item.id === dishId
            ? { ...item, quantity: item.quantity + count }
            : item
        );
      }

      return [
        ...prev,
        {
          id: dishId,
          name: dish.foodName || dish.name,
          price: dish.price,
          image: dish.image,
          description: dish.ingredients || "",
          quantity: count,
        },
      ];
    });

    openCart();
  };

  const handleUpdateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!user) return;
    if (cart.length === 0) return;

    try {
      await axios.post("https://foodapp-back-k58d.onrender.com/api/orders", {
        items: cart,
        totalPrice: itemsTotal + shippingFee,
        status: "pending",
      });

      setCart([]);

      await fetchOrders();

      setShowSuccess(true);
    } catch (err) {
      console.log("Checkout error:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.data);
    } catch (err) {
      console.log("Order fetch error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      {selectedDish && (
        <FoodDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <div className="w-full h-[570px] flex justify-center  bg-[#18181B]">
        <div className="w-full max-w-[1440px] h-full">
          <img
            src="/BG.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-[#18181B] flex justify-center">
        <div className="w-full max-w-[1440px] py-[88px] px-10">
          {categories.map((category, index) => (
            <div key={index} className="mb-20">
              <h2 className="text-white font-semibold text-3xl mb-10">
                {category.categoryName}
              </h2>

              <div className="grid grid-cols-3 gap-6">
                {category.dishes?.map((dish, dIndex) => (
                  <div
                    key={dIndex}
                    className="relative rounded-xl bg-white p-3 shadow-lg"
                  >
                    <img
                      src={dish.image}
                      className="w-full h-[210px] rounded-lg object-cover"
                      alt=""
                    />

                    <button
                      onClick={() => setSelectedDish(dish)}
                      className="absolute top-44 right-6 bg-white text-red-500 
                                 border cursor-pointer w-8 h-8 rounded-full 
                                 flex items-center justify-center 
                                 hover:bg-red-500 hover:text-white transition"
                    >
                      +
                    </button>

                    <div className="flex justify-between mt-2">
                      <p className="text-red-500 font-semibold mb-2">
                        {dish.foodName}
                      </p>
                      <p className="font-bold">${dish.price}</p>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-3 mb-2">
                      {dish.ingredients}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {showToast && <Toast message="Food is being added to the cart!" />}
      </div>
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cart}
        onClose={closeCart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        orders={orders}
        onClearCart={clearCart}
      />

      {showSuccess && (
        <SuccessOrderModal
          onClose={() => {
            setShowSuccess(false);
            setCart([]);
            localStorage.setItem("cart", "[]");

            setIsCartOpen(false);
            localStorage.setItem("isCartOpen", "false");

            router.push("/");
          }}
        />
      )}
    </div>
  );
}
