
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Gamepad } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToGame = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameGenerated, setGameGenerated] = useState(false);
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
    
    // Simulate game generation
    setTimeout(() => {
      setGameGenerated(true);
      setIsGenerating(false);
      
      toast({
        title: "Game generated successfully",
        description: "This is a simple game demo for illustration",
      });
    }, 2000);
  };

  return (
    <Layout pageType="game-page">
      <Header title="Text to Game" className="text-green-800" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad size={20} className="text-green-800" />
            <h2 className="font-semibold text-xl">Describe Your Game</h2>
          </div>
          <Textarea 
            placeholder="Describe the game you want to generate..."
            className="flex-1 min-h-[200px] border-2 border-black bg-white/70 text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button 
            className="mt-4 px-8 py-6 bg-green border-2 border-black text-black text-lg hover:bg-green/80 transition-all duration-300 nav-button"
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Game..." : "Generate Game"}
          </Button>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad size={20} className="text-green-800" />
            <h2 className="font-semibold text-xl">Play Your Game</h2>
          </div>
          <div className="flex-1 border-2 border-black bg-white/70 flex items-center justify-center p-4">
            {gameGenerated ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="border-2 border-black p-4 bg-black/10 rounded-lg text-center mb-4">
                  <p className="font-bold">Simple Clicker Game</p>
                  <p>Click the button to score points!</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-4" id="game-score">0</p>
                  <Button 
                    className="px-6 py-4 bg-green border-2 border-black text-black text-lg hover:bg-green/80 transition-all duration-300 nav-button"
                    onClick={() => {
                      const scoreEl = document.getElementById('game-score');
                      if (scoreEl) {
                        scoreEl.textContent = String(parseInt(scoreEl.textContent || '0') + 1);
                      }
                    }}
                  >
                    Click Me!
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Gamepad size={64} className="mx-auto mb-4 opacity-30" />
                <p>Your generated game will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToGame;
