
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToWorld = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [worldGenerated, setWorldGenerated] = useState(false);
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
    
    // Simulate world generation
    setTimeout(() => {
      setWorldGenerated(true);
      setIsGenerating(false);
      
      toast({
        title: "World generated successfully",
        description: "Explore your new virtual world!",
      });
    }, 2500);
  };

  return (
    <Layout pageType="world-page">
      <Header title="Text to World" className="text-red-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={20} className="text-red-800" />
            <h2 className="font-semibold text-xl">Describe Your World</h2>
          </div>
          <Textarea 
            placeholder="Describe the virtual world you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-red border-2 border-black text-black text-lg hover:bg-red/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating World..." : "Generate World"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={20} className="text-red-800" />
            <h2 className="font-semibold text-xl">Your Virtual World</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4 overflow-hidden">
            {worldGenerated ? (
              <div className="w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://picsum.photos/800/600?random=world" 
                    alt="Generated world" 
                    className="max-w-full max-h-[300px] object-cover rounded-lg border-2 border-black"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 text-white p-4 rounded-lg max-w-xs text-center">
                    <h3 className="font-bold mb-2">World Generated</h3>
                    <p>Based on your description, we've created a new virtual environment. In a real application, this would be a 3D world you could explore.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Globe size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated world will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToWorld;
