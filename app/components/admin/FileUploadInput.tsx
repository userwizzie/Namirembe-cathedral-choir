"use client";

import { useEffect, useRef, useState } from "react";

type FileUploadInputProps = {
  label: string;
  accept?: string;
  hint?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  currentUrl?: string | null;
  onRemoveCurrentUrl?: () => void;
  disabled?: boolean;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadCloudIcon({ className }: { className?: string }) {
  return <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13a4 4 0 0 0-2.83-6.83A5.5 5.5 0 0 0 5.06 8.11 4 4 0 0 0 5.5 16H7" /><path d="M12 12v9" /><polyline points="9 15 12 12 15 15" /></svg>;
}

function XIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}

function FileIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
}

// Drop zone / preview control shared by Media, Events, and Leadership uploads.
export default function FileUploadInput({ label, accept = "image/*", hint = "PNG, JPG, or WEBP", file, onFileChange, currentUrl, onRemoveCurrentUrl, disabled }: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isImageFile = file ? file.type.startsWith("image/") : false;

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) { setPreviewUrl(null); return; }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function pick() { if (!disabled) inputRef.current?.click(); }

  function removeFile() {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const hasSelection = Boolean(file || currentUrl);

  return (
    <div className="mb-[18px]">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.1em] text-gray-600">{label}</span>
      <input ref={inputRef} type="file" accept={accept} className="hidden" disabled={disabled} onChange={(event) => onFileChange(event.target.files?.[0] ?? null)} />
      {!hasSelection && (
        <button
          type="button"
          onClick={pick}
          disabled={disabled}
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => { event.preventDefault(); setIsDragging(false); onFileChange(event.dataTransfer.files?.[0] ?? null); }}
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors duration-200 ${isDragging ? "border-[#1b4332] bg-[#1b4332]/5" : "border-gray-300 hover:border-[#c9aa5c] hover:bg-[#1b4332]/5"}`}
        >
          <UploadCloudIcon className="text-[#1b4332]" />
          <span className="text-sm font-medium text-gray-700">Click or drag image to upload</span>
          <span className="text-xs text-gray-400">{hint}</span>
        </button>
      )}
      {hasSelection && (
        <div className="flex items-center gap-3 rounded-md border border-gray-300 p-3 transition-colors duration-200 hover:border-[#1b4332]">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100 text-[#1b4332]">
            {previewUrl ? (
              <img src={previewUrl} alt="Selected file preview" className="h-full w-full object-cover" />
            ) : file && !isImageFile ? (
              <FileIcon />
            ) : currentUrl ? (
              <img src={currentUrl} alt="Current file preview" className="h-full w-full object-cover" />
            ) : (
              <FileIcon />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {file ? (
              <>
                <p className="truncate text-xs font-semibold text-gray-700">{file.name}</p>
                <p className="text-[11px] text-gray-400">{formatBytes(file.size)}</p>
              </>
            ) : (
              <p className="text-xs font-semibold text-gray-700">Current file</p>
            )}
          </div>
          <button type="button" onClick={pick} disabled={disabled} className="shrink-0 cursor-pointer rounded border border-[#1b4332] px-2 py-1 text-[10px] font-semibold text-[#1b4332] transition-all duration-150 hover:scale-[1.03] hover:bg-[#1b4332] hover:text-white active:scale-95">
            Change
          </button>
          <button
            type="button"
            onClick={file ? removeFile : onRemoveCurrentUrl}
            disabled={disabled}
            aria-label="Remove selection"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-all duration-150 hover:scale-110 hover:bg-red-500 hover:text-white active:scale-95"
          >
            <XIcon />
          </button>
        </div>
      )}
    </div>
  );
}
