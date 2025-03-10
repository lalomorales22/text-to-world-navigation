
import { cn } from "@/lib/utils";

type HeaderProps = {
  title: string;
  className?: string;
};

const Header = ({ title, className }: HeaderProps) => {
  return (
    <header className="w-full mb-12">
      <h1 
        className={cn(
          "font-handwritten text-4xl md:text-6xl text-center font-bold tracking-wide animate-bounce-subtle",
          className
        )}
      >
        {title}
      </h1>
    </header>
  );
};

export default Header;
