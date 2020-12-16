import * as React from 'react';

function MenuIcon({
  fill = 'currentColor',
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" {...rest}>
      <path
        fill={fill}
        d="M492 236H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20zM492 76H20C8.954 76 0 84.954 0 96s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20zM492 396H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20z"
      />
    </svg>
  );
}

export default MenuIcon;
