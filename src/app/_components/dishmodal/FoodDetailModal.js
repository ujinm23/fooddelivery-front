"use client";
import { useState } from "react";

export default function FoodDetailModal({ dish, onClose, onAddToCart }) {
  const [count, setCount] = useState(1);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[826px] h-[412px] rounded-2xl p-6 gap-6 justify-between relative flex shadow-xl">
        <div>
          <img
            src={dish.image}
            className="w-[377px] h-[364px] rounded-xl object-cover mb-4"
            alt=""
          />
        </div>

        <div className="w-[377px] h-[364px]">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-600 border border-[#E4E4E7] w-[36px] h-[36px] cursor-pointer rounded-full text-lg"
            >
              ✕
            </button>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-3xl text-[#EF4444]">
              {dish.foodName}
            </h2>
          </div>

          <p className="text-sm text-gray-600 my-2 line-clamp-2">
            {dish.ingredients}
          </p>

          <div className="flex justify-between items-center mt-30">
            <div>
              <p className="text-base">Total price</p>
              <p className="font-bold text-2xl">${dish.price * count}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
                className="w-11 h-11 rounded-full bg-white border border-[#E4E4E7]"
              >
                -
              </button>

              <span className="font-semibold">{count}</span>

              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="w-11 h-11 rounded-full bg-white border border-[#09090B]"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(dish, count);
              onClose();
            }}
            className="w-full h-11 bg-[#404040] text-white rounded-full cursor-pointer mt-6"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
