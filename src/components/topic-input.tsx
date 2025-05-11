"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X, FileText } from "lucide-react"
import { useState } from "react"

interface TopicInputProps {
  items: string[]
  setItems: React.Dispatch<React.SetStateAction<string[]>>
  placeholder: string
  label: string
}

export default function TopicInput({ items, setItems, placeholder, label }: TopicInputProps) {
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkText, setBulkText] = useState("")

  const addItem = () => {
    setItems([...items, ""])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    if (newItems.length === 0) {
      setItems([""])
    } else {
      setItems(newItems)
    }
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsBulkMode(!isBulkMode)}
          className="text-purple-700 hover:bg-purple-50"
        >
          <FileText className="mr-2 h-4 w-4" />
          {isBulkMode ? "Switch to Individual Input" : "Bulk Input"}
        </Button>
      </div>

      {isBulkMode ? (
        <div className="space-y-2">
          <Textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={`Enter multiple ${label.toLowerCase()} (one per line)\nExample:\nConcept 1\nConcept 2\nSubtopic 1\nSubtopic 2`}
            className="min-h-[200px]"
          />
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={placeholder}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                disabled={items.length === 1 && item === ""}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={addItem}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add {label.toLowerCase().slice(0, -1)}
          </Button>
        </>
      )}
    </div>
  )
}