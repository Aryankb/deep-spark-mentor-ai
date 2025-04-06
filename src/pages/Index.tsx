
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, GraduationCap, BrainCircuit } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-mentor-light">
      {/* Navigation */}
      <header className="w-full px-6 py-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-mentor-primary" />
            <span className="text-xl font-bold text-mentor-dark">Deep Mentor</span>
          </div>
          <div>
            <Button 
              onClick={() => navigate("/dashboard")} 
              className="bg-mentor-primary hover:bg-mentor-secondary"
            >
              Go to Dashboard
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-12">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-mentor-dark">
              Your Personal 
              <div className="relative inline-block ml-3">
                <span className="text-mentor-primary">AI Teacher</span>
                <Sparkles 
                  className="absolute -top-5 -right-8 h-6 w-6 text-mentor-secondary animate-pulse" 
                />
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
              Learn any subject deeply with a personalized AI teaching assistant that adapts to your pace and learning style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/dashboard")}
                size="lg" 
                className="bg-mentor-primary hover:bg-mentor-secondary text-lg px-8"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Get Started {isHovering && <Sparkles className="ml-2 h-5 w-5 animate-pulse" />}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-mentor-primary text-mentor-primary hover:bg-mentor-light text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-12 md:mt-0 flex justify-center items-center">
            <div className="relative w-full max-w-md h-[400px] bg-mentor-primary/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="h-24 w-24 text-mentor-primary/50" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-mentor-primary/20 to-transparent p-6 flex flex-col justify-end">
                <div className="typing-animation max-w-full overflow-hidden whitespace-nowrap text-mentor-dark font-medium">
                  Learning physics? Let me help break it down...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-mentor-dark mb-12">How Deep Mentor Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-mentor-light/30 p-6 rounded-lg shadow-sm">
                <div className="bg-mentor-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-mentor-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-mentor-dark">Upload Course Materials</h3>
                <p className="text-gray-600">Upload your course content, reference materials, and personalize your learning experience.</p>
              </div>
              <div className="bg-mentor-light/30 p-6 rounded-lg shadow-sm">
                <div className="bg-mentor-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-mentor-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-mentor-dark">AI Creates Your Course</h3>
                <p className="text-gray-600">Our AI analyzes your materials and builds a personalized course tailored to your learning style.</p>
              </div>
              <div className="bg-mentor-light/30 p-6 rounded-lg shadow-sm">
                <div className="bg-mentor-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-mentor-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-mentor-dark">Interactive Learning</h3>
                <p className="text-gray-600">Engage with your AI teacher through voice interactions, ask questions, and save important notes.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-mentor-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 text-mentor-primary" />
              <span className="text-lg font-bold">Deep Mentor</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Deep Mentor. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
