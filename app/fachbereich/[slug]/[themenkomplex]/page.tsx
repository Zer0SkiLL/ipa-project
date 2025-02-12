"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/Breadcrumb"

type Difficulty = "easy" | "medium" | "hard" | "expert"

interface Question {
  id: number
  difficulty: Difficulty
  question: string
  answer: string
}

const questions: Question[] = [
  {
    id: 1,
    difficulty: "easy",
    question: "What is a variable in C#?",
    answer: "A variable in C# is a container for storing data values. It has a name, a type, and a value.",
  },
  {
    id: 2,
    difficulty: "medium",
    question: "Explain the concept of inheritance in C#.",
    answer:
      "Inheritance is a mechanism in C# that allows a class to inherit properties and methods from another class. It promotes code reuse and establishes a relationship between a base class and one or more derived classes.",
  },
  {
    id: 3,
    difficulty: "hard",
    question: "What is the difference between 'ref' and 'out' parameters in C#?",
    answer:
      "'ref' and 'out' are both used to pass arguments by reference, but 'ref' requires the variable to be initialized before passing, while 'out' doesn't. 'out' parameters must be assigned a value inside the method.",
  },
  {
    id: 4,
    difficulty: "expert",
    question: "Explain the concept of covariance and contravariance in C#.",
    answer:
      "Covariance and contravariance are concepts related to the type system in C#. Covariance allows you to use a more derived type than originally specified, while contravariance allows you to use a less derived type. These concepts are typically used with generic interfaces and delegates.",
  },
]

const difficultyColors: Record<Difficulty, string> = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-orange-500",
  expert: "bg-red-500",
}

export default function ThemenkomplexPage({ params }: { params: { slug: string; themenkomplex: string } }) {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  const fachbereichName = params.slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const themenkomplexName = params.themenkomplex
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: fachbereichName, href: `/fachbereich/${params.slug}` },
          { name: themenkomplexName, href: `/fachbereich/${params.slug}/${params.themenkomplex}` },
        ]}
      />

      <h1 className="text-4xl font-bold my-8">
        {fachbereichName} - {themenkomplexName}
      </h1>

      <div className="space-y-4">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{question.question}</CardTitle>
                <Badge className={`${difficultyColors[question.difficulty]} text-white`}>{question.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between" onClick={() => toggleQuestion(question.id)}>
                {expandedQuestions.includes(question.id) ? "Hide Answer" : "Show Answer"}
                {expandedQuestions.includes(question.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              {expandedQuestions.includes(question.id) && (
                <div className="mt-4 p-4 bg-muted rounded-md">{question.answer}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

