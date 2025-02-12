import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// This is sample data. In a real application, this would come from a database.
const apprentices = [
  { id: 1, name: "John Doe", projectTopics: ["C#", "SQL"] },
  { id: 2, name: "Jane Smith", projectTopics: ["PHP", "JavaScript"] },
  { id: 3, name: "Alice Johnson", projectTopics: ["Java", "React"] },
]

export default function ApprenticesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Apprentices</h1>
        <Button asChild>
          <Link href="/apprentices/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Apprentice
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apprentices.map((apprentice) => (
          <Link href={`/apprentices/${apprentice.id}`} key={apprentice.id}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle>{apprentice.name}</CardTitle>
                <CardDescription>Project Topics: {apprentice.projectTopics.join(", ")}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

