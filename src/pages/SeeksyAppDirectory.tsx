import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Mic, Scissors, Wand2, FolderOpen, Video, AudioLines, Podcast, Megaphone, Mail, Share2, MessageSquare, Zap, CalendarDays, Users2, FileText, BarChart3, ClipboardList, Award, Globe, Bot, PenTool, Receipt, ShieldCheck, Layers, LayoutGrid } from "lucide-react";
import { useState } from "react";

interface SeeksyApp {
  name: string;
  icon: React.ReactNode;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string[];
  isNew?: boolean;
  hasAI?: boolean;
}

const SEEKSY_APPS: SeeksyApp[] = [
  {
    name: "Studio & Recording",
    icon: <Mic className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Record podcasts, videos, and livestreams with HD quality.",
    description: "A full-featured recording studio for podcasters and content creators. Record solo or with remote guests, capture multi-track audio, and produce broadcast-quality content — all from your browser.",
    features: ["HD audio & video recording", "Remote guest recording via link", "Multi-track capture", "Live streaming support", "Auto-save & cloud backup"],
    bestFor: ["Podcasters", "Video creators", "Livestreamers"],
  },
  {
    name: "AI Clips Generator",
    icon: <Scissors className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Automatically generate viral clips from your long-form content.",
    description: "Turn long recordings into short, shareable clips using AI-powered detection. Automatically identifies the most engaging moments, adds captions, and formats for every social platform.",
    features: ["AI moment detection", "Auto-captioning", "Multi-platform formatting (Reels, Shorts, TikTok)", "Batch clip generation", "Custom branding overlays"],
    bestFor: ["Content creators", "Social media managers", "Podcasters"],
    isNew: true,
    hasAI: true,
  },
  {
    name: "AI Post-Production",
    icon: <Wand2 className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Remove filler words, pauses, silence, and enhance audio quality automatically with AI.",
    description: "Professional audio post-production powered by AI. Automatically clean up recordings by removing filler words, awkward pauses, and background noise. Enhance clarity and produce polished, broadcast-ready audio.",
    features: ["Filler word removal (um, uh, like)", "Silence trimming", "Background noise reduction", "Audio leveling & normalization", "One-click polish"],
    bestFor: ["Podcasters", "Interview creators", "Audio producers"],
    hasAI: true,
  },
  {
    name: "Media Library",
    icon: <FolderOpen className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Store, organize, and manage all your audio, video, and images in one place.",
    description: "A centralized media hub for all your content assets. Upload, tag, search, and organize files across projects. Integrates with the Studio, Clips Generator, and all publishing tools.",
    features: ["Drag-and-drop uploads", "Smart tagging & search", "Folder organization", "File preview & playback", "Storage usage tracking"],
    bestFor: ["Content creators", "Teams", "Media managers"],
  },
  {
    name: "Video Editor",
    icon: <Video className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Edit videos with timeline, transitions, captions, and export in multiple formats.",
    description: "A browser-based video editor with a professional timeline interface. Add transitions, text overlays, captions, and effects. Export in multiple formats optimized for different platforms.",
    features: ["Timeline editor", "Transitions & effects", "Caption overlay", "Multi-format export", "Trim, split & merge"],
    bestFor: ["Video creators", "Social media managers", "Marketing teams"],
  },
  {
    name: "Voice Cloning Tools",
    icon: <AudioLines className="h-5 w-5" />,
    category: "Creator Studio",
    tagline: "Clone and manage AI voice profiles for content creation and automation.",
    description: "Create realistic AI voice clones for narration, ads, and content automation. Train custom voice models, manage voice profiles, and generate speech that sounds natural and authentic.",
    features: ["Custom voice model training", "Text-to-speech generation", "Multiple voice profiles", "Voice consistency across content", "API integration"],
    bestFor: ["Content creators", "Advertisers", "Podcasters"],
    isNew: true,
    hasAI: true,
  },
  {
    name: "Podcasts",
    icon: <Podcast className="h-5 w-5" />,
    category: "Podcasting",
    tagline: "Host your podcast with RSS feeds, analytics, and automatic distribution.",
    description: "Complete podcast hosting and distribution platform. Generate RSS feeds, submit to Apple Podcasts, Spotify, and all major directories. Track downloads, listeners, and engagement with built-in analytics.",
    features: ["RSS feed generation", "Auto-distribution to directories", "Episode management", "Download & listener analytics", "Custom podcast pages"],
    bestFor: ["Podcasters", "Media companies", "Independent creators"],
  },
  {
    name: "Marketing Campaigns",
    icon: <Megaphone className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Create, schedule, and design all your marketing content and campaigns.",
    description: "Plan and execute multi-channel marketing campaigns from a single dashboard. Design content, schedule posts, track performance, and coordinate across email, social, and ads.",
    features: ["Campaign planner & calendar", "Multi-channel coordination", "Content design tools", "Performance tracking", "A/B testing"],
    bestFor: ["Marketing teams", "Small businesses", "Growth marketers"],
  },
  {
    name: "Inbox",
    icon: <Mail className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Full email inbox with templates, sequences, and multi-account management.",
    description: "A powerful email management tool built for creators and businesses. Send and receive emails, create templates, build automated sequences, and manage multiple email accounts from one unified inbox.",
    features: ["Unified inbox view", "Email templates", "Automated sequences", "Multi-account support", "Contact integration"],
    bestFor: ["Business owners", "Sales teams", "Creators"],
  },
  {
    name: "Newsletter",
    icon: <Share2 className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Build and send beautiful newsletters with drag-and-drop editor and analytics.",
    description: "Design stunning newsletters with a visual drag-and-drop builder. Manage subscriber lists, schedule sends, and track open rates and engagement. Monetize with premium subscriptions.",
    features: ["Drag-and-drop builder", "Subscriber management", "Send scheduling", "Open & click analytics", "Revenue tracking"],
    bestFor: ["Writers", "Content creators", "Businesses"],
  },
  {
    name: "SMS Marketing",
    icon: <MessageSquare className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Text messaging campaigns with templates, scheduling, and 2-way messaging.",
    description: "Reach your audience directly via SMS. Create text campaigns, use templates, schedule messages, and engage in two-way conversations. Track delivery and response rates.",
    features: ["Campaign templates", "Scheduled sending", "2-way messaging", "Contact segmentation", "Delivery analytics"],
    bestFor: ["E-commerce", "Local businesses", "Event organizers"],
  },
  {
    name: "Workflow Automations",
    icon: <Zap className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Build automated workflows and sequences to save time and scale.",
    description: "Create powerful automation workflows that connect your tools and trigger actions based on events. Automate repetitive tasks like follow-ups, notifications, and content publishing.",
    features: ["Visual workflow builder", "Event-based triggers", "Multi-step sequences", "Conditional logic", "Integration with all Seeksy modules"],
    bestFor: ["Power users", "Marketing teams", "Operations managers"],
  },
  {
    name: "Events & Ticketing",
    icon: <CalendarDays className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Create events, sell tickets, manage RSVPs, and handle check-ins.",
    description: "A complete event management platform. Create events, sell tickets with custom pricing tiers, manage attendee RSVPs, and streamline check-ins with QR codes. Perfect for virtual and in-person events.",
    features: ["Event creation & publishing", "Ticket sales & pricing tiers", "RSVP management", "QR code check-ins", "Attendee analytics"],
    bestFor: ["Event organizers", "Community builders", "Businesses"],
  },
  {
    name: "Meetings & Scheduling",
    icon: <Users2 className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Book calls and appointments with calendar integration.",
    description: "Simplify scheduling with shareable booking links, calendar sync, and automated reminders. Book 1-on-1 calls, group meetings, or consultations with built-in video conferencing.",
    features: ["Shareable booking links", "Calendar sync (Google, Outlook)", "Automated reminders", "Video conferencing", "Time zone detection"],
    bestFor: ["Consultants", "Sales teams", "Freelancers"],
  },
  {
    name: "Forms Builder",
    icon: <FileText className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Build forms and collect submissions with custom fields, logic, and file uploads.",
    description: "Create custom forms for surveys, applications, registrations, and data collection. Use conditional logic, file uploads, and integrations to streamline your workflows.",
    features: ["Drag-and-drop form builder", "Conditional logic", "File upload fields", "Submission management", "Export to CSV"],
    bestFor: ["HR teams", "Event organizers", "Researchers"],
  },
  {
    name: "Polls & Surveys",
    icon: <ClipboardList className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Create polls and surveys to gather audience feedback and insights.",
    description: "Engage your audience with interactive polls and detailed surveys. Collect real-time responses, visualize results, and export data for analysis.",
    features: ["Quick poll creation", "Multi-question surveys", "Real-time results", "Response analytics", "Embeddable widgets"],
    bestFor: ["Community managers", "Content creators", "Product teams"],
  },
  {
    name: "Awards Program",
    icon: <Award className="h-5 w-5" />,
    category: "Events & Meetings",
    tagline: "Run awards, nominations, and voting campaigns for your community.",
    description: "Create and manage awards programs with nominations, voting rounds, and winner announcements. Perfect for community engagement, employee recognition, and industry awards.",
    features: ["Nomination management", "Public/private voting", "Voting rounds & deadlines", "Winner announcements", "Embeddable voting widgets"],
    bestFor: ["Community builders", "Organizations", "Media companies"],
  },
  {
    name: "CRM",
    icon: <Users2 className="h-5 w-5" />,
    category: "CRM & Business Tools",
    tagline: "Manage contacts, deals, and sales pipelines in one place.",
    description: "A lightweight CRM built for creators and small businesses. Track contacts, manage deals through pipeline stages, log activities, and never lose track of a relationship.",
    features: ["Contact management", "Deal pipeline", "Activity timeline", "Lead scoring", "Import/export contacts"],
    bestFor: ["Sales teams", "Freelancers", "Small businesses"],
  },
  {
    name: "Proposals & Invoices",
    icon: <Receipt className="h-5 w-5" />,
    category: "CRM & Business Tools",
    tagline: "Create professional proposals and invoices to win and bill clients.",
    description: "Generate branded proposals to win new business, then convert them to invoices with a click. Track payment status, send reminders, and manage your billing workflow.",
    features: ["Proposal templates", "One-click invoice conversion", "Payment tracking", "Automated reminders", "Branded documents"],
    bestFor: ["Freelancers", "Agencies", "Consultants"],
  },
  {
    name: "Analytics Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    category: "Analytics",
    tagline: "Track performance across all your content and campaigns.",
    description: "A unified analytics dashboard showing performance metrics across podcasts, social media, email campaigns, and more. Identify trends, track growth, and make data-driven decisions.",
    features: ["Cross-platform metrics", "Growth tracking", "Audience insights", "Custom date ranges", "Exportable reports"],
    bestFor: ["Content creators", "Marketing teams", "Business owners"],
  },
  {
    name: "Identity & Profile",
    icon: <ShieldCheck className="h-5 w-5" />,
    category: "Identity & Profile",
    tagline: "Manage your creator identity, brand kit, and public profile.",
    description: "Build and manage your professional identity. Create a public profile, set up your brand kit with logos and colors, and maintain a consistent presence across all your content.",
    features: ["Public creator profile", "Brand kit management", "Bio link page", "Social links", "Verification badge"],
    bestFor: ["Creators", "Influencers", "Personal brands"],
  },
  {
    name: "Shareable Profile Page",
    icon: <Globe className="h-5 w-5" />,
    category: "Identity & Profile",
    tagline: "Your personalized landing page with video, CTA buttons, and links.",
    description: "Create a beautiful, personalized landing page that showcases your content, brand, and calls-to-action. Add video headers, custom buttons, social links, and more — all without coding.",
    features: ["Video header support", "Custom CTA buttons", "Social link integration", "Mobile-optimized", "Analytics tracking"],
    bestFor: ["Creators", "Podcasters", "Freelancers"],
  },
  {
    name: "AI Assistant (Spark)",
    icon: <Bot className="h-5 w-5" />,
    category: "AI Tools",
    tagline: "Your AI copilot for content creation, planning, and workspace management.",
    description: "Spark is your intelligent AI assistant that helps with content ideation, writing, scheduling, and workflow automation. Ask questions, get suggestions, and let AI handle repetitive tasks.",
    features: ["Content ideation & writing", "Smart suggestions", "Workflow automation", "Context-aware assistance", "Multi-module integration"],
    bestFor: ["All users", "Content creators", "Busy professionals"],
    isNew: true,
    hasAI: true,
  },
  {
    name: "Blog & Content",
    icon: <PenTool className="h-5 w-5" />,
    category: "Campaigns & Marketing",
    tagline: "Write, schedule, and publish blog posts with AI assistance.",
    description: "A full-featured blogging platform with AI-powered writing assistance. Create SEO-optimized articles, schedule publications, and manage your content calendar.",
    features: ["Rich text editor", "AI writing assistance", "SEO optimization", "Scheduled publishing", "Category management"],
    bestFor: ["Bloggers", "Content marketers", "SEO professionals"],
    hasAI: true,
  },
  {
    name: "Social Connect",
    icon: <Layers className="h-5 w-5" />,
    category: "Analytics",
    tagline: "Connect and manage all your social media accounts in one place.",
    description: "Link your social media accounts to Seeksy for unified publishing, analytics, and content management. Post to multiple platforms simultaneously and track engagement across channels.",
    features: ["Multi-platform connection", "Cross-post publishing", "Unified analytics", "Content calendar", "Engagement tracking"],
    bestFor: ["Social media managers", "Content creators", "Brands"],
  },
];

function CopyableCard({ app }: { app: SeeksyApp }) {
  const [copied, setCopied] = useState(false);

  const copyText = `**${app.name}**
${app.tagline}

${app.description}

Features:
${app.features.map(f => `• ${f}`).join('\n')}

Best for: ${app.bestFor.join(', ')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group relative">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {app.icon}
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {app.name}
                {app.isNew && <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0">New</Badge>}
                {app.hasAI && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">✨ AI</Badge>}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{app.category}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium text-foreground">{app.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Features:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {app.features.map((f, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Check className="h-3 w-3 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {app.bestFor.map((b, i) => (
            <Badge key={i} variant="outline" className="text-[10px]">{b}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SeeksyAppDirectory() {
  const [copiedAll, setCopiedAll] = useState(false);

  const copyAll = () => {
    const allText = SEEKSY_APPS.map(app => 
      `## ${app.name}\n${app.tagline}\n\n${app.description}\n\nFeatures:\n${app.features.map(f => `• ${f}`).join('\n')}\n\nBest for: ${app.bestFor.join(', ')}`
    ).join('\n\n---\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seeksy App Directory</h1>
          <p className="text-muted-foreground mt-1">All {SEEKSY_APPS.length} Seeksy modules with descriptions. Click the copy icon on any card to copy its description.</p>
        </div>
        <Button onClick={copyAll} variant="outline" className="gap-2">
          {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copiedAll ? "Copied!" : "Copy All"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SEEKSY_APPS.map((app) => (
          <CopyableCard key={app.name} app={app} />
        ))}
      </div>
    </div>
  );
}
