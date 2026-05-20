"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateSEO } from "@/lib/api";

export default function GenerateSEOForm() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!topic.trim()) return;

    setLoading(true);

    try {
      const response = await generateSEO(topic);
      setResult(response.content);
    } catch (error) {
      console.error("Failed to generate SEO:", error);
      setResult("Failed to generate SEO content.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate YouTube SEO Assets</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="e.g. Build an AI Chatbot with Python"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>

        {result && (
          <pre className="max-h-[500px] overflow-auto rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}