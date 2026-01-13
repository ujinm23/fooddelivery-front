import DishCardSkeleton from "./DishCardSkeleton";

export default function CategorySkeleton() {
  return (
    <div className="mb-20">
      <div className="h-9 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <DishCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
