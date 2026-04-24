import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Urban Coffee Studio",
    "Growth Labs Agency",
    "Northside Fitness",
    "PixelCraft Design",
    "Prime Auto Care",
  ],
  classified: [
    "Used MacBook Pro 16",
    "Studio Space for Rent",
    "Hiring Frontend Developer",
    "Weekend Photography Gig",
    "City Center Apartment",
  ],
  article: [
    "Scaling Local SEO in 2026",
    "The Future of Directory Sites",
    "Design Systems for Multi-Site",
    "From MVP to Marketplace",
    "Content Ops That Ship Fast",
  ],
  image: [
    "Golden Hour Interiors",
    "Mountain Trail Series",
    "Studio Portrait Set",
    "Neon Night Market",
    "Minimal Workspace",
  ],
  profile: [
    "Aisha Khan",
    "Rohan Patel",
    "Studio R&R",
    "Team Northwind",
    "Maya Desai",
  ],
  social: [
    "Community Launch Update",
    "Collab Request: Designers",
    "Weekly Trend Digest",
    "New Partnerships Announced",
    "Creator Spotlight Series",
  ],
  pdf: [
    "Local SEO Playbook",
    "Marketplace UX Guide",
    "Outbound Sales Template",
    "Agency Pricing Deck",
    "SaaS Metrics Cheatsheet",
  ],
  org: [
    "Northwind Collective",
    "Brightline Media",
    "Atlas Labs",
    "Cobalt Studio",
    "Zenith Partners",
  ],
  sbm: [
    "SEO Checklist 2026",
    "Directory Growth Tactics",
    "Backlink Outreach Vault",
    "AI Writing Tools List",
    "Local Listing Audit",
  ],
  comment: [
    "Reply: Agency Growth Stack",
    "Commentary: Link Building",
    "Response: Listing Quality",
    "Thread: SEO Experiments",
    "Hot Take: Directory UX",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Marketing", "Tech", "Design", "Fitness", "Automotive"],
  classified: ["Jobs", "Real Estate", "Services", "Gigs", "Market"],
  article: ["Strategy", "SEO", "Product", "Growth", "Ops"],
  image: ["Lifestyle", "Travel", "Studio", "Urban", "Minimal"],
  profile: ["Founder", "Creator", "Agency", "Team", "Consultant"],
  social: ["Community", "News", "Updates", "Events", "Insights"],
  pdf: ["Guides", "Playbooks", "Templates", "Reports", "Docs"],
  org: ["Agency", "Studio", "Collective", "Partner", "Network"],
  sbm: ["Bookmarks", "Tools", "Resources", "SEO", "Research"],
  comment: ["Opinion", "Reply", "Discussion", "Feedback", "Debate"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Verified business listing with trusted details.",
  classified: "Fresh deal posted by a verified seller.",
  article: "Long-form insight from industry experts.",
  image: "Curated visual story and gallery.",
  profile: "Featured creator profile and highlights.",
  social: "Community update and engagement thread.",
  pdf: "Downloadable resource for your team.",
  org: "Organization spotlight and services.",
  sbm: "Curated bookmark collection entry.",
  comment: "Response post with perspective and context.",
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

/**
 * Square-crop portrait URLs aligned to `taskTitles.profile` order (Unsplash).
 * Picked to read as South Asian / Desi where names suggest it (Aisha Khan, Rohan Patel, Maya Desai).
 */
const profilePortraitUrl = (index: number) => {
  const crop = "auto=format&w=720&h=720&fit=crop&q=82";
  const portraits = [
    `https://images.unsplash.com/photo-1769275061356-a038b498c4a7?${crop}`, // 0 Aisha Khan — woman in sari, portrait
    `https://images.unsplash.com/photo-1712425718137-491250cfde88?${crop}`, // 1 Rohan Patel — man, professional portrait
    `https://images.unsplash.com/photo-1635013941270-4af7456b9b95?${crop}`, // 2 Studio R&R — woman in sari, editorial / creative
    `https://images.unsplash.com/photo-1647689662423-7948c8523256?${crop}`, // 3 Team Northwind — man, confident studio lead
    `https://images.unsplash.com/photo-1671881641527-0a1ee842e13e?${crop}`, // 4 Maya Desai — woman in red & gold sari
  ];
  return portraits[index % portraits.length];
};

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const cities = ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai"];
    const city = cities[index % cities.length];

    const primaryImageUrl = task === "profile" ? profilePortraitUrl(index) : buildImage(task, index);

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location: city,
        address: `${city} — public studio & remote`,
        description:
          task === "profile"
            ? `${summaryByTask[task]} ${title} works across product, content, and community programs.`
            : summaryByTask[task],
        website: task === "profile" ? undefined : "https://example.com",
        phone: `+91-98765${String(43210 + index).slice(-5)}`,
        ...(task === "profile" ? { logo: primaryImageUrl } : {}),
      },
      media: [{ url: primaryImageUrl, type: "IMAGE" }],
      tags: [task, category],
      authorName: "Site Master Pro",
      publishedAt: new Date().toISOString(),
    };
  });
};
