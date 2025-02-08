export const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "نظرًا لأنه نص غني، يمكنك تنسيق النصوص بشكل احترافي مثل جعله ",
      },
      { text: "عريض", bold: true },
      {
        text: "، أو إضافة اقتباسات منسقة تظهر بشكل مناسب داخل الصفحة، كما هو موضح هنا:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "حكمة تُستلهم." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "اختبره بنفسك الآن!" }],
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
