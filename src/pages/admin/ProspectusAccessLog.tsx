import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, BarChart3, Clock, Eye, CheckCircle, 
  ChevronDown, ChevronRight, ListFilter, UserCircle,
  ArrowLeft, TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Session {
  id: string;
  email: string;
  session_start: string;
  session_end: string | null;
  duration_seconds: number;
  is_internal: boolean;
  user_agent: string | null;
}

interface PageView {
  id: string;
  session_id: string;
  page_name: string;
  viewed_at: string;
  time_spent_seconds: number;
}

interface PersonAggregate {
  email: string;
  sessions: number;
  totalSeconds: number;
  pagesViewed: string[];
  lastVisit: string;
  furthestPage: string;
  isInternal: boolean;
  sessionDetails: { id: string; start: string; duration: number; pages: string[] }[];
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `< 1 min`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ProspectusAccessLog() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"sessions" | "person">("person");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [sessionsRes, viewsRes] = await Promise.all([
      (supabase.from("prospectus_sessions") as any).select("*").order("session_start", { ascending: false }),
      (supabase.from("prospectus_page_views") as any).select("*").order("viewed_at", { ascending: true }),
    ]);
    setSessions(sessionsRes.data || []);
    setPageViews(viewsRes.data || []);
    setLoading(false);
  };

  // Aggregate by person
  const personData: PersonAggregate[] = (() => {
    const map = new Map<string, PersonAggregate>();
    for (const s of sessions) {
      const existing = map.get(s.email) || {
        email: s.email,
        sessions: 0,
        totalSeconds: 0,
        pagesViewed: [],
        lastVisit: s.session_start,
        furthestPage: "",
        isInternal: s.is_internal,
        sessionDetails: [],
      };
      existing.sessions += 1;
      existing.totalSeconds += s.duration_seconds || 0;
      if (s.session_start > existing.lastVisit) existing.lastVisit = s.session_start;

      const sessionPages = pageViews
        .filter(pv => pv.session_id === s.id)
        .map(pv => pv.page_name);
      existing.pagesViewed = [...new Set([...existing.pagesViewed, ...sessionPages])];
      existing.sessionDetails.push({
        id: s.id,
        start: s.session_start,
        duration: s.duration_seconds || 0,
        pages: sessionPages,
      });

      if (sessionPages.length > 0) {
        existing.furthestPage = sessionPages[sessionPages.length - 1];
      }
      map.set(s.email, existing);
    }
    return Array.from(map.values()).sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());
  })();

  // Stats
  const uniqueEmails = new Set(sessions.map(s => s.email)).size;
  const totalSessions = sessions.length;
  const avgDuration = totalSessions > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / totalSessions)
    : 0;
  const allPages = pageViews.map(pv => pv.page_name);
  const pageCounts = allPages.reduce((acc, p) => { acc[p] = (acc[p] || 0) + 1; return acc; }, {} as Record<string, number>);
  const sortedPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);
  const mostViewed = sortedPages[0] || ["—", 0];
  const leastViewed = sortedPages[sortedPages.length - 1] || ["—", 0];
  const uniqueAppsViewed = new Set(allPages).size;

  const stats = [
    { label: "Unique Visitors", value: uniqueEmails, icon: Users, color: "text-primary" },
    { label: "Total Sessions", value: totalSessions, icon: BarChart3, color: "text-blue-600" },
    { label: "Avg Time / Session", value: formatDuration(avgDuration), icon: Clock, color: "text-amber-600" },
    { label: "Most Viewed App", value: String(mostViewed[1]), sub: String(mostViewed[0]), icon: TrendingUp, color: "text-emerald-600" },
    { label: "Least Viewed App", value: String(leastViewed[1]), sub: String(leastViewed[0]), icon: Eye, color: "text-rose-500" },
    { label: "Apps Explored", value: uniqueAppsViewed, icon: CheckCircle, color: "text-teal-600" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
          <div className="h-96 bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">App Directory Access Log</h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1 ml-[52px]">{totalSessions} sessions recorded</p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-muted rounded-full p-1">
            <button
              onClick={() => setView("sessions")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                view === "sessions" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <ListFilter className="h-4 w-4" />
              Sessions
            </button>
            <button
              onClick={() => setView("person")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                view === "person" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <UserCircle className="h-4 w-4" />
              By Person
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border border-border/60">
              <CardContent className="p-4 text-center">
                <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                {stat.sub && <p className="text-xs text-muted-foreground mt-0.5 truncate">{stat.sub}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card className="border border-border/60 overflow-hidden">
          <div className="overflow-x-auto">
            {view === "person" ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-8"></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Email ↓</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Sessions ↓</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Total Time ↓</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Apps Viewed ↓</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Visit ↓</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last App Viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {personData.map((person) => (
                    <>
                      <tr
                        key={person.email}
                        className="border-b hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === person.email ? null : person.email)}
                      >
                        <td className="px-4 py-4">
                          {expandedRow === person.email
                            ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{person.email}</span>
                            {person.isInternal && (
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-muted-foreground">Internal</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">{person.sessions}</td>
                        <td className="px-4 py-4 text-sm text-foreground">{formatDuration(person.totalSeconds)}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-sm text-foreground">{person.pagesViewed.length}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">
                          {format(new Date(person.lastVisit), "MMM d, yyyy")}
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">{person.furthestPage || "—"}</td>
                      </tr>
                      {expandedRow === person.email && (
                        <tr key={`${person.email}-detail`}>
                          <td colSpan={7} className="px-8 py-4 bg-muted/10">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Session History</p>
                            <div className="space-y-3">
                              {person.sessionDetails.map((sd) => (
                                <div key={sd.id} className="flex items-start justify-between p-3 bg-background rounded-lg border border-border/40">
                                  <div>
                                    <p className="text-sm font-medium text-foreground">
                                      {format(new Date(sd.start), "MMM d, yyyy, h:mm a")}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {sd.pages.length > 0 ? sd.pages.map((page, pi) => (
                                        <Badge key={pi} variant="outline" className="text-xs gap-1 py-0.5 text-emerald-600 border-emerald-200 bg-emerald-50">
                                          <CheckCircle className="h-3 w-3" />
                                          {page}
                                        </Badge>
                                      )) : (
                                        <span className="text-xs text-muted-foreground italic">No pages tracked</span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                                    {formatDuration(sd.duration)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                  {personData.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                        No access data yet. Share the App Directory link to start tracking.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-8"></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date & Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Duration</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Apps Viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => {
                    const views = pageViews.filter(pv => pv.session_id === session.id);
                    return (
                      <>
                        <tr
                          key={session.id}
                          className="border-b hover:bg-muted/20 transition-colors cursor-pointer"
                          onClick={() => setExpandedRow(expandedRow === session.id ? null : session.id)}
                        >
                          <td className="px-4 py-4">
                            {expandedRow === session.id
                              ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{session.email}</span>
                              {session.is_internal && (
                                <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-muted-foreground">Internal</Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-foreground">
                            {format(new Date(session.session_start), "MMM d, yyyy, h:mm a")}
                          </td>
                          <td className="px-4 py-4 text-sm text-foreground">
                            {formatDuration(session.duration_seconds || 0)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                              <span className="text-sm text-foreground">{views.length}</span>
                            </div>
                          </td>
                        </tr>
                        {expandedRow === session.id && (
                          <tr key={`${session.id}-detail`}>
                            <td colSpan={5} className="px-8 py-4 bg-muted/10">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Apps Viewed</p>
                              <div className="flex flex-wrap gap-1.5">
                                {views.length > 0 ? views.map((v) => (
                                  <Badge key={v.id} variant="outline" className="text-xs gap-1 py-0.5 text-emerald-600 border-emerald-200 bg-emerald-50">
                                    <CheckCircle className="h-3 w-3" />
                                    {v.page_name}
                                  </Badge>
                                )) : (
                                  <span className="text-xs text-muted-foreground italic">No pages tracked</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                  {sessions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                        No sessions recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
