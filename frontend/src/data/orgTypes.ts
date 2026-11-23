/*
  One place that describes each organization type.
  Both pages read from this list, so adding a fourth org type later means adding one object here,
  not editing every component. (This is the "data-driven UI" idea: the data decides what renders.)
*/
import type { CSSProperties } from "react";

export interface OrgColors {
  accent: string;
  deep: string;
  tint: string;
  on: string;
}

export interface OrgType {
  slug: string;
  name: string;
  who: string;
  tagline: string;
  headline: string;
  intro: string;
  colors: OrgColors;
  sampleNote: string;
  sampleEntries: { label: string; value: string }[];
  features: { title: string; body: string }[];
  day: { time: string; text: string }[];
}

export const orgTypes: OrgType[] = [
  {
    slug: "childcare",
    name: "Childcare",
    who: "Children",
    tagline: "For daycares, preschools and home childcare",
    headline: "Spend the day with the kids, not the clipboard.",
    intro:
      "Check children in at a shared tablet, log naps and meals by voice, and send families a clear picture of their child's day.",
    colors: { accent: "#e8a317", deep: "#7a4f00", tint: "#fdf3dc", on: "#1f2a44" },
    sampleNote: "Maya napped from 1 to 2:15 and ate half her lunch.",
    sampleEntries: [
      { label: "Nap", value: "1:00 – 2:15 pm" },
      { label: "Lunch", value: "Ate about half" },
    ],
    features: [
      {
        title: "Check-in that works without Wi-Fi",
        body: "Parents tap their child's photo at the door. Attendance saves on the tablet and syncs when the connection is back.",
      },
      {
        title: "Log by voice, hands free",
        body: "Say what happened while you're holding a toddler. It becomes a tidy entry under the right child.",
      },
      {
        title: "Notice changes early",
        body: "If a child's naps, meals or mood shift over a week, the right teacher gets a gentle heads-up.",
      },
    ],
    day: [
      { time: "8:02 am", text: "Checked in by Dad" },
      { time: "10:30 am", text: "Outdoor play, 40 minutes" },
      { time: "12:15 pm", text: "Lunch: ate about half" },
      { time: "1:00 pm", text: "Nap until 2:15 pm" },
      { time: "5:20 pm", text: "Picked up by Grandma (authorized)" },
    ],
  },
  {
    slug: "senior-care",
    name: "Senior care",
    who: "Older adults",
    tagline: "For senior homes and adult day programs",
    headline: "More time for conversation, less for paperwork.",
    intro:
      "Record visits and daily care in seconds, keep families who live far away in the loop, and catch quiet changes before they become problems.",
    colors: { accent: "#2f7d6d", deep: "#1f5a4e", tint: "#e3f1ed", on: "#ffffff" },
    sampleNote: "Mr. Alvarez joined the morning walk and finished his breakfast.",
    sampleEntries: [
      { label: "Activity", value: "Morning walk" },
      { label: "Breakfast", value: "Finished" },
    ],
    features: [
      {
        title: "Visit tracking that just works",
        body: "Residents and day guests are checked in at a simple kiosk with large, clear buttons, online or off.",
      },
      {
        title: "Care notes by voice",
        body: "Staff speak a quick note after each visit. It lands in the right person's record, ready for the next shift.",
      },
      {
        title: "Spot quiet changes",
        body: "Skipped days, smaller meals or fewer activities over time are flagged so someone can check in.",
      },
    ],
    day: [
      { time: "9:10 am", text: "Arrived with transport" },
      { time: "9:30 am", text: "Breakfast: finished" },
      { time: "10:15 am", text: "Morning walk with group" },
      { time: "1:30 pm", text: "Video call with daughter" },
      { time: "3:45 pm", text: "Departed with transport" },
    ],
  },
  {
    slug: "disability-support",
    name: "Disability support",
    who: "Adults with disabilities",
    tagline: "For adult disability day programs and support services",
    headline: "Support that follows each person's own routine.",
    intro:
      "Keep each person's needs, goals and daily notes in one accessible place, so every support worker starts the shift knowing what matters.",
    colors: { accent: "#5b4bb7", deep: "#43358f", tint: "#ecebf8", on: "#ffffff" },
    sampleNote: "Jordan led the cooking group today and practiced using the bus app.",
    sampleEntries: [
      { label: "Activity", value: "Led cooking group" },
      { label: "Goal progress", value: "Bus app practice" },
    ],
    features: [
      {
        title: "Attendance for every program",
        body: "Check people in across day programs and outings, with an accessible kiosk that works offline.",
      },
      {
        title: "Notes by voice, in plain language",
        body: "Support workers speak notes on activities and goals. They're saved clearly and consistently.",
      },
      {
        title: "Patterns, gently surfaced",
        body: "Changes in attendance or routine are flagged as observations for the team, never as judgments.",
      },
    ],
    day: [
      { time: "9:00 am", text: "Arrived, greeted by Sam" },
      { time: "10:00 am", text: "Led the cooking group" },
      { time: "12:00 pm", text: "Lunch with friends" },
      { time: "1:30 pm", text: "Practiced bus app (goal)" },
      { time: "3:30 pm", text: "Left with support worker" },
    ],
  },
];

// slug is string | undefined because useParams() can't promise the URL has one.
export function findOrgType(slug: string | undefined): OrgType | undefined {
  return orgTypes.find((org) => org.slug === slug);
}

/*
  Turns an org's colors into the CSS variables that the "accent" utilities read.
  Put the result in a wrapper's style={...} and everything inside takes that org's colors.
*/

// CSSProperties alone rejects custom "--..." names, so we also allow any key that starts with "--".
type CssVars = CSSProperties & Record<`--${string}`, string>;

export function accentStyle(org: OrgType): CssVars {
  return {
    "--color-accent": org.colors.accent,
    "--color-accent-deep": org.colors.deep,
    "--color-accent-tint": org.colors.tint,
    "--color-accent-on": org.colors.on,
  };
}
