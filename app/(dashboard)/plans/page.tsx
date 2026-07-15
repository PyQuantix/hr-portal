"use client";

import { useState } from "react";
import { Check, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

const initialPlans = [
  { id: 1, name: "Basic", price: "₹999", period: "/month", features: ["5 Resumes", "Basic Templates", "Email Support"], popular: false },
  { id: 2, name: "Pro", price: "₹2,999", period: "/month", features: ["Unlimited Resumes", "All Templates", "Priority Support", "Analytics"], popular: true },
  { id: 3, name: "Enterprise", price: "₹9,999", period: "/month", features: ["Everything in Pro", "Custom Branding", "Dedicated Manager", "API Access"], popular: false },
];

export default function PlansPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<typeof initialPlans[0] | null>(null);
  const [deletePlan, setDeletePlan] = useState<typeof initialPlans[0] | null>(null);
  const [plans, setPlans] = useState(initialPlans);
  const [newPlan, setNewPlan]= useState({ name: "", price: "", features: ""})

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscription Plans</h1>
          <p className="text-zinc-400 text-sm mt-1">{plans.length} active plans</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative bg-zinc-900 ${plan.popular ? "border-cyan-500/50" : "border-zinc-800"}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                Most Popular
              </Badge>
            )}
            <CardContent className="p-6">
              <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-2 mb-5">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
                  onClick={() => setEditPlan(plan)}
                >
                  <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-zinc-700 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                  onClick={() => setDeletePlan(plan)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Plan Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Add New Plan</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Plan Name</Label>
              <Input
                placeholder="e.g. Premium"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Price</Label>
              <Input
                placeholder="e.g. ₹1,999"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-sm">Features (comma separated)</Label>
              <Input
                placeholder="10 Resumes, All Templates, Support"
                value={newPlan.features}
                onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              onClick={() => {
                if (newPlan.name && newPlan.price) {
                  setPlans((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      name: newPlan.name,
                      price: newPlan.price,
                      period: "/month",
                      features: newPlan.features.split(",").map((f) => f.trim()).filter(Boolean),
                      popular: false,
                    },
                  ]);
                }
                setNewPlan({ name: "", price: "", features: "" });
                setAddOpen(false);
              }}
            >
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Modal */}
      <Dialog open={!!editPlan} onOpenChange={() => setEditPlan(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Edit Plan</DialogTitle></DialogHeader>
          {editPlan && (            
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Plan Name</Label>
                <Input
                  value={editPlan.name}
                  onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-sm">Price</Label>
                <Input
                  value={editPlan.price}
                  onChange={(e) => setEditPlan({ ...editPlan, price: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setEditPlan(null)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              onClick={() => {
                if (editPlan) {
                  setPlans((prev) => prev.map((p) => (p.id === editPlan.id ? editPlan : p)));
                }
                setEditPlan(null);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deletePlan} onOpenChange={() => setDeletePlan(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader><DialogTitle>Delete Plan</DialogTitle></DialogHeader>
          <p className="text-zinc-400 text-sm">
            Are you sure you want to delete <span className="text-white font-medium">{deletePlan?.name}</span>? Users on this plan will need to be migrated.
          </p>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent border-zinc-700 text-white" onClick={() => setDeletePlan(null)}>Cancel</Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={() => {
                if (deletePlan) setPlans((prev) => prev.filter((p) => p.id !== deletePlan.id));
                setDeletePlan(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}