export const initialValue = [
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
    type: "paragraph",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];
export const COLORS = [
  { name: "bg-black", value: "text-black" },
  { name: "bg-blue-500", value: "text-blue-500" },
  { name: "bg-green-500", value: "text-green-500" },
  { name: "bg-red-500", value: "text-red-500" },
  { name: "bg-yellow-500", value: "text-yellow-500" },
  { name: "bg-purple-500", value: "text-purple-500" },
];
export const HOTKEYS = {
  "ctrl+b": "bold",
  "ctrl+i": "italic",
  "ctrl+u": "underline",
  "ctrl+`": "code",
};
export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];


