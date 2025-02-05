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
} from "lucide-react";
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


const HOTKEYS = {
  "ctrl+b": "bold",
  "ctrl+i": "italic",
  "ctrl+u": "underline",
  "ctrl+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const MainPage = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div>
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
          <div className="h-full py-6">
            <div className="grid h-full gap-6 md:grid-cols-[auto_1fr]">
              {/* Button Toolbar */}
              <div className="flex flex-col space-y-6 pt-28">
                {/* Text Formatting Buttons */}
                <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
                  <MarkButton format="bold" icon={<Bold />} />
                  <MarkButton format="italic" icon={<Italic />} />
                  <MarkButton format="underline" icon={<Underline />} />
                  <MarkButton format="code" icon={<Code />} />
                </div>

                {/* Block Formatting Buttons */}
                <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
                  <BlockButton format="heading-one" icon={<Heading1 />} />
                  <BlockButton format="heading-two" icon={<Heading2 />} />
                  <BlockButton format="numbered-list" icon={<ListOrdered />} />
                  <BlockButton format="bulleted-list" icon={<List />} />
                </div>

                {/* Alignment Buttons */}
                <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
                  <BlockButton format="left" icon={<AlignLeft />} />
                  <BlockButton format="center" icon={<AlignCenter />} />
                  <BlockButton format="right" icon={<AlignRight />} />
                  <BlockButton format="justify" icon={<AlignJustify />} />
                </div>
              </div>

              {/* Editable Area */}
              <div className="w-full lg:pr-5 md:pr-5">
                <Editable
                  className="w-full h-[500px] p-5 border rounded-md overflow-hidden"
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
