"use client"

import { useResume } from "@/hooks/use-resume"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"

export function ResumePreview() {
  const { resumeData } = useResume()
  const theme = resumeData.theme || "classic"

  // Render different templates based on the selected theme
  switch (theme) {
    case "modern":
      return <ModernTemplate />
    case "minimal":
      return <MinimalTemplate />
    case "classic":
    default:
      return <ClassicTemplate />
  }
}
