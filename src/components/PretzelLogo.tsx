
import React from 'react';

interface PretzelLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const PretzelLogo: React.FC<PretzelLogoProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Simple pretzel shape with three loops */}
      <path d="M8 12c0-2.5 2-4.5 4-4.5s4 2 4 4.5-2 4.5-4 4.5-4-2-4-4.5z" />
      <path d="M6 7c-2 1-3 3-3 5s1 4 3 5" />
      <path d="M18 7c2 1 3 3 3 5s-1 4-3 5" />
      <path d="M8 6c2-1.5 6-1.5 8 0" />
      <path d="M8 18c2 1.5 6 1.5 8 0" />
    </svg>
  );
};

export default PretzelLogo;
