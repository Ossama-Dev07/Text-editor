// import { Button } from "@/components/ui/button";
// import MainPage from "./whatsappGroupe/MainPage";

// export default function Home() {
//   return (
//     <div >
//       <MainPage />
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react"; // Dropdown arrow icon

const App = () => {
  const [fontSize, setFontSize] = useState("10");

  const handleCustomSizeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      setFontSize(value);
    }
  };

  const handleSelectChange = (value) => {
    setFontSize(value);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-[80px]">
        {/* Input for manual entry */}
        <Input
          type="text"
          placeholder="Size"
          value={fontSize}
          onChange={handleCustomSizeChange}
          className="w-full pr-8" // Add padding to the right for the dropdown arrow
        />

        {/* Dropdown trigger positioned inside the input */}
        <Select onValueChange={handleSelectChange} value={fontSize}>
          <SelectTrigger className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1 bg-transparent hover:bg-transparent focus:ring-0 border-0">
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Font Size</SelectLabel>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <p style={{ fontSize: `${fontSize}px` }} className="p-4 border rounded">
        This text will change size based on your selection
      </p>
    </div>
  );
};

export default App;