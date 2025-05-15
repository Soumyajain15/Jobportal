
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle as they are not used
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Added useToast

export default function JobSearchFilters() {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filters = {
      keywords,
      location,
      industry,
      experienceLevel,
    };
    console.log('Job filters submitted:', filters);
    // In a real application, you would use these filters to fetch/filter jobs
    toast({
      title: 'Filters Applied',
      description: 'Your job search filters have been applied (simulation).',
    });
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input 
              id="keywords" 
              placeholder="Job title, skills, company" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="City, state, or remote" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Industry</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Level</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
