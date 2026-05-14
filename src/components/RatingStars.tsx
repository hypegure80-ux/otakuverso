import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function RatingStars({ rating, size = 14, showValue = true }: RatingStarsProps) {
  const fullStars = Math.floor(rating / 2);
  const hasHalf = (rating / 2) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="text-primary fill-primary" style={{ width: size, height: size }} />
        ))}
        {hasHalf && (
          <div className="relative" style={{ width: size, height: size }}>
            <Star className="text-gray-300 absolute" style={{ width: size, height: size }} />
            <div className="overflow-hidden" style={{ width: size / 2 }}>
              <Star className="text-primary fill-primary" style={{ width: size, height: size }} />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="text-gray-300" style={{ width: size, height: size }} />
        ))}
      </div>
      {showValue && <span className="text-xs font-semibold text-primary ml-1">{rating}</span>}
    </div>
  );
}
