import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Application } from '@/lib/placeholders';
import { Briefcase, CalendarDays, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface ApplicationCardProps {
  application: Application;
}

const getStatusVariant = (status: Application['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'Applied': return 'secondary';
        case 'Interviewing': return 'default'; // Primary color
        case 'Offer': return 'default'; // Consider a success variant if available, primary is good
        case 'Rejected': return 'destructive';
        case 'Withdrawn': return 'outline';
        default: return 'secondary';
    }
}


export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{application.jobTitle}</CardTitle>
        <CardDescription className="text-sm text-primary flex items-center">
            <Briefcase className="mr-2 h-4 w-4"/>{application.companyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="mr-2 h-4 w-4" />
          Status: <Badge variant={getStatusVariant(application.status)} className="ml-2">{application.status}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Applied on: {new Date(application.appliedDate).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
            <Link href={`/jobs/${application.jobId}`}>View Original Job</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
