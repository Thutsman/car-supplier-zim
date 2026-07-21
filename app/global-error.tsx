"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <h1 className="text-2xl font-bold md:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The site failed to load. Please try again in a moment.
        </p>
        <button
          className="mt-8 rounded-full bg-brand px-6 py-2.5 font-bold text-white hover:bg-brand-dark"
          onClick={() => unstable_retry()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
