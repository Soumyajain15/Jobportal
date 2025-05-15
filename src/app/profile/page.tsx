
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Added Input import
import { User, Mail, Edit, LogOut, Loader2, Save, XCircle, Image as ImageIcon } from 'lucide-react'; // Added Save, XCircle, ImageIcon
import { useToast } from '@/hooks/use-toast'; // Added useToast import

// Initial placeholder user data
const initialUser = {
  name: 'Soumya Jain',
  email: 'soumyaj470@gmail.com',
  avatarUrl: 'https://placehold.co/128x128.png',
  avatarFallback: 'SJ',
};

export default function ProfilePage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialUser);
  const [formData, setFormData] = useState(initialUser);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // When editing starts, populate form with current profile data
    if (isEditing) {
      setFormData(profileData);
    }
  }, [isEditing, profileData]);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // useEffect handles redirect
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileData(formData); // "Save" the data to our display state
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Optionally reset formData to profileData if you want to discard changes immediately
    setFormData(profileData); 
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={profileData.avatarUrl} alt={profileData.name} data-ai-hint="profile person" />
              <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{profileData.avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{profileData.name}</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            {isEditing ? 'Update your account details.' : 'Manage your account details and preferences.'}
          </CardDescription>
        </CardHeader>
        
        {isEditing ? (
          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4" /> Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4" /> Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarUrl" className="flex items-center"><ImageIcon className="mr-2 h-4 w-4" /> Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.png"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit} className="w-full">
                  <XCircle className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </div>
            </CardContent>
          </form>
        ) : (
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="viewFullName" className="text-sm font-medium text-muted-foreground flex items-center">
                  <User className="mr-2 h-4 w-4" /> Full Name
                </Label>
                <p id="viewFullName" className="text-lg font-semibold">{profileData.name}</p>
              </div>
              <div>
                <Label htmlFor="viewEmail" className="text-sm font-medium text-muted-foreground flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> Email Address
                </Label>
                <p id="viewEmail" className="text-lg font-semibold">{profileData.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        )}
        
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
