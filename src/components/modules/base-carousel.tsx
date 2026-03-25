/**
 * A flexible carousel component that supports navigation, indicators, and custom content.
 * Built on top of the shadcn/ui Carousel component with additional features.
 *
 * @example
 * ```tsx
 * <BaseCarousel
 *   items={[
 *     { id: '1', content: <div>Slide 1</div> },
 *     { id: '2', content: <div>Slide 2</div> }
 *   ]}
 *   showIndicators={true}
 *   showNavigation={true}
 *   onSlideChange={(index) => console.log('Current slide:', index)}
 * />
 * ```
 */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/core/carousel";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BaseCarouselProps {
  /** Array of items to display in the carousel */
  items: {
    /** Unique identifier for the item */
    id: string;
    /** React node to render as the carousel item content */
    content: React.ReactNode;
  }[];
  /** Whether to show the slide indicators */
  showIndicators?: boolean;
  /** Whether to show the navigation arrows */
  showNavigation?: boolean;
  /** Additional CSS classes for the carousel container */
  className?: string;
  /** Additional CSS classes for individual carousel items */
  itemClassName?: string;
  /** CSS position for the indicators (default: 'bottom-4') */
  indicatorsPosition?: string;
  /** Callback function triggered when the active slide changes */
  onSlideChange?: (index: number) => void;
}

export function BaseCarousel({
  items,
  showIndicators = true,
  showNavigation = true,
  className = "",
  itemClassName = "",
  indicatorsPosition = "bottom-4",
  onSlideChange,
}: BaseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setActiveIndex(newIndex);
      onSlideChange?.(newIndex);
    });
  }, [api, onSlideChange]);

  return (
    <Carousel className={cn("relative w-full", className)} setApi={setApi}>
      <CarouselContent className="min-h-0">
        {items.map((item) => (
          <CarouselItem key={item.id} className={cn("w-full", itemClassName)}>
            {item.content}
          </CarouselItem>
        ))}
      </CarouselContent>

      {showIndicators && (
        <div
          className={cn(
            "absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 z-50",
            indicatorsPosition
          )}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn("rounded-full transition-all duration-150", {
                "bg-muted size-2": index !== activeIndex,
                "bg-primary outline-primary outline-2 size-5": index === activeIndex,
              })}
            />
          ))}
        </div>
      )}

      {showNavigation && (
        <>
          <CarouselPrevious className="z-20 border-none bg-transparent hover:bg-accent hover:text-foreground size-5" />
          <CarouselNext className="z-20 border-none bg-transparent hover:bg-accent hover:text-foreground size-5" />
        </>
      )}
    </Carousel>
  );
}
