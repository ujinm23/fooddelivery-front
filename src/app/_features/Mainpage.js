import Appetizers from "../_components/FoodCarts/Appetizers";
import Lunchfavorites from "../_components/FoodCarts/Lunchfavoritex";
import Salads from "../_components/FoodCarts/Salads";
import Salads2 from "../_components/FoodCarts/Salads2";

export default function MainPage() {
  return (
    <div>
      <div className="w-full h-[570px] flex justify-center bg-black">
        <div className="w-full max-w-[1440px] h-full bg-[#404040]">
          <img
            src="/BG.svg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="bg-black flex justify-center">
        <div className="w-[1440px] h-[2850px] bg-[#404040] ">
          <div className="w-[1440px] h-[2646px] p-[88px]">
            <h2 className="text-white font-semibold text-3xl mb-[54px]">
              Appetizers
            </h2>
            <Appetizers />
            <h2 className="text-white font-semibold text-3xl mb-[54px] mt-[54px]">
              Salads
            </h2>
            <Salads />
            <h2 className="text-white font-semibold text-3xl mb-[54px] mt-[54px]">
              Lunch favorites
            </h2>
            <Lunchfavorites />
            <h2 className="text-white font-semibold text-3xl mb-[54px] mt-[54px]">
              Salads
            </h2>
            <Salads2 />
          </div>
        </div>
      </div>
    </div>
  );
}
