import { Button } from "@/components/ui/button";
import MainPage from "./whatsappGroupe/MainPage";

export default function Home() {
  return (
    <div >
      <MainPage />
    </div>
  );
}
// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";

// const App = () => {
//   const [fontFamily, setFontFamily] = useState("Arial");

//   const handleCustomFontChange = (e) => {
//     const value = e.target.value;
//     setFontFamily(value);
//   };

//   const handleSelectChange = (value) => {
//     setFontFamily(value);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="relative w-[150px]">
//         {/* Input for manual entry */}
//         <Input
//           type="text"
//           placeholder="Font Family"
//           value={fontFamily}
//           onChange={handleCustomFontChange}
//           className="w-full pr-8"
//         />

//         {/* Dropdown trigger positioned inside the input */}
//         <Select onValueChange={handleSelectChange} value={fontFamily}>
//           <SelectTrigger className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-1 bg-transparent hover:bg-transparent focus:ring-0 border-0"></SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="Arial">Arial</SelectItem>
//               <SelectItem value="Times New Roman">Times New Roman</SelectItem>
//               <SelectItem value="Courier New">Courier New</SelectItem>
//               <SelectItem value="Verdana">Verdana</SelectItem>
//               <SelectItem value="Georgia">Georgia</SelectItem>
//               {/* Arabic Fonts */}
//               <SelectItem value="Amiri">Amiri</SelectItem>
//               <SelectItem value="Lateef">Lateef</SelectItem>
//               <SelectItem value="Scheherazade">Scheherazade</SelectItem>
//               <SelectItem value="Noto Naskh Arabic">
//                 Noto Naskh Arabic
//               </SelectItem>
//               <SelectItem value="Lemonada">Lemonada</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       <p style={{ fontFamily: fontFamily }} className="p-4 border rounded">
//         سلام علیکم
//       </p>
//     </div>
//   );
// };

// export default App;