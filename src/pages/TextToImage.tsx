
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToImage = () => {
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
    
    // Simulate image generation with a placeholder
    setTimeout(() => {
      // Use a placeholder image service
      const placeholderUrl = `https://picsum.photos/800/600?random=${Math.random()}`;
      setImageUrl(placeholderUrl);
      setIsGenerating(false);
      
      toast({
        title: "Image generated successfully",
        description: "This is a placeholder image for demonstration",
      });
    }, 1500);
  };

  return (
    <Layout pageType="image-page">
      <Header title="Text to Image" className="text-blue-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Image size={20} className="text-blue-800" />
            <h2 className="font-semibold text-xl">Describe Your Image</h2>
          </div>
          <Textarea 
            placeholder="Describe the image you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-blue border-2 border-black text-black text-lg hover:bg-blue/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Image..." : "Generate Image"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Image size={20} className="text-blue-800" />
            <h2 className="font-semibold text-xl">Generated Image</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Generated from text" 
                className="max-w-full max-h-[300px] object-contain"
              />
            ) : (
              <div className="text-center text-gray-500">
                <Image size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToImage;
