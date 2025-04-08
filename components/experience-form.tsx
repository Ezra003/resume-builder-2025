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
import { Checkbox } from "@/components/ui/checkbox"

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume()
  const { experience } = resumeData

  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const handleAddExperience = () => {
    addExperience(newExperience)
    setNewExperience({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  const handleChange = (id: string, field: string, value: string | boolean) => {
    updateExperience(id, { [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add your professional experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.length > 0 && (
          <Accordion type="multiple" className="w-full">
            {experience.map((exp, index) => (
              <AccordionItem key={exp.id} value={exp.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center text-left">
                    <span>
                      {exp.position || "Position"} at {exp.company || "Company"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          value={exp.position}
                          onChange={(e) => handleChange(exp.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`location-${exp.id}`}>Location</Label>
                        <Input
                          id={`location-${exp.id}`}
                          value={exp.location}
                          onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                          placeholder="City, State or Remote"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${exp.id}`}
                            value={exp.startDate}
                            onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${exp.id}`}
                            value={exp.endDate}
                            onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                            placeholder="MM/YYYY or Present"
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) => {
                          handleChange(exp.id, "current", checked === true)
                          if (checked) {
                            handleChange(exp.id, "endDate", "Present")
                          }
                        }}
                      />
                      <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        value={exp.description}
                        onChange={(e) => handleChange(exp.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements"
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button variant="destructive" size="sm" onClick={() => removeExperience(exp.id)} className="mt-2">
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
          <h3 className="font-medium">Add New Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-company">Company</Label>
              <Input
                id="new-company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-position">Position</Label>
              <Input
                id="new-position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                placeholder="Job Title"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-location">Location</Label>
              <Input
                id="new-location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="City, State or Remote"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-startDate">Start Date</Label>
                <Input
                  id="new-startDate"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-endDate">End Date</Label>
                <Input
                  id="new-endDate"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  placeholder="MM/YYYY or Present"
                  disabled={newExperience.current}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-current"
              checked={newExperience.current}
              onCheckedChange={(checked) => {
                setNewExperience({
                  ...newExperience,
                  current: checked === true,
                  endDate: checked === true ? "Present" : newExperience.endDate,
                })
              }}
            />
            <Label htmlFor="new-current">I currently work here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-description">Description</Label>
            <Textarea
              id="new-description"
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              placeholder="Describe your responsibilities and achievements"
              className="min-h-[120px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddExperience} className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardFooter>
    </Card>
  )
}
