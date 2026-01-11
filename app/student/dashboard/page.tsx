"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockStudentData, mockPerformanceData } from "@/lib/mock-data"
import { TrendingUp, BookOpen, AlertCircle, CheckCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function StudentDashboard() {
  const student = mockStudentData
  const performanceData = mockPerformanceData

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="mr-1 h-3 w-3" />
            Low Risk
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            At Risk
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            High Risk
          </Badge>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Welcome back, {student.name}</h1>
            <p className="text-muted-foreground">Here's your performance overview</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{student.attendance}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {student.attendance >= 75 ? "Meeting requirements" : "Below requirement"}
                </p>
                <div className="mt-3 h-2 bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${student.attendance}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Internal Marks</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{student.internalMarks}/100</div>
                <p className="text-xs text-muted-foreground mt-1">Current semester average</p>
                <div className="mt-3 h-2 bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all" style={{ width: `${student.internalMarks}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Risk Status</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">{getRiskBadge(student.riskLevel)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {student.riskLevel === "low"
                    ? "Great job! Keep it up"
                    : student.riskLevel === "medium"
                      ? "Needs improvement"
                      : "Urgent attention required"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Your marks and attendance over the semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="marks"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Internal Marks"
                      dot={{ fill: "#3b82f6", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Attendance %"
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
