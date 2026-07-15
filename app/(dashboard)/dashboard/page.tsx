"use client";

import {
  Users,
  FileText,
  Package,
  DollarSign,
  Clock,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { label: "Total Users", value: "12,847", change: "+12.5%", up: true, icon: Users },
  { label: "Total Resumes", value: "8,392", change: "+8.2%", up: true, icon: FileText },
  { label: "Active Plans", value: "1,204", change: "+3.1%", up: true, icon: Package },
  { label: "Revenue", value: "₹4.2L", change: "+18.2%", up: true, icon: DollarSign },
  { label: "Pending Payments", value: "₹32,400", change: "-4.5%", up: false, icon: Clock },
  { label: "New Users", value: "284", change: "+22.4%", up: true, icon: UserPlus },
];

const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 41000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 52000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 61000 },
  { month: "Jul", revenue: 72000 },
];

const registrationData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 190 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 220 },
  { month: "May", users: 280 },
  { month: "Jun", users: 240 },
  { month: "Jul", users: 310 },
];

const recentUsers = [
  { name: "Rahul Sharma", email: "rahul@example.com", plan: "Pro", status: "Active" },
  { name: "Priya Patel", email: "priya@example.com", plan: "Basic", status: "Active" },
  { name: "Amit Kumar", email: "amit@example.com", plan: "Pro", status: "Pending" },
  { name: "Sneha Reddy", email: "sneha@example.com", plan: "Enterprise", status: "Active" },
  { name: "Vikram Singh", email: "vikram@example.com", plan: "Basic", status: "Inactive" },
];

const recentPayments = [
  { id: "#PAY-1042", user: "Rahul Sharma", amount: "₹2,999", status: "Success" },
  { id: "#PAY-1041", user: "Priya Patel", amount: "₹999", status: "Success" },
  { id: "#PAY-1040", user: "Amit Kumar", amount: "₹4,999", status: "Pending" },
  { id: "#PAY-1039", user: "Sneha Reddy", amount: "₹9,999", status: "Success" },
  { id: "#PAY-1038", user: "Vikram Singh", amount: "₹999", status: "Failed" },
];

function statusColor(status: string) {
  switch (status) {
    case "Active":
    case "Success":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Inactive":
    case "Failed":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      stat.up ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-base">User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-zinc-400">Plan</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.email} className="border-zinc-800">
                    <TableCell>
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-zinc-500 text-xs">{user.email}</p>
                    </TableCell>
                    <TableCell className="text-zinc-300 text-sm">{user.plan}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">ID</TableHead>
                  <TableHead className="text-zinc-400">User</TableHead>
                  <TableHead className="text-zinc-400">Amount</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id} className="border-zinc-800">
                    <TableCell className="text-zinc-300 text-sm font-mono">{payment.id}</TableCell>
                    <TableCell className="text-white text-sm">{payment.user}</TableCell>
                    <TableCell className="text-zinc-300 text-sm">{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}