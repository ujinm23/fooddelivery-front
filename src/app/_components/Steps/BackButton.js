import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="rounded-xl border h-10 w-10 cursor-pointer"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
}
