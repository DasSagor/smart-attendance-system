"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockStudentData } from "@/lib/mock-data"
import { User, Mail, BookOpen, Calendar, Edit2, Save } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<"student" | "teacher">("student")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: mockStudentData.name,
    email: mockStudentData.email,
    rollNumber: mockStudentData.rollNumber,
  })

  useEffect(() => {
    const role = sessionStorage.getItem("userRole") as "student" | "teacher"
    if (!role) {
      router.push("/login")
      return
    }
    setUserRole(role)
  }, [router])

  const handleSave = () => {
    setIsEditing(false)
    // Mock save functionality
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={userRole} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">View and manage your account information</p>
          </div>

          <div className="grid gap-6">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your account details and contact information</CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        disabled={!isEditing}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input id="semester" value="Semester 6" disabled className="bg-background" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>Overall attendance statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Attendance</span>
                      <span className="font-semibold">{mockStudentData.attendance}%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${mockStudentData.attendance}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-2xl font-semibold">45</p>
                      <p className="text-xs text-muted-foreground">Classes Attended</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">13</p>
                      <p className="text-xs text-muted-foreground">Classes Missed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>Your marks overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Internal Marks</span>
                      <span className="font-semibold">{mockStudentData.internalMarks}/100</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${mockStudentData.internalMarks}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-2xl font-semibold">B+</p>
                      <p className="text-xs text-muted-foreground">Current Grade</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">3.3</p>
                      <p className="text-xs text-muted-foreground">GPA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
