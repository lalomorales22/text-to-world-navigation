
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StickyNote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToMeme = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
    
    // Simulate meme generation with a placeholder
    setTimeout(() => {
      // Use a placeholder image service
      const placeholderUrl = `https://picsum.photos/800/600?random=${Math.random()}`;
      setImageUrl(placeholderUrl);
      setIsGenerating(false);
      
      toast({
        title: "Meme generated successfully",
        description: "This is a placeholder meme for demonstration",
      });
    }, 1500);
  };

  return (
    <Layout pageType="meme-page">
      <Header title="Text to Meme" className="text-pink-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote size={20} className="text-pink-800" />
            <h2 className="font-semibold text-xl">Describe Your Meme</h2>
          </div>
          <Textarea 
            placeholder="Describe the meme you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-pink border-2 border-black text-black text-lg hover:bg-pink/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Meme..." : "Generate Meme"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote size={20} className="text-pink-800" />
            <h2 className="font-semibold text-xl">Generated Meme</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Generated meme" 
                className="max-w-full max-h-[300px] object-contain"
              />
            ) : (
              <div className="text-center text-gray-500">
                <StickyNote size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated meme will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToMeme;
