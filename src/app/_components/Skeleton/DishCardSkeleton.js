import { Skeleton } from "@/components/ui/skeleton";

export default function DishCardSkeleton() {
  return (
    <div className="relative rounded-xl bg-white p-3 shadow-lg">
      <Skeleton className="w-full h-[210px] rounded-lg mb-2" />
      <div className="flex justify-between mt-2 mb-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="absolute top-44 right-6 w-8 h-8 rounded-full" />
    </div>
  );
}
