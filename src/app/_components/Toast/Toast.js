export default function Toast({ message }) {
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[357px] h-[48px]
                    bg-[#404040] text-white px-4 py-2 rounded-lg 
                    shadow-lg text-xl font-medium flex items-center gap-2 border border-[#E4E4E7] 
                    animate-slideDown"
    >
      <span className="bg-[#404040] text-white rounded-full px-1.5 py-0.5 flex items-center justify-center text-xs">
        ✔️
      </span>

      {message}
    </div>
  );
}
