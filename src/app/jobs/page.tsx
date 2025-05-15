import JobSearchFilters from '@/components/jobs/job-search-filters';
import JobCard from '@/components/jobs/job-card';
import { placeholderJobs } from '@/lib/placeholders';
import { Separator } from '@/components/ui/separator';
import { ListFilter, Search } from 'lucide-react';

export default function JobsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <Search className="mr-3 h-10 w-10 text-primary" />
          Find Your Next Opportunity
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Browse thousands of job openings from top companies.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <ListFilter className="mr-2 h-6 w-6 text-primary"/>
                Filter Jobs
            </h2>
            <JobSearchFilters />
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{placeholderJobs.length} jobs found</p>
            {/* Future: Sort by dropdown */}
          </div>
          <Separator className="mb-6"/>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {placeholderJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {/* Future: Pagination controls */}
        </main>
      </div>
    </div>
  );
}
