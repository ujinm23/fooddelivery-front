import { Skeleton } from "@/components/ui/skeleton";

export default function OrderTableSkeleton({ rows = 5 }) {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <tr key={index} className="border-b">
          <td className="p-3">
            <Skeleton className="h-4 w-8" />
          </td>
          <td className="p-3">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="p-3">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="p-3">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="p-3">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="p-3">
            <Skeleton className="h-4 w-40" />
          </td>
          <td className="p-3">
            <Skeleton className="h-8 w-24 rounded-full" />
          </td>
        </tr>
      ))}
    </>
  );
}
