
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
      <path d="M7.5 12c-1.667 1.667-5 1-5-2.5S7 4.5 9.5 7c2.5 2.5 0 8.5-5 6.5" />
      <path d="M16.5 12c1.667 1.667 5 1 5-2.5S17 4.5 14.5 7c-2.5 2.5 0 8.5 5 6.5" />
      <path d="M8.5 7C11.167 5.167 14.5 6.5 16 9c2.5 4-2 8.5-7 7.5s-5.499-7-3-9Z" />
      <path d="M15.5 7C12.833 5.167 9.5 6.5 8 9c-2.5 4 2 8.5 7 7.5s5.499-7 3-9Z" />
      <path d="m11.5 11.5 1 1" />
      <path d="m12.5 11.5-1 1" />
    </svg>
  );
};

export default PretzelLogo;
