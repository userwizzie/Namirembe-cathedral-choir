"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export type ServiceRecord = { id: string; service_title: string; day_of_week: string; time: string; description: string | null; liturgical_season: string | null; is_active: boolean };

const fallbackServices: ServiceRecord[] = [
  { id: "fallback-wednesday", service_title: "Wednesday Practice & Liturgy", day_of_week: "Wednesday", time: "4:00 PM", description: "Midweek choir practice and liturgy preparation.", liturgical_season: "All year", is_active: true },
  { id: "fallback-friday", service_title: "Friday Practice & Liturgy", day_of_week: "Friday", time: "4:00 PM", description: "Friday practice and liturgy preparation.", liturgical_season: "All year", is_active: true },
  { id: "fallback-sunday", service_title: "Sunday Main Service", day_of_week: "Sunday", time: "10:30 AM", description: "The cathedral's principal Sunday worship service.", liturgical_season: "All year", is_active: true },
];

export default function RecurringSchedule() {
  const [services, setServices] = useState<ServiceRecord[]>(fallbackServices);

  useEffect(() => {
    let active = true;
    void supabase.from("services").select("id,service_title,day_of_week,time,description,liturgical_season,is_active").eq("is_active", true).order("day_of_week", { ascending: true }).then(({ data }) => {
      if (active && data?.length) setServices(data as ServiceRecord[]);
    });
    return () => { active = false; };
  }, []);

  return <section className="recurring-schedule" aria-labelledby="recurring-schedule-title"><div className="section-label"><span>Recurring services</span><span>Weekly rhythm</span></div><div className="recurring-heading"><div><p className="eyebrow">Services &amp; liturgy</p><h2 id="recurring-schedule-title">Gather in<br /><em>worship.</em></h2></div><p className="body-copy">Join the cathedral choir for regular practice, liturgy, and Sunday worship.</p></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.id}><span className="service-day">{service.day_of_week}</span><h3>{service.service_title}</h3><strong>{service.time}</strong>{service.liturgical_season && <small>{service.liturgical_season}</small>}{service.description && <p>{service.description}</p>}</article>)}</div></section>;
}
