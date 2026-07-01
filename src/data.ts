/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Leader, Empowerment } from "./types";

export const APP_LOGO = "/src/assets/images/okpoama_logo_1782936760388.jpg";
export const HERO_BANNER = "/src/assets/images/okpoama_hero_banner_1782936775913.jpg";

export const ABOUT_INFO = {
  kingdomName: "Okpoama Kingdom",
  aboutText: "Okpoama is a historic coastal kingdom nestled in the Nembe Local Government Area of Bayelsa State, Nigeria, along the Atlantic coast. Famous for its pristine Brass Beach, rich fishing culture, and robust oil and gas heritage, the Okpoama Kingdom holds a majestic place in the Niger Delta region.",
  movementHistory: "The Okpoama Youth Movement (OYM) was founded as the official apex youth body to unite, mobilize, and empower the vibrant youth of Okpoama. Our mission is to promote absolute peace, secure our coastal boundaries, foster community development, and equip our youths with future-proof skills to thrive in both local marine economies and global digital industries.",
  vision: "To cultivate a highly skilled, self-reliant, peaceful, and united youth population that drives sustainable economic growth and cultural pride in Okpoama Kingdom.",
  mission: "To systematically empower youths through modern skill acquisition, digital literacy, security surveillance partnerships, maritime skills development, and seed grants for aspiring entrepreneurs.",
  coreValues: [
    { title: "Unity & Solidarity", desc: "Standing together as one resilient force for the betterment of the Kingdom." },
    { title: "Integrity", desc: "Fostering absolute transparency and accountability in youth leadership." },
    { title: "Empowerment", desc: "Creating pathways for self-sustenance and high-impact digital and maritime careers." },
    { title: "Peace & Security", desc: "Maintaining absolute peace and collaborative vigil over our coastal environments." }
  ],
  milestones: [
    { year: "2020", event: "Establishment of the Youth Skill Center in Okpoama town." },
    { year: "2022", event: "Launched the Maritime Safety and Coastal Clean-up initiative." },
    { year: "2023", event: "First Annual ICT Empowerment camp, training 120+ students." },
    { year: "2025", event: "Secured partnerships with maritime agencies for youth certifications." }
  ]
};

export const LEADERS_LIST: Leader[] = [
  {
    id: "1",
    name: "Comrade Seiyefa Jonathan",
    role: "President",
    email: "seiyefa.j@okpoamayouths.org",
    bio: "An energetic grassroots mobilizer, Comrade Seiyefa holds a degree in Maritime Studies. He is dedicated to creating sustainable corporate partnerships to employ Okpoama youths.",
    term: "2024 - 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Comrade Blessing Diegiri",
    role: "Vice President",
    email: "blessing.d@okpoamayouths.org",
    bio: "A community organizer and entrepreneur, Blessing focuses on young women's skill development, craft education, and micro-loan programs for female fish processors.",
    term: "2024 - 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Bar. Tari Kpokpo",
    role: "Secretary General",
    email: "tari.k@okpoamayouths.org",
    bio: "A practicing attorney, Tari manages OYM's legal affairs, records, and coordinates correspondence between the Youth Movement and the Okpoama Council of Chiefs.",
    term: "2024 - 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    name: "Comrade Ayebanoa Nelson",
    role: "Public Relations Officer",
    email: "nelson.a@okpoamayouths.org",
    bio: "A communications specialist, Nelson acts as the spokesperson for OYM, ensuring that the voice of the youths is heard clearly in the media and local government.",
    term: "2024 - 2026",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    name: "Comrade Ebimene Allison",
    role: "Treasurer",
    email: "ebimene.a@okpoamayouths.org",
    bio: "Ebimene is a finance graduate who oversees OYM's budget, audits our empowerment grants, and manages transparent funds distribution for community project development.",
    term: "2024 - 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "6",
    name: "Comrade Preye Oki",
    role: "Organizing Secretary",
    email: "preye.o@okpoamayouths.org",
    bio: "Preye coordinates all OYM physical assemblies, cultural festivals, empowerment workshops, and ensures maximum mobilization of members across all regional wards.",
    term: "2024 - 2026",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  }
];

export const EMPOWERMENTS_LIST: Empowerment[] = [
  {
    id: "emp-1",
    title: "Okpoama ICT & Digital Literacy bootcamp",
    description: "A comprehensive 12-week training in basic web development, office tools, graphics design, and digital marketing. It successfully equipped 150 youth with functional digital skills.",
    category: "Education",
    date: "July - October 2024",
    beneficiaries: 150,
    progress: 100,
    status: "Completed",
    highlights: ["150 graduates certified", "Top 10 participants received high-quality laptops", "Over 20 secured freelance contracts"]
  },
  {
    id: "emp-2",
    title: "Marine & Seafaring Certifications",
    description: "In collaboration with maritime agencies, OYM is sponsoring 50 youths through safety, navigation, and professional boat-handling certification programs to increase seafaring employability.",
    category: "Skills",
    date: "March - Present 2025",
    beneficiaries: 50,
    progress: 75,
    status: "Ongoing",
    highlights: ["Sponsorship of full tuition and licensing fees", "Vessel simulation training completed", "Practical sea trials are underway"]
  },
  {
    id: "emp-3",
    title: "Micro-Business Grants for Young Artisans",
    description: "Distributed seed capital ranging from 100k to 500k Naira to 75 young carpenters, tailors, salon owners, and mechanics to acquire modern tools and grow their retail setups.",
    category: "Business",
    date: "November 2024",
    beneficiaries: 75,
    progress: 100,
    status: "Completed",
    highlights: ["Total of 15 million Naira dispersed directly", "Post-grant mentorship of business owners", "Average business revenue increased by 40%"]
  },
  {
    id: "emp-4",
    title: "Eco-Coastal Protection & Mangrove Restoration",
    description: "A community service initiative where 300 youths mobilized to clean up the coastlines, create sandbar blockages for erosion control, and replant 5,000 mangrove saplings to safeguard fish nesting grounds.",
    category: "Community",
    date: "January 2025",
    beneficiaries: 300,
    progress: 100,
    status: "Completed",
    highlights: ["Cleaned 4 kilometers of brass beach front", "5,000 mangrove saplings planted", "Erosion vulnerability in tested zones reduced"]
  },
  {
    id: "emp-5",
    title: "Advanced Solar Inverter Installation Training",
    description: "An upcoming hands-on training series focused on solar panel configuration, battery maintenance, inverter installations, and household electrical systems management.",
    category: "Skills",
    date: "August 2026",
    beneficiaries: 80,
    progress: 10,
    status: "Upcoming",
    highlights: ["Fully funded kit for certified solar installers", "Internships arranged with local power companies", "Recruitment begins mid-July"]
  }
];

// Statistics for Charting Page
export const EMPOWERMENT_BY_CATEGORY = [
  { name: "Skills Acquisition", value: 130, color: "#3B82F6" }, // Blue
  { name: "Digital/ICT", value: 150, color: "#10B981" }, // Emerald
  { name: "SME/Business Grants", value: 75, color: "#F59E0B" }, // Amber
  { name: "Environmental Security", value: 300, color: "#8B5CF6" } // Purple
];

export const YOUTH_EMPLOYMENT_TREND = [
  { year: "2022", employmentRate: 42, activeMembers: 1100 },
  { year: "2023", employmentRate: 48, activeMembers: 1450 },
  { year: "2024", employmentRate: 59, activeMembers: 1800 },
  { year: "2025", employmentRate: 71, activeMembers: 2200 },
  { year: "2026 (Est.)", employmentRate: 82, activeMembers: 2650 }
];

export const RESOURCE_ALLOCATION = [
  { name: "Ocean Trades", percentage: 35 },
  { name: "Digital Literacy", percentage: 25 },
  { name: "SME Support", percentage: 20 },
  { name: "Security & Peacekeeping", percentage: 15 },
  { name: "Public Health/Ecology", percentage: 5 }
];
