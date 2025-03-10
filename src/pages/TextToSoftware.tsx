
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToSoftware = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
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
    
    // Simulate code generation
    setTimeout(() => {
      // Generate some placeholder code based on the input
      const generatedCode = `// Generated application based on: "${input}"
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    // This would connect to an API in a real app
    console.log("Fetching data for: ${input}");
    setData({ result: "Success!" });
  };
  
  return (
    <div className="app">
      <h1>${input}</h1>
      <button onClick={fetchData}>
        Process Data
      </button>
      {data && (
        <div className="result">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;`;
      
      setCode(generatedCode);
      setIsGenerating(false);
      
      toast({
        title: "Software code generated successfully",
      });
    }, 1500);
  };

  return (
    <Layout pageType="software-page">
      <Header title="Text to Software" className="text-orange-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FileCode size={20} className="text-orange-800" />
            <h2 className="font-semibold text-xl">Describe Your Software</h2>
          </div>
          <Textarea 
            placeholder="Describe the software you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-orange border-2 border-black text-black text-lg hover:bg-orange/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Code..." : "Generate Software"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FileCode size={20} className="text-orange-800" />
            <h2 className="font-semibold text-xl">Generated Code</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-black/90 text-green-400 font-mono text-sm p-4 overflow-auto">
            {code ? (
              <pre>{code}</pre>
            ) : (
              <div className="text-center text-gray-500 flex items-center justify-center h-full">
                <div>
                  <FileCode size={64} className="mx-auto mb-4 opacity-30" />
                  <p>Your generated code will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToSoftware;
