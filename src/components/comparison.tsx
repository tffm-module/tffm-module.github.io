import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface ComparisonItemProps {
  children: ReactNode;
  position: "left" | "right";
  className?: string;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface ComparisonHandleProps {
  position: number;
}

const ComparisonHandle: React.FC<ComparisonHandleProps> = ({ position }) => {
  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-gray-200 cursor-ew-resize z-20"
      style={{ left: `${position}%` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-200 border border-border rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div>
    </div>
  );
};

interface ComparisonProps {
  children: ReactNode;
  className?: string;
}

const Comparison: React.FC<ComparisonProps> = ({
  children,
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number): void => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (isDragging) {
      updatePosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging]);

  const childrenArray = React.Children.toArray(children);
  const leftItem = childrenArray.find(
    (child) =>
      React.isValidElement<ComparisonItemProps>(child) &&
      child.props.position === "left"
  );
  const rightItem = childrenArray.find(
    (child) =>
      React.isValidElement<ComparisonItemProps>(child) &&
      child.props.position === "right"
  );
  const handle = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === ComparisonHandle
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-ew-resize ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {rightItem}

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {leftItem}
      </div>

      {handle &&
        React.isValidElement<ComparisonHandleProps>(handle) &&
        React.cloneElement<ComparisonHandleProps>(handle, {
          position: sliderPosition,
        })}
    </div>
  );
};

export default Comparison;
export { ComparisonItem, ComparisonHandle };
