"use client";

import { Message } from "@/types";
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      <Card
        className={`max-w-[80%] p-3 ${
          isUser ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
      </Card>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
