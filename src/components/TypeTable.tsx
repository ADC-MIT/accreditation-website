interface TypeRowProps {
    name: string
    type: string
    description: string
  }
  
  export function TypeRow({ name, type, description }: TypeRowProps) {
    return (
      <tr>
        <td className="border px-4 py-2 font-mono text-sm">{name}</td>
        <td className="border px-4 py-2 font-mono text-sm">{type}</td>
        <td className="border px-4 py-2">{description}</td>
      </tr>
    )
  }
  
  export function TypeTable({ children }: { children: React.ReactNode }) {
    return (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-4 py-2 text-left">Field</th>
              <th className="border px-4 py-2 text-left">Type</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    )
  }