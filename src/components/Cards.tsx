import Link from 'next/link'

interface CardProps {
  title: string
  href: string
}

export function Card({ title, href }: CardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
    </Link>
  )
}

export function Cards({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {children}
    </div>
  )
}