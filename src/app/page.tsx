"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Message, CSVData, ChartConfig } from "@/types";
import ChatPanel from "@/components/ChatPanel";
import CSVTableView from "@/components/CSVTableView";
import ChartView from "@/components/ChartView";
import UploadSection from "@/components/UploadSection";
import Papa from "papaparse";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [csvData, setCSVData] = useState<CSVData | null>(null);
  const [csvContent, setCSVContent] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");

  const handleFileUpload = (content: string, name: string) => {
    setCSVContent(content);
    setFilename(name);

    // Parse CSV for immediate display
    const result = Papa.parse(content, {
      header: false,
      skipEmptyLines: true,
    });

    const data = result.data as string[][];
    setCSVData({
      headers: data[0],
      rows: data.slice(1),
    });

    setMessages([]);
    setChartConfig(null);
  };

  const handleClear = () => {
    setCSVData(null);
    setCSVContent("");
    setFilename("");
    setMessages([]);
    setChartConfig(null);
  };

  const handleDownload = () => {
    if (!csvData) return;

    const csv = [
      csvData.headers.join(","),
      ...csvData.rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async (content: string) => {
    if (!csvContent) return;

    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          csvContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages(data.messages);

      if (data.csvData) {
        setCSVData(data.csvData);
      }

      if (data.chartConfig) {
        setChartConfig(data.chartConfig);
        setActiveTab("chart");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">ChartSheet</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered CSV analytics and visualization
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Left: Chat Panel */}
          <div className="flex flex-col h-full">
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              hasCSVData={!!csvData}
            />
          </div>

          {/* Right: Data Display */}
          <div className="flex flex-col h-full">
            <UploadSection
              onFileUpload={handleFileUpload}
              onClear={handleClear}
              onDownload={handleDownload}
              hasData={!!csvData}
              filename={filename}
            />

            {csvData ? (
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "table" | "chart")}
                className="flex-1 flex flex-col"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="table" className="flex-1">
                    Table View
                  </TabsTrigger>
                  <TabsTrigger
                    value="chart"
                    className="flex-1"
                    disabled={!chartConfig}
                  >
                    Chart View
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="table" className="flex-1 mt-4">
                  <CSVTableView data={csvData} />
                </TabsContent>

                <TabsContent value="chart" className="flex-1 mt-4">
                  {chartConfig ? (
                    <ChartView config={chartConfig} />
                  ) : (
                    <Card className="p-8 h-full flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <p>No chart generated yet</p>
                        <p className="text-sm mt-2">
                          Ask the AI to create a chart from your data
                        </p>
                      </div>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg mb-2">No data loaded</p>
                  <p className="text-sm">
                    Upload a CSV file or try a demo to get started
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
