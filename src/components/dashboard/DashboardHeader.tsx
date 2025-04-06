
import React from "react";

type DashboardHeaderProps = {
  firstName?: string;
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  firstName = "there" 
}) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Hello, {firstName}! 👋
      </h1>
      <p className="text-muted-foreground">
        Continue your learning journey or create a new course
      </p>
    </header>
  );
};
