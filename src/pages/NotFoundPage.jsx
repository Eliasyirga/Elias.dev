import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Terminal } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <Layout>
      <div className="py-40 px-4 text-center max-w-xl mx-auto space-y-5 font-mono">
        <div className="inline-flex p-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
          <Terminal className="w-6 h-6" />
        </div>
        <div className="text-xs text-zinc-400 uppercase tracking-widest">HTTP 404 / ROUTE_NOT_FOUND</div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
          Page Not Located
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
          The requested route is not part of the active system routing table.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary" size="md" icon={ArrowLeft}>
              Return to System Root
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
