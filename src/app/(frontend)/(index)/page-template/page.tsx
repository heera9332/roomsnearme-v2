import '@/app/(frontend)/globals.css'

export default function PageTemplate() {
  return (
    <div className="max-w-7xl mx-auto py-4">
      <h1 className="text-3xl font-bold">Page Template</h1>
    </div>
  )
}

export function PageTemplateSingleColumn() {
  return (
    <div className="max-w-7xl mx-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <h1 className="text-3xl font-bold">Page Template</h1>
    </div>
  )
}
