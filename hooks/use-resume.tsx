"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type PersonalInfo = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  profilePicture?: string // Base64 encoded image
}

export type Education = {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export type Skill = {
  id: string
  name: string
  level: number
}

export type Project = {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}

export type ResumeData = {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  projects: Project[]
  theme?: string
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    profilePicture: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  theme: "classic",
}

type ResumeContextType = {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addExperience: (experience: Omit<Experience, "id">) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: Omit<Skill, "id">) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  setTheme: (theme: string) => void
  resetResume: () => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }))
  }

  const addEducation = (education: Omit<Education, "id">) => {
    const id = crypto.randomUUID()
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id }],
    }))
  }

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...education } : item)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }

  const addExperience = (experience: Omit<Experience, "id">) => {
    const id = crypto.randomUUID()
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id }],
    }))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...experience } : item)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }

  const addSkill = (skill: Omit<Skill, "id">) => {
    const id = crypto.randomUUID()
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id }],
    }))
  }

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...skill } : item)),
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }))
  }

  const addProject = (project: Omit<Project, "id">) => {
    const id = crypto.randomUUID()
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id }],
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...project } : item)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }))
  }

  const setTheme = (theme: string) => {
    setResumeData((prev) => ({
      ...prev,
      theme,
    }))
  }

  const resetResume = () => {
    setResumeData(defaultResumeData)
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        setTheme,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
