"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = { about: "About", contact: "Contact", donate: "Donate", events: "Events", history: "History", join: "Join the Choir", leadership: "Leadership", media: "Media", music: "Music", news: "News" };

export default function Breadcrumbs() {
  const pathname = usePathname();
  const key = pathname.split("/").filter(Boolean).pop() ?? "";
  if (!key || !labels[key]) return null;
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">&gt;</span><span aria-current="page">{labels[key]}</span></nav>;
}
