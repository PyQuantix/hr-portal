"use client";

import { TrendingUp, TrendingDown, Users, DollarSign, Download } from "lucide-react";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 32000, target: 35000 },
  { month: "Feb", revenue: 41000, target: 38000 },
  { month: "Mar", revenue: 38000, target: 40000 },
  { month: "Apr", revenue: 52000, target: 42000 },
  { month: "May", revenue: 48000, target: 45000 },
  { month: "Jun", revenue: 61000, target: 48000 },
  { month: "Jul", revenue: 72000, target: 50000 },
];

const growthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1450 },
  { month: "Mar", users: 1680 },
  { month: "Apr", users: 2100 },
  { month: "May", users: 2580 },
  { month: "Jun", users: 3020 },
  { month: "Jul", users: 3640 },
];

const revenueTable = [
  { period: "Jul 2026", revenue: "₹72,000", growth: "+18.2%", up: true },
  { period: "Jun 2026", revenue: "₹61,000", growth: "+27.1%", up: true },
  { period: "May 2026", revenue: "₹48,000", growth: "-7.7%", up: false },
  { period: "Apr 2026", revenue: "₹52,000", growth: "+36.8%", up: true },
  { period: "Mar 2026", revenue: "₹38,000", growth: "-7.3%", up: false },
];

export default function ReportsPage() {
    const [exported, setExported] = useState(false);
  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-zinc-400 text-sm mt-1">Overview of platform performance</p>
        </div>
        <div className="relative">
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-white" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1.5" /> Export Report
          </Button>
          {exported && (
            <div className="absolute top-full right-0 mt-2 flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 text-emerald-400 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
              <CheckCircle2 className="h-4 w-4" /> Report exported
            </div>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Total Revenue</span>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">₹3.44L</p>
            <p className="text-emerald-400 text-xs flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +24.5% vs last period
            </p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">User Growth</span>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">3,640</p>
            <p className="text-emerald-400 text-xs flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +20.5% this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Churn Rate</span>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-white">2.4%</p>
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3" /> +0.3% vs last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle className="text-white text-base">Revenue vs Target</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8 }} labelStyle={{ color: "#fff" }} />
                <Line type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={2} dot={false} name="Revenue" />
                <Line type="monotone" dataKey="target" stroke="#71717a" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle className="text-white text-base">User Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8 }} labelStyle={{ color: "#fff" }} />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f680" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-white text-base">Monthly Revenue Breakdown</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Period</TableHead>
                <TableHead className="text-zinc-400">Revenue</TableHead>
                <TableHead className="text-zinc-400 text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueTable.map((row) => (
                <TableRow key={row.period} className="border-zinc-800">
                  <TableCell className="text-white text-sm">{row.period}</TableCell>
                  <TableCell className="text-zinc-300 text-sm">{row.revenue}</TableCell>
                  <TableCell className={`text-right text-sm font-medium ${row.up ? "text-emerald-400" : "text-red-400"}`}>
                    {row.growth}
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