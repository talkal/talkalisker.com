import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const slackWebhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
        if (!slackWebhookUrl) {
            throw new Error('SLACK_WEBHOOK_URL is not set');
        }

        // The body from a Supabase Database Webhook contains the row in `record`
        const payload = await req.json();
        const signature = payload.record;

        if (!signature || payload.type !== 'INSERT') {
            return new Response(JSON.stringify({ message: "Not an insert event or no record found." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // Format Slack Message
        const slackMessage = {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "📝 New Document Signature",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Report:*\n${signature.report_id}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Client Name:*\n${signature.client_name}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Email:*\n${signature.email}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Role:*\n${signature.role}`
                        }
                    ]
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `*Hash:* ${signature.document_hash.substring(0, 16)}... | *IP:* ${signature.ip_address}`
                        }
                    ]
                }
            ]
        };

        // Send to Slack
        const slackResponse = await fetch(slackWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        });

        if (!slackResponse.ok) {
            const errorText = await slackResponse.text();
            throw new Error(`Slack API error: ${errorText}`);
        }

        return new Response(JSON.stringify({ success: true, message: "Notification sent to Slack" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
