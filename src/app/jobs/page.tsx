
'use client';

import React, { useState, useEffect } from 'react';
import JobSearchFilters from '@/components/jobs/job-search-filters';
import JobCard from '@/components/jobs/job-card';
import { placeholderJobs, type Job } from '@/lib/placeholders';
import { Separator } from '@/components/ui/separator';
import { ListFilter, Search, Info } from 'lucide-react'; // Added Info icon

// Define a type for the filter criteria
export interface FilterCriteria {
  keywords: string;
  location: string;
  industry: string;
  experienceLevel: string;
}

export default function JobsPage() {
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>(placeholderJobs);
  const [activeFilters, setActiveFilters] = useState<FilterCriteria | null>(null);

  const handleApplyFilters = (newFilters: FilterCriteria) => {
    setActiveFilters(newFilters);
    let tempJobs = placeholderJobs;

    // Filter by keywords (job title, company, description, tags)
    if (newFilters.keywords) {
      const keywordsLower = newFilters.keywords.toLowerCase();
      tempJobs = tempJobs.filter(job =>
        job.title.toLowerCase().includes(keywordsLower) ||
        job.companyName.toLowerCase().includes(keywordsLower) ||
        job.shortDescription.toLowerCase().includes(keywordsLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(keywordsLower))
      );
    }

    // Filter by location
    if (newFilters.location) {
      const locationLower = newFilters.location.toLowerCase();
      tempJobs = tempJobs.filter(job =>
        job.location.toLowerCase().includes(locationLower)
      );
    }
    
    // Placeholder for industry and experience level filtering
    // These are not implemented due to current data structure limitations
    // if (newFilters.industry && newFilters.industry !== 'all-industries') {
    //   // Example: tempJobs = tempJobs.filter(job => job.industry === newFilters.industry);
    // }
    // if (newFilters.experienceLevel && newFilters.experienceLevel !== 'all-levels') {
    //   // Example: tempJobs = tempJobs.filter(job => job.experienceLevel === newFilters.experienceLevel);
    // }

    setDisplayedJobs(tempJobs);
  };

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
            <JobSearchFilters onApplyFilters={handleApplyFilters} />
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">{displayedJobs.length} jobs found</p>
            {/* Future: Sort by dropdown */}
          </div>
          <Separator className="mb-6"/>
          {displayedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {displayedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card p-8">
              <Search className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">No jobs match your current filters.</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your keywords or location.
              </p>
               {activeFilters && (newFilters.industry && newFilters.industry !== 'all-industries' || newFilters.experienceLevel && newFilters.experienceLevel !== 'all-levels') && (
                 <p className="mt-4 text-sm text-accent-foreground bg-accent/20 p-2 rounded-md inline-flex items-center">
                   <Info className="mr-2 h-4 w-4" />
                   Filtering by industry and experience level is not yet fully implemented.
                 </p>
               )}
            </div>
          )}
          {/* Future: Pagination controls */}
        </main>
      </div>
    </div>
  );
}
