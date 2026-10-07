import { LoaderCircle } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}