import EventsCalendar from "../../components/EventsCalendar";
import RecurringSchedule from "../../components/RecurringSchedule";
import { supabase } from "../../../lib/supabase";
export const dynamic = "force-dynamic";
export default async function EventsPage() { const { data } = await supabase.from("events").select("id,title,category,event_date,event_time,venue,description,poster_url").order("event_date", { ascending: true }); const events = data ?? []; return <main><section className="events section"><div className="section-label"><span>05</span><span>Gather with us</span></div><div className="section-heading-row"><div><p className="eyebrow">The calendar</p><h1>Make a joyful <em>noise.</em></h1></div><p className="body-copy">Join us for services, concerts, rehearsals and special celebrations at Namirembe Cathedral.</p></div><EventsCalendar events={events} /></section><RecurringSchedule /></main>; }
