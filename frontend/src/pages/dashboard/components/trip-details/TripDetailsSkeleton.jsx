import { Skeleton } from "@/components/ui/skeleton";

export function TripDetailsSkeleton() {
    return (
        <div className="pb-12 animate-in fade-in duration-500">
            {/* Hero Section Skeleton */}
            <div className="relative -mx-6 -mt-6 mb-12 overflow-hidden rounded-b-[2rem] shadow-sm">
                <Skeleton className="h-[400px] w-full rounded-none" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12">
                    <Skeleton className="h-8 w-32 rounded-full mb-4" />
                    <Skeleton className="h-12 w-2/3 md:w-1/2 mb-3" />
                    <Skeleton className="h-6 w-48" />
                </div>
            </div>

            {/* Split Layout Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-2">
                {/* Left Side - Content Skeleton */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Tabs Skeleton */}
                    <div className="flex gap-4 border-b border-border pb-4">
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-10 w-24 rounded-lg" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <Skeleton className="h-8 w-40 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        <div>
                            <Skeleton className="h-8 w-48 mb-4" />
                            <div className="flex flex-wrap gap-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                                ))}
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-8 w-40 mb-6" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-48 w-full rounded-3xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Sidebar Skeleton */}
                <div className="lg:col-span-1">
                    <Skeleton className="h-[600px] w-full rounded-3xl" />
                </div>
            </div>
        </div>
    );
}
