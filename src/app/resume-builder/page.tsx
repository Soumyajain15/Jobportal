import ResumeBuilderForm from '@/components/resume/resume-builder-form';
import ResumePreview from '@/components/resume/resume-preview';
import { FileText, Eye } from 'lucide-react';

export default function ResumeBuilderPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <FileText className="mr-3 h-10 w-10 text-primary" />
          Craft Your Professional Resume
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Build a standout resume with our interactive builder and get real-time feedback.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            Resume Details
          </h2>
          <ResumeBuilderForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="mr-2 h-6 w-6 text-primary" />
            Live Preview
          </h2>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
