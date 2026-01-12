"use client";

import React, { useEffect, useState } from "react";
import HutIcon from "@/app/_icons/HutIcon";
import SqrWhite from "@/app/_icons/sqrblack";
import CarWhiteIcon from "@/app/_icons/CarWhiteIcon";
import Sqr from "@/app/_icons/squer";
import CarBlack from "@/app/_icons/Car";
import OrderCN from "@/app/_icons/ordercn";

export default function OrdersPage({ activeTab, setActiveTab }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://foodapp-back-k58d.onrender.com/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Orders fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 flex gap-10 pr-10">
      {/* Sidebar */}
      <div className="w-[205px] p-9">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <HutIcon />
          </div>
          <div className="w-[81px] h-7">
            <OrderCN />
            <p className="text-xs text-gray-500">Swift delivery</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("FoodMenu")}
          className={`w-full p-2 mt-10 rounded-full flex gap-2 justify-center items-center ${
            activeTab === "FoodMenu" ? "bg-black text-white" : ""
          }`}
        >
          {activeTab === "FoodMenu" ? <Sqr /> : <SqrWhite />}
          Food Menu
        </button>

        <button
          onClick={() => setActiveTab("OrderMenu")}
          className={`w-full p-2 mt-4 rounded-full flex gap-2 justify-center items-center ${
            activeTab === "OrderMenu" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {activeTab === "OrderMenu" ? <CarWhiteIcon /> : <CarBlack />}
          Orders
        </button>
      </div>

      {/* Orders content */}
      <div className="p-6 bg-white rounded-xl w-[1171px]">
        {/* HEADER */}
        <div className="flex justify-between items-center border rounded-xl px-6 py-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold">Orders</h1>
            <p className="text-sm text-gray-500">{orders.length} items</p>
          </div>

          <div className="flex gap-3">
            <div className="border rounded-full px-4 py-2 text-sm">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="outline-none text-sm"
              />
            </div>
            <button className="bg-gray-200 text-gray-400 px-5 py-2 rounded-full text-sm">
              Change delivery state
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">Test@gmail.com</td>

                  <td className="p-3">{order.items.length} foods</td>

                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">${order.total}</td>

                  <td className="p-3 text-xs text-gray-500 max-w-[220px] truncate">
                    УБ, СБД, 12-р хороо, Нэгдсэн эмнэлэг
                  </td>

                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs border
                      ${
                        order.status === "Pending"
                          ? "border-red-400 text-red-500"
                          : order.status === "Delivered"
                          ? "border-green-400 text-green-600"
                          : "border-gray-400"
                      }`}
                    >
                      <option>Pending</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
