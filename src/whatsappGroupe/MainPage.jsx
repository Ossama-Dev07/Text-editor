import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { PresetSelector } from "./components/preset-selector";
import { PresetSave } from "./components/preset-save";
import { CodeViewer } from "./components/code-viewer";
import { PresetShare } from "./components/preset-share";
import { PresetActions } from "./components/preset-actions";
import { presets } from "./data/presets";

import { FontSizeSelect, FontFamilySelect } from "./EditorUI/font-select-components";
import { StyleButtons } from "./EditorUI/style-buttons-components";

export default function MainPage() {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [alignment, setAlignment] = useState("right");

  const applyStyleToSelection = (style, value) => {
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

  const handleColorChange = (textColor, borderColor) => {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.className = `${textColor} ${borderColor} px-1 rounded`;
        range.surroundContents(span);
      }
    }
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
    applyStyleToSelection("fontFamily", value);
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    applyStyleToSelection("fontSize", `${value}px`);
  };

  const handleAlignmentChange = (value) => {
    setAlignment(value);
    document.getElementById("editable-div").style.textAlign = value;
  };

  const handleTextStyle = (style) => {
    const styleMap = {
      fontWeight: "bold",
      fontStyle: "italic",
      textDecoration: "underline",
    };
    applyStyleToSelection(style, styleMap[style]);
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
                <StyleButtons
                  alignment={alignment}
                  onAlignmentChange={handleAlignmentChange}
                  onTextStyleChange={handleTextStyle}
                  onColorChange={handleColorChange}
                />
                <div className="flex space-x-4">
                  <FontSizeSelect
                    fontSize={fontSize}
                    onFontSizeChange={handleFontSizeChange}
                  />
                  <FontFamilySelect
                    fontFamily={fontFamily}
                    onFontFamilyChange={handleFontFamilyChange}
                  />
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
                        <CounterClockwiseClockIcon
                          variant="disractive"
                          className="h-4 w-4"
                        />
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
