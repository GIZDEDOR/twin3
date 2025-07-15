'use client';

import React from 'react';

type MagicButtonProps = {
  title: string;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
  handleClick?: () => void;
  otherClasses?: string;
};

const MagicButton = ({
  title,
  icon,
  position = 'right',
  handleClick,
  otherClasses = '',
}: MagicButtonProps) => {
  return (
    <button
  onClick={handleClick}
  className={`inline-flex items-center justify-center gap-2 px-6 py-[6px] text-sm font-franklin font-semibold 
    text-transparent bg-clip-text transition-transform duration-300 hover:scale-105 border-[2px] backdrop-blur-xl
    !rounded-xl ${otherClasses}`}
  style={{
    backgroundImage: 'linear-gradient(90deg, #1FA2FF, #1ADBFC)',
    WebkitTextFillColor: 'transparent',
    borderImage: 'linear-gradient(90deg, #1FA2FF, #1ADBFC) 1',
    backgroundColor: 'transparent',
  }}
>
  {position === 'left' && icon}
  {title}
  {position === 'right' && icon}
</button>
  );
};

export default MagicButton;
