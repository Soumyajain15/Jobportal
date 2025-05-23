
'use client';

import React, { useState, useEffect } from 'react';
import ApplicationCard from '@/components/applications/application-card';
import type { Application } from '@/lib/placeholders'; // Import Application type
import { ListChecks, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== 'undefined') {
      try {
        const storedApps = localStorage.getItem('userApplications');
        if (storedApps) {
          setApplications(JSON.parse(storedApps));
        }
      } catch (error) {
        console.error("Failed to load applications from localStorage", error);
        // Optionally set an error state or toast
      } finally {
        setIsLoading(false);
      }
    } else {
        setIsLoading(false); // Not in browser, so no localStorage
    }
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 text-center flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <ListChecks className="mr-3 h-10 w-10 text-primary" />
          My Job Applications
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Track the status of all your job applications in one place.
        </p>
      </header>

      {applications.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card p-8">
          <ListChecks className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">You haven&apos;t applied to any jobs yet.</p>
          <p className="mt-2 text-muted-foreground">
            Start by searching for jobs and submitting your applications.
          </p>
          <Button asChild className="mt-6">
            <Link href="/jobs">
              Browse Jobs
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
