
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Dashboard components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { CourseCardProps } from "@/components/dashboard/CourseCard";

// This would come from your database in a real app
const RECENT_COURSES: CourseCardProps[] = [
  { 
    id: "1", 
    name: "Introduction to Physics", 
    progress: 65, 
    lastAccessed: "2 days ago",
    topics: 12,
    status: "ready",
  },
  { 
    id: "2", 
    name: "Calculus I", 
    progress: 30, 
    lastAccessed: "1 week ago",
    topics: 10,
    status: "ready",
  },
  { 
    id: "3", 
    name: "Machine Learning Basics", 
    progress: 45, 
    lastAccessed: "3 days ago",
    topics: 8,
    status: "ready",
  },
  { 
    id: "4", 
    name: "Organic Chemistry", 
    progress: 0, 
    lastAccessed: "Just created",
    topics: 14,
    status: "creating",
    creationProgress: 35
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentCourses] = useState(RECENT_COURSES);

  // Default name for greeting
  const firstName = "there";

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <DashboardHeader firstName={firstName} />
        <StatsOverview courseCount={recentCourses.length} />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Courses</h2>
          <Button onClick={() => navigate("/create-course")} className="bg-mentor-primary hover:bg-mentor-secondary">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </div>

        <CourseGrid courses={recentCourses} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
