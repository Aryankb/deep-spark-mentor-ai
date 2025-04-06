
import React from "react";
import { Clock, BookOpen, AlarmClock } from "lucide-react";
import { StatCard } from "./StatCard";

type StatsOverviewProps = {
  courseCount: number;
};

export const StatsOverview: React.FC<StatsOverviewProps> = ({ courseCount }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Learning Time" 
        description="This month" 
        value="32hr 15min" 
        icon={Clock} 
      />
      
      <StatCard 
        title="Courses" 
        description="Total active courses" 
        value={courseCount.toString()} 
        icon={BookOpen} 
      />
      
      <StatCard 
        title="Next Session" 
        description="Scheduled learning" 
        value="2hr 30min" 
        icon={AlarmClock} 
      />
    </div>
  );
};
