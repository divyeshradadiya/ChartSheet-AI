"use client";

import { Button } from "@/components/ui/button";
import { Upload, Download, X } from "lucide-react";

interface UploadSectionProps {
  onFileUpload: (content: string, filename: string) => void;
  onClear: () => void;
  onDownload: () => void;
  hasData: boolean;
  filename: string;
}

export default function UploadSection({
  onFileUpload,
  onClear,
  onDownload,
  hasData,
  filename,
}: UploadSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileUpload(content, file.name);
    };
    reader.readAsText(file);
  };

  const loadDemoFile = async (demoFile: string) => {
    try {
      const response = await fetch(demoFile);
      const content = await response.text();
      const filename = demoFile.split("/").pop() || "demo.csv";
      onFileUpload(content, filename);
    } catch (error) {
      console.error("Failed to load demo file:", error);
    }
  };

  return (
    <div className="border-b pb-3 mb-3 shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button asChild size="sm">
            <span className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </span>
          </Button>
        </label>

        {hasData && (
          <>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={onClear}>
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </>
        )}
      </div>

      {!hasData && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground">
            Or try demo files:
          </span>
          <Button
            variant="link"
            size="sm"
            onClick={() => loadDemoFile("/demo-people.csv")}
            className="h-auto p-0 text-xs"
          >
            People
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => loadDemoFile("/demo-sales.csv")}
            className="h-auto p-0 text-xs"
          >
            Sales
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={() => loadDemoFile("/demo-expenses.csv")}
            className="h-auto p-0 text-xs"
          >
            Expenses
          </Button>
        </div>
      )}

      {filename && (
        <div className="mt-1 text-xs text-muted-foreground">
          Current: <span className="font-medium">{filename}</span>
        </div>
      )}
    </div>
  );
}
