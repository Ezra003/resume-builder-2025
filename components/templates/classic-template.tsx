"use client"

import { useResume } from "@/hooks/use-resume"
import { Mail, MapPin, Phone, Globe } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ClassicTemplate() {
  const { resumeData } = useResume()
  const { personalInfo, education, experience, skills, projects } = resumeData

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white text-black p-8 font-sans">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        {personalInfo.profilePicture && (
          <Avatar className="h-24 w-24 border border-gray-200">
            <AvatarImage src={personalInfo.profilePicture} alt={personalInfo.name || "Profile"} />
            <AvatarFallback>{getInitials(personalInfo.name || "User")}</AvatarFallback>
          </Avatar>
        )}
        <div className={personalInfo.profilePicture ? "flex-1" : ""}>
          <h1 className="text-3xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
          <h2 className="text-xl text-gray-600 mb-3">{personalInfo.title || "Professional Title"}</h2>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Professional Summary</h3>
          <Separator className="mb-3" />
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Work Experience</h3>
          <Separator className="mb-3" />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.position}</h4>
                    <h5 className="text-gray-600">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </h5>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Education</h3>
          <Separator className="mb-3" />
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{edu.institution}</h4>
                    <h5 className="text-gray-600">
                      {edu.degree}
                      {edu.field ? `, ${edu.field}` : ""}
                    </h5>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Skills</h3>
          <Separator className="mb-3" />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Projects</h3>
          <Separator className="mb-3" />
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">{project.name}</h4>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                </div>
                <p className="text-sm mt-1">{project.description}</p>
                {project.link && (
                  <div className="mt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                      style={{
                        display: 'inline-block',
                        wordBreak: 'break-all',
                        maxWidth: '100%',
                      }}
                    >
                      {project.link}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
