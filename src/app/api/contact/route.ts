// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter with your SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to you (the portfolio owner)
    const mailToYou = {
      from: process.env.SMTP_USER,
      to: process.env.PORTFOLIO_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #10b981, #0ea5e9); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">From:</h3>
              <p style="margin: 0; color: #6b7280; font-size: 18px; font-weight: 600;">${name}</p>
              <p style="margin: 4px 0 0 0; color: #9ca3af;">${email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">Subject:</h3>
              <p style="margin: 0; color: #6b7280; font-size: 18px; font-weight: 600;">${subject}</p>
            </div>
            
            <div>
              <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">Message:</h3>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 14px;">
            <p>This message was sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    };

    // Confirmation email to the user
    const mailToUser = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for your message!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #10b981, #0ea5e9); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Message Received!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="color: #374151; font-size: 18px; margin: 0 0 20px 0;">Hi ${name},</p>
            
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out! I've received your message about "<strong>${subject}</strong>" and I appreciate you taking the time to contact me.
            </p>
            
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 20px 0;">
              I'll review your message and get back to you within 24 hours. If your inquiry is urgent, please feel free to reach out to me directly.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin: 0 0 12px 0; font-size: 16px;">Your message:</h3>
              <p style="color: #6b7280; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6; margin: 20px 0 0 0;">
              Best regards,<br>
              <strong style="color: #374151;">Your Name</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 14px;">
            <p>This is an automated confirmation email</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailToYou),
      transporter.sendMail(mailToUser)
    ]);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}