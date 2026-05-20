"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSEOGeneration, SEOGeneration } from "@/lib/api";

export default function SEOGenerationPage() {
  const params = useParams();
  const id = Number(params.id);

  const [item, setItem] = useState<SEOGeneration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGeneration() {
      try {
        const data = await getSEOGeneration(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to load SEO generation:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      loadGeneration();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="container mx-auto max-w-5xl px-6 py-10">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="container mx-auto max-w-5xl px-6 py-10 space-y-4">
        <p className="text-destructive">SEO generation not found.</p>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10 space-y-6">
      <Link href="/">
        <Button variant="outline">← Back to Dashboard</Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{item.topic}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Generated with {item.provider} on{" "}
            {new Date(item.created_at).toLocaleString()}
          </p>
        </CardHeader>

        <CardContent>
          <pre className="whitespace-pre-wrap text-sm leading-7">
            {item.content}
          </pre>
        </CardContent>
      </Card>
    </main>
  );
}