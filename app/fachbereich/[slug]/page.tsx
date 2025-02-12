import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/Breadcrumb"

const themenkomplexe = {
  csharp: [
    { name: "General", slug: "general" },
    { name: "Error Handling", slug: "error-handling" },
    { name: "Logging", slug: "logging" },
    { name: "LINQ", slug: "linq" },
    { name: "Async Programming", slug: "async-programming" },
  ],
  testing: [
    { name: "Unit Testing", slug: "unit-testing" },
    { name: "Integration Testing", slug: "integration-testing" },
    { name: "Test-Driven Development", slug: "tdd" },
    { name: "Mocking", slug: "mocking" },
  ],
  sql: [
    { name: "Basic Queries", slug: "basic-queries" },
    { name: "Joins", slug: "joins" },
    { name: "Indexing", slug: "indexing" },
    { name: "Stored Procedures", slug: "stored-procedures" },
  ],
  networking: [
    { name: "OSI Model", slug: "osi-model" },
    { name: "TCP/IP", slug: "tcp-ip" },
    { name: "Subnetting", slug: "subnetting" },
    { name: "Network Security", slug: "network-security" },
  ],
  "web-development": [
    { name: "HTML", slug: "html" },
    { name: "CSS", slug: "css" },
    { name: "JavaScript", slug: "javascript" },
    { name: "React", slug: "react" },
    { name: "Node.js", slug: "nodejs" },
  ],
}

export default function FachbereichPage({ params }: { params: { slug: string } }) {
  const fachbereich = params.slug
  const topics = themenkomplexe[fachbereich as keyof typeof themenkomplexe]

  if (!topics) {
    notFound()
  }

  const fachbereichName = fachbereich
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: fachbereichName, href: `/fachbereich/${fachbereich}` }]} />

      <h1 className="text-4xl font-bold my-8">{fachbereichName} Topics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link href={`/fachbereich/${fachbereich}/${topic.slug}`} key={topic.slug}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle>{topic.name}</CardTitle>
                <CardDescription>Explore {topic.name} questions</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

