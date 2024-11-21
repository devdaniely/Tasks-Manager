'use client';

import type { ReactNode, AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export function Link({ children, href, ...props }: LinkProps): ReactNode {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
