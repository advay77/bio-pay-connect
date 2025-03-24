
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Fingerprint, Smartphone, Mail, Edit, ExternalLink, UserRound } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  // Mock user data
  const user = {
    name: 'Arun Patel',
    userType: 'customer',
    mobile: '+91 9876543210',
    email: 'arun.patel@example.com',
    registrationDate: 'June 15, 2023',
    biometricRegistered: true,
  };
  
  const handleEditProfile = () => {
    toast.info('Edit profile functionality will be implemented in the next version.');
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">
                  {user.userType === 'customer' ? 'Customer' : 'Merchant'}
                </p>
                
                <div className="flex items-center justify-center mt-2 space-x-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1" />
                    Verified
                  </span>
                </div>
                
                <Button 
                  onClick={handleEditProfile}
                  className="mt-6 w-full"
                  variant="outline"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your personal and contact information
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <UserRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                      <p className="mt-1">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Mobile Number</h3>
                      <p className="mt-1">{user.mobile}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email Address</h3>
                      <p className="mt-1">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Biometric Data</h3>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Fingerprint className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Fingerprint Authentication</h3>
                          {user.biometricRegistered ? (
                            <p className="mt-1 text-sm text-green-600">Registered</p>
                          ) : (
                            <p className="mt-1 text-sm text-amber-600">Not Registered</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Your fingerprint data is stored securely in encrypted format and never leaves your device.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Advanced Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Export Transaction History
                    </Button>
                    
                    <Button variant="outline" className="justify-start text-destructive border-destructive/30 hover:bg-destructive/10">
                      Close Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
