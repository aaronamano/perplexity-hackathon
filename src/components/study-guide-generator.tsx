"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, BookOpen, FileText } from "lucide-react"
import MediaPreferences from "./media-preferences"
import StudyPlanAdjuster from "./study-plan-adjuster"
import PracticeOptions from "./practice-options"
import StudyGuideDisplay from "./study-guide-display"
import TopicInput from "./topic-input" // Declare the TopicInput variable
import TopicTextarea from "./topic-textarea"
import { toast } from "sonner"

export default function StudyGuideGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [studyGuide, setStudyGuide] = useState<string | null>(null)
  const [topics, setTopics] = useState("")
  const [constraints, setConstraints] = useState("")
  const [strengths, setStrengths] = useState([""])
  const [weaknesses, setWeaknesses] = useState([""])
  const [activeTab, setActiveTab] = useState("input")

  const handleGenerateStudyGuide = async () => {
    setIsGenerating(true)

    // Simulate API call to generate study guide

    try {
      const response = await fetch('/api/study-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics,
          constraints,
          strengths: strengths.filter(s => s.trim()),
          weaknesses: weaknesses.filter(w => w.trim()),
          mediaPreferences: {
            videos: (document.getElementById('videos') as HTMLInputElement | null)?.checked || false,
            flashcards: (document.getElementById('flashcards') as HTMLInputElement | null)?.checked || false,
            diagrams: (document.getElementById('diagrams') as HTMLInputElement | null)?.checked || false,
            readings: (document.getElementById('readings') as HTMLInputElement | null)?.checked || false,
            summaries: (document.getElementById('summaries') as HTMLInputElement | null)?.checked || false,
            externalResources: (document.getElementById('resources') as HTMLInputElement | null)?.checked || false,
          },
          studyPlan: {
            duration: 'medium', // You can make this dynamic based on your select input
            intensity: 'balanced', // You can make this dynamic based on your radio input
            difficulty: 50, // You can make this dynamic based on your slider
            learningStyle: 'visual', // You can make this dynamic based on your select input
          },
          practiceOptions: {
            includePracticeProblems: (document.getElementById('practice-problems') as HTMLInputElement | null)?.checked || false,
            includeMockExams: (document.getElementById('mock-exams') as HTMLInputElement | null)?.checked || false,
            difficulty: 'mixed', // You can make this dynamic based on your select input
            quantity: 50, // You can make this dynamic based on your slider
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate study guide');
      }

      const data = await response.json();
      setStudyGuide(data.studyGuide);
      setActiveTab('result');
    } catch (error) {
      console.error('Error generating study guide:', error);
      toast.error('Failed to generate study guide', {
        description: 'Please try again later',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100">
          <TabsTrigger value="input" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <FileText className="mr-2 h-4 w-4" />
            Input Parameters
          </TabsTrigger>
          <TabsTrigger value="result" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BookOpen className="mr-2 h-4 w-4" />
            Study Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Topics & Concepts</h2>
                  <TopicTextarea value={topics} onChange={setTopics} />
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Constraints & Requirements</h2>
                  <Label htmlFor="constraints">Study Constraints</Label>
                  <Textarea
                    id="constraints"
                    placeholder="Enter any constraints (e.g., time available, exam date, specific format requirements)"
                    className="mt-2"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Media Preferences</h2>
                  <MediaPreferences />
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Strengths & Weaknesses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <TopicInput
                        items={strengths}
                        setItems={setStrengths}
                        placeholder="Enter a strength"
                        label="Strengths"
                      />
                    </div>
                    <div>
                      <TopicInput
                        items={weaknesses}
                        setItems={setWeaknesses}
                        placeholder="Enter a weakness"
                        label="Weaknesses"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Study Plan Preferences</h2>
                  <StudyPlanAdjuster />
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Practice Materials</h2>
                  <PracticeOptions />
                </div>

                <Button
                  onClick={handleGenerateStudyGuide}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  size="lg"
                  disabled={isGenerating || !topics.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Study Guide...
                    </>
                  ) : (
                    "Create Study Guide"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="mt-6">
          <StudyGuideDisplay studyGuide={studyGuide} isGenerating={isGenerating} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
