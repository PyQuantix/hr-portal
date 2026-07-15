"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Download, Eye, FileText,CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const resumes = [
  { id: 1, name: "Rahul Sharma", template: "Modern", status: "Completed", updated: "2 days ago" },
  { id: 2, name: "Priya Patel", template: "Classic", status: "Draft", updated: "5 hours ago" },
  { id: 3, name: "Amit Kumar", template: "Creative", status: "Completed", updated: "1 week ago" },
  { id: 4, name: "Sneha Reddy", template: "Modern", status: "Under Review", updated: "3 days ago" },
  { id: 5, name: "Vikram Singh", template: "Minimal", status: "Completed", updated: "12 hours ago" },
  { id: 6, name: "Anjali Gupta", template: "Classic", status: "Draft", updated: "1 day ago" },
];

function statusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Draft":
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    case "Under Review":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

function templateColor(template: string) {
  const colors: Record<string, string> = {
    Modern: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Classic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Creative: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Minimal: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };
  return colors[template] || colors.Minimal;
}

export default function ResumesPage() {
  const [search, setSearch] = useState("");
  const [downloadedId, setDownloadedId] = useState<number | null>(null);

  const handleDownload = (id: number) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2000);
  };
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = resumes.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Resume Management</h1>
        <p className="text-zinc-400 text-sm mt-1">{filtered.length} resumes total</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search by user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-44 h-10 bg-zinc-900 border-zinc-800 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">User</TableHead>
                <TableHead className="text-zinc-400">Template</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Updated</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((resume) => (
                <TableRow key={resume.id} className="border-zinc-800">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-zinc-400" />
                      </div>
                      <span className="text-white text-sm font-medium">{resume.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={templateColor(resume.template)}>
                      {resume.template}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(resume.status)}>
                      {resume.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm hidden md:table-cell">{resume.updated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/resumes/${resume.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-cyan-400">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <div className="relative">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-zinc-400 hover:text-cyan-400"
                          onClick={() => handleDownload(resume.id)}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        {downloadedId === resume.id && (
                          <div className="absolute top-full right-0 mt-1 flex items-center gap-1.5 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10">
                            <CheckCircle2 className="h-3 w-3" /> Downloaded
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
