export interface Student {
  id: string
  name: string
  email: string
  rollNumber: string
  attendance: number
  internalMarks: number
  riskLevel: "low" | "medium" | "high"
}

export interface AttendanceRecord {
  date: string
  status: "present" | "absent"
}

export interface PerformanceData {
  month: string
  marks: number
  attendance: number
}

export const mockStudentData: Student = {
  id: "1",
  name: "John Doe",
  email: "john.doe@university.edu",
  rollNumber: "CS2021001",
  attendance: 78,
  internalMarks: 72,
  riskLevel: "medium",
}

export const mockPerformanceData: PerformanceData[] = [
  { month: "Jan", marks: 65, attendance: 75 },
  { month: "Feb", marks: 70, attendance: 80 },
  { month: "Mar", marks: 68, attendance: 76 },
  { month: "Apr", marks: 72, attendance: 78 },
  { month: "May", marks: 75, attendance: 82 },
]

export const mockStudentsList: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@university.edu",
    rollNumber: "CS2021001",
    attendance: 92,
    internalMarks: 85,
    riskLevel: "low",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@university.edu",
    rollNumber: "CS2021002",
    attendance: 78,
    internalMarks: 72,
    riskLevel: "medium",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@university.edu",
    rollNumber: "CS2021003",
    attendance: 65,
    internalMarks: 58,
    riskLevel: "high",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@university.edu",
    rollNumber: "CS2021004",
    attendance: 88,
    internalMarks: 80,
    riskLevel: "low",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@university.edu",
    rollNumber: "CS2021005",
    attendance: 72,
    internalMarks: 68,
    riskLevel: "medium",
  },
  {
    id: "6",
    name: "Fiona Green",
    email: "fiona@university.edu",
    rollNumber: "CS2021006",
    attendance: 55,
    internalMarks: 48,
    riskLevel: "high",
  },
]

export const mockAttendanceData = [
  { date: "2024-01-15", status: "present" as const },
  { date: "2024-01-16", status: "present" as const },
  { date: "2024-01-17", status: "absent" as const },
  { date: "2024-01-18", status: "present" as const },
  { date: "2024-01-19", status: "present" as const },
]
