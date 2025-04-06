
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  description: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  description,
  value,
  icon: Icon,
  iconColor = "text-mentor-primary",
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Icon className={`h-8 w-8 mr-3 ${iconColor}`} />
          <span className="text-3xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
};
