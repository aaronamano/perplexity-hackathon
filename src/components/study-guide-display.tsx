"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Download, Copy, Printer, BookOpen, ListChecks, FileText } from "lucide-react"
import { toast } from "sonner"

interface StudyGuideDisplayProps {
  studyGuide: string | null
  isGenerating: boolean
}

export default function StudyGuideDisplay({ studyGuide, isGenerating }: StudyGuideDisplayProps) {
  const [activeView, setActiveView] = useState("full")

  const handleCopy = () => {
    if (studyGuide) {
      navigator.clipboard.writeText(studyGuide)
      toast.success("Copied to clipboard", {
        description: "The study guide has been copied to your clipboard"
      })
    }
  }

  const handleDownload = () => {
    if (studyGuide) {
      const blob = new Blob([studyGuide], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "study-guide.md"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success("Downloaded", {
        description: "Your study guide has been downloaded"
      })
    }
  }

  const handlePrint = () => {
    if (studyGuide) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        // ...existing print code...
        printWindow.document.close()
        printWindow.print()
      }

      toast.success("Print prepared", {
        description: "Your study guide has been prepared for printing"
      })
    }
  }

  if (isGenerating) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
          <p className="mt-4 text-lg font-medium text-purple-700">Generating your personalized study guide...</p>
          <p className="text-sm text-muted-foreground mt-2">
            This may take a moment as we tailor the content to your preferences
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!studyGuide) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-10">
          <BookOpen className="h-10 w-10 text-purple-500" />
          <p className="mt-4 text-lg font-medium text-purple-700">No study guide generated yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Fill out the form and click "Create Study Guide" to generate your personalized study materials
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Study Guide</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-3 bg-purple-100">
          <TabsTrigger value="full" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BookOpen className="mr-2 h-4 w-4" />
            Full Guide
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <ListChecks className="mr-2 h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <FileText className="mr-2 h-4 w-4" />
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="full">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {studyGuide.split("\n").map((line, index) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-2xl font-bold mt-0 mb-4">
                        {line.substring(2)}
                      </h1>
                    )
                  } else if (line.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {line.substring(3)}
                      </h2>
                    )
                  } else if (line.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-6 mb-1">
                        {line.substring(2)}
                      </li>
                    )
                  } else if (line.trim() === "") {
                    return <br key={index} />
                  } else if (/^\d+\./.test(line)) {
                    return (
                      <div key={index} className="ml-6 mb-1">
                        {line}
                      </div>
                    )
                  } else {
                    return (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    )
                  }
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="font-medium">Front: What is the main focus of this study guide?</p>
                  <p className="mt-2 text-muted-foreground">
                    Back: The main topics include{" "}
                    {studyGuide.includes("Key Concepts")
                      ? studyGuide
                          .split("Key Concepts")[1]
                          .split("\n")
                          .filter((line) => line.startsWith("- "))
                          .map((line) => line.substring(2).split(":")[0])
                          .join(", ")
                      : "various concepts"}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="font-medium">Front: What are your strengths in this subject?</p>
                  <p className="mt-2 text-muted-foreground">
                    Back:{" "}
                    {studyGuide.includes("Strengths")
                      ? studyGuide
                          .split("Strengths")[1]
                          .split("Areas for Improvement")[0]
                          .split("\n")
                          .filter((line) => line.startsWith("- "))
                          .map((line) => line.substring(2))
                          .join(", ")
                      : "Various areas as indicated in your input"}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="font-medium">Front: What areas need improvement?</p>
                  <p className="mt-2 text-muted-foreground">
                    Back:{" "}
                    {studyGuide.includes("Areas for Improvement")
                      ? studyGuide
                          .split("Areas for Improvement")[1]
                          .split("Study Plan")[0]
                          .split("\n")
                          .filter((line) => line.startsWith("- "))
                          .map((line) => line.substring(2))
                          .join(", ")
                      : "Various areas as indicated in your input"}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-2">
                  More flashcards would be generated based on your specific topics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Study Guide Summary</h2>
                <p>This personalized study guide covers the following topics:</p>
                <ul className="my-4">
                  {studyGuide.includes("Key Concepts") ? (
                    studyGuide
                      .split("Key Concepts")[1]
                      .split("\n")
                      .filter((line) => line.startsWith("- "))
                      .map((line, index) => <li key={index}>{line.substring(2)}</li>)
                  ) : (
                    <li>Various topics as specified in your input</li>
                  )}
                </ul>

                <p className="mb-4">
                  The guide is structured to help you leverage your strengths while addressing areas that need
                  improvement. It includes a customized study plan with resources tailored to your learning preferences.
                </p>

                <div className="bg-muted p-4 rounded-lg mt-4">
                  <h3 className="text-lg font-medium mb-2">Key Recommendations</h3>
                  <ol className="list-decimal ml-5 space-y-1">
                    {studyGuide.includes("Study Plan") ? (
                      studyGuide
                        .split("Study Plan")[1]
                        .split("Resources")[0]
                        .split("\n")
                        .filter((line) => /^\d+\./.test(line))
                        .map((line, index) => <li key={index}>{line.substring(line.indexOf(".") + 1).trim()}</li>)
                    ) : (
                      <>
                        <li>Begin with reviewing basic concepts</li>
                        <li>Practice with the provided exercises</li>
                        <li>Review difficult concepts using the recommended resources</li>
                        <li>Test your knowledge with practice problems</li>
                      </>
                    )}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
