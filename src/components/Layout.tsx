
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, MessageSquare } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
  pageType?: string;
};

const Layout = ({ children, className, pageType = "" }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen p-6 md:p-12 flex flex-col", pageType)}>
      <div className="page-transition max-w-5xl mx-auto w-full flex-1 flex flex-col">
        <Link 
          to="/" 
          className="self-start mb-6 flex items-center gap-2 text-black/70 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        
        <div className={cn("flex-1 flex flex-col", className)}>
          {children}
        </div>
        
        <div className="w-full flex justify-center mt-12">
          <div className="h-1 w-full max-w-2xl bg-black/20 rounded-full"></div>
        </div>
        
        <div className="mt-4 self-end">
          <div className="w-16 h-16 bg-blue-100 rounded-md border-2 border-black flex items-center justify-center">
            <MessageSquare size={24} className="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
