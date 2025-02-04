import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Button, Icon, Toolbar } from "./EditorUI/index";
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
  ItalicIcon,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const RichTextExample = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar className="w-full">
        <MarkButton format="bold" icon={<Bold />} />
        <MarkButton format="italic" icon={<ItalicIcon />} />
        <MarkButton format="underline" icon={<Underline />} />
        <MarkButton format="code" icon={<Code />} />
        <BlockButton format="heading-one" icon={<Heading1 />} />
        <BlockButton format="heading-two" icon={<Heading2 />} />
        <BlockButton format="block-quote" icon={<Quote />} />
        <BlockButton format="numbered-list" icon={<ListOrdered />} />
        <BlockButton format="bulleted-list" icon={<List />} />
        <BlockButton format="left" icon={<AlignLeft />} />
        <BlockButton format="center" icon={<AlignCenter />} />
        <BlockButton format="right" icon={<AlignRight />} />
        <BlockButton format="justify" icon={<AlignJustify />} />
      </Toolbar>
      <Editable
        className="h-[400px]"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
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
    </Slate>
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
  // Base styles for all elements
  const baseStyle = { textAlign: element.align };

  // Styles for specific element types
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

  // Get the appropriate style for the element type
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
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
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
export default RichTextExample;
