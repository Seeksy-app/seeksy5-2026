/**
 * Dev Expenses - Q1 2026 Board Presentation
 * 
 * Board-ready development expense report with visual breakdowns.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import {
  DollarSign, TrendingUp, Clock, Code, Server, Megaphone, Users, Database,
  ArrowUpRight
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const LABOR = {
  rate: 250,
  months: [
    { month: 'January', workingDays: 20, hours: 160, cost: 40000, holidays: ['New Year\'s Day', 'MLK Day'] },
    { month: 'February', workingDays: 19, hours: 152, cost: 38000, holidays: ['Presidents\' Day'] },
    { month: 'March', workingDays: 22, hours: 176, cost: 44000, holidays: [] },
  ],
  totalDays: 61,
  totalHours: 488,
  totalCost: 122000,
};

const CATEGORIES = [
  {
    name: 'AI & Development Tools',
    icon: Code,
    color: 'hsl(217, 91%, 60%)',
    total: 2771.81,
    vendors: [
      { name: 'Replit', amount: 1651.75 },
      { name: 'Lovable', amount: 577.70 },
      { name: 'Claude.ai', amount: 230.86 },
      { name: 'Anthropic', amount: 95.40 },
      { name: 'Cursor', amount: 42.40 },
      { name: 'OpenAI', amount: 42.40 },
      { name: 'Fireflies AI', amount: 39.00 },
      { name: 'Descript', amount: 37.10 },
      { name: 'Perplexity AI', amount: 21.20 },
      { name: 'Firecrawl', amount: 19.00 },
      { name: 'Wispr', amount: 15.00 },
    ],
  },
  {
    name: 'Contract Development',
    icon: Users,
    color: 'hsl(142, 71%, 45%)',
    total: 1429.96,
    vendors: [
      { name: 'Developers (Moneygram)', amount: 1429.96 },
    ],
  },
  {
    name: 'Infrastructure & Hosting',
    icon: Server,
    color: 'hsl(262, 83%, 58%)',
    total: 577.87,
    vendors: [
      { name: 'Google Cloud', amount: 205.80 },
      { name: 'Twilio', amount: 100.00 },
      { name: 'Resend', amount: 80.00 },
      { name: 'Supabase', amount: 78.35 },
      { name: 'Vercel', amount: 60.20 },
      { name: 'Cloudflare', amount: 37.10 },
      { name: 'Hostinger', amount: 16.04 },
      { name: 'Tiiny.host', amount: 0.38 },
    ],
  },
  {
    name: 'Data & Research',
    icon: Database,
    color: 'hsl(25, 95%, 53%)',
    total: 552.95,
    vendors: [
      { name: 'Influencers Club', amount: 251.47 },
      { name: 'HeyGen Technology', amount: 192.89 },
      { name: 'People Data Labs', amount: 98.00 },
      { name: 'BX Wm', amount: 10.59 },
    ],
  },
  {
    name: 'Business & Marketing Tools',
    icon: Megaphone,
    color: 'hsl(340, 82%, 52%)',
    total: 442.23,
    vendors: [
      { name: 'Canva', amount: 135.90 },
      { name: 'Shopify', amount: 82.68 },
      { name: 'SEMrush', amount: 63.60 },
      { name: 'RSS.com Podcasting', amount: 41.56 },
      { name: 'Notion', amount: 25.44 },
      { name: 'Loom', amount: 24.00 },
      { name: 'GitHub', amount: 21.20 },
      { name: 'PDF Tools', amount: 19.98 },
      { name: 'Spotify', amount: 12.71 },
      { name: 'Outscraper', amount: 10.00 },
      { name: 'Slack', amount: 5.16 },
    ],
  },
];

const MONTHLY_BREAKDOWN = [
  { month: 'January', software: 1298.15, labor: 40000, total: 41298.15 },
  { month: 'February', software: 4230.06, labor: 38000, total: 42230.06 },
  { month: 'March', software: 246.61, labor: 44000, total: 44246.61 },
];

const TOTAL_SOFTWARE = 5774.82;
const GRAND_TOTAL = 127774.82;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtK = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : fmt(n);

const PIE_COLORS = CATEGORIES.map(c => c.color);

const pieData = CATEGORIES.map(c => ({
  name: c.name,
  value: c.total,
}));

// ─── Component ───────────────────────────────────────────────────────────────

export default function DevExpenses() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Admin</span>
            <span>/</span>
            <span>Financials</span>
            <span>/</span>
            <span className="text-foreground font-medium">Dev Expenses</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Development Expenses — Q1 2026
          </h1>
          <p className="text-muted-foreground">
            January 1 – March 31, 2026 · Board-ready expense report
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Grand Total"
            value={fmt(GRAND_TOTAL)}
            sub="All Q1 development costs"
            icon={<DollarSign className="h-5 w-5" />}
            accent
          />
          <KPICard
            label="Labor Costs"
            value={fmt(LABOR.totalCost)}
            sub={`${LABOR.totalHours} hrs @ $${LABOR.rate}/hr`}
            icon={<Clock className="h-5 w-5" />}
          />
          <KPICard
            label="Software & Services"
            value={fmt(TOTAL_SOFTWARE)}
            sub={`${CATEGORIES.reduce((s, c) => s + c.vendors.length, 0)} vendors across 5 categories`}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            label="Labor % of Total"
            value={`${((LABOR.totalCost / GRAND_TOTAL) * 100).toFixed(1)}%`}
            sub="Software is 4.5% of total"
            icon={<ArrowUpRight className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Spend Bar Chart */}
          <Card className="hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Cost Breakdown</CardTitle>
              <CardDescription>Labor vs. software/services spend per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MONTHLY_BREAKDOWN} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                  <YAxis tickFormatter={(v: number) => fmtK(v)} tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                  <Tooltip
                    formatter={(value: number, name: string) => [fmt(value), name === 'labor' ? 'Labor' : 'Software']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Bar dataKey="labor" name="Labor" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="software" name="Software & Services" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Pie Chart */}
          <Card className="hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Software Spend by Category</CardTitle>
              <CardDescription>Distribution of {fmt(TOTAL_SOFTWARE)} across vendor categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => fmt(value)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Labor Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Labor Cost Detail
            </CardTitle>
            <CardDescription>
              CTO/Lead Developer · 5 days/week · 8 hours/day · ${LABOR.rate}/hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Working Days</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead>Holidays Excluded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LABOR.months.map((m) => (
                  <TableRow key={m.month}>
                    <TableCell className="font-medium">{m.month}</TableCell>
                    <TableCell className="text-right">{m.workingDays}</TableCell>
                    <TableCell className="text-right">{m.hours}</TableCell>
                    <TableCell className="text-right font-medium">{fmt(m.cost)}</TableCell>
                    <TableCell>
                      {m.holidays.length > 0
                        ? m.holidays.map(h => (
                            <Badge key={h} variant="secondary" className="mr-1 text-xs">{h}</Badge>
                          ))
                        : <span className="text-muted-foreground text-sm">None</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">{LABOR.totalDays}</TableCell>
                  <TableCell className="text-right">{LABOR.totalHours}</TableCell>
                  <TableCell className="text-right">{fmt(LABOR.totalCost)}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Category Breakdowns */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Software & Services Breakdown</h2>

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.name}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: cat.color + '22', color: cat.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {cat.name}
                    </CardTitle>
                    <span className="text-lg font-bold" style={{ color: cat.color }}>
                      {fmt(cat.total)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {cat.vendors.map((v) => (
                      <div
                        key={v.name}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/50"
                      >
                        <span className="text-sm">{v.name}</span>
                        <span className="text-sm font-medium">{fmt(v.amount)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Monthly Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Software & Services</TableHead>
                  <TableHead className="text-right">Labor</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MONTHLY_BREAKDOWN.map((m) => (
                  <TableRow key={m.month}>
                    <TableCell className="font-medium">{m.month}</TableCell>
                    <TableCell className="text-right">{fmt(m.software)}</TableCell>
                    <TableCell className="text-right">{fmt(m.labor)}</TableCell>
                    <TableCell className="text-right font-bold">{fmt(m.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-bold bg-muted/30">
                  <TableCell>Q1 Total</TableCell>
                  <TableCell className="text-right">{fmt(TOTAL_SOFTWARE)}</TableCell>
                  <TableCell className="text-right">{fmt(LABOR.totalCost)}</TableCell>
                  <TableCell className="text-right text-primary">{fmt(GRAND_TOTAL)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pb-8">
          <Separator className="mb-4" />
          Prepared for Board of Directors · Seeksy Inc. · Q1 2026 Development Expense Report
        </div>
      </div>
    </div>
  );
}

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KPICard({
  label, value, sub, icon, accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className={accent ? 'border-primary/30 bg-primary/5' : ''}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
