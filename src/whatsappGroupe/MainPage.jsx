import React, { useState, useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Button } from "@/components/ui/button"; // Import shadcn Button
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
} from "lucide-react"; // Added Palette icon
import { Tabs } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PresetSelector } from "./components/preset-selector";
import { PresetSave } from "./components/preset-save";
import { CodeViewer } from "./components/code-viewer";
import { PresetShare } from "./components/preset-share";
import { PresetActions } from "./components/preset-actions";
import { presets } from "./data/presets";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Added Popover for color picker
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

const HOTKEYS = {
  "ctrl+b": "bold",
  "ctrl+i": "italic",
  "ctrl+u": "underline",
  "ctrl+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// Color options for the color picker
const COLORS = [
  { name: "bg-black", value: "text-black" },
  { name: "bg-blue-500", value: "text-blue-500" },
  { name: "bg-green-500", value: "text-green-500" },
  { name: "bg-red-500", value: "text-red-500" },
  { name: "bg-yellow-500", value: "text-yellow-500" },
  { name: "bg-purple-500", value: "text-purple-500" },
];

const MainPage = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Function to handle color change
  const handleColorChange = (color) => {
    Editor.addMark(editor, "color", color);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full px-4">
        <div
        className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
        dir="rtl"
      >
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

        <Tabs>
          <Slate editor={editor} initialValue={initialValue}>
            <div className="py-8">
              <div className="grid gap-8 md:grid-cols-[320px_1fr]">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
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
                        />
                        <BlockButton
                          format="heading-two"
                          icon={<Heading2 className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="numbered-list"
                          icon={<ListOrdered className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="bulleted-list"
                          icon={<List className="w-5 h-5" />}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500">
                        Alignment
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <BlockButton
                          format="left"
                          icon={<AlignLeft className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="center"
                          icon={<AlignCenter className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="right"
                          icon={<AlignRight className="w-5 h-5" />}
                        />
                        <BlockButton
                          format="justify"
                          icon={<AlignJustify className="w-5 h-5" />}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500">Color</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="default"
                            className="w-10 h-10 p-0"
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

        <div className="flex justify-end  space-x-2" >
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

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  const baseStyle = { textAlign: element.align };
  const styles = {
    "block-quote": {
      ...baseStyle,
      marginLeft: "20px",
      paddingLeft: "10px",
      borderLeft: "3px solid #ccc",
      fontStyle: "italic",
    },
    "bulleted-list": {
      ...baseStyle,
      listStyleType: "disc",
      paddingLeft: "20px",
    },
    "heading-one": {
      ...baseStyle,
      fontSize: "32px",
      fontWeight: "bold",
    },
    "heading-two": {
      ...baseStyle,
      fontSize: "24px",
      fontWeight: "bold",
    },
    "list-item": {
      ...baseStyle,
      display: "list-item",
    },
    "numbered-list": {
      ...baseStyle,
      listStyleType: "decimal",
      paddingLeft: "20px",
    },
    default: {
      ...baseStyle,
      fontSize: "16px",
    },
  };
  const elementStyle = styles[element.type] || styles.default;
  return (
    <div style={elementStyle} {...attributes}>
      {children}
    </div>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.color) {
    children = <span className={leaf.color}>{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={
              isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
              )
                ? "default"
                : "outline"
            }
            size="sm"
            onMouseDown={(event) => {
              event.preventDefault();
              toggleBlock(editor, format);
            }}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{format}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MarkButton = ({ format, icon, name }) => {
  const editor = useSlate();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isMarkActive(editor, format) ? "default" : "outline"}
            size="sm"
            onMouseDown={(event) => {
              event.preventDefault();
              toggleMark(editor, format);
            }}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{format}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];

export default MainPage;
