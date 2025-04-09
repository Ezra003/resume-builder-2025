"use client"

import { useResume } from "@/hooks/use-resume"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MinimalTemplate() {
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
      <div className="mb-8 text-center">
        {personalInfo.profilePicture && (
          <div className="flex justify-center mb-4">
            <Avatar className="h-28 w-28 border border-gray-200">
              <AvatarImage src={personalInfo.profilePicture} alt={personalInfo.name || "Profile"} />
              <AvatarFallback>{getInitials(personalInfo.name || "User")}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <h1 className="text-3xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
        <h2 className="text-lg text-gray-600 mb-3">{personalInfo.title || "Professional Title"}</h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-sm text-center max-w-2xl mx-auto">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-wider text-center mb-4 font-semibold">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h4 className="font-bold">{exp.position}</h4>
                <h5 className="text-gray-600">
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ""}
                </h5>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-sm max-w-2xl mx-auto">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-wider text-center mb-4 font-semibold">Education</h3>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h4 className="font-bold">{edu.institution}</h4>
                <h5 className="text-gray-600">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ""}
                </h5>
                <p className="text-sm text-gray-600 mb-2">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.description && <p className="text-sm max-w-2xl mx-auto">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-wider text-center mb-4 font-semibold">Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 px-3 py-1 rounded-full text-sm">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-wider text-center mb-4 font-semibold">Projects</h3>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="text-center">
                <div className="mb-2">
                  <h4 className="font-bold text-lg">{project.name}</h4>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-1">{project.technologies}</p>
                  )}
                </div>
                <div className="max-w-2xl mx-auto mb-2">
                  <p className="text-sm leading-relaxed">{project.description}</p>
                </div>
                {project.link && (
                  <div className="mt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
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
