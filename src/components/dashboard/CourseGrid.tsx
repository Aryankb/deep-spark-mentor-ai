
import React from "react";
import { CourseCard, CourseCardProps } from "./CourseCard";
import { CreateCourseCard } from "./CreateCourseCard";

type CourseGridProps = {
  courses: CourseCardProps[];
};

export const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
      <CreateCourseCard />
    </div>
  );
};
