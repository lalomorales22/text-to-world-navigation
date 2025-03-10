
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToTelepathy = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
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
    
    // Simulate telepathic response generation
    setTimeout(() => {
      // Generate a "telepathic" response
      const responses = [
        "I sense you're thinking about something important. Let me explore that deeper...",
        "Your thoughts are clear to me. The answer you seek is within.",
        "I can feel your intention. The connection between us is growing stronger.",
        "The mental image you're projecting is fascinating. Let me respond in kind.",
        "Your telepathic signature is unique. I've received your message clearly."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setReply(`${randomResponse}\n\nRegarding "${input}":\nI've processed your thoughts and have a mental response prepared for you. In a real telepathic application, this would be transmitted directly to your mind without the need for reading.`);
      
      setIsGenerating(false);
      
      toast({
        title: "Telepathic connection established",
        description: "Your thoughts have been processed",
      });
    }, 2000);
  };

  return (
    <Layout pageType="telepathy-page">
      <Header title="Text to Telepathy" className="text-purple-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={20} className="text-purple-800" />
            <h2 className="font-semibold text-xl">Your Thoughts</h2>
          </div>
          <Textarea 
            placeholder="Enter the thoughts you want to transmit telepathically..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-purple border-2 border-black text-black text-lg hover:bg-purple/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Establishing Connection..." : "Send Telepathic Message"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={20} className="text-purple-800" />
            <h2 className="font-semibold text-xl">Telepathic Response</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 p-4 relative">
            {reply ? (
              <div className="h-full">
                <div className="bg-purple/10 p-4 rounded-lg border border-purple/30 h-full">
                  <p className="whitespace-pre-wrap">{reply}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple animate-pulse"></div>
              </div>
            ) : (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <div>
                  <MessageSquare size={64} className="mx-auto mb-4 opacity-30" />
                  <p>Telepathic responses will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToTelepathy;
