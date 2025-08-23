import { ChallengesSidebar, LessonStepProvider } from "@/components/challenges-sidebar";
import { MobileHeader } from "@/components/mobile-header";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <LessonStepProvider>
      <div className="flex h-full">
        <ChallengesSidebar />
        <div className="flex flex-col h-full w-full lg:ml-[256px]">
          <MobileHeader />
          {children}
        </div>
      </div>
    </LessonStepProvider>
  );
};
 
export default LessonLayout;
