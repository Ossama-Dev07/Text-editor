import { CopyIcon, CheckIcon } from "@radix-ui/react-icons"; // Added CheckIcon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react"; // Added useState for feedback

export function PresetShare() {
  const [isCopied, setIsCopied] = useState(false); // State to track if text is copied

  // Function to handle copying the link
  const handleCopyLink = () => {
    const link = document.getElementById("link").value;
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true); // Show "Copied" feedback
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share preset</h3>
          <p className="text-sm text-muted-foreground">
            Anyone who has this link and an OpenAI account will be able to view
            this.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
              readOnly
              className="h-9"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopyLink} // Add click handler
          >
            {isCopied ? (
              <>
                <CheckIcon className="h-4 w-4" /> {/* Show check icon */}
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" /> {/* Show copy icon */}
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
