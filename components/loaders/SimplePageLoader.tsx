import { Loader2, LoaderIcon, LoaderPinwheel } from "lucide-react";

export default function SimplePageLoader() {
  return (
    <div className="flex w-full animate-pulse items-center justify-center gap-2 duration-1000 ease-in-out">
      <LoaderIcon className="mb-4 h-6 w-6 animate-spin" />
    </div>
  );
}
