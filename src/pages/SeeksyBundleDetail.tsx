import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SEEKSY_COLLECTIONS } from "@/components/modules/collectionData";
import { SEEKSY_MODULES } from "@/components/modules/moduleData";
import { FooterSection } from "@/components/homepage/FooterSection";

// Hero images
import heroStudio from "@/assets/app-hero-studio.jpg";
import heroClips from "@/assets/app-hero-clips.jpg";
import heroMarketing from "@/assets/app-hero-marketing.jpg";
import heroEvents from "@/assets/app-hero-events.jpg";
import heroCrm from "@/assets/app-hero-crm.jpg";
import heroAi from "@/assets/app-hero-ai.jpg";
import heroIdentity from "@/assets/app-hero-identity.jpg";
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
  "identity-verification": heroIdentity,
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

const APP_DETAILS: Record<string, { features: string[]; bestFor: string[]; tagline: string; longDescription: string }> = {
  "studio": { tagline: "Record podcasts, videos, and livestreams with HD quality.", longDescription: "A full-featured recording studio for podcasters and content creators.", features: ["HD audio & video recording", "Remote guest recording via link", "Multi-track capture", "Live streaming support", "Auto-save & cloud backup"], bestFor: ["Podcasters", "Video creators", "Livestreamers"] },
  "ai-clips": { tagline: "Automatically generate viral clips from your long-form content.", longDescription: "Turn long recordings into short, shareable clips using AI-powered detection.", features: ["AI moment detection", "Auto-captioning", "Multi-platform formatting", "Batch clip generation", "Custom branding overlays"], bestFor: ["Content creators", "Social media managers", "Podcasters"] },
  "ai-post-production": { tagline: "Remove filler words, pauses, and enhance audio quality with AI.", longDescription: "Professional audio post-production powered by AI.", features: ["Filler word removal", "Silence trimming", "Background noise reduction", "Audio leveling", "One-click polish"], bestFor: ["Podcasters", "Interview creators", "Audio producers"] },
  "media-library": { tagline: "Store, organize, and manage all your media in one place.", longDescription: "A centralized media hub for all your content assets.", features: ["Drag-and-drop uploads", "Smart tagging & search", "Folder organization", "File preview & playback", "Storage tracking"], bestFor: ["Content creators", "Teams", "Media managers"] },
  "video-editor": { tagline: "Edit videos with timeline, transitions, captions, and export.", longDescription: "A browser-based video editor with a professional timeline interface.", features: ["Timeline editor", "Transitions & effects", "Caption overlay", "Multi-format export", "Trim, split & merge"], bestFor: ["Video creators", "Social media managers", "Marketing teams"] },
  "cloning": { tagline: "Clone and manage AI voice profiles for content creation.", longDescription: "Create realistic AI voice clones for narration, ads, and automation.", features: ["Custom voice model training", "Text-to-speech generation", "Multiple voice profiles", "Voice consistency", "API integration"], bestFor: ["Content creators", "Advertisers", "Podcasters"] },
  "podcasts": { tagline: "Host your podcast with RSS feeds, analytics, and distribution.", longDescription: "Complete podcast hosting and distribution platform.", features: ["RSS feed generation", "Auto-distribution", "Episode management", "Download analytics", "Custom podcast pages"], bestFor: ["Podcasters", "Media companies", "Independent creators"] },
  "campaigns": { tagline: "Create, schedule, and design all your marketing campaigns.", longDescription: "Plan and execute multi-channel marketing campaigns.", features: ["Campaign planner", "Multi-channel coordination", "Content design tools", "Performance tracking", "A/B testing"], bestFor: ["Marketing teams", "Small businesses", "Growth marketers"] },
  "email": { tagline: "Full email inbox with templates, sequences, and multi-account management.", longDescription: "A powerful email management tool built for creators and businesses.", features: ["Unified inbox view", "Email templates", "Automated sequences", "Multi-account support", "Contact integration"], bestFor: ["Business owners", "Sales teams", "Creators"] },
  "newsletter": { tagline: "Build and send beautiful newsletters with drag-and-drop editor.", longDescription: "Design stunning newsletters with a visual builder.", features: ["Drag-and-drop builder", "Subscriber management", "Send scheduling", "Open & click analytics", "Revenue tracking"], bestFor: ["Writers", "Content creators", "Businesses"] },
  "sms": { tagline: "Text messaging campaigns with templates and 2-way messaging.", longDescription: "Reach your audience directly via SMS.", features: ["Campaign templates", "Scheduled sending", "2-way messaging", "Contact segmentation", "Delivery analytics"], bestFor: ["E-commerce", "Local businesses", "Event organizers"] },
  "automations": { tagline: "Build automated workflows and sequences to save time.", longDescription: "Create powerful automation workflows that connect your tools.", features: ["Visual workflow builder", "Event-based triggers", "Multi-step sequences", "Conditional logic", "Module integration"], bestFor: ["Power users", "Marketing teams", "Operations managers"] },
  "events": { tagline: "Create events, sell tickets, manage RSVPs, and check-ins.", longDescription: "A complete event management platform.", features: ["Event creation", "Ticket sales", "RSVP management", "QR code check-ins", "Attendee analytics"], bestFor: ["Event organizers", "Community builders", "Businesses"] },
  "meetings": { tagline: "Book calls and appointments with calendar integration.", longDescription: "Simplify scheduling with shareable booking links and calendar sync.", features: ["Shareable booking links", "Calendar sync", "Automated reminders", "Video conferencing", "Time zone detection"], bestFor: ["Consultants", "Sales teams", "Freelancers"] },
  "forms": { tagline: "Build forms with custom fields, logic, and file uploads.", longDescription: "Create custom forms for surveys, applications, and data collection.", features: ["Drag-and-drop builder", "Conditional logic", "File upload fields", "Submission management", "Export to CSV"], bestFor: ["HR teams", "Event organizers", "Researchers"] },
  "polls": { tagline: "Create polls and surveys to gather audience feedback.", longDescription: "Engage your audience with interactive polls and surveys.", features: ["Quick poll creation", "Multi-question surveys", "Real-time results", "Response analytics", "Embeddable widgets"], bestFor: ["Community managers", "Content creators", "Product teams"] },
  "awards": { tagline: "Run awards, nominations, and voting campaigns.", longDescription: "Create and manage awards programs with nominations and voting rounds.", features: ["Nomination management", "Public/private voting", "Voting rounds", "Winner announcements", "Embeddable widgets"], bestFor: ["Community builders", "Organizations", "Media companies"] },
  "crm": { tagline: "Manage contacts, deals, and sales pipelines.", longDescription: "A lightweight CRM built for creators and small businesses.", features: ["Contact management", "Deal pipeline", "Activity timeline", "Lead scoring", "Import/export contacts"], bestFor: ["Sales teams", "Freelancers", "Small businesses"] },
  "contacts": { tagline: "Manage contacts, leads, and subscribers with segments and tags.", longDescription: "Centralized contact management with custom fields, tags, and smart segments.", features: ["Contact database", "Custom fields & tags", "Smart segments", "Import/export", "Duplicate detection"], bestFor: ["Marketing teams", "Sales teams", "Community managers"] },
  "project-management": { tagline: "Manage tasks, tickets, and deadlines with boards and timelines.", longDescription: "Organize projects with boards, lists, and timeline views.", features: ["Board & list views", "Timeline view", "Task assignments", "Deadline tracking", "Project templates"], bestFor: ["Teams", "Freelancers", "Agencies"] },
  "tasks": { tagline: "Create and track tasks with due dates, priorities, and subtasks.", longDescription: "Simple yet powerful task management.", features: ["Task creation", "Priority levels", "Due dates", "Subtasks", "List & board views"], bestFor: ["Individuals", "Teams", "Project managers"] },
  "proposals": { tagline: "Create professional proposals with e-signatures.", longDescription: "Generate branded proposals, get e-signatures, and convert to invoices.", features: ["Proposal templates", "E-signatures", "One-click invoice", "Payment tracking", "Automated reminders"], bestFor: ["Freelancers", "Agencies", "Consultants"] },
  "deals": { tagline: "Track deals through your sales pipeline with stages and values.", longDescription: "Visual deal pipeline with customizable stages.", features: ["Visual pipeline", "Custom stages", "Deal values", "Revenue forecasting", "Activity logging"], bestFor: ["Sales teams", "Business owners", "Account managers"] },
  "my-page": { tagline: "Build your personal landing page with drag-and-drop sections.", longDescription: "Create a beautiful, branded landing page that showcases your content.", features: ["Drag-and-drop builder", "Custom themes", "Video header support", "CTA buttons", "Analytics tracking"], bestFor: ["Creators", "Influencers", "Personal brands"] },
  "identity-verification": { tagline: "Protect your Name, Image, and Likeness with blockchain-verified rights.", longDescription: "Comprehensive NIL protection for creators — verify your voice, face, and likeness on-chain to prevent unauthorized commercial use, deepfakes, and AI replicas.", features: ["Voice & face verification", "AI deepfake protection", "Commercial misappropriation prevention", "Digital replica defense", "On-chain rights certificates"], bestFor: ["Creators", "Public figures", "Voice artists", "Influencers"] },
  "broadcast-monitoring": { tagline: "Monitor platforms for unauthorized use of your voice and content.", longDescription: "AI-powered detection of unauthorized use of your voice and content across platforms.", features: ["AI-powered detection", "Multi-platform scanning", "Real-time alerts", "Violation reports", "Takedown assistance"], bestFor: ["Voice artists", "Podcasters", "Public figures"] },
  "blog": { tagline: "Write, schedule, and publish blog posts with AI assistance.", longDescription: "A full-featured blogging platform with AI-powered writing.", features: ["Rich text editor", "AI writing assistance", "SEO optimization", "Scheduled publishing", "Category management"], bestFor: ["Bloggers", "Content marketers", "SEO professionals"] },
  "spark-ai": { tagline: "Your AI copilot for content creation, planning, and management.", longDescription: "Spark is your intelligent AI assistant for content and strategy.", features: ["Content ideation & writing", "Smart suggestions", "Workflow automation", "Context-aware assistance", "Multi-module integration"], bestFor: ["All users", "Content creators", "Busy professionals"] },
  "ai-automation": { tagline: "Create intelligent automations powered by AI that learn and adapt.", longDescription: "Build AI-powered automations that get smarter over time.", features: ["AI-powered triggers", "Learning automations", "Content workflows", "Smart scheduling", "Audience engagement"], bestFor: ["Power users", "Marketing teams", "Agencies"] },
  "ai-agent": { tagline: "Your intelligent AI co-pilot for navigation and growth strategy.", longDescription: "An AI agent that helps you navigate the platform and grow.", features: ["Platform navigation", "Feature discovery", "Growth recommendations", "Task assistance", "Contextual help"], bestFor: ["New users", "Power users", "All creators"] },
  "social-analytics": { tagline: "Track social media performance across all connected platforms.", longDescription: "Unified social media analytics with deep insights.", features: ["Cross-platform metrics", "Engagement tracking", "Growth trends", "Content performance", "Audience demographics"], bestFor: ["Social media managers", "Content creators", "Brands"] },
  "audience-insights": { tagline: "Deep analytics on followers, engagement, and demographics.", longDescription: "Understand your audience with detailed breakdowns.", features: ["Demographic data", "Engagement patterns", "Growth trends", "Follower analysis", "Content preferences"], bestFor: ["Content strategists", "Marketing teams", "Creators"] },
  "social-connect": { tagline: "Connect and manage all your social media accounts.", longDescription: "Link all your social platforms for unified publishing and analytics.", features: ["Multi-platform connection", "Cross-post publishing", "Unified analytics", "Content calendar", "Engagement tracking"], bestFor: ["Social media managers", "Content creators", "Brands"] },
  "segments": { tagline: "Create targeted audience segments based on behavior and engagement.", longDescription: "Build smart audience segments for targeted campaigns.", features: ["Behavioral targeting", "Custom attributes", "Engagement-based segments", "Auto-updating lists", "Campaign integration"], bestFor: ["Marketing teams", "Email marketers", "Growth hackers"] },
  "email-signatures": { tagline: "Email settings, signatures, and tracking configuration.", longDescription: "Configure email signatures and tracking settings.", features: ["Signature builder", "Tracking settings", "Send configuration", "Multi-account setup", "Brand consistency"], bestFor: ["Business owners", "Sales teams", "Professionals"] },
};

export default function SeeksyBundleDetail() {
  const { bundleId } = useParams();
  const navigate = useNavigate();

  const collection = SEEKSY_COLLECTIONS.find(c => c.id === bundleId);
  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bundle not found</h1>
          <Button onClick={() => navigate("/app-directory")}>Back to Directory</Button>
        </div>
      </div>
    );
  }

  const Icon = collection.icon;
  const includedModules = SEEKSY_MODULES.filter(m => collection.includedApps.includes(m.id));

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Button variant="ghost" className="gap-2 mb-6" onClick={() => navigate("/app-directory")}>
          <ArrowLeft className="h-4 w-4" />
          Back to App Directory
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: collection.color + "20" }}>
            <Icon className="h-7 w-7" style={{ color: collection.color }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{collection.name}</h1>
            <p className="text-muted-foreground mt-1">{collection.description}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8 ml-[4.5rem]">{includedModules.length} apps included in this bundle</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {includedModules.map((module) => {
            const ModIcon = module.icon;
            const heroImage = MODULE_HERO_MAP[module.id] || heroStudio;
            const details = APP_DETAILS[module.id];
            const tagline = details?.tagline || module.description;
            const longDescription = details?.longDescription || "";
            const features = details?.features || [];
            const bestFor = details?.bestFor || [];

            return (
              <Card key={module.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow border border-border/60">
                <div className="relative h-52 overflow-hidden">
                  <img src={heroImage} alt={module.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {module.isNew && <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">New</Badge>}
                    {module.isAIPowered && <Badge className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5">AI</Badge>}
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${module.iconBg || "bg-primary/10"}`}>
                      <ModIcon className={`h-5 w-5 ${module.iconColor || "text-primary"}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{module.name}</h3>
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
          })}
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
