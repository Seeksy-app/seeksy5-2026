import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, CheckCircle2, PlusCircle, Check, ArrowUpDown, ExternalLink, Sparkles } from "lucide-react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppDirectoryFooter } from "@/components/footer/AppDirectoryFooter";
import { SEEKSY_COLLECTIONS, type SeeksyCollection } from "@/components/modules/collectionData";
import { SEEKSY_MODULES, type SeeksyModule, MODULE_CATEGORIES } from "@/components/modules/moduleData";
import { EmailGate } from "@/components/app-directory/EmailGate";
import { useProspectusGate, useProspectusPageView, useUpdateSessionDuration } from "@/hooks/useProspectusTracking";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import platformVpa from "@/assets/platform-vpa.png";
import platformSeeksy from "@/assets/platform-seeksy.jpg";
import platformSeeksyTv from "@/assets/platform-seeksy-tv.jpg";
import platformAlchify from "@/assets/platform-alchify.jpg";
import platformAlchify2 from "@/assets/platform-alchify-2.png";
import platformAlchify3 from "@/assets/platform-alchify-3.png";
import platformDtv from "@/assets/platform-digitaltovoter.png";
import platformYvb from "@/assets/platform-yourvabenefits.png";
import platformWr360 from "@/assets/platform-workready360.png";
import platformTl from "@/assets/platform-truckinglane.png";
import platformGovAffairs from "@/assets/platform-governmentaffairs.jpg";
import platformPcsing from "@/assets/platform-pcsing.jpg";
import seeksyLogoOrange from "@/assets/seeksy-logo-orange.png";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface PlatformItem {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  url?: string;
  videoUrl?: string;
  category: string;
  infoPopup?: {
    tagline: string;
    highlights: string[];
  };
}

const PLATFORM_CATEGORIES = [
  { id: "all", name: "All Platforms" },
  { id: "media", name: "Media & Creative" },
  { id: "industry", name: "Industry Solutions" },
  { id: "civic", name: "Civic & Advocacy" },
  { id: "career", name: "Career & Workforce" },
  { id: "events", name: "Events & Awards" },
] as const;

const PLATFORMS: PlatformItem[] = [
  {
    id: "seeksy-tv",
    name: "Seeksy TV",
    description: "Live streaming and on-demand video platform for creators. Broadcast, schedule, and grow your audience with built-in tools.",
    image: platformSeeksyTv,
    category: "media",
    videoUrl: `${SUPABASE_URL}/storage/v1/object/public/demo-videos/Seeksy TV.mp4`,
  },
  {
    id: "alchify-studio",
    name: "Alchify Studio",
    description: "Professional-grade creative production suite. Edit video, mix audio, and produce content with AI-powered tools.",
    image: platformAlchify,
    images: [platformAlchify, platformAlchify2, platformAlchify3],
    category: "media",
    videoUrl: `${SUPABASE_URL}/storage/v1/object/public/demo-videos/Alchify.mp4`,
  },
  {
    id: "truckinglane",
    name: "Trucking Lane",
    description: "Your AI Co-Pilot that never sleeps. The first AI assistant built exclusively for trucking — answer calls, qualify carriers, and book loads automatically.",
    image: platformTl,
    category: "industry",
    infoPopup: {
      tagline: "The first AI assistant built exclusively for trucking. Answer calls, qualify carriers, and book loads — automatically. Trusted by dispatch teams nationwide.",
      highlights: [
        "24/7 AI Call Handling & Coverage",
        "Real-Time FMCSA Carrier Verification",
        "AI Intent Scoring & Lead Prioritization",
        "50+ Language Support",
        "Live Analytics Dashboard",
      ],
    },
  },
  {
    id: "digitaltovoter",
    name: "DigitalToVoter",
    description: "Your AI Campaign Manager That Never Sleeps. AI-powered voter outreach, event scheduling, and real-time insights for political campaigns.",
    image: platformDtv,
    category: "civic",
    infoPopup: {
      tagline: "Stop juggling spreadsheets and missing opportunities. Our AI handles voter outreach, schedules events, and delivers real-time insights — so you can focus on winning.",
      highlights: [
        "24/7 Voter Engagement",
        "AI-Powered Insights & Analytics",
        "One Unified Campaign Platform",
        "Automated Outreach & Follow-ups",
        "Real-Time Performance Dashboard",
      ],
    },
  },
  {
    id: "yourvabenefits",
    name: "YourVABenefits",
    description: "Free calculators, AI-powered claim guidance, and connections to accredited representatives. Get the VA benefits you've earned.",
    image: platformYvb,
    category: "civic",
    videoUrl: `${SUPABASE_URL}/storage/v1/object/public/demo-videos/YourBenefits.mp4`,
  },
  {
    id: "workready360",
    name: "WorkReady360",
    description: "Stop dreading Monday. AI-powered career exploration, O*NET assessments, and personalized insights to help you find work you actually love.",
    image: platformWr360,
    category: "career",
    infoPopup: {
      tagline: "You deserve a career that makes you want to get out of bed. We'll help you find purpose, reignite motivation, and build a work life powered by passion — through AI-powered insights.",
      highlights: [
        "Free Career Exploration Assessments",
        "AI Insights & Resume Re-Write Tips",
        "Curated Career Podcasts",
        "O*NET Interest Profiler & Work Values",
        "Matched Occupation Recommendations",
      ],
    },
  },
  {
    id: "government-affairs",
    name: "Government Affairs",
    description: "The Intelligence Engine for Government Affairs. A complete political intelligence platform for lobbying firms — map access, research staffers, track legislation, and execute strategy.",
    image: platformGovAffairs,
    category: "industry",
    videoUrl: `${SUPABASE_URL}/storage/v1/object/public/demo-videos/GovernmentAffairs.mp4`,
    url: "https://governmentaffairs.co",
  },
  {
    id: "pcsing",
    name: "PCSing.us",
    description: "Plan your PCS with AI. Your AI-powered military relocation assistant — housing, schools, BAH calculators, entitlements, and base-by-base guides all in one place.",
    image: platformPcsing,
    category: "career",
    url: "https://pcsing.us",
  },
  {
    id: "vpa-2026",
    name: "Veteran Podcast Awards 2026",
    description: "Celebrating the impactful voices of veteran podcasters. Live ceremony October 5th, 2026.",
    image: platformVpa,
    category: "events",
    url: "https://veteran-voice-awards.lovable.app/vpa-deck",
  },
];

// Hero images
import heroBg from "@/assets/homepage/hero-workspace.png";
import heroStudio from "@/assets/app-hero-studio.jpg";
import heroClips from "@/assets/app-hero-clips.jpg";
import heroMarketing from "@/assets/app-hero-marketing.jpg";
import heroEvents from "@/assets/app-hero-events.jpg";
import heroCrm from "@/assets/app-hero-crm.jpg";
import heroAnalytics from "@/assets/app-hero-analytics.jpg";
import heroAi from "@/assets/app-hero-ai.jpg";
import heroIdentity from "@/assets/app-hero-identity.jpg";
import heroNilProtection from "@/assets/app-hero-nil-protection.jpg";
import heroVideo from "@/assets/app-hero-video.jpg";
import heroEmail from "@/assets/app-hero-email.jpg";
import heroPodcasts from "@/assets/app-hero-podcasts.jpg";
import heroAutomations from "@/assets/app-hero-automations.jpg";
import heroMeetings from "@/assets/app-hero-meetings.jpg";
import heroForms from "@/assets/app-hero-forms.jpg";
import heroBlog from "@/assets/app-hero-blog.jpg";
import heroProposals from "@/assets/app-hero-proposals.jpg";
import heroTasks from "@/assets/app-hero-tasks.jpg";
import heroNewsletter from "@/assets/app-hero-newsletter.jpg";
import heroSms from "@/assets/app-hero-sms.jpg";
import heroAwards from "@/assets/app-hero-awards.jpg";
import heroContacts from "@/assets/app-hero-contacts.jpg";
import heroDeals from "@/assets/app-hero-deals.jpg";
import heroPolls from "@/assets/app-hero-polls.jpg";
import heroCloning from "@/assets/app-hero-cloning.jpg";
import heroSocial from "@/assets/app-hero-social.jpg";
import heroMypage from "@/assets/app-hero-mypage.jpg";
import heroBroadcast from "@/assets/app-hero-broadcast.jpg";
import heroSpark from "@/assets/app-hero-spark.jpg";
import heroSignatures from "@/assets/app-hero-signatures.jpg";
import heroSegments from "@/assets/app-hero-segments.jpg";
import heroProjects from "@/assets/app-hero-projects.jpg";
import heroPostprod from "@/assets/app-hero-postprod.jpg";
import heroMedia from "@/assets/app-hero-media.jpg";
import heroAgent from "@/assets/app-hero-agent.jpg";
import heroAudience from "@/assets/app-hero-audience.jpg";

const MODULE_HERO_MAP: Record<string, string> = {
  "studio": heroStudio,
  "ai-clips": heroClips,
  "ai-post-production": heroPostprod,
  "media-library": heroMedia,
  "video-editor": heroVideo,
  "cloning": heroCloning,
  "podcasts": heroPodcasts,
  "campaigns": heroMarketing,
  "email": heroEmail,
  "newsletter": heroNewsletter,
  "sms": heroSms,
  "automations": heroAutomations,
  "events": heroEvents,
  "meetings": heroMeetings,
  "forms": heroForms,
  "polls": heroPolls,
  "awards": heroAwards,
  "crm": heroCrm,
  "contacts": heroContacts,
  "project-management": heroProjects,
  "tasks": heroTasks,
  "proposals": heroProposals,
  "deals": heroDeals,
  "my-page": heroMypage,
  "identity-verification": heroNilProtection,
  "broadcast-monitoring": heroBroadcast,
  "blog": heroBlog,
  "spark-ai": heroSpark,
  "ai-automation": heroAutomations,
  "ai-agent": heroAgent,
  "social-analytics": heroSocial,
  "audience-insights": heroAudience,
  "social-connect": heroSocial,
  "segments": heroSegments,
  "email-signatures": heroSignatures,
};

const COLLECTION_HERO_MAP: Record<string, string> = {
  "creator-studio": heroStudio,
  "podcasting": heroPodcasts,
  "marketing-hub": heroMarketing,
  "events-meetings": heroEvents,
  "crm-business": heroCrm,
  "identity-profile": heroNilProtection,
  "ai-tools": heroAi,
};

// Extended app data for richer cards
const APP_DETAILS: Record<string, { features: string[]; bestFor: string[]; tagline: string; longDescription: string }> = {
  "studio": { tagline: "Record podcasts, videos, and livestreams with HD quality.", longDescription: "A full-featured recording studio for podcasters and content creators. Record solo or with remote guests, capture multi-track audio, and produce broadcast-quality content — all from your browser.", features: ["HD audio & video recording", "Remote guest recording via link", "Multi-track capture", "Live streaming support", "Auto-save & cloud backup"], bestFor: ["Podcasters", "Video creators", "Livestreamers"] },
  "ai-clips": { tagline: "Automatically generate viral clips from your long-form content.", longDescription: "Turn long recordings into short, shareable clips using AI-powered detection. Automatically identifies the most engaging moments, adds captions, and formats for every social platform.", features: ["AI moment detection", "Auto-captioning", "Multi-platform formatting (Reels, Shorts, TikTok)", "Batch clip generation", "Custom branding overlays"], bestFor: ["Content creators", "Social media managers", "Podcasters"] },
  "ai-post-production": { tagline: "Remove filler words, pauses, silence, and enhance audio quality automatically with AI.", longDescription: "Professional audio post-production powered by AI. Automatically clean up recordings by removing filler words, awkward pauses, and background noise. Enhance clarity and produce polished, broadcast-ready audio.", features: ["Filler word removal (um, uh, like)", "Silence trimming", "Background noise reduction", "Audio leveling & normalization", "One-click polish"], bestFor: ["Podcasters", "Interview creators", "Audio producers"] },
  "media-library": { tagline: "Store, organize, and manage all your audio, video, and images in one place.", longDescription: "A centralized media hub for all your content assets. Upload, tag, search, and organize files across projects. Integrates with the Studio, Clips Generator, and all publishing tools.", features: ["Drag-and-drop uploads", "Smart tagging & search", "Folder organization", "File preview & playback", "Storage usage tracking"], bestFor: ["Content creators", "Teams", "Media managers"] },
  "video-editor": { tagline: "Edit videos with timeline, transitions, captions, and export.", longDescription: "A browser-based video editor with a professional timeline interface. Add transitions, text overlays, and captions. Export in multiple formats optimized for social platforms.", features: ["Timeline editor", "Transitions & effects", "Caption overlay", "Multi-format export", "Trim, split & merge"], bestFor: ["Video creators", "Social media managers", "Marketing teams"] },
  "cloning": { tagline: "Clone and manage AI voice profiles for content creation.", longDescription: "Create realistic AI voice clones for narration, ads, and automation. Train custom voice models and generate speech that sounds natural and authentic.", features: ["Custom voice model training", "Text-to-speech generation", "Multiple voice profiles", "Voice consistency", "API integration"], bestFor: ["Content creators", "Advertisers", "Podcasters"] },
  "podcasts": { tagline: "Host your podcast with RSS feeds, analytics, and distribution.", longDescription: "Complete podcast hosting and distribution platform. Manage episodes, generate RSS feeds, and distribute automatically to all major platforms.", features: ["RSS feed generation", "Auto-distribution", "Episode management", "Download analytics", "Custom podcast pages"], bestFor: ["Podcasters", "Media companies", "Independent creators"] },
  "campaigns": { tagline: "Create, schedule, and design all your marketing campaigns.", longDescription: "Plan and execute multi-channel marketing campaigns from a single dashboard. Coordinate across email, SMS, social, and more.", features: ["Campaign planner", "Multi-channel coordination", "Content design tools", "Performance tracking", "A/B testing"], bestFor: ["Marketing teams", "Small businesses", "Growth marketers"] },
  "email": { tagline: "Full email inbox with templates, sequences, and multi-account management.", longDescription: "A powerful email management tool built for creators and businesses. Manage multiple accounts, use templates, and automate follow-up sequences.", features: ["Unified inbox view", "Email templates", "Automated sequences", "Multi-account support", "Contact integration"], bestFor: ["Business owners", "Sales teams", "Creators"] },
  "newsletter": { tagline: "Build and send beautiful newsletters with drag-and-drop editor.", longDescription: "Design stunning newsletters with a visual builder. Manage subscribers, schedule sends, and track opens and clicks.", features: ["Drag-and-drop builder", "Subscriber management", "Send scheduling", "Open & click analytics", "Revenue tracking"], bestFor: ["Writers", "Content creators", "Businesses"] },
  "sms": { tagline: "Text messaging campaigns with templates and 2-way messaging.", longDescription: "Reach your audience directly via SMS. Create campaigns with templates, schedule sends, and enable two-way conversations.", features: ["Campaign templates", "Scheduled sending", "2-way messaging", "Contact segmentation", "Delivery analytics"], bestFor: ["E-commerce", "Local businesses", "Event organizers"] },
  "automations": { tagline: "Build automated workflows and sequences to save time.", longDescription: "Create powerful automation workflows that connect your tools. Set triggers, conditions, and actions to automate repetitive tasks.", features: ["Visual workflow builder", "Event-based triggers", "Multi-step sequences", "Conditional logic", "Module integration"], bestFor: ["Power users", "Marketing teams", "Operations managers"] },
  "events": { tagline: "Create events, sell tickets, manage RSVPs, and check-ins.", longDescription: "A complete event management platform. Create events, handle ticketing, track RSVPs, and manage check-ins with QR codes.", features: ["Event creation", "Ticket sales", "RSVP management", "QR code check-ins", "Attendee analytics"], bestFor: ["Event organizers", "Community builders", "Businesses"] },
  "meetings": { tagline: "Book calls and appointments with calendar integration.", longDescription: "Simplify scheduling with shareable booking links and calendar sync. Automated reminders and video conferencing built in.", features: ["Shareable booking links", "Calendar sync", "Automated reminders", "Video conferencing", "Time zone detection"], bestFor: ["Consultants", "Sales teams", "Freelancers"] },
  "forms": { tagline: "Build forms with custom fields, logic, and file uploads.", longDescription: "Create custom forms for surveys, applications, and data collection. Support conditional logic, file uploads, and submission management.", features: ["Drag-and-drop builder", "Conditional logic", "File upload fields", "Submission management", "Export to CSV"], bestFor: ["HR teams", "Event organizers", "Researchers"] },
  "polls": { tagline: "Create polls and surveys to gather audience feedback.", longDescription: "Engage your audience with interactive polls and surveys. View real-time results and analyze responses.", features: ["Quick poll creation", "Multi-question surveys", "Real-time results", "Response analytics", "Embeddable widgets"], bestFor: ["Community managers", "Content creators", "Product teams"] },
  "awards": { tagline: "Run awards, nominations, and voting campaigns.", longDescription: "Create and manage awards programs with nominations, voting rounds, and winner announcements.", features: ["Nomination management", "Public/private voting", "Voting rounds", "Winner announcements", "Embeddable widgets"], bestFor: ["Community builders", "Organizations", "Media companies"] },
  "crm": { tagline: "Manage contacts, deals, and sales pipelines.", longDescription: "A lightweight CRM built for creators and small businesses. Track contacts, manage deals through pipelines, and log activities.", features: ["Contact management", "Deal pipeline", "Activity timeline", "Lead scoring", "Import/export contacts"], bestFor: ["Sales teams", "Freelancers", "Small businesses"] },
  "contacts": { tagline: "Manage contacts, leads, and subscribers with segments and tags.", longDescription: "Centralized contact management with custom fields, tags, and smart segments for targeted outreach.", features: ["Contact database", "Custom fields & tags", "Smart segments", "Import/export", "Duplicate detection"], bestFor: ["Marketing teams", "Sales teams", "Community managers"] },
  "project-management": { tagline: "Manage tasks, tickets, and deadlines with boards and timelines.", longDescription: "Organize projects with boards, lists, and timeline views. Track progress, assign tasks, and manage deadlines.", features: ["Board & list views", "Timeline view", "Task assignments", "Deadline tracking", "Project templates"], bestFor: ["Teams", "Freelancers", "Agencies"] },
  "tasks": { tagline: "Create and track tasks with due dates, priorities, and subtasks.", longDescription: "Simple yet powerful task management. Create tasks with priorities, due dates, and subtasks. Stay organized and productive.", features: ["Task creation", "Priority levels", "Due dates", "Subtasks", "List & board views"], bestFor: ["Individuals", "Teams", "Project managers"] },
  "proposals": { tagline: "Create professional proposals with e-signatures.", longDescription: "Generate branded proposals, get e-signatures, and convert to invoices. Track status and automate follow-ups.", features: ["Proposal templates", "E-signatures", "One-click invoice", "Payment tracking", "Automated reminders"], bestFor: ["Freelancers", "Agencies", "Consultants"] },
  "deals": { tagline: "Track deals through your sales pipeline with stages and values.", longDescription: "Visual deal pipeline with customizable stages. Track deal values, forecast revenue, and manage your sales process.", features: ["Visual pipeline", "Custom stages", "Deal values", "Revenue forecasting", "Activity logging"], bestFor: ["Sales teams", "Business owners", "Account managers"] },
  "my-page": { tagline: "Build your shareable profile page with drag-and-drop sections.", longDescription: "Create a beautiful, branded profile page that showcases your content, links, and CTA. Fully customizable with themes.", features: ["Drag-and-drop builder", "Custom themes", "Video header support", "CTA buttons", "Analytics tracking"], bestFor: ["Creators", "Influencers", "Personal brands"] },
  "identity-verification": { tagline: "Protect your Name, Image, and Likeness with blockchain-verified rights.", longDescription: "Comprehensive NIL protection for creators — verify your voice, face, and likeness on-chain to prevent unauthorized commercial use, deepfakes, and AI replicas.", features: ["Voice & face verification", "AI deepfake protection", "Commercial misappropriation prevention", "Digital replica defense", "On-chain rights certificates"], bestFor: ["Creators", "Public figures", "Voice artists", "Influencers"] },
  "broadcast-monitoring": { tagline: "Monitor platforms for unauthorized use of your voice and content.", longDescription: "AI-powered detection of unauthorized use of your voice and content across platforms. Get alerts and take action.", features: ["AI-powered detection", "Multi-platform scanning", "Real-time alerts", "Violation reports", "Takedown assistance"], bestFor: ["Voice artists", "Podcasters", "Public figures"] },
  "blog": { tagline: "Write, schedule, and publish blog posts with AI assistance.", longDescription: "A full-featured blogging platform with AI-powered writing, SEO optimization, and content scheduling.", features: ["Rich text editor", "AI writing assistance", "SEO optimization", "Scheduled publishing", "Category management"], bestFor: ["Bloggers", "Content marketers", "SEO professionals"] },
  "spark-ai": { tagline: "Your AI copilot for content creation, planning, and management.", longDescription: "Spark is your intelligent AI assistant. Get content ideas, writing help, scheduling suggestions, and growth strategy.", features: ["Content ideation & writing", "Smart suggestions", "Workflow automation", "Context-aware assistance", "Multi-module integration"], bestFor: ["All users", "Content creators", "Busy professionals"] },
  "ai-automation": { tagline: "Create intelligent automations powered by AI that learn and adapt.", longDescription: "Build AI-powered automations that get smarter over time. Automate content workflows, scheduling, and audience engagement.", features: ["AI-powered triggers", "Learning automations", "Content workflows", "Smart scheduling", "Audience engagement"], bestFor: ["Power users", "Marketing teams", "Agencies"] },
  "ai-agent": { tagline: "Your intelligent AI co-pilot for navigation and growth strategy.", longDescription: "An AI agent that helps you navigate the platform, find features, and get personalized growth recommendations.", features: ["Platform navigation", "Feature discovery", "Growth recommendations", "Task assistance", "Contextual help"], bestFor: ["New users", "Power users", "All creators"] },
  "social-analytics": { tagline: "Track social media performance across all connected platforms.", longDescription: "Unified social media analytics with deep insights across Instagram, YouTube, TikTok, and more.", features: ["Cross-platform metrics", "Engagement tracking", "Growth trends", "Content performance", "Audience demographics"], bestFor: ["Social media managers", "Content creators", "Brands"] },
  "audience-insights": { tagline: "Deep analytics on followers, engagement, and demographics.", longDescription: "Understand your audience with detailed demographic breakdowns, engagement patterns, and growth trends.", features: ["Demographic data", "Engagement patterns", "Growth trends", "Follower analysis", "Content preferences"], bestFor: ["Content strategists", "Marketing teams", "Creators"] },
  "social-connect": { tagline: "Connect and manage all your social media accounts.", longDescription: "Link Instagram, YouTube, TikTok, Facebook and sync your data automatically for unified publishing and analytics.", features: ["Multi-platform connection", "Cross-post publishing", "Unified analytics", "Content calendar", "Engagement tracking"], bestFor: ["Social media managers", "Content creators", "Brands"] },
  "segments": { tagline: "Create targeted audience segments based on behavior and engagement.", longDescription: "Build smart audience segments using behavioral data, attributes, and engagement metrics for targeted campaigns.", features: ["Behavioral targeting", "Custom attributes", "Engagement-based segments", "Auto-updating lists", "Campaign integration"], bestFor: ["Marketing teams", "Email marketers", "Growth hackers"] },
  "email-signatures": { tagline: "Email settings, signatures, and tracking configuration.", longDescription: "Configure email signatures, tracking settings, and manage your email sending configuration.", features: ["Signature builder", "Tracking settings", "Send configuration", "Multi-account setup", "Brand consistency"], bestFor: ["Business owners", "Sales teams", "Professionals"] },
};

function getCategoryName(categoryId: string): string {
  const cat = MODULE_CATEGORIES.find(c => c.id === categoryId);
  return cat?.name || categoryId;
}

function RequestInfoButton({ 
  itemName, 
  requested, 
  onRequest 
}: { 
  itemName: string; 
  requested: boolean; 
  onRequest: (name: string) => void;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!requested) onRequest(itemName);
            }}
            className={`absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              requested
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:from-amber-300 hover:to-orange-400 hover:shadow-lg"
            }`}
          >
            {requested ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {requested ? "Info requested ✓" : "Request more info"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function BundleCard({ collection, requested, onRequest }: { collection: SeeksyCollection; requested: boolean; onRequest: (name: string) => void }) {
  const navigate = useNavigate();
  const Icon = collection.icon;
  const heroImage = COLLECTION_HERO_MAP[collection.id] || heroStudio;
  const includedModules = SEEKSY_MODULES.filter(m => collection.includedApps.includes(m.id));

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow border border-border/60">
      <div className="relative h-52 overflow-hidden">
        <RequestInfoButton itemName={collection.name} requested={requested} onRequest={onRequest} />
        <img src={heroImage} alt={collection.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {collection.isPopular && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-amber-100 text-amber-700 text-[10px] border-0">✨ Popular</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: collection.color + "20" }}>
            <Icon className="h-5 w-5" style={{ color: collection.color }} />
          </div>
          <h3 className="font-bold text-foreground text-lg">{collection.name}</h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{collection.description}</p>

        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Includes {includedModules.length} modules:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {includedModules.map((mod) => (
              <div key={mod.id} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{mod.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          {collection.usersCount && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {collection.usersCount.toLocaleString()} users
            </div>
          )}
          <Button size="sm" className="gap-1.5 text-xs rounded-full" onClick={() => navigate(`/app-directory/bundle/${collection.id}`)}>
            <Eye className="h-3.5 w-3.5" />
            View Apps
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
function AppCard({ module, requested, onRequest }: { module: SeeksyModule; requested: boolean; onRequest: (name: string) => void }) {
  const Icon = module.icon;
  const heroImage = MODULE_HERO_MAP[module.id] || heroStudio;
  const details = APP_DETAILS[module.id];

  const tagline = details?.tagline || module.description;
  const longDescription = details?.longDescription || "";
  const features = details?.features || [];
  const bestFor = details?.bestFor || [];

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow border border-border/60">
      <div className="relative h-52 overflow-hidden">
        <RequestInfoButton itemName={module.name} requested={requested} onRequest={onRequest} />
        <img src={heroImage} alt={module.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 flex gap-1">
          {module.isNew && <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">New</Badge>}
          {module.isAIPowered && <Badge className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5">AI</Badge>}
        </div>
      </div>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${module.iconBg || "bg-primary/10"}`}>
            <Icon className={`h-5 w-5 ${module.iconColor || "text-primary"}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground">{module.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{getCategoryName(module.category)}</p>
          </div>
        </div>

        <p className="text-sm font-medium text-foreground leading-snug">{tagline}</p>

        {longDescription && (
          <p className="text-sm text-muted-foreground leading-relaxed">{longDescription}</p>
        )}

        {features.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground mb-1.5">Features:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {bestFor.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {bestFor.map((b, i) => (
              <Badge key={i} variant="outline" className="text-[11px] py-0.5 font-normal">{b}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
function RotatingPlatformImage({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={index}
        src={images[index]}
        alt={alt}
        className="w-full h-full object-cover object-top absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </AnimatePresence>
  );
}

export default function SeeksyAppDirectory() {
  const [tab, setTab] = useState<"bundles" | "apps" | "platforms">("apps");
  const { email, sessionId, startSession } = useProspectusGate();
  const [requestedItems, setRequestedItems] = useState<Set<string>>(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [lastRequestedName, setLastRequestedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortByCategory, setSortByCategory] = useState(false);
  const [videoPlatform, setVideoPlatform] = useState<PlatformItem | null>(null);
  const [infoPlatform, setInfoPlatform] = useState<PlatformItem | null>(null);
  const [selectedPlatformCategory, setSelectedPlatformCategory] = useState<string>("all");

  // Track session duration
  useUpdateSessionDuration(sessionId);

  // Track current tab as page view
  useProspectusPageView(sessionId, tab === "bundles" ? "Bundles" : "All Apps");

  // Track individual card views
  const trackCardView = (name: string) => {
    if (!sessionId) return;
    (supabase.from("prospectus_page_views") as any)
      .insert({ session_id: sessionId, page_name: name, viewed_at: new Date().toISOString() })
      .then(({ error }: any) => { if (error) console.error("Track view error:", error); });
  };

  const handleRequestInfo = useCallback((itemName: string) => {
    setRequestedItems(prev => new Set(prev).add(itemName));
    setLastRequestedName(itemName);
    setShowConfirmDialog(true);

    // Log the request
    if (sessionId) {
      (supabase.from("prospectus_page_views") as any)
        .insert({ 
          session_id: sessionId, 
          page_name: `INFO_REQUEST: ${itemName}`, 
          viewed_at: new Date().toISOString() 
        })
        .then(({ error }: any) => { if (error) console.error("Info request log error:", error); });
    }
  }, [sessionId]);

  const filteredModules = useMemo(() => {
    let modules = [...SEEKSY_MODULES];
    if (selectedCategory !== "all") {
      modules = modules.filter(m => m.category === selectedCategory);
    }
    if (sortByCategory) {
      modules.sort((a, b) => a.category.localeCompare(b.category));
    }
    return modules;
  }, [selectedCategory, sortByCategory]);

  const filteredPlatforms = useMemo(() => {
    if (selectedPlatformCategory === "all") return PLATFORMS;
    return PLATFORMS.filter(p => p.category === selectedPlatformCategory);
  }, [selectedPlatformCategory]);

  // Email gate removed — directory is now open access

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner - Image Only */}
      <div className="relative overflow-hidden h-64 sm:h-72">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-4">
          {/* Top bar: logo */}
          <div className="absolute top-4 left-4 sm:left-6 lg:left-8">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Seeksy</span>
          </div>

          {/* Tabs at bottom of banner */}
          <div className="flex gap-1.5">
            {(["apps", "bundles", "platforms"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-white text-slate-900 shadow-lg shadow-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {t === "apps" ? "Apps" : t === "bundles" ? "Bundles" : "Platforms"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {tab === "platforms" ? (
          <>
            {/* Platform Category Filters */}
            <div className="flex flex-nowrap justify-center gap-1.5 overflow-x-auto max-w-full mb-8">
              {PLATFORM_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedPlatformCategory(cat.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                    selectedPlatformCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlatforms.map((platform) => {
              const isVideo = !!platform.videoUrl;
              const isInfo = !!platform.infoPopup;
              const isLink = !!platform.url;
              const Wrapper = (isVideo || isInfo) ? 'button' : 'a';
              const wrapperProps = isVideo
                ? { onClick: () => { setVideoPlatform(platform); trackCardView(platform.name); } }
                : isInfo
                ? { onClick: () => { setInfoPlatform(platform); trackCardView(platform.name); } }
                : { href: platform.url, target: "_blank", rel: "noopener noreferrer" };

              return (
                <Wrapper
                  key={platform.id}
                  {...(wrapperProps as any)}
                  className="group block text-left"
                  onMouseEnter={() => trackCardView(platform.name)}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border/60 h-full">
                    <div className="relative h-52 overflow-hidden">
                      {platform.images && platform.images.length > 1 ? (
                        <RotatingPlatformImage images={platform.images} alt={platform.name} />
                      ) : (
                        <img src={platform.image} alt={platform.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                      )}
                      {isVideo && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
                          </div>
                        </div>
                      )}
                      {isInfo && (
                        <div className="absolute bottom-3 right-3 z-10">
                          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-muted-foreground">
                            <PlusCircle className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">{platform.name}</h3>
                        {isVideo ? (
                          <Play className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : isInfo ? (
                          <PlusCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{platform.description}</p>
                    </CardContent>
                  </Card>
                </Wrapper>
              );
            })}
          </div>
          </>
        ) : tab === "bundles" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEEKSY_COLLECTIONS.map((collection) => (
              <div key={collection.id} onMouseEnter={() => trackCardView(collection.name)}>
                <BundleCard 
                  collection={collection} 
                  requested={requestedItems.has(collection.name)}
                  onRequest={handleRequestInfo}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Sort + Category Filters */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <button
                onClick={() => setSortByCategory(!sortByCategory)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                  sortByCategory
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                Sort: By Category
              </button>

              <div className="flex flex-nowrap justify-center gap-1.5 overflow-x-auto max-w-full">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                  }`}
                >
                  All Apps
                </button>
                {MODULE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                      }`}
                    >
                      {cat.name}
                    </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredModules.map((module) => (
                <div key={module.id} onMouseEnter={() => trackCardView(module.name)}>
                  <AppCard 
                    module={module}
                    requested={requestedItems.has(module.name)}
                    onRequest={handleRequestInfo}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <AppDirectoryFooter />

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2"
            >
              <Check className="h-7 w-7 text-green-600" />
            </motion.div>
            <DialogTitle className="text-xl font-bold text-foreground">Info Requested!</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed pt-1">
              Thanks for your interest in <span className="font-semibold text-foreground">{lastRequestedName}</span>. 
              Someone from our team will reach out shortly with more information.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowConfirmDialog(false)} className="mt-2 rounded-full">
            Continue Browsing
          </Button>
        </DialogContent>
      </Dialog>

      {/* Video Demo Dialog */}
      <Dialog open={!!videoPlatform} onOpenChange={(open) => !open && setVideoPlatform(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-border">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-foreground">{videoPlatform?.name} — Demo</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {videoPlatform?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="w-full aspect-video">
            {videoPlatform?.videoUrl && (
              <video
                key={videoPlatform.id}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
                src={videoPlatform.videoUrl}
              />
            )}
          </div>
          {videoPlatform?.url && (
            <div className="p-4 pt-0 flex justify-end">
              <a href={videoPlatform.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit Site
                </Button>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Platform Info Popup */}
      <Dialog open={!!infoPlatform} onOpenChange={(open) => !open && setInfoPlatform(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{infoPlatform?.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed pt-1">
              {infoPlatform?.infoPopup?.tagline}
            </DialogDescription>
          </DialogHeader>
          {infoPlatform?.infoPopup?.highlights && (
            <div className="space-y-2 py-2">
              {infoPlatform.infoPopup.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{h}</span>
                </div>
              ))}
            </div>
          )}
          <Button
            className="w-full mt-2 gap-2 rounded-full"
            onClick={() => {
              if (infoPlatform) handleRequestInfo(infoPlatform.name);
              setInfoPlatform(null);
            }}
          >
            <PlusCircle className="h-4 w-4" />
            Inquire for Demo
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
