import ApplicationCard from '@/components/applications/application-card';
import { placeholderApplications } from '@/lib/placeholders';
import { ListChecks } from 'lucide-react';

export default function ApplicationsPage() {
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

      {placeholderApplications.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">You haven&apos;t applied to any jobs yet.</p>
          <p className="mt-2 text-muted-foreground">Start by searching for jobs and submitting your applications.</p>
        </div>
      )}
    </div>
  );
}
