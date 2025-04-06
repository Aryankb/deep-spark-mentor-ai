
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export const CreateCourseCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="border border-dashed border-mentor-primary/30 flex flex-col items-center justify-center p-6 hover:border-mentor-primary/70 transition-all cursor-pointer" 
      onClick={() => navigate("/create-course")}
    >
      <PlusCircle className="h-12 w-12 text-mentor-primary/50 mb-4" />
      <h3 className="text-lg font-medium mb-2">Create New Course</h3>
      <p className="text-sm text-center text-muted-foreground">
        Upload materials and create a personalized learning experience
      </p>
    </Card>
  );
};
