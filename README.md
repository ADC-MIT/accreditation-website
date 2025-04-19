# Accreditation and Reporting System (Website)

> ⚠️ **Note:** This repository has been archived and will no longer receive updates. For further information on the project's status and brand identity, please refer to the [organization's README](https://github.com/orgs/YCN-club).

The MIT-ARS, originally built for MIT Bengaluru, aims to reduce the manual work of information collection and handling that's required from institutions when applying for several nation-level accreditations.

This acts as an end-to-end portal that handles,

- Entry of data into a centralized repository,
- Categorization based on domain and level,
- Storage of overlapping parameters in different accreditations, and
- Export of data according to the accreditation specified by the user.

![App Screenshot](/public/meta/app-screenshot.png)

## Technologies Used

1. [Next.JS](https://nextjs.org), hosted as a Standalone Deployment.
2. [Tailwind CSS](https://tailwindcss.com), for styling.
3. [shadcn/ui](https://ui.shadcn.com), a UI component library based on [Radix UI](https://radix-ui.com).
4. [Fumadocs](https://fumadocs.vercel.app/), for documentation of data models and instructions.
5. [react-pdf](https://react-pdf.org/), for exporting data into a downloadable PDF.

## Development

Install the dependencies using `npm`.

```console
npm install
```

Alter the site configuration based on your institution's details.

```ts
import type { NavLink } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'MIT-ARS',
  description: 'The Accreditation and Ranking System for MIT Bengaluru.',
  institute: 'Manipal Institute of Technology, Bengaluru',

  navLinks: [] satisfies NavLink[],
};
```

Populate the environment variables based on your standalone deployment.

```env
# Backend URL
NEXT_PUBLIC_BACKEND_URL=localhost:8000/api
# Toggle certificate verification (0 = disabled, 1 = enabled)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Run the development server using the following command.

```console
npm dev
```
