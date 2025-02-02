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
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PresetSelector } from "./components/preset-selector";
import { PresetSave } from "./components/preset-save";
import { CodeViewer } from "./components/code-viewer";
import { PresetShare } from "./components/preset-share";
import { PresetActions } from "./components/preset-actions";
import { presets } from "./data/presets";

export const TABLE_COLORS = [
  { bg: "", border: "border-border" },
  { bg: "bg-blue-50/50", border: "border-blue-200" },
  { bg: "bg-green-50/50", border: "border-green-200" },
  { bg: "bg-purple-50/50", border: "border-purple-200" },
  { bg: "bg-orange-50/50", border: "border-orange-200" },
  { bg: "bg-red-50/50", border: "border-red-200" },
  { bg: "bg-yellow-50/50", border: "border-yellow-200" },
  { bg: "bg-pink-50/50", border: "border-pink-200" },
  { bg: "bg-indigo-50/50", border: "border-indigo-200" },
  { bg: "bg-cyan-50/50", border: "border-cyan-200" },
  { bg: "bg-teal-50/50", border: "border-teal-200" },
  { bg: "bg-emerald-50/50", border: "border-emerald-200" },
];

export default function MainPage() {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [alignment, setAlignment] = useState("right");

  // Function to apply styles to the selected text
  const applyStyleToSelection = (style, value) => {
    const editableDiv = document.getElementById("editable-div");
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style[style] = value;
        range.surroundContents(span);
      }
    }
  };

  // Handle color change
  const handleColorChange = (bgColor, borderColor) => {
    const editableDiv = document.getElementById("editable-div");
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.className = `${bgColor} ${borderColor} px-1 rounded`;
        range.surroundContents(span);
      }
    }
  };

  // Handle font family change
  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
    applyStyleToSelection("fontFamily", value);
  };

  // Handle font size change
  const handleFontSizeChange = (value) => {
    setFontSize(value);
    applyStyleToSelection("fontSize", `${value}px`);
  };

  // Handle alignment change
  const handleAlignmentChange = (value) => {
    setAlignment(value);
    const editableDiv = document.getElementById("editable-div");
    editableDiv.style.textAlign = value;
  };

  // Handle bold/italic/underline
  const handleTextStyle = (style) => {
    applyStyleToSelection(style, style === "fontWeight" ? "bold" : "underline");
  };

  return (
    <div dir="rtl">
      <div className="h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>

        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="h-full py-6" dir="rtl">
            <div className="grid h-full items-stretch gap-10 md:grid-cols-[1fr_200px]">
              <div className="flex-col space-y-4 sm:flex md:order-2">
                <div className="space-y-4">
                  <div className="relative w-[80px]">
                    <Input
                      type="text"
                      placeholder="Size"
                      value={fontSize}
                      onChange={(e) => handleFontSizeChange(e.target.value)}
                      className="w-full pr-8"
                    />
                    <Select
                      onValueChange={handleFontSizeChange}
                      value={fontSize}
                    >
                      <SelectTrigger className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1 bg-transparent hover:bg-transparent focus:ring-0 border-0"></SelectTrigger>
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
                </div>
                <div className="space-y-4">
                  <div className="relative w-[150px]">
                    <Input
                      type="text"
                      placeholder="Font Family"
                      value={fontFamily}
                      onChange={(e) => handleFontFamilyChange(e.target.value)}
                      className="w-full pr-8"
                    />
                    <Select
                      onValueChange={handleFontFamilyChange}
                      value={fontFamily}
                    >
                      <SelectTrigger className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1 bg-transparent hover:bg-transparent focus:ring-0 border-0"></SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Times New Roman">
                            Times New Roman
                          </SelectItem>
                          <SelectItem value="Courier New">
                            Courier New
                          </SelectItem>
                          <SelectItem value="Verdana">Verdana</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                          <SelectItem value="Amiri">Amiri</SelectItem>
                          <SelectItem value="Lateef">Lateef</SelectItem>
                          <SelectItem value="Scheherazade">
                            Scheherazade
                          </SelectItem>
                          <SelectItem value="Noto Naskh Arabic">
                            Noto Naskh Arabic
                          </SelectItem>
                          <SelectItem value="Lemonada">Lemonada</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <ToggleGroup
                    type="single"
                    value={alignment}
                    onValueChange={handleAlignmentChange}
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
                <div className="grid gap-2">
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem
                      value="bold"
                      aria-label="Toggle bold"
                      onClick={() => handleTextStyle("fontWeight")}
                    >
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="italic"
                      aria-label="Toggle italic"
                      onClick={() => handleTextStyle("fontStyle")}
                    >
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Toggle underline"
                      onClick={() => handleTextStyle("textDecoration")}
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
                              onClick={() =>
                                handleColorChange(color.bg, color.border)
                              }
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </ToggleGroup>
                </div>
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <div
                      id="editable-div"
                      contentEditable="true"
                      placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[200px] flex-1 p-4 border rounded-md md:min-h-[500px] lg:min-h-[500px]"
                      style={{
                        fontFamily,
                        fontSize: `${fontSize}px`,
                        textAlign: alignment,
                      }}
                    ></div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
