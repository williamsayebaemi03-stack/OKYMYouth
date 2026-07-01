/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Leader {
  id: string;
  name: string;
  role: string;
  email?: string;
  bio: string;
  term: string;
  avatar: string;
}

export type EmpowermentStatus = "Completed" | "Ongoing" | "Upcoming";

export interface Empowerment {
  id: string;
  title: string;
  description: string;
  category: "Skills" | "Education" | "Business" | "Community";
  date: string;
  beneficiaries: number;
  progress: number; // 0 to 100
  status: EmpowermentStatus;
  highlights?: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string; // ISO or string
  avatar: string;
  role?: string; // "Leader", "Admin", "Member"
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}
