"use client";

export default function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onUpdateQty,
  onRemoveItem,
}) {
  const shippingFee = 0.99;

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrice = (itemsTotal + shippingFee).toFixed(2);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[420px] bg-[#3A3A3C]/80 backdrop-blur-sm z-50 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-2xl"
      >
        ✕
      </button>

      {/* Main Wrapper */}
      <div className="mt-16 bg-white h-[92%] rounded-t-3xl flex flex-col">
        
        {/* Header */}
        <h2 className="text-lg font-semibold p-6 border-b text-[#18181B]">
          Order detail
        </h2>

        {/* Tabs */}
        <div className="flex justify-center p-3">
          <div className="flex bg-[#F4F4F5] rounded-full w-[80%]">
            <button className="flex-1 bg-[#EF4444] text-white px-4 py-2 rounded-full">
              Cart
            </button>
            <button className="flex-1 text-[#18181B] px-4 py-2">
              Order
            </button>
          </div>
        </div>

        {/* My Cart Section */}
        <div className="px-6">
          <h3 className="font-semibold text-[#18181B] mb-4">My cart</h3>
        </div>

        {/* CART LIST */}
        <div className="px-6 overflow-y-auto h-[32%]">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start mb-4">
              {/* IMAGE + INFO */}
              <div className="flex gap-3">
                <img
                  src={item.image}
                  className="w-[60px] h-[60px] rounded-lg object-cover"
                />

                <div className="flex flex-col">
                  <p className="text-[#EF4444] font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500 w-[140px]">
                    {item.ingredients}
                  </p>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="border px-2 rounded-full"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="border px-2 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 border border-red-400 rounded-full w-7 h-7 flex justify-center items-center"
                >
                  ✕
                </button>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery */}
        <div className="p-6">
          <p className="font-medium text-[#18181B] mb-2">Delivery location</p>
          <input
            placeholder="Please share your complete address"
            className="w-full border p-3 rounded-xl text-sm"
          />
        </div>

        {/* Payment Info */}
        <div className="px-6">
          <p className="font-medium text-[#18181B] mb-3">Payment info</p>

          <div className="flex justify-between text-sm mb-2">
            <span>Items</span>
            <span>${itemsTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>{shippingFee}$</span>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          <button className="w-full py-3 bg-[#EF4444] text-white rounded-full text-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
