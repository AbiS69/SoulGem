import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
Privacy Policy for SoulGem

 Last updated: April 20, 2024

Welcome to SoulGem, accessible from https://soulgem.xyz. This privacy policy outlines our policies regarding the collection, use, and disclosure of personal information when you use our service.

1. Information Collection and Use

We collect various types of information for various purposes to provide and improve our service to you:
Personal Data: We may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
Name
Email address
Answers to a personality test
Payment information (if necessary for processing orders)
Cookies and Usage Data: We use cookies and similar tracking technologies to track activity on our service and hold certain information.


2. Use of Data

SoulGem uses the collected data for various purposes:
To provide and maintain our service
To notify you about changes to our service
To allow you to participate in interactive features of our service when you choose to do so
To provide customer support
To gather analysis or valuable information so that we can improve our service
To monitor the usage of our service
To detect, prevent, and address technical issues


3. Data Sharing

We do not share your personal data with third parties, except as necessary to provide and improve the service, comply with the law, or protect our rights.

4. Children's Privacy

Our service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.


5. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating you by email.


6. Contact Us

If you have any questions about this Privacy Policy, please contact us at toni@soulgem.xyz.


By using our site, you acknowledge that you have read and understood our Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
