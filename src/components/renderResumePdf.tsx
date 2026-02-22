import { pdf } from "@react-pdf/renderer";
import ResumePdfDocument, { type ResumeData } from "./ResumePdfDocument";

export async function renderResumePdfBlob(resume: ResumeData, profilePhotoSrc: string) {
  return pdf(<ResumePdfDocument resume={resume} profilePhotoSrc={profilePhotoSrc} />).toBlob();
}
