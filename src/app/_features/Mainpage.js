"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FoodDetailModal from "../_components/dishmodal/FoodDetailModal";
import Toast from "../_components/Toast/Toast";
import CartDrawer from "../_components/CardDrawer/CartDrawer";

export default function MainPage() {
  const [categories, setCategories] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:999/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log("Error loading categories:", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddToCart = (dish, count) => {
  console.log("Cart ➕", dish.name, "qty:", count);

  setSelectedDish(null);

  
  setShowToast(true);
  setTimeout(() => {
    setShowToast(false);
  }, 2000);


  const newItem = {
    id: dish.id,
    name: dish.name,
    price: dish.price,
    image: dish.image,
    quantity: count,
  };

  setCart((prev) => [...prev, newItem]);

 
  setIsCartOpen(true);
};

const handleUpdateQty = (id, newQty) => {
  if (newQty < 1) return;
  setCart(prev =>
    prev.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    )
  );
};

const handleRemoveItem = (id) => {
  setCart(prev => prev.filter(item => item.id !== id));
};


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
                                 border border-red-500 w-8 h-8 rounded-full 
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
      <button
        onClick={handleAddToCart}
        className="bg-purple-600 text-white px-4 py-2 rounded-md"
      >
        Add to Cart
      </button>

      {showToast && <Toast message="Food is being added to the cart!" />}
    </div>
      <CartDrawer 
         isOpen={isCartOpen}
  cartItems={cart}
  onClose={() => setIsCartOpen(false)}
  onUpdateQty={handleUpdateQty}
  onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
