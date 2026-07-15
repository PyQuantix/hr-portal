"use client";

import { useState } from "react";
import { Plus, Pencil, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

const templates = [
  { id: 1, name: "Modern", category: "Professional", active: true, color: "from-cyan-500 to-blue-600" },
  { id: 2, name: "Classic", category: "Traditional", active: true, color: "from-blue-500 to-indigo-600" },
  { id: 3, name: "Creative", category: "Design", active: true, color: "from-purple-500 to-pink-600" },
  { id: 4, name: "Minimal", category: "Simple", active: false, color: "from-zinc-500 to-zinc-700" },
  { id: 5, name: "Executive", category: "Professional", active: true, color: "from-amber-500 to-orange-600" },
  { id: 6, name: "Tech", category: "Design", active: false, color: "from-emerald-500 to-teal-600" },
];

export default function TemplatesPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<typeof templates[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Resume Templates</h1>
          <p className="text-zinc-400 text-sm mt-1">{templates.length} templates available</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Template
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t) => (
          <Card key={t.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
            <div className={`h-40 bg-gradient-to-br ${t.color} flex items-center justify-center relative`}>
              <FileText className="h-12 w-12 text-white/40" />
              <div className="absolute top-3 right-3">
                <Badge
                  variant="outline"
                  className={
                    t.active
                      ? "bg-emerald-500/20 text-white border-emerald-400/40"
                      : "bg-zinc-900/50 text-zinc-300 border-zinc-600"
                  }
                >
                  {t.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-zinc-500 text-xs">{t.category}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-zinc-400 hover:text-cyan-400"
                onClick={() => setEditTemplate(t)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Template Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Add New Template</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Template Name</Label>
              <Input placeholder="e.g. Elegant" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Category</Label>
              <Input placeholder="e.g. Professional" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setAddOpen(false)}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Modal */}
      <Dialog open={!!editTemplate} onOpenChange={() => setEditTemplate(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Edit Template</DialogTitle></DialogHeader>
          {editTemplate && (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Template Name</Label>
                <Input defaultValue={editTemplate.name} className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Category</Label>
                <Input defaultValue={editTemplate.category} className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setEditTemplate(null)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setEditTemplate(null)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}