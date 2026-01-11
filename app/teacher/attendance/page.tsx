"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { mockStudentsList } from "@/lib/mock-data"
import { CalendarIcon, Save, CheckCircle2, XCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AttendanceStatus {
  [key: string]: "present" | "absent"
}

export default function TeacherAttendance() {
  const [date, setDate] = useState<Date>(new Date())
  const [attendance, setAttendance] = useState<AttendanceStatus>({})
  const [saved, setSaved] = useState(false)

  const toggleAttendance = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present",
    }))
    setSaved(false)
  }

  const handleSaveAttendance = () => {
    // Mock save functionality
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="teacher" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Mark Attendance</h1>
            <p className="text-muted-foreground">Record student attendance for your classes</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4 mb-6">
            <Card className="border-border/50 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-sm">Select Date</CardTitle>
                <CardDescription>Choose attendance date</CardDescription>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
                  </PopoverContent>
                </Popover>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Students</span>
                    <span className="font-semibold">{mockStudentsList.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Present</span>
                    <span className="font-semibold text-green-600">
                      {Object.values(attendance).filter((s) => s === "present").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Absent</span>
                    <span className="font-semibold text-red-600">
                      {Object.values(attendance).filter((s) => s === "absent").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Attendance</CardTitle>
                  <CardDescription>Mark students as present or absent</CardDescription>
                </div>
                <Button onClick={handleSaveAttendance} disabled={Object.keys(attendance).length === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  {saved ? "Saved!" : "Save Attendance"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-border/50">
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStudentsList.map((student) => (
                        <TableRow key={student.id} className="border-border/50">
                          <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="text-muted-foreground">{student.email}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant={attendance[student.id] === "present" ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  setAttendance((prev) => ({ ...prev, [student.id]: "present" }))
                                  setSaved(false)
                                }}
                                className={cn(
                                  attendance[student.id] === "present" && "bg-green-600 hover:bg-green-700",
                                )}
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Present
                              </Button>
                              <Button
                                variant={attendance[student.id] === "absent" ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  setAttendance((prev) => ({ ...prev, [student.id]: "absent" }))
                                  setSaved(false)
                                }}
                                className={cn(attendance[student.id] === "absent" && "bg-red-600 hover:bg-red-700")}
                              >
                                <XCircle className="mr-1 h-3 w-3" />
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
