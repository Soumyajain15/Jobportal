
'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { ResumeData, ExperienceEntry, EducationEntry } from '@/lib/types';

interface ResumeBuilderFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  addExperienceEntry: () => void;
  addEducationEntry: () => void;
  updateExperienceEntry: (id: string, field: keyof ExperienceEntry, value: string) => void;
  updateEducationEntry: (id: string, field: keyof EducationEntry, value: string) => void;
  removeExperienceEntry: (id: string) => void;
  removeEducationEntry: (id: string) => void;
}

export default function ResumeBuilderForm({
  resumeData,
  setResumeData,
  addExperienceEntry,
  addEducationEntry,
  updateExperienceEntry,
  updateEducationEntry,
  removeExperienceEntry,
  removeEducationEntry,
}: ResumeBuilderFormProps) {

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, skills: e.target.value }));
  };

  return (
    <Card className="shadow-xl">
      <CardContent className="pt-6">
        <Accordion type="multiple" defaultValue={['personal-info', 'experience', 'education', 'skills', 'summary']} className="w-full">
          <AccordionItem value="personal-info">
            <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" placeholder="John Doe" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="(123) 456-7890" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                  <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/johndoe" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" placeholder="123 Main St, Anytown, USA" value={resumeData.personalInfo.address} onChange={handlePersonalInfoChange} />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-semibold">Professional Summary</AccordionTrigger>
            <AccordionContent className="space-y-1 pt-2">
              <Label htmlFor="summaryText">Summary</Label>
              <Textarea id="summaryText" placeholder="A brief overview of your skills and experience..." value={resumeData.summary} onChange={handleSummaryChange} rows={4} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience">
            <AccordionTrigger className="text-lg font-semibold">Work Experience</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-md space-y-3 bg-secondary/20 relative">
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" onClick={() => removeExperienceEntry(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-1">
                    <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
                    <Input id={`jobTitle-${exp.id}`} placeholder="Software Engineer" value={exp.jobTitle} onChange={(e) => updateExperienceEntry(exp.id, 'jobTitle', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input id={`company-${exp.id}`} placeholder="Tech Solutions Inc." value={exp.company} onChange={(e) => updateExperienceEntry(exp.id, 'company', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                      <Input id={`startDate-${exp.id}`} type="month" value={exp.startDate} onChange={(e) => updateExperienceEntry(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date (or Present)</Label>
                      <Input id={`endDate-${exp.id}`} type="month" value={exp.endDate} onChange={(e) => updateExperienceEntry(exp.id, 'endDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`responsibilities-${exp.id}`}>Responsibilities</Label>
                    <Textarea id={`responsibilities-${exp.id}`} placeholder="- Developed feature X..." value={exp.responsibilities} onChange={(e) => updateExperienceEntry(exp.id, 'responsibilities', e.target.value)} rows={3} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addExperienceEntry}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="education">
            <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-md space-y-3 bg-secondary/20 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" onClick={() => removeEducationEntry(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="space-y-1">
                    <Label htmlFor={`degree-${edu.id}`}>Degree/Certificate</Label>
                    <Input id={`degree-${edu.id}`} placeholder="B.S. in Computer Science" value={edu.degree} onChange={(e) => updateEducationEntry(edu.id, 'degree', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`university-${edu.id}`}>Institution</Label>
                    <Input id={`university-${edu.id}`} placeholder="State University" value={edu.university} onChange={(e) => updateEducationEntry(edu.id, 'university', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`gradDate-${edu.id}`}>Graduation Date</Label>
                    <Input id={`gradDate-${edu.id}`} type="month" value={edu.gradDate} onChange={(e) => updateEducationEntry(edu.id, 'gradDate', e.target.value)} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addEducationEntry}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skills">
            <AccordionTrigger className="text-lg font-semibold">Skills</AccordionTrigger>
            <AccordionContent className="space-y-1 pt-2">
              <Label htmlFor="skillsText">Skills (comma-separated)</Label>
              <Textarea id="skillsText" placeholder="JavaScript, React, Node.js, Project Management..." value={resumeData.skills} onChange={handleSkillsChange} rows={3} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
