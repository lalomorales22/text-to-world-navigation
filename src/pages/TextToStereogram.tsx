
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToStereogram = () => {
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
    
    // Simulate stereogram generation with a placeholder
    setTimeout(() => {
      // Use a placeholder image service
      const placeholderUrl = `https://picsum.photos/800/600?random=${Math.random()}`;
      setImageUrl(placeholderUrl);
      setIsGenerating(false);
      
      toast({
        title: "Stereogram generated successfully",
        description: "Cross your eyes slightly to see the 3D effect",
      });
    }, 1500);
  };

  return (
    <Layout pageType="stereogram-page">
      <Header title="Text to Stereogram" className="text-green-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={20} className="text-green-800" />
            <h2 className="font-semibold text-xl">Describe Your Stereogram</h2>
          </div>
          <Textarea 
            placeholder="Describe the 3D stereogram you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-green border-2 border-black text-black text-lg hover:bg-green/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Stereogram..." : "Generate Stereogram"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={20} className="text-green-800" />
            <h2 className="font-semibold text-xl">Generated Stereogram</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4">
            {imageUrl ? (
              <div>
                <img 
                  src={imageUrl} 
                  alt="Generated stereogram" 
                  className="max-w-full max-h-[300px] object-contain"
                />
                <p className="text-center mt-2 text-sm text-gray-500">Tip: Relax your eyes and focus behind the image to see the 3D effect</p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Eye size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated stereogram will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToStereogram;
