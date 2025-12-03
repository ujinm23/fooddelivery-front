"use client";

import DeleteIcon from "@/app/_icons/DeleteIcon";
import { useState } from "react";

export default function EditDishModal({
  onClose,
  dish,
  onSave,
  onDeleteDish,
  categories,
}) {
  const [name, setName] = useState(dish.foodName);
  const [price, setPrice] = useState(dish.price);
  const [ingredients, setIngredients] = useState(dish.ingredients);
  const [image, setImage] = useState(dish.image);
  const [category, setCategory] = useState(dish.category);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-[472px] rounded-xl p-6 shadow-xl relative">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-lg"
        >
          ✕
        </button>

        <h1 className="text-xl font-semibold mb-5">Dish info</h1>

        <div className="flex justify-between ">
          <label className="text-sm text-gray-600 w-[100px] flex ">
            Dish name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[288px] border rounded-lg p-3 text-sm mb-4"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className="text-sm text-gray-600 block mb-1">
            Dish category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[288px] border rounded-lg p-3 text-sm"
          >
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <label className="text-sm w-[206px] text-gray-600 block">
            Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-lg p-3 h-[72px] text-sm mb-4 resize-none"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-sm  text-gray-600 block">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=" w-[288px] border rounded-lg p-3 text-sm mb-4"
          />
        </div>

        <div className="flex justify-between">
          <label className="text-sm text-gray-600 block">Image</label>
          <div className="relative mt-2 mb-4 w-[288px]">
            {image ? (
              <>
                <img
                  src={image}
                  alt="Dish"
                  className="rounded-lg w-full h-[120px] object-cover"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </>
            ) : (
              <div className="h-[120px] border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>
        </div>

        {/* DELETE + SAVE */}
        <div className="flex justify-between">
          <button
            onClick={() => onDeleteDish(dish.catIndex, dish.dishIndex)}
            className="w-12 h-10 border cursor-pointer  border-[#EF4444] rounded-md text-[#EF4444] flex justify-center items-center"
          >
            <DeleteIcon />
          </button>

          <button
            onClick={() =>
              onSave({
                ...dish,
                foodName: name,
                price,
                ingredients,
                image,
                category,
              })
            }
            className="w-[126px] h-10 bg-black text-white cursor-pointer rounded-md"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
