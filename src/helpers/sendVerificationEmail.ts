import { resend } from "../config/resend.js";
import { ApiResponse } from "../config/ApiResponse.js";

export async function sendVerificationEmail(username, email, otp) {
    try {
        const emailTemplate = `
            <div>
                <h1>Translense-backend-task | Verification Email</h1>
                <p>Hello ${username},</p>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>Please use this code to verify your account.</p>
            </div>
        `;

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Translense-backend-task | Verification Email',
            html: emailTemplate,
        });

        return {
            success: true,
            message: "Verification email sent successfully."
        };
        
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email."
        };
    }
}
