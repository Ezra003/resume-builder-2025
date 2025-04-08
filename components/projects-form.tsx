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

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume()
  const { projects } = resumeData

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
  })

  const handleAddProject = () => {
    addProject(newProject)
    setNewProject({
      name: "",
      description: "",
      technologies: "",
      link: "",
    })
  }

  const handleChange = (id: string, field: string, value: string) => {
    updateProject(id, { [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Add your notable projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length > 0 && (
          <Accordion type="multiple" className="w-full">
            {projects.map((project) => (
              <AccordionItem key={project.id} value={project.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center text-left">
                    <span>{project.name || "Project Name"}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                      <Input
                        id={`name-${project.id}`}
                        value={project.name}
                        onChange={(e) => handleChange(project.id, "name", e.target.value)}
                        placeholder="Project Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${project.id}`}>Description</Label>
                      <Textarea
                        id={`description-${project.id}`}
                        value={project.description}
                        onChange={(e) => handleChange(project.id, "description", e.target.value)}
                        placeholder="Describe the project, your role, and its impact"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                      <Input
                        id={`technologies-${project.id}`}
                        value={project.technologies}
                        onChange={(e) => handleChange(project.id, "technologies", e.target.value)}
                        placeholder="React, Node.js, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`link-${project.id}`}>Project Link</Label>
                      <Input
                        id={`link-${project.id}`}
                        value={project.link}
                        onChange={(e) => handleChange(project.id, "link", e.target.value)}
                        placeholder="https://github.com/yourusername/project"
                      />
                    </div>

                    <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)} className="mt-2">
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
          <h3 className="font-medium">Add New Project</h3>
          <div className="space-y-2">
            <Label htmlFor="new-name">Project Name</Label>
            <Input
              id="new-name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="Project Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-description">Description</Label>
            <Textarea
              id="new-description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Describe the project, your role, and its impact"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-technologies">Technologies Used</Label>
            <Input
              id="new-technologies"
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              placeholder="React, Node.js, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-link">Project Link</Label>
            <Input
              id="new-link"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              placeholder="https://github.com/yourusername/project"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddProject} className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardFooter>
    </Card>
  )
}
