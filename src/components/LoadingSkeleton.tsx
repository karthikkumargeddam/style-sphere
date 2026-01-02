const LoadingSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="card-3d p-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-secondary rounded w-3/4"></div>
                        <div className="h-3 bg-secondary rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            {/* Product Grid Skeleton */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="card-3d overflow-hidden">
                        <div className="aspect-square bg-secondary"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-secondary rounded w-3/4"></div>
                            <div className="h-3 bg-secondary rounded w-1/2"></div>
                            <div className="flex items-center justify-between">
                                <div className="h-6 bg-secondary rounded w-20"></div>
                                <div className="h-8 bg-secondary rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;
