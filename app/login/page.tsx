"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Users, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-zinc-950">
      {/* LEFT — Branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">HR Portal</span>
          </div>

          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-6">
              <Sparkles className="h-3 w-3" /> Trusted by 500+ companies
            </span>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Manage your entire workforce from one place
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              Resumes, payments, subscriptions, and analytics — all in a single admin dashboard built for HR teams.
            </p>
          </div>
          
          <div className="flex gap-6 text-zinc-500 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-400" /> 10K+ Users
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" /> Real-time Analytics
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-zinc-950 relative">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">HR Portal</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1.5">Welcome back</h2>
          <p className="text-zinc-400 text-sm mb-8">Enter your credentials to access the dashboard</p>

          <form className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@hrportal.com"
                  className="pl-9 h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300 text-sm font-medium">Password</Label>
                <a href="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10 h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-cyan-500" defaultChecked />
              Keep me signed in
            </label>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>

          <p className="text-center text-xs text-zinc-600 mt-10">
            © 2026 HR Portal — Secure Admin Management System
          </p>
        </div>
      </div>
    </div>
  );
}