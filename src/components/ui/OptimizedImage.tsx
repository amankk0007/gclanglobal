import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    priority?: boolean;
}

const OptimizedImage = ({
    src,
    alt,
    className,
    imgClassName,
    priority = false,
    ...props
}: OptimizedImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Preload priority images
    useEffect(() => {
        if (priority) {
            const img = new Image();
            img.src = src;
            img.onload = () => setIsLoading(false);
            img.onerror = () => setError(true);
        }
    }, [src, priority]);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {isLoading && (
                <Skeleton
                    className="absolute inset-0 z-10 w-full h-full bg-slate-800 animate-pulse"
                />
            )}
            <img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                className={cn(
                    "w-full h-full object-cover transition-all duration-700 ease-in-out",
                    isLoading ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100 blur-0",
                    error ? "opacity-0" : "",
                    imgClassName
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setError(true);
                }}
                {...props}
            />
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-gray-500 text-xs">
                    Failed to load
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;
