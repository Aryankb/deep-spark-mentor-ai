
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Pause, 
  Play, 
  Mic, 
  Volume2, 
  BookmarkIcon,
  MessageSquarePlus,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  RefreshCw,
  Archive,
  FileDown,
  Settings2
} from "lucide-react";

// Dummy course data
const COURSE_NAMES: Record<string, string> = {
  "1": "Introduction to Physics",
  "2": "Calculus I",
  "3": "Machine Learning Basics",
  "4": "Organic Chemistry",
};

// Sample teaching content for demonstration
const SAMPLE_CONTENT = [
  {
    id: "1",
    topic: "Kinematics",
    text: "Kinematics is the branch of physics that describes the motion of points, objects, and systems without considering the forces that caused the motion. The study of kinematics is often referred to as the 'geometry of motion.'",
    voice: "/path/to/audio.mp3" // In a real app, this would be an actual audio file
  },
  {
    id: "2",
    topic: "Kinematics",
    text: "One of the most fundamental concepts in kinematics is the relationship between position, velocity, and acceleration. Velocity is the rate of change of position with respect to time, and acceleration is the rate of change of velocity with respect to time.",
    voice: "/path/to/audio.mp3"
  },
  {
    id: "3",
    topic: "Kinematics",
    text: "For motion in one dimension, we can write velocity as v = dx/dt, where x is position and t is time. Similarly, acceleration can be expressed as a = dv/dt. These derivatives form the foundation of kinematics equations.",
    voice: "/path/to/audio.mp3"
  }
];

const TeachingSession = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [animationSpeed, setAnimationSpeed] = useState(30); // ms per character
  const [teachingMode, setTeachingMode] = useState<"deep" | "recap" | "quick">("deep");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  
  const courseName = COURSE_NAMES[courseId ?? "1"] || "Course";
  const currentContent = SAMPLE_CONTENT[currentContentIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Text animation effect
  useEffect(() => {
    if (isPlaying && currentContent) {
      let index = 0;
      setDisplayedText("");
      
      const intervalId = setInterval(() => {
        if (index < currentContent.text.length) {
          setDisplayedText((prev) => prev + currentContent.text.charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
          
          // Auto-play next content after a delay
          if (currentContentIndex < SAMPLE_CONTENT.length - 1) {
            const timeoutId = setTimeout(() => {
              setCurrentContentIndex((prev) => prev + 1);
            }, 2000);
            
            return () => clearTimeout(timeoutId);
          } else {
            setIsPlaying(false);
          }
        }
      }, animationSpeed);
      
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, currentContent, currentContentIndex, animationSpeed]);
  
  // Scroll to bottom when text changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);
  
  const handlePlayPause = () => {
    if (!isPlaying && displayedText === currentContent?.text) {
      // If at the end of the current text, move to next
      if (currentContentIndex < SAMPLE_CONTENT.length - 1) {
        setCurrentContentIndex((prev) => prev + 1);
      }
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleMicToggle = () => {
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      setIsPlaying(false);
      toast.info("Listening to your question...");
      // Simulate AI response after a short delay
      setTimeout(() => {
        toast.success("Question received");
        setIsMicActive(false);
      }, 3000);
    }
  };
  
  const handleSaveNote = () => {
    if (displayedText) {
      setSavedNotes((prev) => [...prev, displayedText]);
      toast.success("Note saved successfully");
    }
  };
  
  const handleNextContent = () => {
    if (currentContentIndex < SAMPLE_CONTENT.length - 1) {
      setCurrentContentIndex((prev) => prev + 1);
      setIsPlaying(false);
    }
  };
  
  const handlePrevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex((prev) => prev - 1);
      setIsPlaying(false);
    }
  };
  
  const handleTeachingModeChange = (mode: "deep" | "recap" | "quick") => {
    setTeachingMode(mode);
    // In a real app, this would adjust the content and pace based on the selected mode
    
    toast.info(`Switched to ${mode === "deep" ? "deep dive" : mode === "recap" ? "concept recap" : "quick overview"} mode`);
    
    // Adjust animation speed based on mode
    if (mode === "deep") setAnimationSpeed(30);
    else if (mode === "recap") setAnimationSpeed(20);
    else setAnimationSpeed(10);
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-mentor-light/30 to-white">
      {/* Left sidebar */}
      <div className="w-64 border-r border-gray-200 p-4 hidden md:block">
        <div className="flex items-center mb-6">
          <BookOpen className="h-5 w-5 text-mentor-primary mr-2" />
          <h2 className="font-bold text-lg truncate">{courseName}</h2>
        </div>
        
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Current Topic</h3>
        <div className="bg-mentor-primary/10 p-3 rounded-md mb-6">
          <p className="font-medium">{currentContent?.topic || "Topic"}</p>
        </div>
        
        <Separator className="my-4" />
        
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Teaching Mode</h3>
        <div className="space-y-2 mb-6">
          <Button 
            variant={teachingMode === "deep" ? "secondary" : "outline"} 
            className="w-full justify-start"
            onClick={() => handleTeachingModeChange("deep")}
          >
            <ChevronRight className={`h-4 w-4 mr-2 ${teachingMode === "deep" ? "text-mentor-primary" : ""}`} />
            Deep Dive
          </Button>
          <Button 
            variant={teachingMode === "recap" ? "secondary" : "outline"} 
            className="w-full justify-start"
            onClick={() => handleTeachingModeChange("recap")}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${teachingMode === "recap" ? "text-mentor-primary" : ""}`} />
            Concept Recap
          </Button>
          <Button 
            variant={teachingMode === "quick" ? "secondary" : "outline"} 
            className="w-full justify-start"
            onClick={() => handleTeachingModeChange("quick")}
          >
            <ChevronRight className={`h-4 w-4 mr-2 ${teachingMode === "quick" ? "text-mentor-primary" : ""}`} />
            Quick Overview
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Saved Notes</h3>
        <div className="space-y-2">
          {savedNotes.length > 0 ? (
            savedNotes.map((note, index) => (
              <div key={index} className="text-xs p-3 bg-gray-50 rounded border border-gray-200 hover:border-mentor-primary/50 cursor-pointer truncate">
                {note.substring(0, 100)}...
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No notes saved yet</p>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full text-sm">
            <FileDown className="h-4 w-4 mr-2" />
            Export Notes
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation */}
        <header className="border-b border-gray-200 p-4 flex justify-between items-center bg-white">
          <div className="md:hidden flex items-center">
            <BookOpen className="h-5 w-5 text-mentor-primary mr-2" />
            <h2 className="font-bold text-lg truncate">{courseName}</h2>
          </div>
          
          <div className="hidden md:block">
            <Tabs value={teachingMode} onValueChange={(value) => handleTeachingModeChange(value as any)}>
              <TabsList>
                <TabsTrigger value="deep">Deep Dive</TabsTrigger>
                <TabsTrigger value="recap">Concept Recap</TabsTrigger>
                <TabsTrigger value="quick">Quick Overview</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        </header>
        
        {/* Main teaching display */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto p-6" ref={containerRef}>
            <Card className="p-6 max-w-4xl mx-auto mb-8 min-h-[300px] shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-mentor-primary">
                {currentContent?.topic || "Topic"}
              </h2>
              
              <div className="prose text-lg font-medium leading-relaxed">
                {displayedText}
              </div>
            </Card>
          </div>
          
          {/* Controls */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handlePrevContent}
                  disabled={currentContentIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleNextContent}
                  disabled={currentContentIndex === SAMPLE_CONTENT.length - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleSaveNote}
                  disabled={!displayedText}
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={isMicActive ? "bg-red-50 text-red-500 border-red-200" : ""}
                  onClick={handleMicToggle}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                
                <Button 
                  size="icon" 
                  className={isPlaying ? "bg-mentor-secondary" : "bg-mentor-primary"}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button variant="ghost" size="icon">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
              
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                <span>Ask Question</span>
              </Button>
              
              <Button variant="outline" className="md:hidden" size="icon">
                <MessageSquarePlus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingSession;
