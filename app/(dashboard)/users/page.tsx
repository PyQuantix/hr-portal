"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const allUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", plan: "Pro", status: "Active", joined: "12 Jan 2026" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "+91 98765 43211", plan: "Basic", status: "Active", joined: "18 Jan 2026" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43212", plan: "Pro", status: "Pending", joined: "22 Jan 2026" },
  { id: 4, name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 98765 43213", plan: "Enterprise", status: "Active", joined: "02 Feb 2026" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765 43214", plan: "Basic", status: "Inactive", joined: "10 Feb 2026" },
  { id: 6, name: "Anjali Gupta", email: "anjali@example.com", phone: "+91 98765 43215", plan: "Pro", status: "Active", joined: "15 Feb 2026" },
  { id: 7, name: "Rohan Mehta", email: "rohan@example.com", phone: "+91 98765 43216", plan: "Basic", status: "Active", joined: "20 Feb 2026" },
  { id: 8, name: "Kavya Nair", email: "kavya@example.com", phone: "+91 98765 43217", plan: "Enterprise", status: "Pending", joined: "28 Feb 2026" },
];

function statusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Inactive":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof allUsers[0] | null>(null);
  const [editUser, setEditUser] = useState<typeof allUsers[0] | null>(null);
  const [deleteUser, setDeleteUser] = useState<typeof allUsers[0] | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = planFilter === "all" || u.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-zinc-400 text-sm mt-1">{filtered.length} total users</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
          />
        </div>
        <Select value={planFilter} onValueChange={(v) => { setPlanFilter(v ?? "all"); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-44 h-10 bg-zinc-900 border-zinc-800 text-white">
            <Filter className="h-4 w-4 mr-1 text-zinc-500" />
            <SelectValue placeholder="Filter by plan" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
            <SelectItem value="Pro">Pro</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Plan</TableHead>
                <TableHead className="text-zinc-400 hidden lg:table-cell">Joined</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-zinc-800 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell>
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-zinc-500 text-xs">{user.email}</p>
                  </TableCell>
                  <TableCell className="text-zinc-300 text-sm hidden md:table-cell">{user.plan}</TableCell>
                  <TableCell className="text-zinc-300 text-sm hidden lg:table-cell">{user.joined}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-zinc-400 hover:text-cyan-400"
                        onClick={() => setEditUser(user)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-zinc-400 hover:text-red-400"
                        onClick={() => setDeleteUser(user)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Page {page} of {totalPages || 1}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-900 border-zinc-800 text-white"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-900 border-zinc-800 text-white"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Details Drawer */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="bg-zinc-900 border-zinc-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">User Details</SheetTitle>
          </SheetHeader>
          {selectedUser && (
            <div className="px-4 space-y-5 mt-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedUser.name}</p>
                  <Badge variant="outline" className={statusColor(selectedUser.status)}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mail className="h-4 w-4 text-zinc-500" /> {selectedUser.email}
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone className="h-4 w-4 text-zinc-500" /> {selectedUser.phone}
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Calendar className="h-4 w-4 text-zinc-500" /> Joined {selectedUser.joined}
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">Subscription Plan</p>
                <p className="text-white font-medium">{selectedUser.plan}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit User Modal */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Full Name</Label>
                <Input defaultValue={editUser.name} className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Email</Label>
                <Input defaultValue={editUser.email} className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Plan</Label>
                <Select defaultValue={editUser.plan}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setEditUser(null)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setEditUser(null)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="text-zinc-400 text-sm">
            Are you sure you want to delete <span className="text-white font-medium">{deleteUser?.name}</span>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setDeleteUser(null)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-500 text-white" onClick={() => setDeleteUser(null)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
