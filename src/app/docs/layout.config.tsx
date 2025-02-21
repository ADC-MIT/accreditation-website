import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex flex-row items-center">
        <Image src="/favicon.png" alt="Institute Logo" height={24} width={24} />
        <svg height="28" width="28" role="separator" viewBox="0 0 32 32">
          <path
            d="M22 5L9 28"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current"
          />
        </svg>
        <span className="text-lg font-semibold tracking-tight">
          accreditation.
        </span>
      </div>
    ),
  },
};
