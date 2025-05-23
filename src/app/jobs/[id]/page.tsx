
'use client';

import { use } from 'react'; // Import the 'use' hook
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { placeholderJobs } from "@/lib/placeholders";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Building, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// It's good practice to type the params object accurately.
// The warning suggests params might be treated as a promise internally or in future versions.
// Let's use a more generic type for paramsPromise that could be a promise or an object.
interface JobDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>; // Allow it to be a promise or direct object
}

export default function JobDetailsPage({ params: paramsInput }: JobDetailsPageProps) {
  // Use React.use to unwrap params if it's a promise, or use directly if it's an object.
  // This handles the case where Next.js might pass it as a promise.
  const params = use(paramsInput as Promise<{ id: string }>); // Cast to Promise for use(), it handles non-promises too.

  const job = placeholderJobs.find(j => j.id === params.id);
  const { toast } = useToast();

  if (!job) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <p className="text-muted-foreground mb-6">The job you are looking for does not exist or may have been removed.</p>
        <Button asChild>
          <Link href="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>
    );
  }

  const handleApplyNow = () => {
    toast({
      title: "Application Submitted (Simulation)",
      description: `You have successfully applied for the position of ${job.title} at ${job.companyName}.`,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
              <CardDescription className="text-lg text-primary flex items-center mt-1">
                <Building className="mr-2 h-5 w-5" /> {job.companyName}
              </CardDescription>
            </div>
            {job.companyLogoUrl && (
              <Image
                src={job.companyLogoUrl}
                alt={`${job.companyName} logo`}
                data-ai-hint={job.dataAihint || 'company logo'}
                width={80}
                height={80}
                className="rounded-md border object-contain"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-primary" /> {job.location}
            </div>
            {job.salary && (
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-primary" /> {job.salary}
              </div>
            )}
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-primary" /> Posted: {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="py-6">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {job.shortDescription}
            {/* Usually a full job description would go here */}
            \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            \n\nKey Responsibilities:
            \n- Develop and maintain web applications.
            \n- Collaborate with cross-functional teams.
            \n- Write clean, scalable code.
            \n- Participate in code reviews.
            \n\nQualifications:
            \n- Bachelor's degree in Computer Science or related field.
            \n- 3+ years of experience in software development.
            \n- Proficiency in JavaScript, React, and Node.js.
            \n- Strong problem-solving skills.
          </p>

          {job.tags && job.tags.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                ))}
              </div>
            </>
          )}
        </CardContent>
        <Separator />
        <CardFooter className="py-6">
          <Button size="lg" className="w-full md:w-auto" onClick={handleApplyNow}>
            Apply Now
            <Briefcase className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// This function can be used if you need to generate static paths at build time
// export async function generateStaticParams() {
//   return placeholderJobs.map(job => ({
//     id: job.id,
//   }));
// }
