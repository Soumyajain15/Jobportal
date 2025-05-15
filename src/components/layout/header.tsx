
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Briefcase, User, LogOutIcon, HelpCircle } from 'lucide-react'; // Added HelpCircle for FAQ
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/theme-toggle'; // Import ThemeToggle

const BASE_NAV_ITEMS = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Resume Builder', href: '/resume-builder' },
  { label: 'ATS Analyzer', href: '/ats-analyzer' },
  { label: 'My Applications', href: '/applications' },
  { label: 'FAQ', href: '/faq' }, // Added FAQ
];

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const navItems = isAuthenticated
    ? [...BASE_NAV_ITEMS, { label: 'Profile', href: '/profile' }]
    : []; 

  // Null while loading auth state
  if (isAuthenticated === null) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <Briefcase className="h-6 w-6 text-primary" />
          <span>CareerConnect Pro</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-md bg-muted/50"></div> {/* Placeholder for ThemeToggle */}
          <div className="h-8 w-20 animate-pulse rounded-md bg-muted/50 md:hidden"></div>
          <div className="hidden md:flex items-center gap-2">
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted/50"></div>
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted/50"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shadow-sm">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
        <Briefcase className="h-6 w-6 text-primary" />
        <span>CareerConnect Pro</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle /> {/* Added ThemeToggle */}
        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Button variant="outline" onClick={logout}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
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
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span>CareerConnect Pro</span>
                  </Link>
                </SheetClose>
                
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="mt-auto flex flex-col gap-2 pt-6 border-t">
                  {isAuthenticated ? (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={logout} className="w-full justify-start">
                          <LogOutIcon className="mr-2 h-5 w-5" />
                          Logout
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" asChild className="w-full justify-start">
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="w-full justify-start">
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
