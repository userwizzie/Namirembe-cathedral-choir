"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { leaderProfiles, leaders as fallbackLeaders } from "./choir/data";

type Leader = { id: string; name: string; position: string; photo_url: string | null; bio: string | null; responsibilities: string | null; musical_background: string | null; display_order: number };

const localPhotos: Record<string, string> = {
	"Chief Organist": "/leadership/Chief%20organist.jpeg",
	Director: "/leadership/Choir%20Director.jpeg",
	Chairman: "/leadership/Chairman%20choir.jpeg",
	Administrator: "/leadership/Administrator.jpeg",
};

const fallbackRecords: Leader[] = fallbackLeaders.map(([name, position, initials], index) => ({ id: `fallback-${index}`, name, position, photo_url: localPhotos[position] ?? null, ...leaderProfiles[position as keyof typeof leaderProfiles], display_order: index }));

function initials(name: string) { return name.replace(/^(mr|mrs|ms|dr)\.\s+/i, "").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(); }

export default function LeadershipGrid() {
	const [records, setRecords] = useState<Leader[]>(fallbackRecords);

	useEffect(() => {
		let active = true;
		void supabase.from("leadership").select("id,name,position,photo_url,bio,responsibilities,musical_background,display_order").order("display_order", { ascending: true }).then(({ data }) => {
			if (active && data?.length) setRecords((data as Leader[]).map((leader) => ({ ...leader, photo_url: leader.photo_url || localPhotos[leader.position] || null, bio: leader.bio || leaderProfiles[leader.position as keyof typeof leaderProfiles]?.bio || null, responsibilities: leader.responsibilities || leaderProfiles[leader.position as keyof typeof leaderProfiles]?.responsibilities || null, musical_background: leader.musical_background || leaderProfiles[leader.position as keyof typeof leaderProfiles]?.musical_background || null })));
		});
		return () => { active = false; };
	}, []);

	return <div className="leader-grid">{records.map((leader, index) => <article className="leader-card" key={leader.id}>
		<div className="leader-avatar">
			<div className={`leader-avatar-bg avatar-${(index % 4) + 1}`} style={leader.photo_url ? { backgroundImage: `linear-gradient(0deg, rgba(11,9,10,.45), transparent 60%), url(${leader.photo_url})` } : undefined} />
			<span>{initials(leader.name)}</span>
		</div>
		<div className="leader-meta"><span>{String(index + 1).padStart(2, "0")}</span><h3>{leader.name}</h3><p>{leader.position}</p>
			{(leader.bio || leader.responsibilities || leader.musical_background) && <div className="leader-details">{leader.bio && <p>{leader.bio}</p>}{leader.responsibilities && <p><strong>Responsibilities:</strong> {leader.responsibilities}</p>}{leader.musical_background && <p><strong>Musical background:</strong> {leader.musical_background}</p>}</div>}
		</div>
	</article>)}</div>;
}
