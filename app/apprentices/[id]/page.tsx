"use client"

import { useState } from "react"
import Link from "next/link"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

export default function ApprenticePage({ params }: { params: { id: string } }) {
  const [apprentice, setApprentice] = useState({
    id: Number.parseInt(params.id),
    name: "John Doe",
    projectTopics: ["C#", "SQL"],
    assignedQuestions: [
      { id: 1, comment: "" },
      { id: 3, comment: "" },
    ],
  })

  const [newTopic, setNewTopic] = useState("")

  const addTopic = () => {
    if (newTopic && !apprentice.projectTopics.includes(newTopic)) {
      setApprentice({
        ...apprentice,
        projectTopics: [...apprentice.projectTopics, newTopic],
      })
      setNewTopic("")
    }
  }

  const toggleQuestion = (questionId: number) => {
    setApprentice({
      ...apprentice,
      assignedQuestions: apprentice.assignedQuestions.some((q) => q.id === questionId)
        ? apprentice.assignedQuestions.filter((q) => q.id !== questionId)
        : [...apprentice.assignedQuestions, { id: questionId, comment: "" }],
    })
  }

  const updateComment = (questionId: number, comment: string) => {
    setApprentice({
      ...apprentice,
      assignedQuestions: apprentice.assignedQuestions.map((q) => (q.id === questionId ? { ...q, comment } : q)),
    })
  }

  const suggestedQuestions = allQuestions.filter((q) => q.topics.some((t) => apprentice.projectTopics.includes(t)))

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "Apprentices", href: "/apprentices" },
          { name: apprentice.name, href: `/apprentices/${apprentice.id}` },
        ]}
      />

      <h1 className="text-4xl font-bold my-8">{apprentice.name}</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Project Topics</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {apprentice.projectTopics.map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add new topic"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
          />
          <Button onClick={addTopic}>Add Topic</Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Assigned Questions</h2>
        <div className="space-y-4">
          {allQuestions
            .filter((q) => apprentice.assignedQuestions.some((aq) => aq.id === q.id))
            .map((question) => {
              const assignedQuestion = apprentice.assignedQuestions.find((aq) => aq.id === question.id)
              return (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{question.answer}</p>
                    <Textarea
                      placeholder="Add a comment about the apprentice's answer"
                      value={assignedQuestion?.comment || ""}
                      onChange={(e) => updateComment(question.id, e.target.value)}
                      className="mb-4"
                    />
                    <Button variant="outline" onClick={() => toggleQuestion(question.id)}>
                      Remove Question
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Suggested Questions</h2>
        <div className="space-y-4">
          {suggestedQuestions
            .filter((q) => !apprentice.assignedQuestions.some((aq) => aq.id === q.id))
            .map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{question.answer}</p>
                  <Button variant="outline" onClick={() => toggleQuestion(question.id)}>
                    Add Question
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <Button asChild>
          <Link href={`/questions?apprenticeId=${apprentice.id}`}>Browse All Questions</Link>
        </Button>
      </div>
    </div>
  )
}

