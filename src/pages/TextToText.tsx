
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Text } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToText = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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
    
    // Simulate processing
    setTimeout(() => {
      // Example transformations: uppercase, reverse, etc.
      const transformedText = `${input.toUpperCase()}\n\n${input.split('').reverse().join('')}`;
      setOutput(transformedText);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <Layout pageType="text-page">
      <Header title="Text to Text" className="text-teal-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Text size={20} className="text-teal-800" />
            <h2 className="font-semibold text-xl">Input Text</h2>
          </div>
          <Textarea 
            placeholder="Enter your text here..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Text size={20} className="text-teal-800" />
            <h2 className="font-semibold text-xl">Output Text</h2>
          </div>
          <Textarea 
            placeholder="Transformed text will appear here..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={output}
            readOnly
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          className="px-8 py-6 bg-teal border-2 border-black text-black text-lg hover:bg-teal/80 transition-all duration-300 nav-button"
          onClick={handleSubmit}
          disabled={isGenerating}
        >
          {isGenerating ? "Processing..." : "Transform Text"}
        </Button>
      </div>
    </Layout>
  );
};

export default TextToText;
