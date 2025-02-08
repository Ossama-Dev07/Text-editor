import React from "react";
import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import  isBlockActive  from "./isBlockActive";
import  toggleBlock  from "./toggleBlock";
import { TEXT_ALIGN_TYPES } from "../data";

const BlockButton = ({ format, icon, msgformat,name }) => {
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
            disabled={msgformat === "wtsp"}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default BlockButton;
