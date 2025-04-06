
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  PlusCircle,
  Settings,
  FolderPlus,
  Search,
  History
} from "lucide-react";

// This would be fetched from your database in a real app
const DUMMY_COURSES = [
  { id: "1", name: "Introduction to Physics" },
  { id: "2", name: "Calculus I" },
  { id: "3", name: "Machine Learning Basics" },
  { id: "4", name: "Organic Chemistry" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses] = useState(DUMMY_COURSES);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Link to="/dashboard" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-mentor-primary" />
          <span className="font-bold text-lg">Deep Mentor</span>
        </Link>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <nav className="grid gap-1">
            <Link to="/dashboard">
              <Button 
                variant={location.pathname === "/dashboard" ? "secondary" : "ghost"} 
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/create-course">
              <Button 
                variant={location.pathname === "/create-course" ? "secondary" : "ghost"} 
                className="w-full justify-start"
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" />
              Learning History
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Explore Courses
            </Button>
          </nav>
        </div>
        
        <Separator className="my-4" />
        
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">My Courses</h2>
            <Button variant="ghost" size="icon" onClick={() => navigate("/create-course")}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="grid gap-1">
              {courses.map((course) => (
                <Link to={`/teaching/${course.id}`} key={course.id}>
                  <Button 
                    variant={location.pathname === `/teaching/${course.id}` ? "secondary" : "ghost"} 
                    className="w-full justify-start"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span className="truncate">{course.name}</span>
                  </Button>
                </Link>
              ))}
              
              {courses.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No courses created yet
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>
      <SidebarFooter className="px-4 py-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
