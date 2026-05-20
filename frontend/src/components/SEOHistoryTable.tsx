"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getSEOHistory, SEOHistoryItem } from "@/lib/api";

export default function SEOHistoryTable() {
  const [items, setItems] = useState<SEOHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getSEOHistory();
        setItems(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Loading SEO history...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        No SEO generations found yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/seo/${item.id}`}
                  className="text-primary hover:underline"
                >
                  #{item.id}
                </Link>
              </TableCell>

              <TableCell>{item.topic}</TableCell>

              <TableCell>
                <Badge variant="secondary">{item.provider}</Badge>
              </TableCell>

              <TableCell>
                {new Date(item.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}