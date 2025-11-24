const Footer = () => {
  return (
    <div className="w-full h-[755px] bg-black pt-[60px]">
      <div className="w-full h-[92px] bg-[#EF4444] flex items-center gap-[34px]">
        <p className="text-[30px] font-semibold text-white ml-[98px]">
          Fresh fast delivered
        </p>
        <p className="text-[30px] font-semibold text-white">
          Fresh fast delivered
        </p>
        <p className="text-[30px] font-semibold text-white">
          Fresh fast delivered
        </p>
        <p className="text-[30px] font-semibold text-white">
          Fresh fast delivered
        </p>
        <p className="text-[30px] font-semibold text-white">
          Fresh fast delivered
        </p>
        <p className="text-[30px] font-semibold text-white">
          Fresh fast delivered
        </p>
        <p className="text-[30px] font-semibold text-white">
          Fresh fast delivered
        </p>
      </div>

      <div className="w-full pl-[88px] pr-[88px] mt-[76px] flex justify-between">
        <div>
          <div className="flex justify-center">
            <img src="/huticon.svg" alt="icon" />
          </div>
          <div className="mt-3">
            <img src="/CompanyName.svg" />
            <p className="text-white text-[12px]">Swift delivery</p>
          </div>
        </div>

        <div className="flex justify-between h-[228px] w-[788px] mb-[104px] ">
          <div>
            <p className="text-[#71717A] font-normal text-base mb-4">NOMNOM</p>
            <p className="text-white font-normal text-base mb-4">Home</p>
            <p className="text-white font-normal text-base mb-4">Contact us</p>
            <p className="text-white font-normal text-base">Delivery zone</p>
          </div>

          <div>
            <p className="text-[#71717A] font-normal text-base mb-4">MENU</p>
            <p className="text-white font-normal text-base mb-4">Appetizers</p>
            <p className="text-white font-normal text-base mb-4">Salads</p>
            <p className="text-white font-normal text-base mb-4">Pizzas</p>
            <p className="text-white font-normal text-base mb-4">Main dishes</p>
            <p className="text-white font-normal text-base">Desserts</p>
          </div>

          <div>
            <p className="text-white mt-11 font-normal text-base mb-4">
              Side dish
            </p>
            <p className="text-white font-normal text-base mb-4">Brunch</p>
            <p className="text-white font-normal text-base mb-4">Desserts</p>
            <p className="text-white font-normal text-base mb-4">Beverages</p>
            <p className="text-white">Fish & Sea foods</p>
          </div>

          <div>
            <p className="mb-5 text-[#71717A] font-normal text-base">
              FOLLOW US
            </p>
            <div className="flex gap-4">
              <img src="/Facebook.svg" />
              <img src="/Instagram.svg" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[84px] flex items-center pl-[88px] gap-12 border-t border-solid border-[#71717A] mb-[101px]">
        <p className="text-[#71717A]">Copy right 2024 © Nomnom LLC</p>
        <p className="text-[#71717A]">Privacy policy</p>
        <p className="text-[#71717A]">Terms and condition</p>
        <p className="text-[#71717A]">Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
