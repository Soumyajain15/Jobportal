import AtsAnalyzerClient from '@/components/ats/ats-analyzer-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';


export default function AtsAnalyzerPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">ATS Resume Analyzer</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Optimize your resume by analyzing it against a job description. Get your ATS score and suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AtsAnalyzerClient />
        </CardContent>
      </Card>
    </div>
  );
}
