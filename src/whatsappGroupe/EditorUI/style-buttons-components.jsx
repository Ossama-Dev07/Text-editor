import React from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const TABLE_COLORS = [
  { text: "text-black", bg: "", border: "border-border" },
  { text: "text-blue-400", bg: "bg-blue-400", border: "border-blue-200" },
  { text: "text-green-400", bg: "bg-green-400", border: "border-green-200" },
  { text: "text-orange-400", bg: "bg-orange-400", border: "border-orange-200" },
  { text: "text-red-400", bg: "bg-red-400", border: "border-red-200" },
  { text: "text-yellow-400", bg: "bg-yellow-400", border: "border-yellow-200" },
];

export const StyleButtons = ({
  alignment,
  onAlignmentChange,
  onTextStyleChange,
  onColorChange,
}) => {
  return (
    <> 
      <div className="grid gap-2">
        <ToggleGroup type="multiple">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={() => onTextStyleChange("fontWeight")}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => onTextStyleChange("fontStyle")}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={() => onTextStyleChange("textDecoration")}
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px]">
              <div className="grid grid-cols-6 gap-1">
                {TABLE_COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    className={`w-8 h-8 rounded ${color.bg} ${color.border} border-2 transition-opacity hover:opacity-80`}
                    onClick={() => onColorChange(color.text, color.border)}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </ToggleGroup>
      </div>
      <div className="grid gap-2">
        <ToggleGroup
          type="single"
          value={alignment}
          onValueChange={onAlignmentChange}
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  );
};
