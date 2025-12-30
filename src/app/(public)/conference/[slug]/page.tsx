// src/app/(public)/conference/[slug]/page.tsx
import * as React from "react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ConferenceDetailClient from "@/components/conference-detail-client";

export default function ConferenceDetailPage({ params }: { params: { slug: string } }) {
  const LoadingSkeleton = () => (
    <div className="container py-12 md:py-24">
      <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="md:col-span-2 space-y-6">
                  <Skeleton className="h-8 w-1/4" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-8 w-1/4" />
                  <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-6">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-40 w-full" />
              </div>
          </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ConferenceDetailClient slug={params.slug} />
    </Suspense>
  );
}
