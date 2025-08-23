"use client";

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAudio, useWindowSize, useMount } from "react-use";

import { reduceHearts } from "@/actions/user-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useLessonStep } from "@/components/challenges-sidebar";

import { Header } from "./header";
import { Footer } from "./footer";
import { Challenge } from "./challenge";
import { ResultCard } from "./result-card";
import { QuestionBubble } from "./question-bubble";
import { Button } from "@/components/ui/button";
import { LessonSidebar } from "./sidebar";

import { Challenge as ChallengeType, Subscription } from "./types";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: string;
  initialLessonChallenges: ChallengeType[];
  userSubscription: Subscription & {
    isActive: boolean;
  } | null;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();
  const { currentLessonStep, setCurrentLessonStep } = useLessonStep();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();

  const router = useRouter();

  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const [
    correctAudio,
    _c,
    correctControls,
  ] = useAudio({ src: "/correct.wav" });
  const [
    incorrectAudio,
    _i,
    incorrectControls,
  ] = useAudio({ src: "/incorrect.wav" });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (!initialLessonChallenges || initialLessonChallenges.length === 0) {
      return 0;
    }
    const uncompletedIndex = initialLessonChallenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  
  // State for congratulations modal
  const [showCongratulations, setShowCongratulations] = useState(false);

  const challenge = challenges && challenges.length > 0 && activeIndex >= 0 ? challenges[activeIndex] : null;
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onNavigateToQuestion = (index: number) => {
    if (index >= 0 && index < challenges.length) {
      setActiveIndex(index);
      setStatus("none");
      setSelectedOption(null);
    }
  };

  const onSelect = (id: string) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  // Function to handle navigation between sidebar tabs
  const handleContinueToNextTab = () => {
    if (currentLessonStep === "html-intro") {
      setCurrentLessonStep("hello");
    } else if (currentLessonStep === "hello") {
      setCurrentLessonStep("hi");
    } else if (currentLessonStep === "hi") {
      // Show congratulations animation on Hi tab
      setShowCongratulations(true);
    }
  };

  const onContinue = () => {
    if (selectedOption == null) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(null);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(null);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        if (!challenge) return;
        upsertChallengeProgress(challenge.id, true)
          .then(() => {
            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      });
    } else {
      startTransition(() => {
        reduceHearts()
          .then((response) => {
            incorrectControls.play();
            setStatus("wrong");

            if (response === false) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <div className="w-full h-full">
          {/* Clean white page - no congratulations content */}
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
          onContinue={handleContinueToNextTab}
        />

        {/* Congratulations Modal - show when Finish is clicked on Hi tab */}
        {showCongratulations && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
              {/* Confetti Animation */}
              <div className="mb-6">
                <div className="relative w-24 h-24 mx-auto">
                  {/* Golden Cups */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-yellow-400 rounded-t-full border-2 border-yellow-600"></div>
                  <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-12 h-16 bg-yellow-400 rounded-t-full border-2 border-yellow-600"></div>
                  
                  {/* Confetti */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.8s'}}></div>
                  </div>
                </div>
              </div>

              {/* Congratulations Message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Great job!</h2>
              <p className="text-lg text-gray-600 mb-6">You&apos;ve completed the lesson.</p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="secondaryOutline"
                  className="flex-1"
                  onClick={() => setShowCongratulations(false)}
                >
                  Practice Again
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => router.push("/learn")}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning"
    : challenge.question;

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1 pr-20">
        <div className="h-full flex items-center justify-center">
          <div className="lg:minh-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type as any}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || selectedOption == null}
        status={status}
        onCheck={onContinue}
      />
      <LessonSidebar
        lessonId={lessonId}
        currentQuestion={activeIndex + 1}
        totalQuestions={challenges?.length || 0}
        percentage={percentage}
        hearts={hearts}
        onNavigateToQuestion={onNavigateToQuestion}
      />
    </>
  );
};
