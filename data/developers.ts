export type DeveloperProfile = {
  role: string;
  name: string;
  qualifications: string;
  image: string;
  caption: string;
};

export const developers: DeveloperProfile[] = [
  {
    role: "Project Lead",
    name: "Joshua Tendo Ssemakula Kasakya",
    qualifications: "BSIT(UCU), CCNA - Technical Project Lead & Architect",
    image: "/developers/joshua.jpeg",
    caption: "Spearheaded technical architecture, system design, database schemas, and administrative portal security.",
  },
  {
    role: "Full Stack Developer",
    name: "Wilson Magera Wayita",
    qualifications: "BITC(KYU), HCIA - Full Stack Developer",
    image: "/developers/wilson.jpeg",
    caption: "Engineered real-time data fetching, UI/UX implementation, Resend email workflows, and component integration.",
  },
];
