"use client"

import type React from "react"

import { useResume } from "@/hooks/use-resume"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProfilePictureUpload } from "@/components/profile-picture-upload"

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume()
  const { personalInfo } = resumeData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updatePersonalInfo({ [name]: value })
  }

  const handleProfilePictureChange = (value: string) => {
    updatePersonalInfo({ profilePicture: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Enter your personal and contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-4">
          <ProfilePictureUpload value={personalInfo.profilePicture || ""} onChange={handleProfilePictureChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              placeholder="John Doe"
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={personalInfo.title}
              onChange={handleChange}
              placeholder="Software Engineer"
              aria-required="true"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/LinkedIn</Label>
            <Input
              id="website"
              name="website"
              value={personalInfo.website}
              onChange={handleChange}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder="A brief summary of your professional background and goals"
            className="min-h-[120px]"
            aria-required="true"
          />
        </div>
      </CardContent>
    </Card>
  )
}
