import React from "react";
import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import  isMarkActive from "./isMarkActive";
import  toggleMark from "./toggleMark";

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
export default MarkButton;
