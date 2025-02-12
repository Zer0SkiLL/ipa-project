import { Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const fachbereiche = [
  { name: "C#", slug: "csharp" },
  { name: "Testing", slug: "testing" },
  { name: "SQL", slug: "sql" },
  { name: "Networking", slug: "networking" },
  { name: "Web Development", slug: "web-development" },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">IT Apprentice Exam Questions</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Search Questions</h2>
        <div className="flex gap-2">
          <Input type="text" placeholder="Enter keywords..." className="flex-grow" />
          <Button>
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Browse by Fachbereich</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fachbereiche.map((fachbereich) => (
            <Link href={`/fachbereich/${fachbereich.slug}`} key={fachbereich.slug}>
              <Card className="hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle>{fachbereich.name}</CardTitle>
                  <CardDescription>Explore {fachbereich.name} topics</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

