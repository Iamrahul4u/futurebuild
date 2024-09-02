"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StateButton from "../shared/StateButton";
import {
  generateCoverLetter,
  generateResume,
} from "@/app/actions/openAi.action";
import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function AiModal({
  setFormData,
  setDebouncedFormData,
  type = "resume",
  form,
  jobDescription,
  text = "Generate AI Resume",
  description = "Generate a resume based on your profile.",
}: {
  setFormData?: (formData: any) => void;
  setDebouncedFormData?: (debouncedFormData: any) => void;
  type?: "resume" | "coverLetter";
  form?: any;
  jobDescription?: string;
  text?: string;
  description?: string;
}) {
  const [shortParagraph, setShortParagraph] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  function handleGenerate() {
    setIsGenerating(true);
    if (type === "resume") {
      generateResume(shortParagraph).then((data) => {
        const parsedData = JSON.parse(data || "{}");
        setIsDialogOpen(false);
        setIsGenerating(false);
        setFormData &&
          setFormData((prevFormData: any) => ({
            ...prevFormData,
            ...parsedData,
          }));
        setDebouncedFormData &&
          setDebouncedFormData((prevDebouncedFormData: any) => ({
            ...prevDebouncedFormData,
            ...parsedData,
          }));
      });
    } else if (type === "coverLetter") {
      generateCoverLetter(jobDescription || "", shortParagraph || "")
        .then((data) => {
          const parsedData = JSON.parse(data || "{}");
          setIsDialogOpen(false);
          form && form.setValue("coverLetter", parsedData?.coverLetter || "");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsGenerating(false);
        });
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-500 bg-gradient-to-tr from-blue-500 to-blue-600 text-white hover:bg-blue-600"
        >
          <SparklesIcon height={16} width={16} />
          &nbsp; {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Short Information
            </Label>
            <Textarea
              id="name"
              value={shortParagraph}
              placeholder="Example: My name is Rahul Gupta. I am a software engineer. Currently, I am working as a software engineer at XYZ company. I have 2 years of experience in software development. I have a passion for software development and I love to code."
              className="col-span-3"
              onChange={(e) => setShortParagraph(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <StateButton
            pending={isGenerating}
            content="Generate"
            className="bg-blue-500 bg-gradient-to-tr from-blue-500 to-blue-600 text-white hover:bg-blue-600"
            processingWord="Generating..."
            onClick={handleGenerate}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
