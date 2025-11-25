import CompanyName from "../_icons/CompanyName";
import HutIcon from "../_icons/HutIcon";
import Purchase from "../_icons/Purchase";
import { UserIcon } from "../_icons/UserIcon";

export default function Header() {
  return (
    <div className="w-full bg-[#18181B] h-[68px] flex justify-center">
      <div className="w-full max-w-[1440px] h-full flex justify-between items-center px-[88px]">
        <div className="flex items-center gap-3">
          <HutIcon />

          <div>
            <CompanyName />
            <p className="text-white text-[12px]">Swift delivery</p>
          </div>
        </div>

        <div className="flex items-center gap-[12.81px]">
          <div className="rounded-[50px] bg-white w-9 h-9 flex items-center justify-center">
            <Purchase />
          </div>

          <div className="rounded-[50px] bg-[#EF4444] w-9 h-9 flex items-center justify-center">
            <UserIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
