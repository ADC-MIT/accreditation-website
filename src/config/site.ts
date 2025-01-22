import type { NavLink } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'MIT-ARS',
  description: 'The Accreditation and Ranking System for MIT Bengaluru.',
  institute: 'Manipal Institute of Technology, Bengaluru',

  navLinks: [] satisfies NavLink[],
};
