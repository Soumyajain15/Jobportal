
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I create an account?',
    answer:
      'Click on the "Sign Up" button in the header, fill in your details (name, email, password), and click "Create Account". You will be automatically logged in.',
  },
  {
    question: 'How can I build my resume?',
    answer:
      'Navigate to the "Resume Builder" page from the header (visible after logging in). You can fill in your personal information, summary, work experience, education, and skills. The live preview will update as you type. Don\'t forget to save your resume!',
  },
  {
    question: 'What is the ATS Resume Analyzer?',
    answer:
      'The ATS Resume Analyzer (accessible from the header after login) helps you optimize your resume for Applicant Tracking Systems. Upload your resume and paste a job description, and our AI will provide an ATS score and suggestions for improvement.',
  },
  {
    question: 'How do I search for jobs?',
    answer:
      'Click on "Jobs" in the header (visible after logging in). You can browse through job listings, use filters for keywords, location, industry, and experience level to narrow down your search.',
  },
  {
    question: 'Can I track my job applications?',
    answer:
      'Yes! The "My Applications" page (visible after logging in) allows you to see the status of jobs you\'ve applied to through the portal (feature simulated for now).',
  },
  {
    question: 'Is there a dark mode?',
    answer:
      'Yes, you can toggle between light, dark, and system themes using the theme switcher (sun/moon icon) in the header.',
  },
   {
    question: 'How does the Career Assistant chatbot work?',
    answer:
      'The Career Assistant chatbot (floating icon at the bottom-right) can help you with resume tips, job search advice, and answer general questions about using the portal. Just click the icon to start chatting!',
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center justify-center">
          <HelpCircle className="mr-3 h-10 w-10 text-primary" />
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Find answers to common questions about CareerConnect Pro.
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left hover:no-underline text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
