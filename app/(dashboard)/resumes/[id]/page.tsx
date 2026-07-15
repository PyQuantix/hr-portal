"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ResumePreviewPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/resumes" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Resumes
        </Link>

        <div className="relative">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
          >
            <Download className="h-4 w-4 mr-1.5" /> Download PDF
          </Button>
          {downloaded && (
            <div className="absolute top-full right-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
              <CheckCircle2 className="h-4 w-4" /> Download started
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume document preview */}
        <Card className="lg:col-span-2 bg-white border-zinc-800">
          <CardContent className="p-8 text-zinc-900">
            <div className="border-b border-zinc-200 pb-5 mb-5">
              <h1 className="text-2xl font-bold">Rahul Sharma</h1>
              <p className="text-zinc-500 text-sm mt-1">Senior Product Designer</p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> rahul@example.com</span>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +91 98765 43210</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Mumbai, India</span>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 mb-2">Summary</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Product designer with 6+ years of experience building user-centric interfaces for SaaS platforms. Passionate about design systems and accessibility.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 mb-2">Experience</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Senior Product Designer — Techify Inc.</p>
                  <p className="text-xs text-zinc-500">2022 — Present</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Product Designer — Wave Studio</p>
                  <p className="text-xs text-zinc-500">2019 — 2022</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["Figma", "Design Systems", "User Research", "Prototyping", "HTML/CSS"].map((skill) => (
                  <span key={skill} className="text-xs bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta info sidebar */}
        <div className="space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-zinc-500 text-xs mb-1">Template Used</p>
                <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                  Modern
                </Badge>
              </div>
              <div>
                <p className="text-zinc-500 text-xs mb-1">Status</p>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  Completed
                </Badge>
              </div>
              <div>
                <p className="text-zinc-500 text-xs mb-1">Last Updated</p>
                <p className="text-white text-sm">2 days ago</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs mb-1">Created</p>
                <p className="text-white text-sm">12 Jan 2026</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}