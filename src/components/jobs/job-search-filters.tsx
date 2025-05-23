
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { FilterCriteria } from '@/app/jobs/page'; // Import FilterCriteria type

interface JobSearchFiltersProps {
  onApplyFilters: (filters: FilterCriteria) => void;
}

export default function JobSearchFilters({ onApplyFilters }: JobSearchFiltersProps) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('all-industries'); // Default to "all"
  const [experienceLevel, setExperienceLevel] = useState('all-levels'); // Default to "all"
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filters: FilterCriteria = {
      keywords,
      location,
      industry,
      experienceLevel,
    };
    onApplyFilters(filters);
    
    let toastDescription = `Keywords: ${filters.keywords || 'Any'}, Location: ${filters.location || 'Any'}`;
    if (filters.industry !== 'all-industries') {
        toastDescription += `, Industry: ${filters.industry}`;
    } else {
        toastDescription += `, Industry: Any`;
    }
    if (filters.experienceLevel !== 'all-levels') {
        toastDescription += `, Experience: ${filters.experienceLevel}`;
    } else {
        toastDescription += `, Experience: Any`;
    }
    
    toast({
      title: 'Filters Applied',
      description: `${toastDescription}. Job list updated.`,
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
                <SelectItem value="all-industries">Any Industry</SelectItem>
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
                <SelectItem value="all-levels">Any Level</SelectItem>
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
