"use client";

import { useEffect, useState } from "react";
import Avatar from "@/app/_icons/Avatar";
import CarBlack from "@/app/_icons/Car";
import CompanyNew from "@/app/_icons/CompanyNew";
import HutIcon from "@/app/_icons/HutIcon";
import Plus from "@/app/_icons/Plus";
import Sqr from "@/app/_icons/squer";
import DishModal from "../dishmodal/DishModal";
import InfoIconPencil from "@/app/_icons/InfoIcon";
import EditDishModal from "../dishmodal/EdithDishModel";
import axios from "axios";

export default function Order() {
  const [showDishModal, setShowDishModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [showAllDishes, setShowAllDishes] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const [newCategories, setNewCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:999/api/categories");
      setNewCategories(res.data);
    } catch (err) {
      console.log("Error loading categories:", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const res = await axios.post("http://localhost:999/api/categories", {
      categoryName: newCategory.trim(),
    });

    const createdCategory = res.data.data; // ← энд ID-тай зөв объект гарч ирнэ!

    setNewCategories([...newCategories, createdCategory]);
    setNewCategory("");
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = async (index) => {
    const categoryId = newCategories[index]._id;
    console.log("Deleting category:", categoryId);

    try {
      const res = await axios.delete(
        `http://localhost:999/api/categories/${categoryId}`
      );
      console.log("DELETE SUCCESS:", res.data);

      const updated = newCategories.filter((_, i) => i !== index);
      setNewCategories(updated);

      if (activeCategoryIndex === index) setActiveCategoryIndex(null);
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err);
    }
  };

  const handleAddDish = async (newDish) => {
    if (activeCategoryIndex === null) return;

    try {
      const categoryId = newCategories[activeCategoryIndex]._id;

      const dishRes = await axios.post("http://localhost:999/api/foods", {
        foodName: newDish.name,
        price: newDish.price,
        ingredients: newDish.ingredients,
        image: newDish.image,
        category: categoryId,
      });

      const createdDish = dishRes.data.data;
      const updated = [...newCategories];
      updated[activeCategoryIndex].dishes = [
        ...(updated[activeCategoryIndex].dishes || []),
        createdDish,
      ];

      setNewCategories(updated);
      setShowDishModal(false);
    } catch (err) {
      console.log("Dish add error:", err.response?.data || err);
    }
  };

  return (
    <>
      {showEditModal && selectedDish && (
        <EditDishModal
          onClose={() => setShowEditModal(false)}
          dish={selectedDish}
          categories={newCategories}
          onSave={(updatedDish) => {
            const updated = [...newCategories];
            updated[updatedDish.catIndex].dishes[updatedDish.dishIndex] =
              updatedDish;
            setNewCategories(updated);
            setShowEditModal(false);
          }}
        />
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] relative">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute top-3 right-4"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Add new category</h2>

            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border w-full rounded-lg p-3 text-sm"
              placeholder="Category name..."
            />

            <button
              onClick={handleAddCategory}
              className="w-full bg-black text-white rounded-lg p-3 mt-5"
            >
              Add Category
            </button>
          </div>
        </div>
      )}

      {showDishModal && activeCategoryIndex !== null && (
        <DishModal
          onClose={() => setShowDishModal(false)}
          onAddDish={handleAddDish}
          categoryName={
            newCategories[activeCategoryIndex]?.categoryName || "Category"
          }
        />
      )}

      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 flex gap-10 pr-10">
        <div className="w-[205px] p-9">
          <div className="flex items-center gap-2">
            <HutIcon />
            <div>
              <CompanyNew />
              <p className="text-xs text-gray-500">Swift delivery</p>
            </div>
          </div>

          <button className="w-full p-2 mt-10 bg-black text-white rounded-full flex gap-2 justify-center">
            <Sqr /> Food Menu
          </button>

          <button className="w-full p-2 mt-4 rounded-full flex gap-2 justify-center">
            <CarBlack /> Orders
          </button>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-end mb-6">
            <Avatar />
          </div>

          <div className="border rounded-xl p-6 mb-6">
            <h1 className="text-xl font-semibold mb-4">Dishes category</h1>

            <div className="flex gap-3 flex-wrap">
              <div
                onClick={() => {
                  setShowAllDishes(true);
                  setActiveCategoryIndex(null);
                }}
                className="px-4 py-2 rounded-full flex gap-2 cursor-pointer border"
              >
                All dishes
                <span className="bg-black text-white rounded-full text-xs px-2 flex items-center">
                  {newCategories.reduce(
                    (t, c) => t + (c.dishes?.length || 0),
                    0
                  )}
                </span>
              </div>

              {newCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveCategoryIndex(index);
                    setShowAllDishes(false);
                  }}
                  className={`relative px-4 py-2 rounded-full flex gap-2 cursor-pointer border ${
                    activeCategoryIndex === index && !showAllDishes
                      ? "border-[#EF4444]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {category.categoryName}
                  <span className="bg-black text-white rounded-full text-xs px-2 flex items-center">
                    {category.dishes?.length || 0}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(index);
                    }}
                    className="absolute -top-2 -right-2 bg-gray-200 text-black w-4 h-4 rounded-full text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-red-500 w-9 h-9 rounded-full flex justify-center items-center text-white"
              >
                <Plus />
              </button>
            </div>
          </div>

          <div className="grid gap-8">
            {(showAllDishes
              ? newCategories
              : [newCategories[activeCategoryIndex]]
            )
              .filter(Boolean)
              .map((cat, i) => (
                <div key={i} className="bg-white p-6 border rounded-xl">
                  <h2 className="text-lg font-semibold mb-4">
                    {cat.categoryName} ({cat.dishes?.length || 0})
                  </h2>

                  <div className="grid grid-cols-4 gap-5">
                    <div
                      onClick={() => {
                        setActiveCategoryIndex(i);
                        setShowDishModal(true);
                      }}
                      className="border-2 border-dashed border-red-500 rounded-xl w-[270px] h-[241px] flex justify-center items-center hover:bg-red-50 z-20 cursor-pointer"
                    >
                      <Plus />
                    </div>

                    {cat.dishes?.map((dish, dIndex) => (
                      <div
                        key={dIndex}
                        className="relative border rounded-xl p-3 w-[270px] h-[241px] shadow"
                      >
                        <button
                          onClick={() => {
                            setSelectedDish({
                              ...dish,
                              catIndex: i,
                              dishIndex: dIndex,
                            });
                            setShowEditModal(true);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center"
                        >
                          <InfoIconPencil className="w-5 h-5 stroke-red-500" />
                        </button>

                        <img
                          src={dish.image}
                          className="h-[129px] w-full rounded-lg object-cover"
                        />

                        <div className="flex justify-between mt-2">
                          <p className="text-red-500 font-semibold">
                            {dish.name}
                          </p>
                          <p className="font-bold">${dish.price}</p>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-3">
                          {dish.ingredients}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
