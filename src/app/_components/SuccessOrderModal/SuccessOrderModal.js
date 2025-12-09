"use client";

export default function SuccessOrderModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white p-8 rounded-2xl text-center w-[500px] h-[339px] shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          Your order has been successfully placed!
        </h2>

        <img
          src="/illustration.svg"
          alt="success"
          className="w-40 h-40 mx-auto mb-6"
        />

        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#F4F4F5] text-black rounded-full w-[188px] h-11"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
