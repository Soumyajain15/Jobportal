import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ResumePreview() {
  return (
    <Card className="shadow-xl h-full">
      <CardContent className="pt-6 h-full">
        <div className="aspect-[8.5/11] w-full bg-muted rounded-md p-8 flex flex-col items-center justify-center border border-dashed">
          <Image 
            src="https://placehold.co/300x400.png?text=Resume+Preview" 
            alt="Resume Preview Placeholder"
            data-ai-hint="document resume"
            width={300}
            height={400}
            className="opacity-50"
          />
          <p className="mt-4 text-muted-foreground text-center">
            Your resume preview will appear here as you fill out the details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
