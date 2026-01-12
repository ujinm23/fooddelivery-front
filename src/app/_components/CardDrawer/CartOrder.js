"use client";

export default function CartOrder({ orders }) {
  return (
    <div className="bg-white flex-1 p-6 rounded-2xl overflow-y-auto scrollbar-hide">
      <h3 className="text-2xl font-semibold mb-6">Order history</h3>

      {(!orders || orders.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-sm text-center mb-2">
            You have no previous orders.
          </p>
          <p className="text-gray-400 text-xs text-center">
            Your order history will appear here
          </p>
        </div>
      )}

      <div className="space-y-4">
        {orders?.map((order, index) => (
          <div key={order._id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xl font-bold text-[#EF4444]">
                  ${order.totalPrice?.toFixed(2) || "0.00"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Order #{order._id?.slice(-8) || "N/A"}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full border font-medium
                  ${
                    order.status === "pending"
                      ? "border-red-400 text-red-500 bg-red-50"
                      : order.status === "delivered"
                      ? "border-green-400 text-green-600 bg-green-50"
                      : order.status === "cancelled"
                      ? "border-gray-400 text-gray-600 bg-gray-50"
                      : "border-blue-400 text-blue-600 bg-blue-50"
                  }`}
              >
                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || "Pending"}
              </span>
            </div>

            {/* Foods */}
            <div className="space-y-2 mb-3 bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">Items:</p>
              {order.foodOrderItems?.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-gray-700">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg"></span>
                    <span className="text-sm font-medium flex-1">
                      {item.food?.foodName || item.food?.name || "Хоолны нэр олдсонгүй"}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    x{item.quantity} = ${((item.food?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Address */}
            {order.address && (
              <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-sm">📍</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Delivery Address:</p>
                    <p className="text-xs text-gray-700">{order.address}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Date and Time */}
            <div className="flex items-center justify-between text-gray-500 text-xs">
              <div className="flex items-center gap-2">
                <span>⏱</span>
                <span>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </span>
              </div>
              <span className="text-gray-400">
                {order.foodOrderItems?.length || 0} item{order.foodOrderItems?.length !== 1 ? "s" : ""}
              </span>
            </div>

            {index !== orders.length - 1 && <hr className="my-4 border-dashed border-gray-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}
