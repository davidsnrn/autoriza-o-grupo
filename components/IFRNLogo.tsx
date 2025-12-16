import React from 'react';

export const IFRNLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 108 140" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="#CC0000" />
      <g fill="#32A041">
        {/* Line 1 */}
        <rect x="35" y="0" width="30" height="30" rx="6" />
        <rect x="70" y="0" width="30" height="30" rx="6" />
        
        {/* Line 2 */}
        <rect x="0" y="35" width="30" height="30" rx="6" />
        <rect x="35" y="35" width="30" height="30" rx="6" />
        
        {/* Line 3 */}
        <rect x="0" y="70" width="30" height="30" rx="6" />
        <rect x="35" y="70" width="30" height="30" rx="6" />
        <rect x="70" y="70" width="30" height="30" rx="6" />
        
        {/* Line 4 */}
        <rect x="0" y="105" width="30" height="30" rx="6" />
        <rect x="35" y="105" width="30" height="30" rx="6" />
      </g>
    </svg>
  );
};
