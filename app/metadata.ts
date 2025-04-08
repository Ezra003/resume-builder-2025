import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes",
  description: "Build and export professional resumes with our easy-to-use resume builder. No login required.",
  keywords: ["resume", "cv", "builder", "job", "career", "professional", "template"],
  authors: [{ name: "Resume Builder Team" }],
  creator: "Resume Builder",
  publisher: "Resume Builder",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resume-builder.vercel.app",
    title: "Resume Builder - Create Professional Resumes",
    description: "Build and export professional resumes with our easy-to-use resume builder. No login required.",
    siteName: "Resume Builder",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=Resume+Builder",
        width: 1200,
        height: 630,
        alt: "Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Builder - Create Professional Resumes",
    description: "Build and export professional resumes with our easy-to-use resume builder. No login required.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
}
