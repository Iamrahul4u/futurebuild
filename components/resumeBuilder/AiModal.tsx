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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CreditsButton from "./CreditsButton";

export function AiModal({
  setFormData,
  setDebouncedFormData,
  type = "resume",
  form,
  jobDescription,
  text = "Generate AI Resume",
  description = "Generate a resume based on your profile.",
  user,
}: {
  setFormData?: (formData: any) => void;
  setDebouncedFormData?: (debouncedFormData: any) => void;
  type?: "resume" | "coverLetter";
  form?: any;
  jobDescription?: string;
  text?: string;
  description?: string;
  user: string | null;
}) {
  const [shortParagraph, setShortParagraph] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  function handleGenerate() {
    if (!user) {
      router.push("/authenticate/signin");
      return;
    }
    setIsGenerating(true);
    if (type === "resume") {
      generateResume(shortParagraph).then((data) => {
        if (data === null || (typeof data === "object" && "error" in data)) {
          setIsDialogOpen(false);
          toast.error("No Credits Left");
          return;
        }
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
          if (data === null || (typeof data === "object" && "error" in data)) {
            setIsDialogOpen(false);
            toast.error("No Credits Left");
            return;
          }
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
        {user && <CreditsButton userId={user} />}
        <DialogFooter>
          <StateButton
            pending={isGenerating}
            content="Generate"
            hidden={user ? false : true}
            className="bg-blue-500 bg-gradient-to-tr from-blue-500 to-blue-600 text-white hover:bg-blue-600"
            processingWord="Generating..."
            onClick={handleGenerate}
          />
          <StateButton
            content="Login to Generate"
            hidden={user ? true : false}
            className="bg-blue-500 bg-gradient-to-tr from-blue-500 to-blue-600 text-white hover:bg-blue-600"
            processingWord="Generating..."
            onClick={() => {
              router.push("/authenticate/signin");
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
