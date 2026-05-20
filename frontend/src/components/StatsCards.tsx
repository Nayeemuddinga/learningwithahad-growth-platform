"use client";

import { useEffect, useState } from "react";
import { FileText, Sparkles, Bot } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSEOStats, SEOStats } from "@/lib/api";

export default function StatsCards() {
  const [stats, setStats] = useState<SEOStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getSEOStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Generations",
      value: stats?.total_generations ?? 0,
      icon: FileText,
    },
    {
      title: "Unique Topics",
      value: stats?.unique_topics ?? 0,
      icon: Sparkles,
    },
    {
      title: "Providers",
      value: stats?.providers?.length ?? 0,
      icon: Bot,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <div className="text-3xl font-bold">{card.value}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}