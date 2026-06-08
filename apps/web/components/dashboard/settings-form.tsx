"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Settings as SettingsIcon, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SettingsForm({ user }: { user?: { name: string; email: string; image?: string; id: string } }) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  
  const [name, setName] = useState(user?.name || "User");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [notifications, setNotifications] = useState(true);

  const fallbackText = name.substring(0, 2).toUpperCase();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Preferences saved");
  };

  return (
    <Tabs defaultValue={defaultTab} className="w-full mt-4">
      <TabsList className="mb-4">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="size-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <SettingsIcon className="size-4" />
          Preferences
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="size-4" />
          Notifications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              Update your personal information and avatar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="size-20 rounded-lg">
                  <AvatarImage src={user?.image || ""} alt="User" />
                  <AvatarFallback className="rounded-lg bg-neutral-800 text-xl text-white">
                    {fallbackText}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button">Change Avatar</Button>
              </div>
              
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>
              
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preferences" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance & Preferences</CardTitle>
            <CardDescription>
              Customize how Zeno looks and feels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSavePreferences} className="space-y-6">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-4 mt-2">
                    <Button variant="outline" type="button" className="flex-1 border-neutral-700 bg-neutral-900 text-white">
                      Dark (Default)
                    </Button>
                    <Button variant="outline" type="button" className="flex-1 opacity-50 cursor-not-allowed">
                      Light (Coming Soon)
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button type="submit">Save Preferences</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive alerts and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 max-w-md">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-neutral-400">
                    Receive emails when workflows fail or complete.
                  </p>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Product Updates</Label>
                  <p className="text-sm text-neutral-400">
                    Hear about new features and integrations.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );
}
