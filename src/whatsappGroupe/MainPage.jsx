import React, { useState, useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Underline,
  Palette,
  Eraser,
} from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import MarkButton from "./EditorUI/MarkButton";
import BlockButton from "./EditorUI/BlockButton";
import { COLORS, initialValue, HOTKEYS } from "./data";
import Leaf from "./EditorUI/Leaf";
import Element from "./EditorUI/Element";

const MainPage = () => {
  const [messageFormat, setMessageFormat] = useState("wtsp");
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Function to handle color change
  const handleColorChange = (color) => {
    Editor.addMark(editor, "color", color);
  };
  const handleReset = (editor) => {
    const { selection } = editor;

    if (selection) {
      Editor.withoutNormalizing(editor, () => {
        // Clear all marks (inline styles)
        const marks = Editor.marks(editor);
        if (marks) {
          Object.keys(marks).forEach((mark) => {
            Editor.removeMark(editor, mark);
          });
        }

        // Reset block formatting (type and alignment)
        Transforms.setNodes(
          editor,
          { type: "paragraph", align: undefined },
          { match: (n) => SlateElement.isElement(n) }
        );
      });
    } else {
      Editor.withoutNormalizing(editor, () => {
        Transforms.unsetNodes(editor, [], {
          match: (n) =>
            Editor.isEditor(n)
              ? false
              : SlateElement.isElement(n)
              ? false
              : true, // Match text nodes
        });

        Transforms.setNodes(
          editor,
          { type: "paragraph", align: undefined },
          { match: (n) => SlateElement.isElement(n) }
        );
      });
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full px-4">
        <div
          className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
          dir="rtl"
        >
          <h1 className="text-xl font-semibold">Whatsapp</h1>
        </div>
        <Separator />

        <Tabs>
          <Slate editor={editor} initialValue={initialValue}>
            <div className="py-8">
              <div className="grid gap-8 md:grid-cols-[320px_1fr]">
                <div className="space-y-6">
                  <div
                    className="bg-white rounded-lg shadow-sm p-6 space-y-8"
                    dir="rtl"
                  >
                    <RadioGroup
                      value={messageFormat}
                      onValueChange={setMessageFormat}
                      className="space-y-4 space-y-4"
                      dir="rtl"
                    >
                      <div className="flex items-center gap-1 space-x-2">
                        <RadioGroupItem value="wtsp" id="r3" />
                        <Label htmlFor="r3">Message Format WhatsApp</Label>
                      </div>
                      <div className="flex items-center gap-1 space-x-2">
                        <RadioGroupItem value="pdf" id="r2" />
                        <Label htmlFor="r2">Message Format PDF</Label>
                      </div>
                    </RadioGroup>
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500">
                        Text Formatting
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <MarkButton
                          format="bold"
                          icon={<Bold className="w-5 h-5" />}
                        />
                        <MarkButton
                          format="italic"
                          icon={<Italic className="w-5 h-5" />}
                        />
                        <MarkButton
                          format="underline"
                          icon={<Underline className="w-5 h-5" />}
                        />
                        <MarkButton
                          format="code"
                          icon={<Code className="w-5 h-5" />}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500">
                        Structure
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <BlockButton
                          format="heading-one"
                          icon={<Heading1 className="w-5 h-5" />}
                          msgformat={messageFormat}
                        />
                        <BlockButton
                          format="heading-two"
                          icon={<Heading2 className="w-5 h-5" />}
                          msgformat={messageFormat}
                        />
                        <BlockButton
                          format="numbered-list"
                          icon={<ListOrdered className="w-5 h-5" />}
                          msgformat={messageFormat}
                        />
                        <BlockButton
                          format="bulleted-list"
                          icon={<List className="w-5 h-5" />}
                          msgformat={messageFormat}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500">
                        Alignment
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <BlockButton
                          format="right"
                          icon={<AlignRight className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="center"
                          icon={<AlignCenter className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="left"
                          icon={<AlignLeft className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="justify"
                          icon={<AlignJustify className="w-5 h-5" />}
                        />
                      </div>
                    </div>

                    <div className=" flex items-center justify-  gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Reset
                        </p>
                        <Button
                          variant="outline"
                          size="default"
                          className="w-10 h-10 p-0"
                          onClick={() => handleReset(editor)}
                        >
                          <Eraser />
                        </Button>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Color
                        </p>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="default"
                              className="w-10 h-10 p-0"
                              disabled={messageFormat === "wtsp"}
                            >
                              <Palette className="w-5 h-5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-3">
                            <div className="grid grid-cols-3 gap-3">
                              {COLORS.map((color, idx) => (
                                <button
                                  key={idx}
                                  className={`w-10 h-10 rounded-lg ${color.name} hover:ring-2 ring-offset-2 transition-all`}
                                  onClick={() => handleColorChange(color.value)}
                                />
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <Editable
                    className="min-h-[650px] p-8 focus:outline-none"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => {
                      for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                          event.preventDefault();
                          const mark = HOTKEYS[hotkey];
                          toggleMark(editor, mark);
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Slate>
        </Tabs>

        <div className="flex justify-end  space-x-2">
          <Button variant="outline" className="px-4">
            <CounterClockwiseClockIcon className="w-5 h-5" />
            <span className="sr-only">Show history</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};



export default MainPage;
