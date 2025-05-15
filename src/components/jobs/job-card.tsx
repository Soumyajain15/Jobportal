import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/placeholders';
import { Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
            <Image 
                src={job.companyLogoUrl || `https://placehold.co/40x40.png`}
                alt={`${job.companyName} logo`}
                data-ai-hint="company logo"
                width={40}
                height={40}
                className="rounded-sm mr-3"
            />
            <div className='flex-1'>
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <CardDescription className="text-sm text-primary">{job.companyName}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          {job.location}
        </div>
        {job.salary && (
            <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="mr-2 h-4 w-4" />
                {job.salary}
            </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-3">{job.shortDescription}</p>
        <div className="flex flex-wrap gap-2 pt-2">
            {job.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link href={`/jobs/${job.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
