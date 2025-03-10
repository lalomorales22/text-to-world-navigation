
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MonitorPlay } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToGif = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
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
    
    // Simulate GIF generation with a placeholder
    setTimeout(() => {
      // Use a placeholder GIF
      const placeholderUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXZnN3pzNHpmYWl0YXd6aTU4eXI0bnlkNGRkcXE0YWUyeXMxYmFobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKsQ8UgG7OzR2s8/giphy.gif";
      setGifUrl(placeholderUrl);
      setIsGenerating(false);
      
      toast({
        title: "Animated GIF generated successfully",
        description: "This is a placeholder GIF for demonstration",
      });
    }, 1500);
  };

  return (
    <Layout pageType="gif-page">
      <Header title="Text to Animated GIF" className="text-blue-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MonitorPlay size={20} className="text-blue-800" />
            <h2 className="font-semibold text-xl">Describe Your Animated GIF</h2>
          </div>
          <Textarea 
            placeholder="Describe the animated GIF you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-blue border-2 border-black text-black text-lg hover:bg-blue/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating GIF..." : "Generate Animated GIF"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MonitorPlay size={20} className="text-blue-800" />
            <h2 className="font-semibold text-xl">Generated Animated GIF</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4">
            {gifUrl ? (
              <img 
                src={gifUrl} 
                alt="Generated animated GIF" 
                className="max-w-full max-h-[300px] object-contain"
              />
            ) : (
              <div className="text-center text-gray-500">
                <MonitorPlay size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated animated GIF will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToGif;
