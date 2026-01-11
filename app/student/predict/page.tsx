"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import { mockStudentData } from "@/lib/mock-data"

type PredictionResult = "pass" | "at-risk" | "fail" | null

export default function PredictPerformance() {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult>(null)
  const student = mockStudentData

  const handlePredict = async () => {
    setIsLoading(true)
    setPrediction(null)

    // Simulate API call
    setTimeout(() => {
      // Simple prediction logic based on attendance and marks
      const score = (student.attendance + student.internalMarks) / 2

      if (score >= 75) {
        setPrediction("pass")
      } else if (score >= 60) {
        setPrediction("at-risk")
      } else {
        setPrediction("fail")
      }
      setIsLoading(false)
    }, 2000)
  }

  const getPredictionContent = () => {
    switch (prediction) {
      case "pass":
        return {
          title: "Predicted: PASS",
          description: "Based on your current performance, you're likely to pass this semester.",
          icon: <CheckCircle2 className="h-12 w-12 text-green-600" />,
          color: "green",
          progress: 85,
          badge: (
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Pass
            </Badge>
          ),
          message: "Keep up the excellent work! Continue attending classes regularly and maintaining your performance.",
        }
      case "at-risk":
        return {
          title: "Predicted: AT RISK",
          description: "Your performance indicates you might face challenges. Improvement needed.",
          icon: <AlertTriangle className="h-12 w-12 text-amber-600" />,
          color: "amber",
          progress: 65,
          badge: (
            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
              <AlertTriangle className="mr-1 h-3 w-3" />
              At Risk
            </Badge>
          ),
          message:
            "Consider improving your attendance and focusing on your studies. Seek help from teachers if needed.",
        }
      case "fail":
        return {
          title: "Predicted: FAIL",
          description: "Urgent attention required. Your current performance needs significant improvement.",
          icon: <AlertTriangle className="h-12 w-12 text-red-600" />,
          color: "red",
          progress: 45,
          badge: (
            <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
              <AlertTriangle className="mr-1 h-3 w-3" />
              Fail
            </Badge>
          ),
          message:
            "Immediate action needed. Please meet with your academic advisor and teachers to create an improvement plan.",
        }
      default:
        return null
    }
  }

  const predictionContent = getPredictionContent()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Performance Prediction</h1>
            <p className="text-muted-foreground">Get an AI-powered prediction of your academic performance</p>
          </div>

          <Card className="border-border/50 mb-6">
            <CardHeader>
              <CardTitle>Current Performance Data</CardTitle>
              <CardDescription>Your prediction is based on these metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className="font-medium">{student.attendance}%</span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${student.attendance}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Internal Marks</span>
                    <span className="font-medium">{student.internalMarks}/100</span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${student.internalMarks}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mb-6">
            <Button onClick={handlePredict} disabled={isLoading} size="lg" className="min-w-48">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Predict Performance
                </>
              )}
            </Button>
          </div>

          {predictionContent && (
            <Card className={`border-${predictionContent.color}-500/20 bg-card`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{predictionContent.title}</CardTitle>
                    <CardDescription>{predictionContent.description}</CardDescription>
                  </div>
                  {predictionContent.icon}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">{predictionContent.badge}</div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Success Probability</span>
                    <span className="font-medium">{predictionContent.progress}%</span>
                  </div>
                  <div className="h-3 bg-accent rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${predictionContent.color}-500 transition-all`}
                      style={{ width: `${predictionContent.progress}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
                  <p className="text-sm leading-relaxed">{predictionContent.message}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
