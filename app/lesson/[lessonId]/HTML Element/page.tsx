import { redirect } from "next/navigation";
import { getUserProgress } from "@/actions/user-progress";

const HTMLElementPage = async ({
  params,
}: {
  params: {
    lessonId: string;
  };
}) => {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    redirect("/learn");
  }

  return (
    <div className="flex-1">
      <div className="h-full flex items-center justify-center">
        <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-8">
          <div className="text-center">
            <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700 mb-4">
              HTML Element
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Learn about HTML elements and their structure
            </p>
          </div>
          <div className="bg-white rounded-xl border-2 border-b-4 border-gray-200 p-6 text-center">
            <h2 className="text-xl font-semibold text-neutral-700 mb-4">
              Understanding HTML Elements
            </h2>
            <p className="text-neutral-600 mb-6">
              HTML elements are the building blocks of web pages:
            </p>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-neutral-700">Opening and closing tags</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-neutral-700">Element attributes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-neutral-700">Content structure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-neutral-700">Nesting elements</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                🔧 Master the fundamentals of HTML elements!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLElementPage;
