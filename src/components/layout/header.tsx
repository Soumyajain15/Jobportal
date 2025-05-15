import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Resume Builder', href: '/resume-builder' },
  { label: 'ATS Analyzer', href: '/ats-analyzer' },
  { label: 'My Applications', href: '/applications' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shadow-sm">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
        <Briefcase className="h-6 w-6 text-primary" />
        <span>CareerConnect Pro</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-8">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Briefcase className="h-6 w-6 text-primary" />
                <span>CareerConnect Pro</span>
              </Link>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
