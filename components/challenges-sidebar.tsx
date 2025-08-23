"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, createContext, useContext, useEffect } from "react";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Context for managing lesson step state
type LessonStepContextType = {
  currentLessonStep: "html-intro" | "hello" | "hi";
  setCurrentLessonStep: (step: "html-intro" | "hello" | "hi") => void;
};

const LessonStepContext = createContext<LessonStepContextType | undefined>(undefined);

export const useLessonStep = () => {
  const context = useContext(LessonStepContext);
  if (!context) {
    throw new Error("useLessonStep must be used within a LessonStepProvider");
  }
  return context;
};

export const LessonStepProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLessonStep, setCurrentLessonStep] = useState<"html-intro" | "hello" | "hi">("html-intro");

  return (
    <LessonStepContext.Provider value={{ currentLessonStep, setCurrentLessonStep }}>
      {children}
    </LessonStepContext.Provider>
  );
};

type Props = {
  className?: string;
};

export const ChallengesSidebar = ({ className }: Props) => {
  const { currentLessonStep } = useLessonStep();
  const [activeItem, setActiveItem] = useState("HTML Introduction");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  // Update active item based on current lesson step
  useEffect(() => {
    if (currentLessonStep === "html-intro") {
      setActiveItem("HTML Introduction");
    } else if (currentLessonStep === "hello") {
      setActiveItem("Hello");
    } else if (currentLessonStep === "hi") {
      setActiveItem("Hi");
    }
  }, [currentLessonStep]);

  return (
    <>
      <div className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className,
      )}>
        <Link href="/learn">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
            <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
              Lingo
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
          <Button
            variant={activeItem === "HTML Introduction" ? "sidebarOutline" : "sidebar"}
            className="w-full justify-start"
            onClick={() => handleItemClick("HTML Introduction")}
          >
            HTML Introduction
          </Button>
          <Button
            variant={activeItem === "Hello" ? "sidebarOutline" : "sidebar"}
            className="w-full justify-start"
            onClick={() => handleItemClick("Hello")}
          >
            Hello
          </Button>
          <Button
            variant={activeItem === "Hi" ? "sidebarOutline" : "sidebar"}
            className="w-full justify-start"
            onClick={() => handleItemClick("Hi")}
          >
            Hi
          </Button>
        </div>
        <div className="p-4">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
      </div>

      {/* Main Content Area - Clean Pages for each sidebar item */}
      <div className="flex-1 lg:ml-[256px] p-8">
        {activeItem === "HTML Introduction" && (
          <div className="w-full h-full">
            {/* HTML Introduction dedicated page */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">HTML Introduction</h1>
              <p className="text-lg text-gray-600 mb-8">Welcome to HTML basics! This is your first lesson.</p>
              <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
            </div>
          </div>
        )}

        {activeItem === "Hello" && (
          <div className="w-full h-full">
            {/* Hello dedicated page */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Hello</h1>
              <p className="text-lg text-gray-600 mb-8">This is the Hello lesson page. Learn basic greetings.</p>
              <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">👋</span>
              </div>
            </div>
          </div>
        )}

        {activeItem === "Hi" && (
          <div className="w-full h-full">
            {/* Hi dedicated page */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Hi</h1>
              <p className="text-lg text-gray-600 mb-8">This is the Hi lesson page. Master simple greetings.</p>
              <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
