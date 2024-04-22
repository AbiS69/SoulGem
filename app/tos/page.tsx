import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Terms of Service for SoulGem

Last updated: April 20, 2024

Welcome to SoulGem! 

By accessing and using our website located at https://soulgem.xyz ("Site"), you agree to be bound by the following terms of service ("Terms").

1. Use of Our Service

SoulGem provides an image generation service based on your personality. To use our service, you will be asked to provide personal information including your name, email, and answers to a personality test. Payment information may also be requested for purchases related to our services.


2. Data Collection

We collect both personal and non-personal data as described in our Privacy Policy, which can be accessed at https://soulgem.xyz/privacy-policy. Personal data includes name, email, and personality test answers, and may include payment information if provided. Non-personal data includes web cookies.


3. Intellectual Property

All content on this Site, including text, graphics, logos, and images, is the property of SoulGem and is protected by intellectual property laws. You may not commercially use any content from our Site without the express permission of SoulGem.


4. User Responsibilities

You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to use our services for lawful purposes only.


5. Termination

We may terminate or suspend your access to our Site immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.


6. Changes to Terms

We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this Site and updating you by email.


7. Governing Law

These Terms shall be governed by and construed in accordance with the laws of France.


8. Contact Us

If you have any questions about these Terms, please contact us at toni@soulgem.xyz.

By using our Site, you acknowledge that you have read and agree to be bound by these Terms.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
