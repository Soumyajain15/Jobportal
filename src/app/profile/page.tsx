
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Edit, LogOut, Loader2 } from 'lucide-react';
import Image from 'next/image'; // Added for placeholder image if AvatarImage is not used directly with src

export default function ProfilePage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // This will prevent rendering anything if not authenticated,
    // useEffect above will handle redirect.
    return null;
  }

  // Placeholder user data
  const user = {
    name: 'Alex Johnson', // Placeholder name
    email: 'alex.johnson@example.com', // Placeholder email
    avatarUrl: 'https://placehold.co/128x128.png',
    avatarFallback: 'AJ',
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile person" />
              <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{user.avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Manage your account details and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-muted-foreground flex items-center">
                <User className="mr-2 h-4 w-4" /> Full Name
              </Label>
              <p id="fullName" className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-muted-foreground flex items-center">
                <Mail className="mr-2 h-4 w-4" /> Email Address
              </Label>
              <p id="email" className="text-lg font-semibold">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile (Coming Soon)
          </Button>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper component that might be needed if Label is not directly available
// (ShadCN's Label is usually fine, but for completeness)
// interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
// const Label: React.FC<LabelProps> = ({ children, ...props }) => {
//   return <label {...props} className="block text-sm font-medium text-muted-foreground">{children}</label>;
// }
