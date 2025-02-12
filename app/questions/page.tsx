"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This is sample data. In a real application, this would come from a database.
const allQuestions = [
  {
    id: 1,
    question: "What is a variable in C#?",
    answer: "A variable in C# is a container for storing data values. It has a name, a type, and a value.",
    topics: ["C#"],
  },
  {
    id: 2,
    question: "Explain the concept of inheritance in C#.",
    answer:
      "Inheritance is a mechanism in C# that allows a class to inherit properties and methods from another class. It promotes code reuse and establishes a relationship between a base class and one or more derived classes.",
    topics: ["C#"],
  },
  {
    id: 3,
    question: "What is a primary key in SQL?",
    answer:
      "A primary key is a column or set of columns in a table that uniquely identifies each row in that table. It must contain unique values and cannot contain null values.",
    topics: ["SQL"],
  },
  {
    id: 4,
    question: "Explain the difference between GET and POST methods in PHP.",
    answer:
      "GET sends data as part of the URL, while POST sends data in the request body. GET is less secure and has size limitations, while POST can handle larger amounts of data and is more secure for sensitive information.",
    topics: ["PHP"],
  },
  {
    id: 5,
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. It allows for data privacy and the creation of function factories.",
    topics: ["JavaScript"],
  },
  {
    id: 6,
    question: "Explain the concept of state in React.",
    answer:
      "State in React is an object that holds data that may change over time. When state is updated, React re-renders the component to reflect the new state. It's used to make components interactive and dynamic.",
    topics: ["React"],
  },
]

export default function QuestionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const apprenticeId = searchParams.get("apprenticeId")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const topics = Array.from(new Set(allQuestions.flatMap((q) => q.topics)))

  const filteredQuestions = allQuestions.filter(
    (q) =>
      (searchTerm === "" || q.question.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTopic === null || q.topics.includes(selectedTopic)),
  )

  const addQuestionToApprentice = (questionId: number) => {
    // In a real application, this would make an API call to add the question to the apprentice
    console.log(`Adding question ${questionId} to apprentice ${apprenticeId}`)
    router.push(`/apprentices/${apprenticeId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: "Questions", href: "/questions" }]} />

      <h1 className="text-4xl font-bold my-8">Browse Questions</h1>

      <div className="mb-8 flex gap-4">
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <select
          value={selectedTopic || ""}
          onChange={(e) => setSelectedTopic(e.target.value || null)}
          className="border rounded p-2"
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{question.answer}</p>
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  {question.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>
                {apprenticeId && (
                  <Button onClick={() => addQuestionToApprentice(question.id)}>Add to Apprentice</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

