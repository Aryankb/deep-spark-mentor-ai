
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  BarChart, 
  PlayCircle, 
  GraduationCap 
} from "lucide-react";

export type CourseCardProps = {
  id: string;
  name: string;
  progress: number;
  lastAccessed: string;
  topics: number;
  status: "ready" | "creating";
  creationProgress?: number;
};

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  progress,
  lastAccessed,
  topics,
  status,
  creationProgress = 0,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden border border-border hover:border-mentor-primary/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-mentor-primary" />
          {name}
        </CardTitle>
        <CardDescription className="flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1" />
          {lastAccessed}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {status === "ready" ? (
          <>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>{topics} topics</span>
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
              <span className="font-medium">{creationProgress}%</span>
            </div>
            <Progress value={creationProgress} className="h-2 mb-4" />
            <div className="text-sm text-muted-foreground">
              Your course is being created. You can start learning once it reaches 50%.
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        {status === "ready" || creationProgress >= 50 ? (
          <Button 
            className="w-full bg-mentor-primary hover:bg-mentor-secondary"
            onClick={() => navigate(`/teaching/${id}`)}
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
  );
};
