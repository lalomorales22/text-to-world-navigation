
import { Text, Image, Video, Gamepad, FileCode, Globe, MessageSquare, Search, StickyNote, Eye, MonitorPlay } from "lucide-react";
import NavButton from "@/components/NavButton";
import Header from "@/components/Header";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const input = searchInput.toLowerCase();
    
    if (input.includes("text") || input.includes("write") || input.includes("word")) {
      navigate("/text-to-text");
    } else if (input.includes("image") || input.includes("picture") || input.includes("photo")) {
      navigate("/text-to-image");
    } else if (input.includes("video") || input.includes("movie")) {
      navigate("/text-to-video");
    } else if (input.includes("game") || input.includes("play")) {
      navigate("/text-to-game");
    } else if (input.includes("software") || input.includes("app") || input.includes("code")) {
      navigate("/text-to-software");
    } else if (input.includes("world") || input.includes("environment")) {
      navigate("/text-to-world");
    } else if (input.includes("telepathy") || input.includes("mind")) {
      navigate("/text-to-telepathy");
    } else if (input.includes("meme")) {
      navigate("/text-to-meme");
    } else if (input.includes("stereogram") || input.includes("3d")) {
      navigate("/text-to-stereogram");
    } else if (input.includes("gif") || input.includes("animated")) {
      navigate("/text-to-gif");
    } else {
      // Default to text if no match
      navigate("/text-to-text");
    }
    
    setSearchInput("");
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto page-transition">
        <Header title="What do you wanna make?" />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          <NavButton to="/text-to-text" label="T 2 Text" color="bg-teal">
            <Text className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-image" label="T 2 Image" color="bg-blue">
            <Image className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-video" label="T 2 Video" color="bg-blue">
            <Video className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-game" label="T 2 Game" color="bg-green">
            <Gamepad className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-software" label="T 2 Software" color="bg-orange">
            <FileCode className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-world" label="T 2 World" color="bg-red">
            <Globe className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-telepathy" label="T 2 Telepathy" color="bg-purple">
            <MessageSquare className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-meme" label="T 2 Meme" color="bg-pink">
            <StickyNote className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-stereogram" label="T 2 Stereogram" color="bg-green">
            <Eye className="mt-2" size={24} />
          </NavButton>
          
          <NavButton to="/text-to-gif" label="T 2 Animated GIF" color="bg-blue">
            <MonitorPlay className="mt-2" size={24} />
          </NavButton>
        </div>
        
        <div className="w-full flex justify-center mt-20">
          <div className="h-1 w-full max-w-2xl bg-black/20 rounded-full"></div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <form onSubmit={handleSearch} className="flex-1 mr-4">
            <input
              type="text"
              placeholder="Tell me what to make..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-16 px-4 bg-white/70 rounded-md border-2 border-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <button 
            onClick={handleSearch}
            className="w-16 h-16 bg-blue-100 rounded-md border-2 border-black flex items-center justify-center transform transition-all duration-300 hover:bg-blue-200 active:scale-95"
          >
            <Search size={24} className="text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
