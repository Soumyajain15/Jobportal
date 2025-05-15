
import { Card, CardContent } from '@/components/ui/card';
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card className="shadow-xl h-full sticky top-24">
      <CardContent className="pt-6 h-full overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="actual-resume-content-for-print aspect-[8.5/11] w-full bg-white rounded-md p-6 md:p-8 border shadow-inner text-sm text-gray-800">
          {/* Header: Name & Contact */}
          <header className="text-center mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-primary">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex justify-center items-center space-x-4 mt-2 text-xs text-muted-foreground">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-primary">
                  <Mail className="mr-1 h-3 w-3" /> {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center">
                  <Phone className="mr-1 h-3 w-3" /> {personalInfo.phone}
                </span>
              )}
            </div>
            <div className="flex justify-center items-center space-x-4 mt-1 text-xs text-muted-foreground">
             {personalInfo.address && (
                <span className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" /> {personalInfo.address}
                </span>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
                  <Linkedin className="mr-1 h-3 w-3" /> {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </header>

          {/* Summary Section */}
          {summary && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-primary border-b mb-2">Summary</h2>
              <p className="text-xs whitespace-pre-line">{summary}</p>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-primary border-b mb-2">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <h3 className="text-sm font-semibold">{exp.jobTitle || 'Job Title'}</h3>
                  <div className="flex justify-between text-xs text-muted-foreground italic">
                    <span>{exp.company || 'Company Name'}</span>
                    <span>
                      {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </span>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                      {exp.responsibilities.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-primary border-b mb-2">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="text-sm font-semibold">{edu.degree || 'Degree/Certificate'}</h3>
                  <div className="flex justify-between text-xs text-muted-foreground italic">
                    <span>{edu.university || 'Institution Name'}</span>
                    <span>{edu.gradDate ? formatDate(edu.gradDate) : 'Graduation Date'}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {skills && (
            <section>
              <h2 className="text-lg font-semibold text-primary border-b mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.split(',').map((skill, index) => skill.trim() && (
                  <span key={index} className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

          {!personalInfo.fullName && !summary && experience.length === 0 && education.length === 0 && !skills && (
             <div className="text-center text-muted-foreground py-10">
                <p>Your resume preview will appear here as you fill out the details.</p>
                <p className="text-xs mt-2">Start by adding your personal information or other sections.</p>
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
