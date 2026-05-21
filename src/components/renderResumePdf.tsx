import { pdf } from "@react-pdf/renderer";
import ResumePdfDocument, { type ResumeData } from "./ResumePdfDocument";
import profileContentRaw from "../content/profile.json?raw";

type WebsiteProfileContent = {
  name?: string;
  headline?: string;
  lead?: string;
  about?: {
    subheadline?: string;
    paragraphs?: string[];
  };
  contact?: {
    email?: string;
    linkedin?: string;
    location?: string;
  };
};

const websiteProfile = JSON.parse(profileContentRaw) as WebsiteProfileContent;

function buildPdfResume(resume: ResumeData): ResumeData {
  const linkedIn = websiteProfile.contact?.linkedin ?? resume.contact.linkedin;
  const location = websiteProfile.contact?.location ?? resume.contact.location;
  const websiteTitle = websiteProfile.headline ?? resume.title;
  const websiteAboutSummary = [
    websiteProfile.about?.subheadline,
    ...(websiteProfile.about?.paragraphs ?? []),
  ]
    .filter(Boolean)
    .join(" ");
  const websiteSummary = websiteAboutSummary || websiteProfile.lead || resume.profile;

  return {
    ...resume,
    name: websiteProfile.name ?? resume.name,
    title: websiteTitle,
    profile: websiteSummary,
    contact: {
      ...resume.contact,
      email: websiteProfile.contact?.email ?? resume.contact.email,
      linkedin: linkedIn,
      location,
    },
    // Keep the PDF focused on the resume content, but align the header/summary with the website.
    education: resume.education,
    work_experience: resume.work_experience,
    skills: resume.skills,
  };
}

export async function renderResumePdfBlob(resume: ResumeData, profilePhotoSrc: string) {
  return pdf(<ResumePdfDocument resume={buildPdfResume(resume)} profilePhotoSrc={profilePhotoSrc} />).toBlob();
}
