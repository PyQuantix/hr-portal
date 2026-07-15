"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const payments = [
  { id: "PAY-1042", user: "Rahul Sharma", email: "rahul@example.com", amount: "₹2,999", method: "UPI", status: "Success", date: "12 Jul 2026" },
  { id: "PAY-1041", user: "Priya Patel", email: "priya@example.com", amount: "₹999", method: "Card", status: "Success", date: "11 Jul 2026" },
  { id: "PAY-1040", user: "Amit Kumar", email: "amit@example.com", amount: "₹4,999", method: "Netbanking", status: "Pending", date: "10 Jul 2026" },
  { id: "PAY-1039", user: "Sneha Reddy", email: "sneha@example.com", amount: "₹9,999", method: "Card", status: "Success", date: "09 Jul 2026" },
  { id: "PAY-1038", user: "Vikram Singh", email: "vikram@example.com", amount: "₹999", method: "UPI", status: "Failed", date: "08 Jul 2026" },
  { id: "PAY-1037", user: "Anjali Gupta", email: "anjali@example.com", amount: "₹2,999", method: "Card", status: "Success", date: "07 Jul 2026" },
];

function statusColor(status: string) {
  switch (status) {
    case "Success": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Failed": return "bg-red-500/10 text-red-400 border-red-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<typeof payments[0] | null>(null);

  const filtered = payments.filter((p) => {
    const matchesSearch = p.user.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Payments</h1>
        <p className="text-zinc-400 text-sm mt-1">{filtered.length} transactions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search by user or payment ID..."
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
            <SelectItem value="Success">Success</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Payment ID</TableHead>
                <TableHead className="text-zinc-400">User</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Amount</TableHead>
                <TableHead className="text-zinc-400 hidden lg:table-cell">Method</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="border-zinc-800">
                  <TableCell className="text-zinc-300 text-sm font-mono">#{p.id}</TableCell>
                  <TableCell>
                    <p className="text-white text-sm font-medium">{p.user}</p>
                    <p className="text-zinc-500 text-xs">{p.email}</p>
                  </TableCell>
                  <TableCell className="text-white text-sm hidden md:table-cell">{p.amount}</TableCell>
                  <TableCell className="text-zinc-300 text-sm hidden lg:table-cell">{p.method}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-cyan-400" onClick={() => setSelected(p)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-zinc-500">Payment ID</span><span className="text-white font-mono">#{selected.id}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">User</span><span className="text-white">{selected.user}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Email</span><span className="text-white">{selected.email}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Amount</span><span className="text-white">{selected.amount}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Method</span><span className="text-white">{selected.method}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Date</span><span className="text-white">{selected.date}</span></div>
              <div className="flex justify-between items-center"><span className="text-zinc-500">Status</span><Badge variant="outline" className={statusColor(selected.status)}>{selected.status}</Badge></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
