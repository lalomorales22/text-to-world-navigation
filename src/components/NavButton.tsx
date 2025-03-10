
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavButtonProps = {
  to: string;
  label: string;
  color: string;
  children?: ReactNode;
};

const NavButton = ({ to, label, color, children }: NavButtonProps) => {
  return (
    <Link 
      to={to}
      className={cn(
        "nav-button block w-28 h-28 md:w-32 md:h-32 rounded-lg border-2 border-black p-2 flex flex-col items-center justify-center",
        color
      )}
    >
      <span className="font-bold text-lg md:text-xl text-black">{label}</span>
      {children}
    </Link>
  );
};

export default NavButton;
