import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Mic, Scissors, Wand2, FolderOpen, Video, AudioLines, Podcast, Megaphone, Mail, Share2, MessageSquare, Zap, CalendarDays, Users2, FileText, BarChart3, ClipboardList, Award, Globe, Bot, PenTool, Receipt, ShieldCheck, Layers } from "lucide-react";
import { useState } from "react";
import { TopNavigation } from "@/components/homepage/TopNavigation";
import { FooterSection } from "@/components/homepage/FooterSection";

// Hero images
import heroStudio from "@/assets/app-hero-studio.jpg";
import heroClips from "@/assets/app-hero-clips.jpg";
import heroMarketing from "@/assets/app-hero-marketing.jpg";
import heroEvents from "@/assets/app-hero-events.jpg";
import heroCrm from "@/assets/app-hero-crm.jpg";
import heroAnalytics from "@/assets/app-hero-analytics.jpg";
import heroAi from "@/assets/app-hero-ai.jpg";
import heroIdentity from "@/assets/app-hero-identity.jpg";
import heroVideo from "@/assets/app-hero-video.jpg";
import heroEmail from "@/assets/app-hero-email.jpg";

interface SeeksyApp {
  name: string;
  icon: React.ReactNode;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string[];
  heroImage: string;
  isNew?: boolean;
  hasAI?: boolean;
}

interface SeeksyBundle {
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  apps: string[];
}

const SEEKSY_BUNDLES: SeeksyBundle[] = [
  {
    name: "Creator Studio Suite",
    tagline: "Everything you need to record, edit, and produce professional content.",
    description: "The complete content creation toolkit — from recording to post-production to publishing. Includes all studio tools, AI-powered editing, and media management.",
    heroImage: heroStudio,
    apps: ["Studio & Recording", "AI Clips Generator", "AI Post-Production", "Media Library", "Video Editor", "Voice Cloning Tools"],
  },
  {
    name: "Marketing & Campaigns Suite",
    tagline: "Plan, create, and distribute campaigns across every channel.",
    description: "Unified marketing command center. Run email, SMS, newsletter, blog, and social campaigns with workflow automations that tie everything together.",
    heroImage: heroMarketing,
    apps: ["Marketing Campaigns", "Inbox", "Newsletter", "SMS Marketing", "Workflow Automations", "Blog & Content"],
  },
  {
    name: "Events & Community Suite",
    tagline: "Host events, manage attendees, and engage your community.",
    description: "From ticketing to check-ins to post-event surveys. Manage meetings, collect feedback with polls and forms, and run awards programs.",
    heroImage: heroEvents,
    apps: ["Events & Ticketing", "Meetings & Scheduling", "Forms Builder", "Polls & Surveys", "Awards Program"],
  },
  {
    name: "Business Operations Suite",
    tagline: "CRM, proposals, invoicing, and analytics in one package.",
    description: "Run your business from a single platform. Manage contacts, close deals, send invoices, and track performance with unified analytics.",
    heroImage: heroCrm,
    apps: ["CRM", "Proposals & Invoices", "Analytics Dashboard", "Social Connect"],
  },
  {
    name: "AI & Identity Suite",
    tagline: "AI-powered assistance and personal branding tools.",
    description: "Leverage AI for content creation and workflow automation while building a professional identity with branded profiles and shareable pages.",
    heroImage: heroAi,
    apps: ["AI Assistant (Spark)", "Identity & Profile", "Shareable Profile Page"],
  },
];

const IMAGE_MAP: Record<string, string> = {
  "Studio & Recording": heroStudio,
  "AI Clips Generator": heroClips,
  "AI Post-Production": heroStudio,
  "Media Library": heroVideo,
  "Video Editor": heroVideo,
  "Voice Cloning Tools": heroAi,
  "Podcasts": heroStudio,
  "Marketing Campaigns": heroMarketing,
  "Inbox": heroEmail,
  "Newsletter": heroEmail,
  "SMS Marketing": heroMarketing,
  "Workflow Automations": heroMarketing,
  "Events & Ticketing": heroEvents,
  "Meetings & Scheduling": heroEvents,
  "Forms Builder": heroCrm,
  "Polls & Surveys": heroAnalytics,
  "Awards Program": heroEvents,
  "CRM": heroCrm,
  "Proposals & Invoices": heroCrm,
  "Analytics Dashboard": heroAnalytics,
  "Identity & Profile": heroIdentity,
  "Shareable Profile Page": heroIdentity,
  "AI Assistant (Spark)": heroAi,
  "Blog & Content": heroEmail,
  "Social Connect": heroAnalytics,
};

const SEEKSY_APPS: SeeksyApp[] = [
  {
    name: "Studio & Recording",
    icon: <Mic className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Record podcasts, videos, and livestreams with HD quality.",
    description: "A full-featured recording studio for podcasters and content creators.",
    features: ["HD audio & video recording", "Remote guest recording via link", "Multi-track capture", "Live streaming support", "Auto-save & cloud backup"],
    bestFor: ["Podcasters", "Video creators", "Livestreamers"],
    heroImage: heroStudio,
  },
  {
    name: "AI Clips Generator",
    icon: <Scissors className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Automatically generate viral clips from your long-form content.",
    description: "Turn long recordings into short, shareable clips using AI-powered detection.",
    features: ["AI moment detection", "Auto-captioning", "Multi-platform formatting", "Batch clip generation", "Custom branding overlays"],
    bestFor: ["Content creators", "Social media managers", "Podcasters"],
    heroImage: heroClips,
    isNew: true,
    hasAI: true,
  },
  {
    name: "AI Post-Production",
    icon: <Wand2 className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Remove filler words, pauses, silence, and enhance audio quality automatically.",
    description: "Professional audio post-production powered by AI.",
    features: ["Filler word removal", "Silence trimming", "Background noise reduction", "Audio leveling", "One-click polish"],
    bestFor: ["Podcasters", "Interview creators", "Audio producers"],
    heroImage: heroStudio,
    hasAI: true,
  },
  {
    name: "Media Library",
    icon: <FolderOpen className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Store, organize, and manage all your media in one place.",
    description: "A centralized media hub for all your content assets.",
    features: ["Drag-and-drop uploads", "Smart tagging & search", "Folder organization", "File preview & playback", "Storage tracking"],
    bestFor: ["Content creators", "Teams", "Media managers"],
    heroImage: heroVideo,
  },
  {
    name: "Video Editor",
    icon: <Video className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Edit videos with timeline, transitions, captions, and export.",
    description: "A browser-based video editor with a professional timeline interface.",
    features: ["Timeline editor", "Transitions & effects", "Caption overlay", "Multi-format export", "Trim, split & merge"],
    bestFor: ["Video creators", "Social media managers", "Marketing teams"],
    heroImage: heroVideo,
  },
  {
    name: "Voice Cloning Tools",
    icon: <AudioLines className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Clone and manage AI voice profiles for content creation.",
    description: "Create realistic AI voice clones for narration, ads, and automation.",
    features: ["Custom voice model training", "Text-to-speech generation", "Multiple voice profiles", "Voice consistency", "API integration"],
    bestFor: ["Content creators", "Advertisers", "Podcasters"],
    heroImage: heroAi,
    isNew: true,
    hasAI: true,
  },
  {
    name: "Podcasts",
    icon: <Podcast className="h-5 w-5" />,
    category: "Podcasting",
    tagline: "Host your podcast with RSS feeds, analytics, and distribution.",
    description: "Complete podcast hosting and distribution platform.",
    features: ["RSS feed generation", "Auto-distribution", "Episode management", "Download analytics", "Custom podcast pages"],
    bestFor: ["Podcasters", "Media companies", "Independent creators"],
    heroImage: heroStudio,
  },
  {
    name: "Marketing Campaigns",
    icon: <Megaphone className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Create, schedule, and design all your marketing campaigns.",
    description: "Plan and execute multi-channel marketing campaigns.",
    features: ["Campaign planner", "Multi-channel coordination", "Content design tools", "Performance tracking", "A/B testing"],
    bestFor: ["Marketing teams", "Small businesses", "Growth marketers"],
    heroImage: heroMarketing,
  },
  {
    name: "Inbox",
    icon: <Mail className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Full email inbox with templates, sequences, and multi-account management.",
    description: "A powerful email management tool built for creators and businesses.",
    features: ["Unified inbox view", "Email templates", "Automated sequences", "Multi-account support", "Contact integration"],
    bestFor: ["Business owners", "Sales teams", "Creators"],
    heroImage: heroEmail,
  },
  {
    name: "Newsletter",
    icon: <Share2 className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Build and send beautiful newsletters with drag-and-drop editor.",
    description: "Design stunning newsletters with a visual builder.",
    features: ["Drag-and-drop builder", "Subscriber management", "Send scheduling", "Open & click analytics", "Revenue tracking"],
    bestFor: ["Writers", "Content creators", "Businesses"],
    heroImage: heroEmail,
  },
  {
    name: "SMS Marketing",
    icon: <MessageSquare className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Text messaging campaigns with templates and 2-way messaging.",
    description: "Reach your audience directly via SMS.",
    features: ["Campaign templates", "Scheduled sending", "2-way messaging", "Contact segmentation", "Delivery analytics"],
    bestFor: ["E-commerce", "Local businesses", "Event organizers"],
    heroImage: heroMarketing,
  },
  {
    name: "Workflow Automations",
    icon: <Zap className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Build automated workflows and sequences to save time.",
    description: "Create powerful automation workflows that connect your tools.",
    features: ["Visual workflow builder", "Event-based triggers", "Multi-step sequences", "Conditional logic", "Module integration"],
    bestFor: ["Power users", "Marketing teams", "Operations managers"],
    heroImage: heroMarketing,
  },
  {
    name: "Events & Ticketing",
    icon: <CalendarDays className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Create events, sell tickets, manage RSVPs, and check-ins.",
    description: "A complete event management platform.",
    features: ["Event creation", "Ticket sales", "RSVP management", "QR code check-ins", "Attendee analytics"],
    bestFor: ["Event organizers", "Community builders", "Businesses"],
    heroImage: heroEvents,
  },
  {
    name: "Meetings & Scheduling",
    icon: <Users2 className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Book calls and appointments with calendar integration.",
    description: "Simplify scheduling with shareable booking links.",
    features: ["Shareable booking links", "Calendar sync", "Automated reminders", "Video conferencing", "Time zone detection"],
    bestFor: ["Consultants", "Sales teams", "Freelancers"],
    heroImage: heroEvents,
  },
  {
    name: "Forms Builder",
    icon: <FileText className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Build forms with custom fields, logic, and file uploads.",
    description: "Create custom forms for surveys, applications, and data collection.",
    features: ["Drag-and-drop builder", "Conditional logic", "File upload fields", "Submission management", "Export to CSV"],
    bestFor: ["HR teams", "Event organizers", "Researchers"],
    heroImage: heroCrm,
  },
  {
    name: "Polls & Surveys",
    icon: <ClipboardList className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Create polls and surveys to gather audience feedback.",
    description: "Engage your audience with interactive polls and surveys.",
    features: ["Quick poll creation", "Multi-question surveys", "Real-time results", "Response analytics", "Embeddable widgets"],
    bestFor: ["Community managers", "Content creators", "Product teams"],
    heroImage: heroAnalytics,
  },
  {
    name: "Awards Program",
    icon: <Award className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Run awards, nominations, and voting campaigns.",
    description: "Create and manage awards programs with voting rounds.",
    features: ["Nomination management", "Public/private voting", "Voting rounds", "Winner announcements", "Embeddable widgets"],
    bestFor: ["Community builders", "Organizations", "Media companies"],
    heroImage: heroEvents,
  },
  {
    name: "CRM",
    icon: <Users2 className="h-5 w-5" />,
    category: "CRM & Business Tools",
    tagline: "Manage contacts, deals, and sales pipelines.",
    description: "A lightweight CRM built for creators and small businesses.",
    features: ["Contact management", "Deal pipeline", "Activity timeline", "Lead scoring", "Import/export contacts"],
    bestFor: ["Sales teams", "Freelancers", "Small businesses"],
    heroImage: heroCrm,
  },
  {
    name: "Proposals & Invoices",
    icon: <Receipt className="h-5 w-5" />,
    category: "CRM & Business Tools",
    tagline: "Create professional proposals and invoices.",
    description: "Generate branded proposals and convert them to invoices.",
    features: ["Proposal templates", "One-click invoice", "Payment tracking", "Automated reminders", "Branded documents"],
    bestFor: ["Freelancers", "Agencies", "Consultants"],
    heroImage: heroCrm,
  },
  {
    name: "Analytics Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    category: "Analytics",
    tagline: "Track performance across all your content and campaigns.",
    description: "Unified analytics showing metrics across all channels.",
    features: ["Cross-platform metrics", "Growth tracking", "Audience insights", "Custom date ranges", "Exportable reports"],
    bestFor: ["Content creators", "Marketing teams", "Business owners"],
    heroImage: heroAnalytics,
  },
  {
    name: "Identity & Profile",
    icon: <ShieldCheck className="h-5 w-5" />,
    category: "Identity & Profile",
    tagline: "Manage your creator identity, brand kit, and public profile.",
    description: "Build and manage your professional identity.",
    features: ["Public creator profile", "Brand kit management", "Bio link page", "Social links", "Verification badge"],
    bestFor: ["Creators", "Influencers", "Personal brands"],
    heroImage: heroIdentity,
  },
  {
    name: "Shareable Profile Page",
    icon: <Globe className="h-5 w-5" />,
    category: "Identity & Profile",
    tagline: "Your personalized landing page with video, CTA, and links.",
    description: "Create a beautiful landing page that showcases your brand.",
    features: ["Video header support", "Custom CTA buttons", "Social link integration", "Mobile-optimized", "Analytics tracking"],
    bestFor: ["Creators", "Podcasters", "Freelancers"],
    heroImage: heroIdentity,
  },
  {
    name: "AI Assistant (Spark)",
    icon: <Bot className="h-5 w-5" />,
    category: "AI Tools",
    tagline: "Your AI copilot for content creation, planning, and management.",
    description: "Spark is your intelligent AI assistant for everything.",
    features: ["Content ideation & writing", "Smart suggestions", "Workflow automation", "Context-aware assistance", "Multi-module integration"],
    bestFor: ["All users", "Content creators", "Busy professionals"],
    heroImage: heroAi,
    isNew: true,
    hasAI: true,
  },
  {
    name: "Blog & Content",
    icon: <PenTool className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Write, schedule, and publish blog posts with AI assistance.",
    description: "A full-featured blogging platform with AI-powered writing.",
    features: ["Rich text editor", "AI writing assistance", "SEO optimization", "Scheduled publishing", "Category management"],
    bestFor: ["Bloggers", "Content marketers", "SEO professionals"],
    heroImage: heroEmail,
    hasAI: true,
  },
  {
    name: "Social Connect",
    icon: <Layers className="h-5 w-5" />,
    category: "Analytics",
    tagline: "Connect and manage all your social media accounts.",
    description: "Link social media accounts for unified publishing and analytics.",
    features: ["Multi-platform connection", "Cross-post publishing", "Unified analytics", "Content calendar", "Engagement tracking"],
    bestFor: ["Social media managers", "Content creators", "Brands"],
    heroImage: heroAnalytics,
  },
];

function AppCard({ app }: { app: SeeksyApp }) {
  const [copied, setCopied] = useState(false);

  const copyText = `**${app.name}**\n${app.tagline}\n\n${app.description}\n\nFeatures:\n${app.features.map(f => `• ${f}`).join('\n')}\n\nBest for: ${app.bestFor.join(', ')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img
          src={app.heroImage}
          alt={app.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {app.isNew && <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">New</Badge>}
          {app.hasAI && <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5">✨ AI</Badge>}
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {app.icon}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground leading-tight">{app.name}</h3>
              <p className="text-[11px] text-muted-foreground">{app.category}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{app.tagline}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {app.bestFor.map((b, i) => (
            <Badge key={i} variant="outline" className="text-[10px] py-0">{b}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BundleCard({ bundle }: { bundle: SeeksyBundle }) {
  const [copied, setCopied] = useState(false);

  const copyText = `**${bundle.name}**\n${bundle.tagline}\n\n${bundle.description}\n\nIncludes:\n${bundle.apps.map(a => `• ${a}`).join('\n')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-44 overflow-hidden">
        <img
          src={bundle.heroImage}
          alt={bundle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-bold text-white text-lg leading-tight">{bundle.name}</h3>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-foreground">{bundle.tagline}</p>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{bundle.description}</p>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Includes {bundle.apps.length} apps:</p>
          <div className="flex flex-wrap gap-1.5">
            {bundle.apps.map((app, i) => (
              <Badge key={i} variant="secondary" className="text-[11px]">{app}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SeeksyAppDirectory() {
  const [tab, setTab] = useState<'bundles' | 'apps'>('bundles');
  const [copiedAll, setCopiedAll] = useState(false);

  const copyAll = () => {
    const text = tab === 'apps'
      ? SEEKSY_APPS.map(app =>
          `## ${app.name}\n${app.tagline}\n\n${app.description}\n\nFeatures:\n${app.features.map(f => `• ${f}`).join('\n')}\n\nBest for: ${app.bestFor.join(', ')}`
        ).join('\n\n---\n\n')
      : SEEKSY_BUNDLES.map(b =>
          `## ${b.name}\n${b.tagline}\n\n${b.description}\n\nIncludes:\n${b.apps.map(a => `• ${a}`).join('\n')}`
        ).join('\n\n---\n\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seeksy App Directory</h1>
            <p className="text-muted-foreground mt-1">
              {tab === 'bundles'
                ? `${SEEKSY_BUNDLES.length} curated bundles for every workflow.`
                : `All ${SEEKSY_APPS.length} individual Seeksy modules.`}
            </p>
          </div>
          <Button onClick={copyAll} variant="outline" className="gap-2 shrink-0">
            {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copiedAll ? "Copied!" : "Copy All"}
          </Button>
        </div>

        {/* Pill Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('bundles')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === 'bundles'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Bundles
          </button>
          <button
            onClick={() => setTab('apps')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === 'apps'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Apps
          </button>
        </div>

        {tab === 'bundles' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SEEKSY_BUNDLES.map((bundle) => (
              <BundleCard key={bundle.name} bundle={bundle} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SEEKSY_APPS.map((app) => (
              <AppCard key={app.name} app={app} />
            ))}
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
}
