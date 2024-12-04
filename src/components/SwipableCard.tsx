import React, { useState } from 'react';

interface SwipeableCardProps {
  item: string;
  onDelete: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ item, onDelete }) => {
  const [swiped, setSwiped] = useState(false);

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const swipeDistance = touch.clientX;

    // When swiped left more than 100px
    if (swipeDistance < -100) {
      setSwiped(true);
    } else if (swipeDistance > 0) {
      // Reset if user swipes right (optional)
      setSwiped(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Delete option revealed when swiped */}
      <div
        className={`absolute top-0 right-0 h-full w-32 bg-red-500 text-white flex justify-center items-center transform transition-transform ${
          swiped ? '-translate-x-0' : 'translate-x-full'
        }`}
        onClick={onDelete}
      >
        Delete
      </div>

      {/* Card content */}
      <div
        className={`p-4 bg-gray-300 mb-1 shadow-md rounded-lg transform transition-transform ${
          swiped ? 'translate-x-[-100px]' : 'translate-x-0'
        }`}
        onTouchMove={handleSwipe}
      >
        <p>{item}</p>
      </div>
    </div>
  );
};

export default SwipeableCard;
