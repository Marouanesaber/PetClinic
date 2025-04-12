
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Settings as SettingsIcon, Bell, Lock, Shield, Palette } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const SettingsPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    
    if (!currentPassword || !newPassword) {
      toast.error("Please fill all password fields!");
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully!");
    }, 1000);
  };

  const handleNotificationSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Notification settings updated!");
    }, 1000);
  };

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme as "light" | "dark" | "system");
    toast.success(`Theme changed to ${selectedTheme}!`);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value);
    toast.success(`Font size changed to ${e.target.value}!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value="admin" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <select 
                  id="language" 
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone" 
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                </select>
              </div>
              <Button className="w-full md:w-auto">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto" disabled={isSaving}>
                  {isSaving ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                </div>
                <Switch checked={false} />
              </div>
              <Button variant="outline" className="w-full md:w-auto">
                <Shield className="mr-2 h-4 w-4" />
                Setup 2FA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified about appointments via email</p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">App Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                  </div>
                  <Switch 
                    checked={appNotifications} 
                    onCheckedChange={setAppNotifications} 
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleNotificationSave} 
                disabled={isSaving}
                className="w-full md:w-auto"
              >
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of PetClinic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="h-24 mb-2 bg-white border rounded-md"></div>
                  <p className="font-medium text-center">Light Theme</p>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="h-24 mb-2 bg-gray-900 border rounded-md"></div>
                  <p className="font-medium text-center">Dark Theme</p>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${theme === 'system' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleThemeChange('system')}
                >
                  <div className="h-24 mb-2 bg-gradient-to-r from-white to-gray-900 border rounded-md"></div>
                  <p className="font-medium text-center">System Default</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <select 
                  id="font-size" 
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
