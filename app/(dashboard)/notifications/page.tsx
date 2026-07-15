"use client";

import { useState } from "react";
import { Bell, Plus, Users, CreditCard, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const notifications = [
  { id: 1, title: "New payment received", desc: "Rahul Sharma paid ₹2,999 for Pro plan", type: "payment", time: "5 min ago", read: false },
  { id: 2, title: "New user registered", desc: "Priya Patel signed up for Basic plan", type: "user", time: "1 hour ago", read: false },
  { id: 3, title: "Resume completed", desc: "Amit Kumar finished their resume", type: "resume", time: "3 hours ago", read: true },
  { id: 4, title: "Payment failed", desc: "Vikram Singh's payment could not be processed", type: "alert", time: "5 hours ago", read: true },
  { id: 5, title: "New user registered", desc: "Anjali Gupta signed up for Pro plan", type: "user", time: "1 day ago", read: true },
];

function typeIcon(type: string) {
  switch (type) {
    case "payment": return <CreditCard className="h-4 w-4 text-emerald-400" />;
    case "user": return <Users className="h-4 w-4 text-cyan-400" />;
    case "resume": return <FileText className="h-4 w-4 text-blue-400" />;
    case "alert": return <AlertCircle className="h-4 w-4 text-red-400" />;
    default: return <Bell className="h-4 w-4 text-zinc-400" />;
  }
}

export default function NotificationsPage() {
  const [sendOpen, setSendOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-zinc-400 text-sm mt-1">{notifications.filter((n) => !n.read).length} unread notifications</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setSendOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" /> Send Notification
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={`bg-zinc-900 border-zinc-800 ${!n.read ? "border-l-2 border-l-cyan-500" : ""}`}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                {typeIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white text-sm font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 bg-cyan-500 rounded-full shrink-0" />}
                </div>
                <p className="text-zinc-400 text-sm mt-0.5">{n.desc}</p>
                <p className="text-zinc-600 text-xs mt-1.5">{n.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Send Notification Modal */}
      <Dialog open={sendOpen} onOpenChange={setSendOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Send Notification</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Recipient Group</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="pro">Pro Plan Users</SelectItem>
                  <SelectItem value="basic">Basic Plan Users</SelectItem>
                  <SelectItem value="inactive">Inactive Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Subject</Label>
              <Input placeholder="e.g. New feature announcement" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Message</Label>
              <Textarea placeholder="Write your message here..." className="bg-zinc-800 border-zinc-700 text-white min-h-24" />
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent border-zinc-700 text-white"
              onClick={() => { setSendOpen(false); setPreviewOpen(true); }}
            >
              Preview Email Template
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setSendOpen(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setSendOpen(false)}>Send Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Template Preview */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Email Preview</DialogTitle></DialogHeader>
          <div className="bg-white rounded-lg p-6 text-zinc-900">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold mb-4">H</div>
            <h3 className="font-semibold mb-2">New feature announcement</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Write your message here... This is how your email will appear to recipients.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-200 text-xs text-zinc-400">
              © 2026 HR Portal — Secure Admin Management System
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}