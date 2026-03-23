import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Target Google Apps Script web app URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-9yIobvN3R3vjMcdLrviYopald_7ad1ULk7FqzUw-MJ9YHi_0dvIug4yb-v1cGMSviA/exec";

serve(async (req) => {
  // Handle CORS preflight requests natively
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, sheet, data } = await req.json();
    
    if (!action || !sheet) {
      throw new Error("Missing required parameters: 'action' and 'sheet' are required.");
    }

    let response;

    if (action === "getRows") {
      // Proxy GET request to AppScript to fetch rows for duplicate checking
      response = await fetch(`${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheet)}`);
    } else if (action === "appendRow") {
      // Proxy POST request to AppScript to append a new opportunity
      response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheet, data }),
      });
    } else {
      throw new Error(`Unsupported action: ${action}`);
    }

    if (!response.ok) {
      throw new Error(`Google Script returned error status: ${response.status}`);
    }

    const responseText = await response.text();
    let resultJSON;
    try {
      resultJSON = JSON.parse(responseText);
    } catch {
      // Fallback if Apps Script didn't return valid JSON
      resultJSON = responseText;
    }

    return new Response(JSON.stringify(resultJSON), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Supabase proxy error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Internal error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
