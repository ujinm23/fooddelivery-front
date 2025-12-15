"use client";

export default function CartOrder({ orders }) {
  return (
    <div className="bg-white flex-1 p-6 rounded-2xl overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-6">Order history</h3>

      {(!orders || orders.length === 0) && (
        <p className="text-gray-500 text-sm text-center">
          You have no previous orders.
        </p>
      )}

      {orders?.map((order, index) => (
        <div key={order._id}>
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-xl font-bold">
              ${order.totalPrice}
              <span className="text-sm font-normal text-gray-500 ml-2">
                #{order._id.slice(-5)}
              </span>
            </p>

            <span
              className={`px-4 py-1 text-sm rounded-full border
                ${
                  order.status === "pending"
                    ? "border-red-400 text-red-500"
                    : order.status === "delivered"
                    ? "bg-gray-100 text-gray-700"
                    : "border-gray-300 text-gray-600"
                }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          {/* Foods */}
          <div className="space-y-2 mb-3">
            {order.foodOrderItems?.map((item, i) => (
              <div key={i} className="flex justify-between text-gray-700">
                <div className="flex items-center gap-2">
                  <span>🍲</span>
                  <span>{item.food?.name}</span>
                </div>
                <span>x {item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <span>⏱</span>
            {new Date(order.createdAt).toLocaleDateString()}
          </div>

          {index !== orders.length - 1 && <hr className="my-6 border-dashed" />}
        </div>
      ))}
    </div>
  );
}
