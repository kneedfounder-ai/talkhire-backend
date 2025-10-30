{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import express from "express";\
import \{ randomUUID \} from "crypto";\
\
const app = express();\
app.use(express.json());\
\
const interviews = [\
  \{\
    id: randomUUID(),\
    companyId: "google-123",\
    companyName: "Google",\
    role: "Senior Software Engineer",\
    interviewDate: "2024-10-15",\
    interviewType: "System Design",\
    difficulty: "Hard",\
    experience: "System design of a distributed cache with consistent hashing.",\
    tips: "Understand CAP theorem and consistency models.",\
    tags: ["distributed-systems", "system-design", "caching", "scalability"],\
    authorName: "Alex Chen",\
    helpfulVotes: 12,\
    createdAt: new Date()\
  \}\
];\
\
const comments = [];\
\
// Routes\
app.get("/api/interviews", (req, res) => \{\
  res.json(interviews);\
\});\
\
app.post("/api/interviews", (req, res) => \{\
  const interview = \{ id: randomUUID(), helpfulVotes: 0, createdAt: new Date(), ...req.body \};\
  interviews.push(interview);\
  res.status(201).json(interview);\
\});\
\
app.post("/api/interviews/:id/comments", (req, res) => \{\
  const comment = \{ id: randomUUID(), interviewId: req.params.id, createdAt: new Date(), ...req.body \};\
  comments.push(comment);\
  res.status(201).json(comment);\
\});\
\
app.get("/api/interviews/:id/comments", (req, res) => \{\
  res.json(comments.filter(c => c.interviewId === req.params.id));\
\});\
\
app.post("/api/interviews/:id/vote", (req, res) => \{\
  const interview = interviews.find(i => i.id === req.params.id);\
  if (interview) \{\
    interview.helpfulVotes++;\
    res.json(\{ success: true \});\
  \} else \{\
    res.status(404).json(\{ error: "Interview not found" \});\
  \}\
\});\
\
const port = process.env.PORT || 5000;\
app.listen(port, () => console.log(`TalkHire backend running on port $\{port\}`));\
}