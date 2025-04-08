import type { ResumeData } from "@/hooks/use-resume"

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "linkedin.com/in/alexjohnson",
    summary:
      "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Proficient in JavaScript, TypeScript, React, and Node.js. Strong problem-solving skills and a track record of delivering high-quality software on time.",
    profilePicture:
      "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23CCCCCC'/%3E%3Ctext x='50%25' y='50%25' font-size='50' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%23555555'%3EAJ%3C/text%3E%3C/svg%3E",
  },
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "09/2014",
      endDate: "05/2018",
      description:
        "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems, Software Engineering",
    },
    {
      id: "2",
      institution: "Coding Bootcamp",
      degree: "Certificate",
      field: "Full Stack Web Development",
      startDate: "01/2019",
      endDate: "04/2019",
      description: "Intensive 12-week program focused on modern web technologies including React, Node.js, and MongoDB",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "06/2021",
      endDate: "Present",
      current: true,
      description:
        "• Lead a team of 5 developers in building and maintaining a SaaS platform with 50,000+ users\n• Implemented CI/CD pipeline that reduced deployment time by 70%\n• Optimized database queries resulting in a 40% improvement in application performance\n• Mentored junior developers and conducted code reviews",
    },
    {
      id: "2",
      company: "WebSolutions Co.",
      position: "Full Stack Developer",
      location: "Oakland, CA",
      startDate: "05/2019",
      endDate: "05/2021",
      current: false,
      description:
        "• Developed responsive web applications using React, Redux, and Node.js\n• Collaborated with UX/UI designers to implement pixel-perfect interfaces\n• Built RESTful APIs and integrated third-party services\n• Participated in agile development processes including daily stand-ups and sprint planning",
    },
    {
      id: "3",
      company: "StartUp Labs",
      position: "Junior Developer",
      location: "Remote",
      startDate: "06/2018",
      endDate: "12/2018",
      current: false,
      description:
        "• Assisted in developing front-end components using React\n• Fixed bugs and implemented minor features\n• Participated in code reviews and team meetings",
    },
  ],
  skills: [
    {
      id: "1",
      name: "JavaScript",
      level: 5,
    },
    {
      id: "2",
      name: "TypeScript",
      level: 4,
    },
    {
      id: "3",
      name: "React",
      level: 5,
    },
    {
      id: "4",
      name: "Node.js",
      level: 4,
    },
    {
      id: "5",
      name: "Express",
      level: 4,
    },
    {
      id: "6",
      name: "MongoDB",
      level: 3,
    },
    {
      id: "7",
      name: "PostgreSQL",
      level: 3,
    },
    {
      id: "8",
      name: "Docker",
      level: 3,
    },
    {
      id: "9",
      name: "AWS",
      level: 3,
    },
    {
      id: "10",
      name: "Git",
      level: 4,
    },
    {
      id: "11",
      name: "CI/CD",
      level: 3,
    },
    {
      id: "12",
      name: "HTML/CSS",
      level: 4,
    },
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description:
        "Built a full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
      technologies: "React, Node.js, Express, MongoDB, Stripe API",
      link: "https://github.com/alexjohnson/ecommerce-platform",
    },
    {
      id: "2",
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates and team workspaces.",
      technologies: "React, Redux, Socket.io, Express, PostgreSQL",
      link: "https://github.com/alexjohnson/task-manager",
    },
    {
      id: "3",
      name: "Weather Dashboard",
      description: "Created a weather dashboard that displays current conditions and forecasts for multiple locations.",
      technologies: "React, Chart.js, OpenWeather API",
      link: "https://github.com/alexjohnson/weather-dashboard",
    },
  ],
  theme: "classic",
}
