"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { Message } from "@/types";
import ChatMessage from "./ChatMessage";

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  hasCSVData: boolean;
}

export default function ChatPanel({
  messages,
  onSendMessage,
  isLoading,
  hasCSVData,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestions = [
    "Remove the Industry Focus column",
    "Show me a bar chart of net worth by person",
    "Filter for people with net worth greater than 150",
    "Sort by age in descending order",
    "Analyze the Net Worth column",
    "Create a pie chart of nationalities",
  ];

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Chat with AI</h2>
        <p className="text-sm text-muted-foreground">
          {hasCSVData
            ? "Ask me to analyze, filter, sort, or visualize your data"
            : "Upload a CSV file to get started"}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && hasCSVData && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
            <div className="grid gap-2">
              {suggestions.map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => setInput(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isLoading && (
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
            </div>
            <Card className="p-3">
              <div className="text-sm text-muted-foreground">Thinking...</div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              hasCSVData
                ? "Ask a question about your data..."
                : "Upload CSV first..."
            }
            disabled={!hasCSVData || isLoading}
            className="min-h-[60px] resize-none"
          />
          <Button
            type="submit"
            disabled={!input.trim() || !hasCSVData || isLoading}
            size="icon"
            className="h-[60px] w-[60px]"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
