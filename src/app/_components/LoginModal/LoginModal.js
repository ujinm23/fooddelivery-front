"use client";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-2xl w-[429px] h-[184px] text-center shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-[#18181B]">
          You need to log in first
        </h2>

        <div className="flex gap-3 justify-center mt-15">
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-2 rounded-lg border w-[182px] h-10 bg-black text-white"
          >
            Log in
          </button>

          <button
            onClick={() => (window.location.href = "/sign-up")}
            className=" rounded-lg w-[182px] h-10  border-black border"
          >
            Sign up
          </button>
        </div>

        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ✕
        </button>
      </div>
    </div>
  );
}
