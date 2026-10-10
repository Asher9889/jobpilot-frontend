"use client"

import { useRef, useState } from "react"
import { FileText, LoaderCircle, Upload } from "lucide-react"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  // AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"

const MAX_RESUME_BYTES = 5 * 1024 * 1024

type ResumeAttachmentState = "idle" | "uploading" | "error" | "done"

interface ResumeFieldProps {
  objectKey: string | null
  isUploading: boolean
  error: string | null
  onUpload: (file: File) => void
}

function displayName(objectKey: string) {
  return objectKey.split("/").pop() || objectKey
}

export function ResumeField({ objectKey, isUploading, error, onUpload }: ResumeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const hasResume = Boolean(objectKey)
  const message = localError ?? error
  const state: ResumeAttachmentState = message
    ? "error"
    : isUploading
      ? "uploading"
      : hasResume
        ? "done"
        : "idle"

  function openPicker() {
    inputRef.current?.click()
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return

    if (!/\.(pdf|docx?)$/i.test(file.name)) {
      setLocalError("Only PDF, DOC or DOCX files are supported.")
      return
    }
    if (file.size > MAX_RESUME_BYTES) {
      setLocalError("Resume must be 5 MB or smaller.")
      return
    }

    setLocalError(null)
    onUpload(file)
  }

  return (
    <Attachment state={state} className="w-full max-w-xl">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files)
          event.target.value = ""
        }}
      />

      <AttachmentMedia>
        {isUploading ? (
          <LoaderCircle className="animate-spin" />
        ) : hasResume ? (
          <FileText />
        ) : (
          <Upload />
        )}
      </AttachmentMedia>

      <AttachmentContent>
        <AttachmentTitle>
          {hasResume
            ? displayName(objectKey!)
            : isUploading
              ? "Uploading resume..."
              : "Upload your resume"}
        </AttachmentTitle>
        {/* <AttachmentDescription>
          {message ??
            (hasResume ? objectKey : "PDF, DOC or DOCX \u2014 up to 5 MB")}
        </AttachmentDescription> */}
      </AttachmentContent>

      {hasResume && (
        <AttachmentActions>
          <AttachmentAction
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={openPicker}
            aria-label="Replace resume"
          >
            <Upload />
          </AttachmentAction>
        </AttachmentActions>
      )}

      <AttachmentTrigger
        onClick={openPicker}
        aria-label={hasResume ? "Replace resume" : "Upload resume"}
      />
    </Attachment>
  )
}
