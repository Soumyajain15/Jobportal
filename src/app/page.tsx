import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Search } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Find Your Dream Job. Build Your Perfect Resume.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  CareerConnect Pro helps you connect with top companies, craft ATS-friendly resumes, and track your applications seamlessly.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/jobs">
                    Search Jobs
                    <Search className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/resume-builder">
                    Build Your Resume
                    <FileText className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Hero"
              data-ai-hint="job search professional"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to advance your career</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From AI-powered resume analysis to comprehensive job searching and application tracking, CareerConnect Pro is your ultimate career companion.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md border bg-card hover:shadow-lg transition-shadow">
              <FileText className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Resume Builder</h3>
              <p className="text-sm text-muted-foreground">
                Create professional, ATS-optimized resumes with our easy-to-use builder and live preview.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md border bg-card hover:shadow-lg transition-shadow">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 h-12 w-12 text-primary"><path d="m12 14 4-4"/><path d="m12 14-4-4"/><circle cx="12" cy="12" r="10"/><path d="m12 6v1.17a2 2 0 0 0 \.59 1.42l.82.81a2 2 0 0 1 \.59 1.42V12a2 2 0 0 1 -.59 1.42l-.82.81A2 2 0 0 0 12 15.83V18"/></svg>
              <h3 className="text-xl font-bold">ATS Score Analyzer</h3>
              <p className="text-sm text-muted-foreground">
                Evaluate your resume against job descriptions and get actionable suggestions for improvement using AI.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md border bg-card hover:shadow-lg transition-shadow">
              <Search className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Job Search & Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Find relevant jobs and track your application status all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} CareerConnect Pro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
