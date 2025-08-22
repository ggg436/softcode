"use client";

import { Button } from "@/components/ui/button";

type Challenge = {
  id: string;
};

type Props = {
  challenges: Challenge[];
};

export const ChallengeButtons = ({ challenges }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {challenges.map((challenge) => (
        <Button
          key={challenge.id}
          size="rounded"
          variant="locked"
          className="h-[36px] w-[36px]"
        />
      ))}
    </div>
  );
};
