
'use client';

import React, { useState, useEffect } from 'react';
import ResumeBuilderForm from '@/components/resume/resume-builder-form';
import ResumePreview from '@/components/resume/resume-preview';
import { FileText, Eye, Save, FileDown } from 'lucide-react';
import type { ResumeData, ExperienceEntry, EducationEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: '',
};

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load resume data from localStorage on initial client-side render
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      }
    } catch (error) {
        console.error("Failed to load resume data from localStorage", error);
        // Set to initial if parsing fails or localStorage is not available
        setResumeData(initialResumeData);
    }
  }, []);

  const handleSaveResume = () => {
    if (!isClient) return;
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      toast({
        title: 'Resume Saved!',
        description: 'Your resume data has been saved locally in your browser.',
      });
    } catch (error) {
        console.error("Failed to save resume data to localStorage", error);
        toast({
            title: 'Error Saving Resume',
            description: 'Could not save resume data to local storage.',
            variant: 'destructive',
        });
    }
  };

  const handleExportPdf = () => {
    if (!isClient) return;
    // Use the browser's print functionality
    window.print();
  };

  const addExperienceEntry = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: crypto.randomUUID(), jobTitle: '', company: '', startDate: '', endDate: '', responsibilities: '' }
      ]
    }));
  };

  const addEducationEntry = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: crypto.randomUUID(), degree: '', university: '', gradDate: '' }
      ]
    }));
  };

  const updateExperienceEntry = (id: string, field: keyof ExperienceEntry, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const updateEducationEntry = (id: string, field: keyof EducationEntry, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };
  
  const removeExperienceEntry = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const removeEducationEntry = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };


  if (!isClient) {
    // Render nothing or a loading indicator until client-side hydration
    return (
        <div className="container mx-auto py-12 px-4 md:px-6 text-center">
            <p>Loading Resume Builder...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-10 text-center resume-builder-page-header">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <FileText className="mr-3 h-10 w-10 text-primary" />
          Craft Your Professional Resume
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Build a standout resume with our interactive builder and get real-time feedback.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="resume-builder-controls-column">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              Resume Details
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportPdf}>
                <FileDown className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button onClick={handleSaveResume}>
                <Save className="mr-2 h-4 w-4" />
                Save Resume
              </Button>
            </div>
          </div>
          <ResumeBuilderForm
            resumeData={resumeData}
            setResumeData={setResumeData}
            addExperienceEntry={addExperienceEntry}
            addEducationEntry={addEducationEntry}
            updateExperienceEntry={updateExperienceEntry}
            updateEducationEntry={updateEducationEntry}
            removeExperienceEntry={removeExperienceEntry}
            removeEducationEntry={removeEducationEntry}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center resume-preview-title">
            <Eye className="mr-2 h-6 w-6 text-primary" />
            Live Preview
          </h2>
          <div className="printable-resume-area">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
