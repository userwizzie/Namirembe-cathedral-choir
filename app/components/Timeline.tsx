"use client";
import { useState } from "react";
import { milestones } from "./choir/data";
export default function Timeline() { const [active, setActive] = useState(0); return <><div className="timeline"><div className="timeline-line" />{milestones.map((item, index) => <button className={`timeline-item ${active === index ? "active" : ""}`} key={item[0]} onClick={() => setActive(index)}><span className="timeline-dot" /><span className="timeline-year">{item[0]}</span><strong>{item[1]}</strong></button>)}</div><div className="milestone-detail"><span>{milestones[active][0]}</span><p>{milestones[active][2]}</p></div></>; }
