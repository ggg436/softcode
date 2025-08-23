import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLessonStep } from "@/components/challenges-sidebar";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: string;
  onContinue?: () => void; // New prop for sidebar navigation
};

export const Footer = ({
  onCheck,
  status,
  disabled,
  lessonId,
  onContinue,
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");
  const { currentLessonStep } = useLessonStep();

  const handleContinue = () => {
    if (status === "completed" && onContinue) {
      onContinue(); // Use custom navigation for sidebar tabs
    } else {
      onCheck(); // Use default behavior for other statuses
    }
  };

  // Determine button text based on lesson step
  const getButtonText = () => {
    if (status === "completed") {
      if (currentLessonStep === "hi") {
        return "Finish";
      }
      return "Continue";
    }
    if (status === "none") return "Check";
    if (status === "correct") return "Next";
    if (status === "wrong") return "Retry";
    return "Continue";
  };

  return (
    <footer className={cn(
      "lg:-h[140px] h-[100px] border-t-2",
      status === "correct" && "border-transparent bg-green-100",
      status === "wrong" && "border-transparent bg-rose-100",
    )}>
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again.
          </div>
        )}
        {/* Removed Practice Again button - only Continue/Finish button remains */}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={handleContinue}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {getButtonText()}
        </Button>
      </div>
    </footer>
  );
};
