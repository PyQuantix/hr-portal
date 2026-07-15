"use client";

import { useState } from "react";
import { Building2, CreditCard, Mail, Palette, User, Sun, Moon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your account and platform preferences</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="company" className="text-zinc-400 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
            <Building2 className="h-3.5 w-3.5 mr-1.5" /> Company
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-zinc-400 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
            <CreditCard className="h-3.5 w-3.5 mr-1.5" /> Payment
          </TabsTrigger>
          <TabsTrigger value="email" className="text-zinc-400 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
            <Mail className="h-3.5 w-3.5 mr-1.5" /> Email
          </TabsTrigger>
          <TabsTrigger value="theme" className="text-zinc-400 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
            <Palette className="h-3.5 w-3.5 mr-1.5" /> Theme
          </TabsTrigger>
          <TabsTrigger value="profile" className="text-zinc-400 data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400">
            <User className="h-3.5 w-3.5 mr-1.5" /> Profile
          </TabsTrigger>
        </TabsList>

        {/* Company */}
        <TabsContent value="company">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Company Name</Label>
                <Input defaultValue="HR Portal Pvt Ltd" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Company Email</Label>
                <Input defaultValue="contact@hrportal.com" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Address</Label>
                <Input defaultValue="Mumbai, Maharashtra, India" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="relative inline-block">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={handleSave}>Save Changes</Button>
                {saved && (
                  <div className="absolute top-full left-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                    <CheckCircle2 className="h-4 w-4" /> Saved successfully
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Payment Gateway</Label>
                <Input defaultValue="Razorpay" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">API Key</Label>
                <Input defaultValue="rzp_live_••••••••••••" type="password" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Currency</Label>
                <Input defaultValue="INR (₹)" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="relative inline-block">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={handleSave}>Save Changes</Button>
                {saved && (
                  <div className="absolute top-full left-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                    <CheckCircle2 className="h-4 w-4" /> Saved successfully
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email */}
        <TabsContent value="email">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">SMTP Host</Label>
                <Input defaultValue="smtp.gmail.com" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">SMTP Port</Label>
                <Input defaultValue="587" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Sender Email</Label>
                <Input defaultValue="noreply@hrportal.com" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="relative inline-block">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={handleSave}>Save Changes</Button>
                {saved && (
                  <div className="absolute top-full left-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                    <CheckCircle2 className="h-4 w-4" /> Saved successfully
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme */}
        <TabsContent value="theme">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 max-w-lg">
              <Label className="text-zinc-300 text-sm mb-3 block">Appearance</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${theme === "light" ? "border-cyan-500 bg-cyan-500/10" : "border-zinc-700 bg-zinc-800"}`}
                >
                  <Sun className="h-5 w-5 text-white" />
                  <span className="text-sm text-white">Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${theme === "dark" ? "border-cyan-500 bg-cyan-500/10" : "border-zinc-700 bg-zinc-800"}`}
                >
                  <Moon className="h-5 w-5 text-white" />
                  <span className="text-sm text-white">Dark</span>
                </button>
              </div>
              <div className="relative inline-block">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={handleSave}>Save Changes</Button>
                {saved && (
                  <div className="absolute top-full left-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                    <CheckCircle2 className="h-4 w-4" /> Saved successfully
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">A</div>
                <Button variant="outline" className="bg-transparent border-zinc-700 text-white">Change Photo</Button>
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Full Name</Label>
                <Input defaultValue="Admin User" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Email</Label>
                <Input defaultValue="admin@hrportal.com" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="relative inline-block">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={handleSave}>Save Changes</Button>
                {saved && (
                  <div className="absolute top-full left-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                    <CheckCircle2 className="h-4 w-4" /> Saved successfully
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}