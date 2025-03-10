
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";

type Chat = {
  id: string;
  title: string;
  messages: {
    content: string;
    isUser: boolean;
    timestamp: Date;
  }[];
  createdAt: Date;
};

type ChatSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
  onNewChat: () => void;
  currentChatId: string;
};

const ChatSidebar = ({
  isOpen,
  toggleSidebar,
  chats,
  onChatSelect,
  onChatDelete,
  onNewChat,
  currentChatId
}: ChatSidebarProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const truncateTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className={`absolute left-0 top-0 bottom-0 bg-gray-100 border-r-2 border-black rounded-r-lg transition-all duration-300 ${
        isOpen ? 'w-[240px]' : 'w-[50px]'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        
        {/* New Chat Button */}
        <Button
          onClick={onNewChat}
          className={`m-2 bg-teal-500 hover:bg-teal-600 border-2 border-black text-white ${
            isOpen ? 'justify-start' : 'justify-center p-0 h-10 w-10'
          }`}
        >
          <Plus size={isOpen ? 16 : 18} />
          {isOpen && <span className="ml-2">New Chat</span>}
        </Button>
        
        {/* Chat List */}
        {isOpen && (
          <ScrollArea className="flex-1 px-2 pb-2">
            {chats.length > 0 ? (
              <div className="flex flex-col gap-2">
                {chats.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`group relative flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 ${
                      currentChatId === chat.id ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => onChatSelect(chat.id)}
                  >
                    <MessageSquare size={16} className="flex-shrink-0 mr-2 text-teal-500" />
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium text-sm truncate">{truncateTitle(chat.title)}</div>
                      <div className="text-xs text-gray-500">{formatDate(chat.createdAt)}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChatDelete(chat.id);
                      }}
                    >
                      <Trash size={14} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-4">
                <p className="text-sm">No saved chats</p>
              </div>
            )}
          </ScrollArea>
        )}

        {/* Collapsed Chat List */}
        {!isOpen && chats.length > 0 && (
          <div className="flex-1 flex flex-col items-center pt-2 gap-2">
            {chats.slice(0, 5).map((chat) => (
              <div 
                key={chat.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-gray-200 hover:bg-gray-300 ${
                  currentChatId === chat.id ? 'bg-teal-200 border-2 border-teal-500' : ''
                }`}
                onClick={() => onChatSelect(chat.id)}
                title={chat.title}
              >
                <MessageSquare size={14} className="text-teal-700" />
              </div>
            ))}
            {chats.length > 5 && (
              <div className="text-xs font-semibold text-gray-500">
                +{chats.length - 5}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
