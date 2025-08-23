"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { ChallengesSidebar } from "./challenges-sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const isLessonPage = pathname?.startsWith('/lesson');
  
  const SidebarComponent = isLessonPage ? ChallengesSidebar : Sidebar;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <SidebarComponent />
      </SheetContent>
    </Sheet>
  );
};
