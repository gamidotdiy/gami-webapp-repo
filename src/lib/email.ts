interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'onboarding@gamiprotocol.xyz',
        to,
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[email] Failed to send:', data);
      return { success: false, error: data.message || 'Failed to send email' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('[email] Error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export function generateWaitlistNotificationEmail(data: {
  email: string;
  business: string;
  wallet?: string;
}) {
  return {
    subject: '🎮 New Waitlist Signup - Gami Protocol',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Waitlist Signup</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Waitlist Signup 🚀</h1>
          </div>
          
          <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #111827; font-size: 20px;">Contact Information</h2>
            
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email:</strong>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #111827; font-weight: 600;">
                <a href="mailto:${data.email}" style="color: #a855f7; text-decoration: none;">${data.email}</a>
              </p>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Business / DAO:</strong>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #111827; font-weight: 600;">${data.business}</p>
            </div>
            
            ${data.wallet ? `
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Wallet Address:</strong>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #111827; font-family: 'Courier New', monospace; word-break: break-all;">${data.wallet}</p>
            </div>
            ` : ''}
            
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Signed up:</strong>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #111827;">${new Date().toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short',
                timeZone: 'UTC'
              })} UTC</p>
            </div>
          </div>
          
          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>Next Steps:</strong> Reach out to coordinate Stripe + wallet onboarding
            </p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">Gami Protocol - Universal Layer for Digital Engagement</p>
          </div>
        </body>
      </html>
    `,
  };
}

export function generatePlatformTestNotificationEmail(data: {
  email: string;
  testType: string;
  details?: string;
}) {
  return {
    subject: '🧪 Platform Test Completed - Gami Protocol',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Platform Test Completed</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Platform Test Completed 🎯</h1>
          </div>
          
          <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #111827; font-size: 20px;">Test Information</h2>
            
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">User Email:</strong>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #111827; font-weight: 600;">
                <a href="mailto:${data.email}" style="color: #06b6d4; text-decoration: none;">${data.email}</a>
              </p>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Test Type:</strong>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #111827; font-weight: 600;">${data.testType}</p>
            </div>
            
            ${data.details ? `
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Details:</strong>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #111827; white-space: pre-wrap;">${data.details}</p>
            </div>
            ` : ''}
            
            <div style="margin: 15px 0;">
              <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Completed at:</strong>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #111827;">${new Date().toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short',
                timeZone: 'UTC'
              })} UTC</p>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">Gami Protocol - Universal Layer for Digital Engagement</p>
          </div>
        </body>
      </html>
    `,
  };
}
