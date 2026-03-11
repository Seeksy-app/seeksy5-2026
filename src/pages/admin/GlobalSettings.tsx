import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Snowflake, PartyPopper, Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function GlobalSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: settings } = useQuery({
    queryKey: ['app-settings'],
    queryFn: async () => {
      const { data } = await supabase
        .from('app_settings')
        .select('*')
        .eq('key', 'global')
        .maybeSingle();
      
      return data || { holiday_mode: false, holiday_snow: false };
    },
  });

  const updateSetting = useMutation({
    mutationFn: async ({ field, value }: { field: string; value: boolean }) => {
      const { error } = await supabase
        .from('app_settings')
        .upsert({
          key: 'global',
          [field]: value,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['app-settings'] });
      toast({
        title: "Settings updated",
        description: "Global settings have been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Global Settings
        </h1>
        <p className="text-muted-foreground">
          Manage platform-wide settings and features
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holiday Features</CardTitle>
          <CardDescription>Control seasonal themes and features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <PartyPopper className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">Holiday Mode</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Enable seasonal themes and Santa Spark assistant
              </p>
            </div>
            <Switch
              checked={settings?.holiday_mode || false}
              onCheckedChange={(checked) => updateSetting.mutate({ field: 'holiday_mode', value: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">Snowfall Effect</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Display animated snowfall across the platform
              </p>
            </div>
            <Switch
              checked={settings?.holiday_snow || false}
              onCheckedChange={(checked) => updateSetting.mutate({ field: 'holiday_snow', value: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Demo Sessions</CardTitle>
          <CardDescription>View App Directory visitor sessions and engagement analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">App Directory Access Log</p>
                <p className="text-sm text-muted-foreground">Track who's viewing the app directory, session duration, and which apps they explore</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/admin/prospectus-log")}>
              View Sessions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
