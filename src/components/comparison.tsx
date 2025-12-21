import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface ComparisonItemProps {
  children: ReactNode;
  position: "left" | "right";
  className?: string;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({
  children,
  position,
  className = "",
}) => {
  const baseClasses =
    position === "left"
      ? "absolute inset-0 overflow-hidden"
      : "absolute inset-0 overflow-hidden";

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
};

interface ComparisonHandleProps {
  position: number;
}

const ComparisonHandle: React.FC<ComparisonHandleProps> = ({ position }) => {
  return (
    <div
      className="absolute top-0 bottom-0 w-1.5 bg-linear-to-r from-blue-500 to-blue-600 cursor-ew-resize z-10 shadow-lg"
      style={{ left: `${position}%` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-3 border-blue-600 hover:scale-110 transition-transform">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <svg
          className="w-6 h-6 text-blue-600 -ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
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
      document.addEventListener("mousemove", handleMouseMove as EventListener);
      document.addEventListener("mouseup", handleMouseUp as EventListener);
      document.addEventListener("touchmove", handleTouchMove as EventListener);
      document.addEventListener("touchend", handleMouseUp as EventListener);

      return () => {
        document.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener
        );
        document.removeEventListener("mouseup", handleMouseUp as EventListener);
        document.removeEventListener(
          "touchmove",
          handleTouchMove as EventListener
        );
        document.removeEventListener(
          "touchend",
          handleMouseUp as EventListener
        );
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

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
      className={`relative overflow-hidden select-none ${className}`}
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
