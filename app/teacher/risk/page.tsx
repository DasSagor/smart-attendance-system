"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockStudentsList } from "@/lib/mock-data"
import { Search, Download, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"

export default function RiskStudents() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = mockStudentsList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="mr-1 h-3 w-3" />
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
            <AlertTriangle className="mr-1 h-3 w-3" />
            High Risk
          </Badge>
        )
    }
  }

  const handleExport = () => {
    // Mock export functionality
    alert("Export functionality would download student data as CSV")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="teacher" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">At-Risk Student Monitoring</h1>
            <p className="text-muted-foreground">Track and support students who need additional attention</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Low Risk</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-green-600">
                  {mockStudentsList.filter((s) => s.riskLevel === "low").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Students performing well</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">At Risk</CardTitle>
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-amber-600">
                  {mockStudentsList.filter((s) => s.riskLevel === "medium").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Students need monitoring</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-red-600">
                  {mockStudentsList.filter((s) => s.riskLevel === "high").length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Urgent attention needed</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Risk Assessment</CardTitle>
                <CardDescription>Detailed view of all students and their risk levels</CardDescription>
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or roll number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead className="text-right">Attendance</TableHead>
                      <TableHead className="text-right">Marks</TableHead>
                      <TableHead className="text-right">Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="border-border/50">
                        <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-semibold ${student.attendance >= 75 ? "text-green-600" : "text-red-600"}`}
                          >
                            {student.attendance}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-semibold ${student.internalMarks >= 60 ? "text-green-600" : "text-red-600"}`}
                          >
                            {student.internalMarks}/100
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{getRiskBadge(student.riskLevel)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No students found matching your search.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
