
import { Text, Image, Video, Gamepad, FileCode, Globe, MessageSquare } from "lucide-react";
import NavButton from "@/components/NavButton";
import Header from "@/components/Header";

const Index = () => {
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
        </div>
        
        <div className="w-full flex justify-center mt-20">
          <div className="h-1 w-full max-w-2xl bg-black/20 rounded-full"></div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <div className="w-16 h-16 bg-blue-100 rounded-md border-2 border-black flex items-center justify-center">
            <MessageSquare size={24} className="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
