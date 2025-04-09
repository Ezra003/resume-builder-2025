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
import html2pdf from "html2pdf.js"
import { PersonalInfo, Education, Experience, Skill, Project, ResumeData } from "@/hooks/use-resume"

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
    const sampleData: ResumeData = {
      personalInfo: {
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        location: "New York, NY",
        website: "https://johndoe.dev",
        summary: "Experienced software engineer with a passion for building scalable web applications.",
        profilePicture: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230070f3'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3EJD%3C/text%3E%3C/svg%3E"
      },
      education: [
        {
          id: crypto.randomUUID(),
          institution: "New York University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015",
          endDate: "2019",
          description: "Coursework: Data Structures, Algorithms, Computer Systems, Web Development"
        }
      ],
      experience: [
        {
          id: crypto.randomUUID(),
          company: "ABC Corporation",
          position: "Software Engineer",
          location: "New York, NY",
          startDate: "2020",
          endDate: "Present",
          current: true,
          description: "Developed multiple web applications using React, Node.js, and MongoDB"
        }
      ],
      skills: [
        {
          id: crypto.randomUUID(),
          name: "JavaScript",
          level: 5
        },
        {
          id: crypto.randomUUID(),
          name: "TypeScript",
          level: 5
        },
        {
          id: crypto.randomUUID(),
          name: "React",
          level: 5
        },
        {
          id: crypto.randomUUID(),
          name: "Node.js",
          level: 4
        },
        {
          id: crypto.randomUUID(),
          name: "MongoDB",
          level: 4
        }
      ],
      projects: [
        {
          id: crypto.randomUUID(),
          name: "Personal Website",
          description: "A personal website built using React, Next.js, and Tailwind CSS",
          technologies: "React, Next.js, Tailwind CSS",
          link: "https://johndoe.dev"
        }
      ],
      theme: "classic"
    }
    setResumeData(sampleData)
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

  const exportToPDF = () => {
    if (!previewRef.current) {
      toast({
        title: "Error",
        description: "No preview available to export",
        variant: "destructive",
      })
      return
    }

    // Ensure we're running on the client side
    if (typeof window === 'undefined') {
      toast({
        title: "Error",
        description: "PDF export is only available in the browser",
        variant: "destructive",
      })
      return
    }

    try {
      const element = previewRef.current
      const options = {
        margin: [25, 25, 25, 25], // Left, Top, Right, Bottom
        filename: `${resumeData.personalInfo.name || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: false,
          onclone: function(doc: Document) {
            // Ensure the profile picture is properly loaded
            const profileImg = doc.querySelector('.profile-picture') as HTMLImageElement
            if (profileImg && profileImg.src) {
              const img = new Image()
              img.src = profileImg.src
              img.onload = () => {
                profileImg.src = img.src
              }
            }
          },
          backgroundColor: '#ffffff',
          letterRendering: 1,
          ignoreElements: (element: HTMLElement) => {
            // Prevent page breaks within words
            if (element.tagName === 'SPAN' || element.tagName === 'A') {
              return false
            }
            return false
          }
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true,
          putOnlyUsedFonts: true,
          pageBreak: {
            mode: 'avoid-all',
            before: (currentElement: HTMLElement, elementsOnPage: HTMLElement[]) => {
              // Prevent page breaks within paragraphs
              if (currentElement.tagName === 'P') {
                return false
              }
              return false
            },
            after: (currentElement: HTMLElement, elementsOnPage: HTMLElement[]) => {
              // Prevent page breaks within items
              if (currentElement.classList.contains('item')) {
                return false
              }
              return false
            }
          }
        }
      }

      // Create a temporary container to clone the resume
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = element.innerHTML
      
      // Add print-specific styles
      const style = document.createElement('style')
      style.textContent = `
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
          width: 100%;
          padding: 20mm;
          box-sizing: border-box;
        }
        
        .profile-picture {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }
        
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 20mm;
        }
        
        .contact-info {
          margin-top: 10mm;
          font-size: 12pt;
          color: #666;
        }
        
        .section {
          margin-bottom: 15mm;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          page-break-after: avoid;
          break-after: avoid;
        }
        
        .section-title {
          font-size: 14pt;
          font-weight: bold;
          color: #0070f3;
          margin-bottom: 5mm;
          border-bottom: 2px solid #0070f3;
          padding-bottom: 2mm;
          page-break-after: avoid;
          break-after: avoid;
        }
        
        .item {
          margin-bottom: 10mm;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          page-break-after: avoid;
          break-after: avoid;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5mm;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        .item-title {
          font-weight: bold;
          font-size: 12pt;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        .item-subtitle {
          color: #666;
          font-size: 11pt;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        .item-date {
          color: #666;
          font-size: 11pt;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        .item-description {
          font-size: 11pt;
          color: #333;
          margin-top: 5mm;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          word-break: keep-all;
          hyphens: none;
          white-space: pre-wrap;
        }
        
        .item-description p {
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          word-break: keep-all;
          hyphens: none;
          white-space: pre-wrap;
        }
        
        .item-description a {
          color: #0070f3;
          text-decoration: underline;
          word-break: break-all;
          display: inline-block;
          margin-top: 5mm;
          font-size: 11pt;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 5mm;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        .skill-item {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 11pt;
          color: #333;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        @page {
          margin: 25mm;
          size: A4;
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        /* Prevent word splitting across pages */
        p {
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          word-break: keep-all;
          hyphens: none;
          white-space: pre-wrap;
        }
        
        /* Prevent section breaks across pages */
        .section {
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          page-break-after: avoid;
          break-after: avoid;
        }
        
        /* Prevent list items from breaking across pages */
        ul, ol {
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        li {
          page-break-inside: avoid;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        
        /* Additional WebKit-specific rules */
        * {
          -webkit-column-break-inside: avoid;
          -webkit-column-break-after: avoid;
          -webkit-column-break-before: avoid;
        }
        
        /* Prevent splitting of inline elements */
        span, a {
          display: inline-block;
          white-space: nowrap;
        }
      `
      tempContainer.appendChild(style)
      
      // Wait for images to load
      const images = tempContainer.getElementsByTagName('img')
      const promises = Array.from(images).map(img => new Promise(resolve => {
        if (img.complete) resolve(null)
        else img.onload = resolve
      }))

      Promise.all(promises).then(() => {
        // @ts-ignore
        html2pdf().set(options).from(tempContainer).save()
        
        toast({
          title: "PDF Exported",
          description: "Your resume has been exported to PDF.",
        })
      }).catch(error => {
        console.error('Error loading images:', error)
        toast({
          title: "Error",
          description: "Failed to load images. PDF may be incomplete.",
          variant: "destructive",
        })
      })
    } catch (error) {
      console.error('Error exporting PDF:', error)
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      })
    }
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

          <Button onClick={exportToPDF} variant="outline">
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
