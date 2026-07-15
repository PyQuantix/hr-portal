"use client";

import { useState } from "react";
import { Search, User, Trash2, Pencil, LogIn, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const logs = [
  { id: 1, user: "Admin User", action: "Deleted user", target: "Vikram Singh", type: "delete", time: "10:24 AM", date: "15 Jul 2026" },
  { id: 2, user: "Admin User", action: "Updated plan", target: "Pro Plan", type: "edit", time: "09:58 AM", date: "15 Jul 2026" },
  { id: 3, user: "Rahul Sharma", action: "Logged in", target: "-", type: "login", time: "09:30 AM", date: "15 Jul 2026" },
  { id: 4, user: "Admin User", action: "Created template", target: "Executive Template", type: "create", time: "08:15 AM", date: "15 Jul 2026" },
  { id: 5, user: "Admin User", action: "Sent notification", target: "All Users", type: "create", time: "07:45 PM", date: "14 Jul 2026" },
  { id: 6, user: "Priya Patel", action: "Logged in", target: "-", type: "login", time: "06:20 PM", date: "14 Jul 2026" },
  { id: 7, user: "Admin User", action: "Updated settings", target: "Payment Gateway", type: "edit", time: "04:10 PM", date: "14 Jul 2026" },
];

function typeIcon(type: string) {
  switch (type) {
    case "delete": return <Trash2 className="h-3.5 w-3.5 text-red-400" />;
    case "edit": return <Pencil className="h-3.5 w-3.5 text-amber-400" />;
    case "login": return <LogIn className="h-3.5 w-3.5 text-cyan-400" />;
    case "create": return <Plus className="h-3.5 w-3.5 text-emerald-400" />;
    default: return <User className="h-3.5 w-3.5 text-zinc-400" />;
  }
}

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = logs.filter((l) => {
    const matchesSearch = l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || l.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // group by date
  const grouped = filtered.reduce((acc: Record<string, typeof logs>, log) => {
    acc[log.date] = acc[log.date] || [];
    acc[log.date].push(log);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
        <p className="text-zinc-400 text-sm mt-1">{filtered.length} activity records</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search by user or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
          />
        </div>
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-44 h-10 bg-zinc-900 border-zinc-800 text-white">
            <SelectValue placeholder="Action type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="edit">Edit</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="login">Login</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline view */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, dateLogs]) => (
          <div key={date}>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-3">{date}</p>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-800">
                  {dateLogs.map((log) => (
                    <div key={log.id} className="flex items-center gap-3 p-4">
                      <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                        {typeIcon(log.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">
                          <span className="font-medium">{log.user}</span>{" "}
                          <span className="text-zinc-400">{log.action.toLowerCase()}</span>
                          {log.target !== "-" && <span className="text-cyan-400"> {log.target}</span>}
                        </p>
                      </div>
                      <span className="text-zinc-500 text-xs shrink-0">{log.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
