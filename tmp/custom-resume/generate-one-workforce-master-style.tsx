import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import React from "react";
import { pdf } from "@react-pdf/renderer";
import ResumePdfDocument, { type ResumeData } from "../../src/components/ResumePdfDocument";
import masterResume from "../../src/content/career-content.json";
import tailoring from "./one-workforce-global-tailoring.json";

const h = React.createElement;
const photoBuffer = await readFile(resolve(process.cwd(), "src/assets/images/profile-photo.png"));
const photoDataUrl = `data:image/png;base64,${photoBuffer.toString("base64")}`;

const resume: ResumeData = {
  ...(masterResume as ResumeData),
  title: tailoring.title,
  profile: tailoring.profile,
};

const target = resolve(process.cwd(), "tmp/custom-resume/Resume - Justiniano Tagarda - One Workforce Global.pdf");
const buffer = await pdf(h(ResumePdfDocument, { resume, profilePhotoSrc: photoDataUrl })).toBuffer();
await writeFile(target, buffer);
console.log(target);
