"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FileQuestion, FileCheck, Clock } from "lucide-react"

export default function PracticeOptions() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start space-x-3 space-y-0">
          <Checkbox
            id="practice-problems"
            className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            defaultChecked
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="practice-problems" className="flex items-center">
              <FileQuestion className="mr-2 h-4 w-4" />
              Practice Problems
            </Label>
            <p className="text-sm text-muted-foreground">Include practice problems with solutions</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 space-y-0">
          <Checkbox
            id="mock-exams"
            className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="mock-exams" className="flex items-center">
              <FileCheck className="mr-2 h-4 w-4" />
              Mock Exams
            </Label>
            <p className="text-sm text-muted-foreground">Include full-length practice exams</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Problem Difficulty</Label>
        <Select defaultValue="mixed">
          <SelectTrigger className="border-purple-200 focus:ring-purple-500">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="problem-quantity" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Problem Quantity
          </Label>
          <span className="text-sm text-muted-foreground">Medium</span>
        </div>
        <Slider id="problem-quantity" defaultValue={[50]} max={100} step={1} className="text-purple-600" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Few</span>
          <span>Many</span>
        </div>
      </div>
    </div>
  )
}
