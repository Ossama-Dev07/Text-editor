import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const FontSizeSelect = ({ fontSize, onFontSizeChange }) => {
  return (
    <div className="relative w-[80px]">
      <Input
        type="text"
        placeholder="Size"
        value={fontSize}
        onChange={(e) => onFontSizeChange(e.target.value)}
        className="w-full pr-8"
      />
      <Select onValueChange={onFontSizeChange} value={fontSize}>
        <SelectTrigger className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1 bg-transparent hover:bg-transparent focus:ring-0 border-0" />
        <SelectContent>
          <SelectGroup>
            {["10", "20", "30", "40", "50"].map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export const FontFamilySelect = ({ fontFamily, onFontFamilyChange }) => {
  const fontFamilies = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Amiri",
    "Lateef",
    "Scheherazade",
    "Noto Naskh Arabic",
    "Lemonada",
  ];

  return (
    <div className="relative w-[150px]">
      <Input
        type="text"
        placeholder="Font Family"
        value={fontFamily}
        onChange={(e) => onFontFamilyChange(e.target.value)}
        className="w-full pr-8"
      />
      <Select onValueChange={onFontFamilyChange} value={fontFamily}>
        <SelectTrigger className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1 bg-transparent hover:bg-transparent focus:ring-0 border-0" />
        <SelectContent>
          <SelectGroup>
            {fontFamilies.map((family) => (
              <SelectItem key={family} value={family}>
                {family}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
