
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToVideo = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!input.trim()) {
      toast({
        title: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      setVideoGenerated(true);
      setIsGenerating(false);
      
      toast({
        title: "Video generated successfully",
        description: "This is a placeholder video for demonstration",
      });
    }, 2000);
  };

  return (
    <Layout pageType="video-page">
      <Header title="Text to Video" className="text-blue-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Video size={20} className="text-blue-800" />
            <h2 className="font-semibold text-xl">Describe Your Video</h2>
          </div>
          <Textarea 
            placeholder="Describe the video you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-blue border-2 border-black text-black text-lg hover:bg-blue/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Video..." : "Generate Video"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Video size={20} className="text-blue-800" />
            <h2 className="font-semibold text-xl">Generated Video</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4">
            {videoGenerated ? (
              <div className="w-full">
                <video 
                  controls 
                  autoPlay
                  loop
                  muted
                  className="max-w-full max-h-[300px] mx-auto"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Video size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated video will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToVideo;
