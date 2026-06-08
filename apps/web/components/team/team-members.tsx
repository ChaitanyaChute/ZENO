"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2Icon, UserPlusIcon } from "lucide-react";

type Role = "Owner" | "Admin" | "Member" | "Viewer";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

const initialMembers: TeamMember[] = [
  { id: "1", name: "Chaitanya", email: "chaitanya@zeno.com", role: "Owner" },
  { id: "2", name: "Alice", email: "alice@zeno.com", role: "Admin" },
  { id: "3", name: "Bob", email: "bob@zeno.com", role: "Member" },
];

export const TeamMembersList = () => {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Member");

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    const newMember: TeamMember = {
      id: Math.random().toString(36).substring(7),
      name: inviteEmail.split("@")[0] || "New User",
      email: inviteEmail,
      role: inviteRole,
    };
    setMembers([...members, newMember]);
    setInviteEmail("");
    setInviteRole("Member");
    setIsInviteOpen(false);
    toast.success("Team member invited successfully!");
  };

  const handleRoleChange = (id: string, newRole: Role) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
    toast.success(`Role updated to ${newRole}`);
  };

  const handleRemove = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    toast.success("Member removed");
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto w-full pt-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Team Members</h1>
          <p className="text-neutral-400">Manage who has access to your Zeno workspace.</p>
        </div>

        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold gap-2">
              <UserPlusIcon className="w-4 h-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-800 text-white">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription className="text-neutral-400">
                Send an invitation to join your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select value={inviteRole} onValueChange={(val) => setInviteRole(val as Role)}>
                  <SelectTrigger className="bg-neutral-950 border-neutral-800">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)} className="border-neutral-800 hover:bg-neutral-800 text-neutral-300">
                Cancel
              </Button>
              <Button onClick={handleInvite} className="bg-lime-500 hover:bg-lime-600 text-black">
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-xl overflow-hidden mt-4 shadow-xl">
        <Table>
          <TableHeader className="bg-neutral-900/50">
            <TableRow className="border-neutral-800/50 hover:bg-transparent">
              <TableHead className="text-neutral-400 font-medium h-12">User</TableHead>
              <TableHead className="text-neutral-400 font-medium h-12">Email</TableHead>
              <TableHead className="text-neutral-400 font-medium h-12 w-[180px]">Role</TableHead>
              <TableHead className="text-right text-neutral-400 font-medium h-12 w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className="border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                <TableCell className="font-medium text-neutral-200 capitalize py-4">
                  {member.name}
                </TableCell>
                <TableCell className="text-neutral-400 py-4">
                  {member.email}
                </TableCell>
                <TableCell className="py-4">
                  {member.role === "Owner" ? (
                    <span className="inline-flex items-center rounded-full bg-lime-500/10 px-2.5 py-0.5 text-xs font-semibold text-lime-500 border border-lime-500/20">
                      Owner
                    </span>
                  ) : (
                    <Select
                      value={member.role}
                      onValueChange={(val) => handleRoleChange(member.id, val as Role)}
                    >
                      <SelectTrigger className="h-8 bg-transparent border-neutral-800 hover:border-neutral-700 w-[140px] text-xs">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-neutral-800">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className="text-right py-4">
                  {member.role !== "Owner" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(member.id)}
                      className="h-8 w-8 text-neutral-500 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {members.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-neutral-500">
                  No team members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
