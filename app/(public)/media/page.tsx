import MediaGallery from "../../components/MediaGallery";
import { supabase } from "../../../lib/supabase";
export const dynamic = "force-dynamic";
export default async function MediaPage() { const { data } = await supabase.from("media_items").select("id,media_type,url,caption,category").order("created_at", { ascending: false }); return <main><section className="media-section section"><div className="section-label"><span>06</span><span>Media centre</span></div><div className="section-heading-row"><div><p className="eyebrow">Listen. Watch. Remember.</p><h1>Moments in <em>harmony.</em></h1></div><p className="body-copy">Explore worship, rehearsal and community moments from our ministry.</p></div><MediaGallery managedMedia={data ?? []} /></section></main>; }
