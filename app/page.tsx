"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Download, Save, Upload, FileUp, Trash2, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { EducationForm } from "@/components/education-form"
import { ExperienceForm } from "@/components/experience-form"
import { SkillsForm } from "@/components/skills-form"
import { ProjectsForm } from "@/components/projects-form"
import { ResumePreview } from "@/components/resume-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useResume } from "@/hooks/use-resume"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeSelector } from "@/components/theme-selector"
import type { ResumeData } from "@/hooks/use-resume"
import { sampleResumeData } from "@/lib/sample-data"

export default function ResumePage() {
  const { resumeData, setResumeData, resetResume } = useResume()
  const [activeTab, setActiveTab] = useState("personal")
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  // Only run client-side
  useEffect(() => {
    setIsMounted(true)

    // Load from localStorage if available
    const savedResume = localStorage.getItem("resumeData")
    if (savedResume) {
      try {
        const parsedData = JSON.parse(savedResume)
        setResumeData(parsedData)
        // Delay the toast to ensure the context is available
        setTimeout(() => {
          toast({
            title: "Resume loaded",
            description: "Your previously saved resume has been loaded.",
          })
        }, 100)
      } catch (error) {
        console.error("Failed to parse saved resume data:", error)
      }
    }
  }, [setResumeData, toast])

  const handlePrint = () => {
    if (previewRef.current) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${resumeData.personalInfo.name || "Resume"}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .resume-container { max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { font-size: 24px; margin-bottom: 5px; }
                h2 { font-size: 18px; color: #666; margin-bottom: 15px; }
                h3 { font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                .contact-info { display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px; color: #666; margin-bottom: 20px; }
                .section { margin-bottom: 20px; }
                .item { margin-bottom: 15px; }
                .item-header { display: flex; justify-content: space-between; }
                .item-title { font-weight: bold; }
                .item-subtitle { color: #666; }
                .item-date { font-size: 14px; color: #666; }
                .item-description { font-size: 14px; margin-top: 5px; }
                .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
                .skill-item { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
                @media print {
                  body { -webkit-print-color-adjust: exact; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body onload="window.print();window.close()">
              <div class="resume-container">
                ${previewRef.current.innerHTML}
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(resumeData))
      toast({
        title: "Resume saved",
        description: "Your resume has been saved to your browser's local storage.",
      })
    } catch (error) {
      toast({
        title: "Error saving resume",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive",
      })
    }
  }

  const exportResumeData = () => {
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `resume-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importResumeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      fileReader.readAsText(event.target.files[0], "UTF-8")
      fileReader.onload = (e) => {
        try {
          if (e.target && typeof e.target.result === "string") {
            const imported = JSON.parse(e.target.result) as ResumeData
            setResumeData(imported)
            toast({
              title: "Resume imported",
              description: "Your resume has been imported successfully.",
            })
          }
        } catch (error) {
          toast({
            title: "Error importing resume",
            description: "The file you selected is not a valid resume file.",
            variant: "destructive",
          })
        }
      }
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const loadSampleData = () => {
    setResumeData(sampleResumeData)
    toast({
      title: "Sample data loaded",
      description: "Sample resume data has been loaded. You can now edit it.",
    })
  }

  const handleClearResume = () => {
    resetResume()
    toast({
      title: "Resume cleared",
      description: "Your resume has been reset to blank.",
    })
  }

  if (!isMounted) {
    return null // Prevent hydration errors
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileQuestion className="mr-2 h-4 w-4" />
                Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Resume Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={saveToLocalStorage}>
                <Save className="mr-2 h-4 w-4" />
                Save to Browser
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportResumeData}>
                <Download className="mr-2 h-4 w-4" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={triggerFileInput}>
                <Upload className="mr-2 h-4 w-4" />
                Import from JSON
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={loadSampleData}>
                <FileUp className="mr-2 h-4 w-4" />
                Load Sample Data
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Resume
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This will clear all your resume data. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => document.body.click()}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleClearResume}>
                      Clear Resume
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeSelector />

          <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>

          <input type="file" ref={fileInputRef} onChange={importResumeData} accept=".json" className="hidden" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <PersonalInfoForm />
            </TabsContent>
            <TabsContent value="education">
              <EducationForm />
            </TabsContent>
            <TabsContent value="experience">
              <ExperienceForm />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsForm />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsForm />
            </TabsContent>
          </Tabs>
        </div>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div id="resume-preview" ref={previewRef} className="w-full">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  )
}
