# Smart Attendance and Student Performance Prediction System

A complete frontend application for managing student attendance and predicting academic performance.

## Features

### Student Portal
- **Dashboard**: View attendance percentage, internal marks, and risk status
- **Performance Prediction**: AI-powered prediction of academic outcomes
- **Profile Management**: View and edit student information

### Teacher Portal
- **Attendance Management**: Mark student attendance with date selection
- **Analytics Dashboard**: Visualize student performance with charts and graphs
- **Risk Monitoring**: Track at-risk students and intervene early

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui with Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download the project
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── login/              # Login page
│   ├── student/
│   │   ├── dashboard/      # Student dashboard
│   │   └── predict/        # Performance prediction
│   ├── teacher/
│   │   ├── attendance/     # Attendance marking
│   │   ├── analytics/      # Analytics dashboard
│   │   └── risk/           # Risk monitoring
│   └── profile/            # Profile page
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── sidebar.tsx         # Navigation sidebar
├── lib/
│   ├── mock-data.ts        # Mock data for testing
│   └── utils.ts            # Utility functions
└── app/globals.css         # Global styles and theme
\`\`\`

## Mock Login Credentials

The application uses mock authentication. Use any email/password combination:

- **Student Role**: Redirects to `/student/dashboard`
- **Teacher Role**: Redirects to `/teacher/attendance`

## Features in Detail

### Student Dashboard
- Real-time attendance tracking with visual progress bars
- Internal marks display with semester average
- Risk status indicators (Low Risk, At Risk, High Risk)
- Performance trend charts showing marks and attendance over time

### Performance Prediction
- AI-powered prediction based on current metrics
- Visual feedback with color-coded results
- Success probability indicators
- Personalized recommendations

### Teacher Attendance
- Calendar-based date selection
- Quick Present/Absent toggle buttons
- Real-time attendance statistics
- Save functionality with visual feedback

### Teacher Analytics
- Bar chart showing individual student attendance
- Pie chart for performance distribution
- Date range filtering
- Class-wide statistics (average attendance, at-risk students)

### Risk Monitoring
- Comprehensive student risk assessment table
- Search and filter capabilities
- Color-coded risk levels
- Export functionality (UI ready)

## Customization

### Theme
The application uses a dark theme by default. To modify colors, edit `app/globals.css`:

\`\`\`css
:root {
  --primary: oklch(0.55 0.15 250); /* Blue primary color */
  --background: oklch(0.99 0 0);   /* Light background */
  /* ... other color tokens */
}

.dark {
  --primary: oklch(0.62 0.18 250); /* Blue primary (dark mode) */
  --background: oklch(0.12 0 0);   /* Dark background */
  /* ... other color tokens */
}
\`\`\`

### Mock Data
To modify student data or add more students, edit `lib/mock-data.ts`:

\`\`\`typescript
export const mockStudentsList: Student[] = [
  {
    id: "1",
    name: "Student Name",
    email: "email@university.edu",
    rollNumber: "CS2021001",
    attendance: 85,
    internalMarks: 78,
    riskLevel: "low",
  },
  // Add more students...
]
\`\`\`

## API Integration

The application is designed with API integration in mind. To connect to a Flask backend:

1. Replace mock data imports with API calls
2. Use `fetch` or a library like `axios` for HTTP requests
3. Update state management to handle async data
4. Add loading and error states

Example API integration:

\`\`\`typescript
// Instead of importing mock data
import { mockStudentData } from "@/lib/mock-data"

// Fetch from API
const response = await fetch('/api/student/dashboard')
const studentData = await response.json()
\`\`\`

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## License

This project is for educational purposes as part of a university assignment.
