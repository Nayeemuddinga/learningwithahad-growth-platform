import GenerateSEOForm from "@/components/GenerateSEOForm";
import SEOHistoryTable from "@/components/SEOHistoryTable";
import StatsCards from "@/components/StatsCards";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            LearningWithAhad Growth Platform
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered YouTube SEO, analytics, and marketing automation.
          </p>
        </div>

        {/* KPI Cards */}
        <StatsCards />

        {/* SEO Generator */}
        <GenerateSEOForm />

        {/* History Table */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">SEO Generation History</h2>
            <p className="text-sm text-muted-foreground">
              Browse previously generated SEO assets stored in PostgreSQL.
            </p>
          </div>

          <SEOHistoryTable />
        </section>
      </div>
    </main>
  );
}