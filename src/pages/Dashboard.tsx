
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  PlusCircle, 
  GraduationCap, 
  BarChart,
  PlayCircle,
  AlarmClock
} from "lucide-react";

// This would come from your database in a real app
const RECENT_COURSES = [
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
  const { user } = useUser();
  const navigate = useNavigate();
  const [recentCourses] = useState(RECENT_COURSES);

  // Get first name to personalize greeting
  const firstName = user?.firstName || "there";

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Hello, {firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey or create a new course
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Learning Time</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-8 w-8 mr-3 text-mentor-primary" />
                <span className="text-3xl font-bold">32hr 15min</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Courses</CardTitle>
              <CardDescription>Total active courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 mr-3 text-mentor-primary" />
                <span className="text-3xl font-bold">{recentCourses.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Session</CardTitle>
              <CardDescription>Scheduled learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlarmClock className="h-8 w-8 mr-3 text-mentor-primary" />
                <span className="text-3xl font-bold">2hr 30min</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Courses</h2>
          <Button onClick={() => navigate("/create-course")} className="bg-mentor-primary hover:bg-mentor-secondary">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden border border-border hover:border-mentor-primary/50 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-mentor-primary" />
                  {course.name}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {course.lastAccessed}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                {course.status === "ready" ? (
                  <>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-4" />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>{course.topics} topics</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart className="h-3 w-3 mr-1" />
                        <span>Intermediate</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span>Creating course...</span>
                      <span className="font-medium">{course.creationProgress}%</span>
                    </div>
                    <Progress value={course.creationProgress} className="h-2 mb-4" />
                    <div className="text-sm text-muted-foreground">
                      Your course is being created. You can start learning once it reaches 50%.
                    </div>
                  </>
                )}
              </CardContent>
              
              <CardFooter className="pt-2">
                {course.status === "ready" || course.creationProgress >= 50 ? (
                  <Button 
                    className="w-full bg-mentor-primary hover:bg-mentor-secondary"
                    onClick={() => navigate(`/teaching/${course.id}`)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    disabled
                  >
                    <Clock className="h-4 w-4 mr-2 animate-pulse" />
                    Creating Course
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border border-dashed border-mentor-primary/30 flex flex-col items-center justify-center p-6 hover:border-mentor-primary/70 transition-all cursor-pointer" onClick={() => navigate("/create-course")}>
            <PlusCircle className="h-12 w-12 text-mentor-primary/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Create New Course</h3>
            <p className="text-sm text-center text-muted-foreground">
              Upload materials and create a personalized learning experience
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
