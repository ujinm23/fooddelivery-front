import { Hand } from "@/app/_icons/Hand";

export function Empty({ title, description }) {
  return (
    <div className="w-109.75 h-45.5 bg-[#F4F4F5] py-8 px-12 rounded-xl flex flex-col gap-1 items-center">
      <Hand />
      <p className="text-[16px] font-bold text-black">{title}</p>
      <p className="text-[12px] text-align text-[#71717A]">{description}</p>
    </div>
  );
}
