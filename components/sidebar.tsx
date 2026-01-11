"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  LayoutDashboard,
  TrendingUp,
  User,
  LogOut,
  ClipboardList,
  BarChart3,
  AlertTriangle,
} from "lucide-react"

interface SidebarProps {
  role: "student" | "teacher"
}

const studentLinks = [
  {
    href: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/student/predict",
    label: "Prediction",
    icon: TrendingUp,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
]

const teacherLinks = [
  {
    href: "/teacher/attendance",
    label: "Attendance",
    icon: ClipboardList,
  },
  {
    href: "/teacher/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/teacher/risk",
    label: "Risk Students",
    icon: AlertTriangle,
  },
]

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const links = role === "student" ? studentLinks : teacherLinks

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-border/50 bg-card/30">
      <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6">
        <div className="rounded-lg bg-primary/10 p-2">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-semibold">Attendance System</h2>
          <p className="text-xs text-muted-foreground capitalize">{role} Portal</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border/50 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
