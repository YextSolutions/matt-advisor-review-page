import * as React from "react";
import { useState } from "react";
import cx from "classnames";
import { FaStar } from "react-icons/fa";

type Props = {
  //Insert Props Here
  className?: string;
  onChange?: (value: number) => void;
  stars?: number;
  small?: boolean;
  hideEmpty?: boolean;
};

const Stars = ({ className, onChange, stars = 0, small, hideEmpty }: Props) => {
  const [currentHoveredIndex, setCurrentHoveredIndex] = useState<
    number | undefined
  >(undefined);

  // Create array with lenght of 5
  const starsArray = Array.from({ length: 5 }, (_, i) => i);

  const starsFilled = onChange ? currentHoveredIndex ?? stars : stars;

  return (
    <div className={cx(className)}>
      <div
        className={cx("flex  items-center ", {
          "text-base": small,
          "gap-2 text-xl": !small,
        })}
      >
        {starsArray
          .filter((star, index) => {
            return !hideEmpty || index < starsFilled;
          })
          .map((star, index) => (
            <OptionButtonWrapper
              onClick={onChange ? () => onChange?.(index + 1) : undefined}
              key={index}
            >
              <FaStar
                onMouseOver={() => setCurrentHoveredIndex(index + 1)}
                onMouseLeave={() => setCurrentHoveredIndex(undefined)}
                className={cx({
                  "text-yellow-400": index < starsFilled,
                  "text-gray-400": index >= starsFilled,
                })}
              />
            </OptionButtonWrapper>
          ))}
      </div>
    </div>
  );
};

export default Stars;

const OptionButtonWrapper = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: any;
}) => {
  if (onClick) {
    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return <div>{children}</div>;
  }
};
