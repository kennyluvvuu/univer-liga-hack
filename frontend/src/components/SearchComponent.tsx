import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface setSearchDataProps {
  setSearchData: (data: string) => void;
}

export default function SearchComponent({ setSearchData }: setSearchDataProps) {
  return (
    <div className="relative w-full mb-5">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Поиск..."
        onChange={(e) => setSearchData(e.target.value)}
        className="pl-10 h-10 w-full"
      />
    </div>
  );
}