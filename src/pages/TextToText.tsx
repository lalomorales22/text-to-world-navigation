
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Send, MessageSquare, Save, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatSidebar from "@/components/ChatSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
};

const TextToText = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [savedChats, setSavedChats] = useState<Chat[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gpt4o");
  const { toast } = useToast();

  // Initialize or load a new chat
  useEffect(() => {
    if (!currentChat) {
      createNewChat();
    }
  }, []);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `New Chat ${savedChats.length + 1}`,
      messages: [],
      createdAt: new Date()
    };
    setCurrentChat(newChat);
  };

  const saveCurrentChat = () => {
    if (!currentChat || currentChat.messages.length === 0) {
      toast({
        title: "Cannot save empty chat",
        variant: "destructive",
      });
      return;
    }

    // Save the current chat
    setSavedChats(prev => {
      // Check if this chat is already saved
      const existingIndex = prev.findIndex(chat => chat.id === currentChat.id);
      if (existingIndex >= 0) {
        // Update existing chat
        const updatedChats = [...prev];
        updatedChats[existingIndex] = currentChat;
        return updatedChats;
      } else {
        // Add new chat
        return [...prev, currentChat];
      }
    });

    toast({
      title: "Chat saved",
      description: `"${currentChat.title}" has been saved.`,
    });
  };

  const loadChat = (chatId: string) => {
    const chat = savedChats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const deleteChat = (chatId: string) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we deleted the current chat, create a new one
    if (currentChat && currentChat.id === chatId) {
      createNewChat();
    }

    toast({
      title: "Chat deleted",
    });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    toast({
      title: `Model changed to ${getModelDisplayName(model)}`,
    });
  };

  const getModelDisplayName = (modelId: string): string => {
    const models: Record<string, string> = {
      'grok3': 'Grok 3',
      'claude': 'Claude Sonnet 3.7',
      'gpt4o': 'ChatGPT o1',
      'llama3': 'Meta LLama 3.3'
    };
    return models[modelId] || modelId;
  };

  const sendMessage = () => {
    if (!input.trim()) {
      toast({
        title: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (!currentChat) return;

    // Add user message
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setIsGenerating(true);
    
    // Update current chat with user message
    setCurrentChat(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, userMessage]
      };
    });
    
    // Clear input
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      // Create bot response
      const botResponse: Message = {
        content: generateResponse(input, selectedModel),
        isUser: false,
        timestamp: new Date()
      };
      
      // Update current chat with bot response
      setCurrentChat(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, botResponse]
        };
      });
      
      setIsGenerating(false);
    }, 1000);
  };

  const generateResponse = (userInput: string, model: string): string => {
    // Simple example responses based on model - in a real app you'd use an actual AI API
    const modelIntros = {
      'grok3': "Grok 3 says: ",
      'claude': "Claude Sonnet responds: ",
      'gpt4o': "ChatGPT o1 thinks: ",
      'llama3': "LLama 3.3 answers: "
    };
    
    const intro = modelIntros[model] || "";
    
    const responses = [
      `${intro}I understand you're saying: "${userInput}". Tell me more.`,
      `${intro}Interesting point about "${userInput}". How did you come to that conclusion?`,
      `${intro}"${userInput}" is a fascinating topic. Let's explore it further.`,
      `${intro}Thanks for sharing your thoughts on "${userInput}". Here's what I think...`,
      `${intro}I've processed your message about "${userInput}". Would you like to elaborate?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout pageType="text-page">
      <Header title="Text to Text" className="text-teal-800" />
      
      <div className="flex flex-1 gap-4 relative">
        {/* Chat Sidebar */}
        <ChatSidebar 
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          chats={savedChats}
          onChatSelect={loadChat}
          onChatDelete={deleteChat}
          onNewChat={createNewChat}
          currentChatId={currentChat?.id || ""}
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
        />
        
        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col border-2 border-black bg-white/70 rounded-lg ${isSidebarOpen ? 'ml-[240px]' : 'ml-[50px]'} transition-all duration-300`}>
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            {currentChat && currentChat.messages.length > 0 ? (
              <div className="flex flex-col gap-4">
                {currentChat.messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.isUser 
                          ? 'bg-teal-500 text-white rounded-tr-none' 
                          : 'bg-gray-200 text-black rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-2 h-12 w-12 opacity-20" />
                  <p>Start a new conversation with {getModelDisplayName(selectedModel)}</p>
                </div>
              </div>
            )}
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t-2 border-black p-4 flex gap-2">
            <Textarea 
              placeholder={`Ask ${getModelDisplayName(selectedModel)}...`}
              className="flex-1 border-2 border-black bg-white/90 text-lg min-h-[60px] max-h-[120px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button 
                className="bg-teal-500 border-2 border-black text-white hover:bg-teal-600 h-12 w-12 p-0"
                onClick={sendMessage}
                disabled={isGenerating}
              >
                <Send size={20} />
              </Button>
              <Button 
                className="bg-blue-500 border-2 border-black text-white hover:bg-blue-600 h-12 w-12 p-0"
                onClick={saveCurrentChat}
              >
                <Save size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToText;
