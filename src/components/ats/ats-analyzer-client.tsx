'use client';

import type { AnalyzeResumeInput, AnalyzeResumeOutput } from '@/ai/flows/ats-resume-analyzer';
import { analyzeResume } from '@/ai/flows/ats-resume-analyzer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, AlertCircle, CheckCircle, Loader2, UploadCloud, FileText } from 'lucide-react';
import React, { useState } from 'react';

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URI.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default function AtsAnalyzerClient() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation for PDF/DOCX
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "text/plain") {
        setResumeFile(file);
        setError(null); // Clear previous error
      } else {
        setResumeFile(null);
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a PDF, DOCX, or TXT file.",
        });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resumeFile || !jobDescription) {
      setError('Please upload a resume and provide a job description.');
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Ensure both resume and job description are provided.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const resumeDataUri = await fileToDataUri(resumeFile);
      const input: AnalyzeResumeInput = { resumeDataUri, jobDescription };
      const result = await analyzeResume(input);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been successfully analyzed.",
        action: <CheckCircle className="text-green-500" />,
      });
    } catch (e) {
      console.error('Analysis failed:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during analysis.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="resume" className="text-lg font-medium flex items-center"><UploadCloud className="mr-2 h-5 w-5 text-primary" />Upload Resume</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {resumeFile && <p className="text-sm text-muted-foreground mt-1">Selected: {resumeFile.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="text-lg font-medium flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
            className="resize-y"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Resume'
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysisResult && (
        <Card className="shadow-lg border-primary/50">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary flex items-center">
              <CheckCircle className="mr-2 h-7 w-7" /> Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="atsScore" className="text-lg font-medium">ATS Score</Label>
              <Progress value={analysisResult.atsScore} className="w-full h-4 mt-2" id="atsScore" />
              <p className="text-2xl font-bold text-center mt-2 text-primary">{analysisResult.atsScore}%</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-accent" />Suggestions for Improvement:</h3>
              {analysisResult.suggestions.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground bg-secondary/30 p-4 rounded-md">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific suggestions provided. Your resume looks good for this role or the analyzer couldn't find specific improvement points!</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
