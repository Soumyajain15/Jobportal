'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FileDown } from 'lucide-react';

export default function ResumeBuilderForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle resume save/update logic
    console.log('Resume form submitted');
  };

  return (
    <Card className="shadow-xl">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Accordion type="multiple" defaultValue={['personal-info', 'experience']} className="w-full">
            <AccordionItem value="personal-info">
              <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="(123) 456-7890" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input id="linkedin" placeholder="linkedin.com/in/johndoe" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St, Anytown, USA" />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="summary">
              <AccordionTrigger className="text-lg font-semibold">Professional Summary</AccordionTrigger>
              <AccordionContent className="space-y-1 pt-2">
                <Label htmlFor="summaryText">Summary</Label>
                <Textarea id="summaryText" placeholder="A brief overview of your skills and experience..." rows={4} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger className="text-lg font-semibold">Work Experience</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {/* Placeholder for multiple experience entries */}
                <div className="p-4 border rounded-md space-y-2 bg-secondary/20">
                  <div className="space-y-1">
                    <Label htmlFor="jobTitle1">Job Title</Label>
                    <Input id="jobTitle1" placeholder="Software Engineer" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="company1">Company</Label>
                    <Input id="company1" placeholder="Tech Solutions Inc." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="startDate1">Start Date</Label>
                        <Input id="startDate1" type="month" />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="endDate1">End Date</Label>
                        <Input id="endDate1" type="month" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="responsibilities1">Responsibilities</Label>
                    <Textarea id="responsibilities1" placeholder="- Developed feature X..." rows={3} />
                  </div>
                </div>
                <Button variant="outline" size="sm">Add Experience</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                 {/* Placeholder for multiple education entries */}
                <div className="p-4 border rounded-md space-y-2 bg-secondary/20">
                  <div className="space-y-1">
                    <Label htmlFor="degree1">Degree</Label>
                    <Input id="degree1" placeholder="B.S. in Computer Science" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="university1">University</Label>
                    <Input id="university1" placeholder="State University" />
                  </div>
                   <div className="space-y-1">
                        <Label htmlFor="gradDate1">Graduation Date</Label>
                        <Input id="gradDate1" type="month" />
                    </div>
                </div>
                <Button variant="outline" size="sm">Add Education</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills">
              <AccordionTrigger className="text-lg font-semibold">Skills</AccordionTrigger>
              <AccordionContent className="space-y-1 pt-2">
                <Label htmlFor="skillsText">Skills</Label>
                <Textarea id="skillsText" placeholder="JavaScript, React, Node.js, Project Management..." rows={3} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-6">
          <Button variant="outline" type="button">
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF (Soon)
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Resume
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
