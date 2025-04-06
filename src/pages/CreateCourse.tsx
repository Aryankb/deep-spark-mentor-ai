
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Upload, 
  BookOpen, 
  Paperclip, 
  Trash2, 
  FilePlus, 
  Sparkles,
  FileX,
  CheckCircle2,
  UserRound,
  FileQuestion,
  GraduationCap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

// Dummy component for file upload UI
const FileUploadArea = ({ 
  title, 
  description, 
  accept,
  onFilesSelected
}: { 
  title: string;
  description: string;
  accept: string;
  onFilesSelected: (files: UploadedFile[]) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileSelect = () => {
    // In a real app, this would handle file selection and upload
    // For now, we're just creating dummy data
    const mockFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: "Sample_Document.pdf",
      size: "2.4 MB",
      type: "application/pdf"
    };
    
    onFilesSelected([mockFile]);
    toast.success("File uploaded successfully");
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? "border-mentor-primary bg-mentor-primary/5" : "border-gray-200"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect();
      }}
    >
      <div className="flex flex-col items-center">
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          {description}
        </p>
        <p className="text-xs text-muted-foreground mb-6">
          Accepts {accept} files
        </p>
        <Button onClick={handleFileSelect} className="bg-mentor-primary hover:bg-mentor-secondary">
          <Paperclip className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>
    </div>
  );
};

const CreateCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseContentFiles, setCourseContentFiles] = useState<UploadedFile[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<UploadedFile[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);
  
  const handleCreateCourse = () => {
    if (!courseName.trim()) {
      toast.error("Please enter a course name");
      return;
    }
    
    setIsCreating(true);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setCreationProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        if (newProgress >= 60) {
          clearInterval(interval);
          return 60;
        }
        return newProgress;
      });
    }, 1000);
    
    // Simulate completion after some time
    setTimeout(() => {
      navigate("/dashboard");
      toast.success("Course created successfully!");
    }, 6000);
  };
  
  const handleRemoveFile = (fileId: string, fileType: "content" | "reference") => {
    if (fileType === "content") {
      setCourseContentFiles(courseContentFiles.filter(file => file.id !== fileId));
    } else {
      setReferenceFiles(referenceFiles.filter(file => file.id !== fileId));
    }
    toast.info("File removed");
  };
  
  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create New Course</h1>
            {!isCreating && (
              <Button 
                onClick={handleCreateCourse}
                className="bg-mentor-primary hover:bg-mentor-secondary"
                disabled={!courseName.trim()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            )}
          </div>
        </header>
        
        {isCreating ? (
          <Card className="p-8">
            <div className="text-center mb-8">
              <GraduationCap className="h-16 w-16 text-mentor-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Creating Your Course</h2>
              <p className="text-muted-foreground mb-6">
                Your AI teaching assistant is generating a personalized course based on your materials. 
                This might take a few minutes.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{creationProgress}%</span>
                </div>
                <Progress value={creationProgress} className="h-2 mb-4" />
                <p className="text-sm text-muted-foreground mt-4">
                  {creationProgress < 50 
                    ? "Analyzing content and generating course structure..." 
                    : "Course structure created! Building teaching modules..."}
                </p>
                {creationProgress >= 50 && (
                  <Button 
                    className="mt-6 bg-mentor-primary hover:bg-mentor-secondary"
                    onClick={() => navigate(`/teaching/new-${Math.random().toString(36).substring(7)}`)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Teaching Session
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ) : (
          <>
            <Card className="mb-8 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="course-name">Course Name</Label>
                  <Input 
                    id="course-name" 
                    placeholder="e.g., Introduction to Physics" 
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="knowledge-level">Student Knowledge Level</Label>
                  <Select defaultValue="intermediate">
                    <SelectTrigger id="knowledge-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="course-description">Course Description</Label>
                  <Textarea 
                    id="course-description" 
                    placeholder="Describe what this course covers..."
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Course Content</span>
                </TabsTrigger>
                <TabsTrigger value="reference" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Reference Material</span>
                </TabsTrigger>
                <TabsTrigger value="extra" className="flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  <span>Extra Information</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6">
                      Upload course content, including syllabus, slides, notes, or any other teaching materials. 
                      This will help determine the order and domain of teaching.
                    </p>
                    
                    {courseContentFiles.length > 0 ? (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
                        <div className="space-y-3">
                          {courseContentFiles.map((file) => (
                            <div 
                              key={file.id} 
                              className="flex items-center justify-between p-3 bg-mentor-light/30 rounded-md"
                            >
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-mentor-primary mr-3" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveFile(file.id, "content")}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    
                    <FileUploadArea 
                      title="Upload Course Content"
                      description="Drag and drop your syllabus, teaching materials, class slides, notes, or any other relevant documents"
                      accept="PDF, DOCX, PPTX, TXT"
                      onFilesSelected={(files) => setCourseContentFiles((prev) => [...prev, ...files])}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reference">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6">
                      Upload reference materials like research papers, books, or additional resources 
                      that can be used for question practice and deeper exploration.
                    </p>
                    
                    {referenceFiles.length > 0 ? (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Uploaded References</h3>
                        <div className="space-y-3">
                          {referenceFiles.map((file) => (
                            <div 
                              key={file.id} 
                              className="flex items-center justify-between p-3 bg-mentor-light/30 rounded-md"
                            >
                              <div className="flex items-center">
                                <FileQuestion className="h-5 w-5 text-mentor-primary mr-3" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveFile(file.id, "reference")}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    
                    <FileUploadArea 
                      title="Upload Reference Materials"
                      description="Drag and drop research papers, reference books, or any additional resources"
                      accept="PDF, DOCX, EPUB, TXT"
                      onFilesSelected={(files) => setReferenceFiles((prev) => [...prev, ...files])}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="extra">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6">
                      Provide additional information to personalize the teaching experience, 
                      such as preferred teaching style, pace, and learner-specific preferences.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="teaching-style">Teaching Style</Label>
                        <Select defaultValue="interactive">
                          <SelectTrigger id="teaching-style">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="socratic">Socratic (Question-based)</SelectItem>
                            <SelectItem value="interactive">Interactive</SelectItem>
                            <SelectItem value="lecture">Traditional Lecture</SelectItem>
                            <SelectItem value="storytelling">Storytelling</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="teaching-pace">Teaching Pace</Label>
                        <Select defaultValue="moderate">
                          <SelectTrigger id="teaching-pace">
                            <SelectValue placeholder="Select pace" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="slow">Slow & Thorough</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="fast">Fast-Paced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="additional-info">Additional Information</Label>
                        <Textarea 
                          id="additional-info" 
                          placeholder="Share any other preferences or requirements for your learning experience..."
                          className="min-h-[150px]"
                        />
                      </div>
                      
                      <div className="bg-mentor-light/50 p-4 rounded-md border border-mentor-primary/20">
                        <h3 className="font-medium flex items-center mb-2">
                          <CheckCircle2 className="h-4 w-4 text-mentor-primary mr-2" />
                          Benefits of Providing Extra Information
                        </h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex">
                            <span className="mr-2">•</span>
                            <span>Personalized learning experience tailored to your needs</span>
                          </li>
                          <li className="flex">
                            <span className="mr-2">•</span>
                            <span>Adaptive teaching pace based on your comfort level</span>
                          </li>
                          <li className="flex">
                            <span className="mr-2">•</span>
                            <span>More relevant examples and explanations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
