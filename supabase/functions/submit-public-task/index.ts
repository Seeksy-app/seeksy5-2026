import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, company, phone, title, description, category, priority } = body;

    // Input validation
    if (!name || typeof name !== 'string' || name.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid name (max 200 chars)' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!email || typeof email !== 'string' || !/^[^@]+@[^@]+\.[^@]+$/.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!title || typeof title !== 'string' || title.length > 500) {
      return new Response(JSON.stringify({ error: 'Invalid title (max 500 chars)' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (description && (typeof description !== 'string' || description.length > 5000)) {
      return new Response(JSON.stringify({ error: 'Description too long (max 5000 chars)' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (company && (typeof company !== 'string' || company.length > 200)) {
      return new Response(JSON.stringify({ error: 'Company name too long' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (phone && (typeof phone !== 'string' || phone.length > 30)) {
      return new Response(JSON.stringify({ error: 'Phone too long' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get first admin/super_admin user
    const { data: adminUsers } = await supabaseAdmin
      .from('user_roles')
      .select('user_id')
      .or('role.eq.admin,role.eq.super_admin')
      .limit(1);

    if (!adminUsers || adminUsers.length === 0) {
      throw new Error('No admin user found');
    }

    const adminUserId = adminUsers[0].user_id;

    // Check if contact exists
    let contactId: string;
    const { data: existingContact } = await supabaseAdmin
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single();

    if (existingContact) {
      contactId = existingContact.id;
      
      // Update contact if needed
      await supabaseAdmin
        .from('contacts')
        .update({
          name,
          company,
          phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', contactId);
    } else {
      // Create new contact
      const { data: newContact, error: contactError } = await supabaseAdmin
        .from('contacts')
        .insert({
          name,
          email,
          company,
          phone,
          user_id: adminUserId,
          lead_status: 'new',
          lead_source: 'Public Task Form',
        })
        .select()
        .single();

      if (contactError) throw contactError;
      contactId = newContact.id;
    }

    // Create task
    const { data: task, error: taskError } = await supabaseAdmin
      .from('tasks')
      .insert({
        title,
        description,
        category,
        priority,
        status: 'backlog',
        assigned_to: adminUserId,
        user_id: adminUserId,
      })
      .select()
      .single();

    if (taskError) throw taskError;

    // Send notification email to admin
    const { error: emailError } = await supabaseAdmin.functions.invoke('send-contact-email', {
      body: {
        to: adminUserId,
        subject: `New Task Submitted: ${title}`,
        message: `
          A new task has been submitted via the public form:
          
          From: ${name} (${email})
          Company: ${company || 'N/A'}
          Phone: ${phone || 'N/A'}
          
          Task: ${title}
          Priority: ${priority}
          Category: ${category}
          
          Description:
          ${description}
        `,
      },
    });

    if (emailError) {
      console.error('Error sending notification email:', emailError);
    }

    // Send confirmation email to submitter
    await supabaseAdmin.functions.invoke('send-contact-email', {
      body: {
        to: email,
        subject: 'Task Submission Received',
        message: `
          Hi ${name},
          
          Thank you for submitting your task. We've received your request and will review it shortly.
          
          Task Details:
          - Title: ${title}
          - Priority: ${priority}
          - Category: ${category}
          
          We'll get back to you soon!
          
          Best regards,
          The Team
        `,
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        taskId: task.id,
        contactId 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in submit-public-task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
