"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { useResume } from "@/hooks/use-resume"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume()
  const { skills } = resumeData

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: 3,
  })

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill)
      setNewSkill({
        name: "",
        level: 3,
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.name.trim()) {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Add your technical and professional skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-2">
                {skill.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove {skill.name}</span>
                </Button>
              </Badge>
            ))}
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <h3 className="font-medium">Add New Skill</h3>
            <div className="space-y-2">
              <Label htmlFor="new-skill">Skill Name</Label>
              <div className="flex gap-2">
                <Input
                  id="new-skill"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., JavaScript, Project Management, etc."
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Skill</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="new-skill-level">Proficiency Level</Label>
                <span className="text-sm text-muted-foreground">
                  {newSkill.level === 1
                    ? "Beginner"
                    : newSkill.level === 2
                      ? "Intermediate"
                      : newSkill.level === 3
                        ? "Advanced"
                        : newSkill.level === 4
                          ? "Expert"
                          : "Master"}
                </span>
              </div>
              <Slider
                id="new-skill-level"
                value={[newSkill.level]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
