export default function Header() {
  return (
    <div className="w-full h-[68px] bg-[#18181B] flex">
      <div className="flex items-center w-full h-[68px] gap-[12px] ml-[88px]">
        <div>
          <img src="/huticon.svg" alt="icon" />
        </div>
        <div>
          <img src="/CompanyName.svg" />
          <p className="text-white text-[12px]">Swift delivery</p>
        </div>
      </div>
      <div className="w-full h-[68px] ">
        <div className="mr-[88px] h-[68px] flex justify-end items-center  gap-[12.81px]">
          <div className="rounded-[50px] bg-white w-9 h-9 flex items-center justify-center">
            <img src="/purchase.svg" />
          </div>
          <div className="rounded-[50px] bg-[#EF4444] w-9 h-9 flex items-center justify-center  ">
            <img src="/user.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}
