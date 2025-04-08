"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfilePictureUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ProfilePictureUpload({ value, onChange }: ProfilePictureUploadProps) {
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.).",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getInitials = () => {
    // This is a placeholder - in a real app, you'd get initials from the user's name
    return "U"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <Avatar className="h-24 w-24 cursor-pointer">
          {value ? (
            <AvatarImage src={value} alt="Profile picture" />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-xl">{getInitials()}</AvatarFallback>
          )}
        </Avatar>

        {/* Overlay with actions */}
        {isHovering && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-5 w-5" />
              <span className="sr-only">Upload photo</span>
            </Button>
            {value && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={handleRemove}>
                <X className="h-5 w-5" />
                <span className="sr-only">Remove photo</span>
              </Button>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload profile picture"
      />

      <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => fileInputRef.current?.click()}>
        <Upload className="h-3 w-3 mr-1" />
        {value ? "Change photo" : "Upload photo"}
      </Button>
    </div>
  )
}
