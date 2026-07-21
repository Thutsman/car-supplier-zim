"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We couldn&apos;t load this page. Please try again — if the problem
        continues, get in touch with us.
      </p>
      <Button
        className="mt-8 rounded-full bg-brand px-6 font-bold text-white hover:bg-brand-dark"
        onClick={() => unstable_retry()}
      >
        Try again
      </Button>
    </div>
  );
}
