"use client"

import { useResume } from "@/hooks/use-resume"
import { Mail, MapPin, Phone, Globe, Calendar, Briefcase, GraduationCap, Code, Layers } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ModernTemplate() {
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
    <div className="w-full max-w-[800px] mx-auto bg-white text-black font-sans">
      {/* Header with background color */}
      <div className="bg-slate-800 text-white p-8 mb-6">
        <div className="flex items-center gap-4 mb-4">
          {personalInfo.profilePicture && (
            <Avatar className="h-24 w-24 border-2 border-white/20">
              <AvatarImage src={personalInfo.profilePicture} alt={personalInfo.name || "Profile"} />
              <AvatarFallback className="bg-slate-700 text-white">
                {getInitials(personalInfo.name || "User")}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
            <h2 className="text-xl opacity-90">{personalInfo.title || "Professional Title"}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-80">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Briefcase className="h-5 w-5 mr-2 text-slate-800" />
              <h3 className="text-lg font-bold text-slate-800">Work Experience</h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-200 pl-4 ml-1 relative">
                  <div className="absolute w-3 h-3 bg-slate-800 rounded-full -left-[7px] top-1"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h4 className="font-bold">{exp.position}</h4>
                      <h5 className="text-slate-600">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ""}
                      </h5>
                    </div>
                    <div className="text-sm text-slate-600 flex items-center mt-1 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
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
            <div className="flex items-center mb-3">
              <GraduationCap className="h-5 w-5 mr-2 text-slate-800" />
              <h3 className="text-lg font-bold text-slate-800">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-slate-200 pl-4 ml-1 relative">
                  <div className="absolute w-3 h-3 bg-slate-800 rounded-full -left-[7px] top-1"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h4 className="font-bold">{edu.institution}</h4>
                      <h5 className="text-slate-600">
                        {edu.degree}
                        {edu.field ? `, ${edu.field}` : ""}
                      </h5>
                    </div>
                    <div className="text-sm text-slate-600 flex items-center mt-1 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 mr-2 text-slate-800" />
                <h3 className="text-lg font-bold text-slate-800">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Layers className="h-5 w-5 mr-2 text-slate-800" />
                <h3 className="text-lg font-bold text-slate-800">Projects</h3>
              </div>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="item">
                    <div className="item-header">
                      <div className="item-title">{project.name}</div>
                      {project.technologies && (
                        <div className="item-subtitle">{project.technologies}</div>
                      )}
                    </div>
                    <div className="item-description">
                      {project.description}
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
