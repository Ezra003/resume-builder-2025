"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { useResume } from "@/hooks/use-resume"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume()
  const { education } = resumeData

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const handleAddEducation = () => {
    addEducation(newEducation)
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const handleChange = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.length > 0 && (
          <Accordion type="multiple" className="w-full">
            {education.map((edu, index) => (
              <AccordionItem key={edu.id} value={edu.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center text-left">
                    <span>
                      {edu.institution || "Institution"} - {edu.degree || "Degree"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                          placeholder="University or School Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${edu.id}`}
                          value={edu.field}
                          onChange={(e) => handleChange(edu.id, "field", e.target.value)}
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${edu.id}`}
                            value={edu.startDate}
                            onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${edu.id}`}
                            value={edu.endDate}
                            onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${edu.id}`}>Description</Label>
                      <Textarea
                        id={`description-${edu.id}`}
                        value={edu.description}
                        onChange={(e) => handleChange(edu.id, "description", e.target.value)}
                        placeholder="Relevant coursework, achievements, etc."
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button variant="destructive" size="sm" onClick={() => removeEducation(edu.id)} className="mt-2">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">Add New Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-institution">Institution</Label>
              <Input
                id="new-institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                placeholder="University or School Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-degree">Degree</Label>
              <Input
                id="new-degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-field">Field of Study</Label>
              <Input
                id="new-field"
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                placeholder="Computer Science, Business, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-startDate">Start Date</Label>
                <Input
                  id="new-startDate"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-endDate">End Date</Label>
                <Input
                  id="new-endDate"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  placeholder="MM/YYYY or Present"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-description">Description</Label>
            <Textarea
              id="new-description"
              value={newEducation.description}
              onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
              placeholder="Relevant coursework, achievements, etc."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddEducation} className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardFooter>
    </Card>
  )
}
