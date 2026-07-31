import type { ResumeData } from "../components/ResumePdfDocument";
import cognifyScreenshot01 from "../assets/projects/cognify/Screenshot-01.png";
import cognifyScreenshot02 from "../assets/projects/cognify/Screenshot-02.png";
import cognifyScreenshot03 from "../assets/projects/cognify/Screenshot-03.png";
import cognifyScreenshot04 from "../assets/projects/cognify/Screenshot-04.png";
import cognifyScreenshot05 from "../assets/projects/cognify/Screenshot-05.png";
import cognifyScreenshot06 from "../assets/projects/cognify/Screenshot-06.png";
import rightspeakScreenshot01 from "../assets/projects/rightspeak/Screenshot-01.png";
import rightspeakScreenshot02 from "../assets/projects/rightspeak/Screenshot-02.png";
import rightspeakScreenshot03 from "../assets/projects/rightspeak/Screenshot-03.png";
import audioscriptScreenshot01 from "../assets/projects/audioscript/Screenshot-01.png";
import audioscriptScreenshot02 from "../assets/projects/audioscript/Screenshot-02.png";
import audioscriptScreenshot03 from "../assets/projects/audioscript/Screenshot-03.png";
import audioscriptScreenshot04 from "../assets/projects/audioscript/Screenshot-04.png";
import audioscriptScreenshot05 from "../assets/projects/audioscript/Screenshot-05.png";
import memocardsScreenshot01 from "../assets/projects/memocards/Screenshot-01.png";
import memocardsScreenshot02 from "../assets/projects/memocards/Screenshot-02.png";
import memocardsScreenshot03 from "../assets/projects/memocards/Screenshot-03.png";
import memocardsScreenshot04 from "../assets/projects/memocards/Screenshot-04.png";
import memocardsScreenshot05 from "../assets/projects/memocards/Screenshot-05.png";
import productCostingScreenshot01 from "../assets/projects/product-costing/Screenshot-01.png";
import productCostingScreenshot02 from "../assets/projects/product-costing/Screenshot-02.png";
import productCostingScreenshot03 from "../assets/projects/product-costing/Screenshot-03.png";
import productCostingScreenshot04 from "../assets/projects/product-costing/Screenshot-04.png";
import productCostingScreenshot05 from "../assets/projects/product-costing/Screenshot-05.png";
import productCostingScreenshot06 from "../assets/projects/product-costing/Screenshot-06.png";
import productCostingScreenshot07 from "../assets/projects/product-costing/Screenshot-07.png";
import productCostingScreenshot08 from "../assets/projects/product-costing/Screenshot-08.png";
import productCostingScreenshot09 from "../assets/projects/product-costing/Screenshot-09.png";
import productCostingScreenshot10 from "../assets/projects/product-costing/Screenshot-10.png";
import gedacCompanyWebsiteScreenshot01 from "../assets/projects/gedac-company-website/Screenshot-01.png";
import gedacCompanyWebsiteScreenshot02 from "../assets/projects/gedac-company-website/Screenshot-02.png";
import gedacCompanyWebsiteScreenshot03 from "../assets/projects/gedac-company-website/Screenshot-03.png";
import gedacCompanyWebsiteScreenshot04 from "../assets/projects/gedac-company-website/Screenshot-04.png";
import gedacCompanyWebsiteScreenshot05 from "../assets/projects/gedac-company-website/Screenshot-05.png";
import portfolioRaw from "./portfolio.json?raw";

type Link = {
  label: string;
  href: string;
};

type ContactChannel = Link & {
  value: string;
  accent: string;
  primary: boolean;
};

type WebsiteContent = {
  name: string;
  headline: string;
  lead: string;
  heroChips: string[];
  socialLinks: Link[];
  about: {
    eyebrow: string;
    subheadline: string;
    paragraphs: string[];
    highlights: string[];
  };
  contact: {
    email: string;
    linkedin: string;
    location: string;
    responseTime: string;
    engagement: string;
    channels: ContactChannel[];
  };
  footer: {
    note: string;
    projectStack: string;
    social: Link[];
  };
  nav: Link[];
};

type ProjectAssetKey = keyof typeof projectAssets;

type ProjectContent = {
  id: string;
  title: string;
  featureNote?: string;
  subtitle: string;
  browserLabel: string;
  coverImage: ProjectAssetKey;
  coverAlt: string;
  galleryImages: ProjectAssetKey[];
  bullets: string[];
  stack: string[];
  primaryLinkLabel: string;
  links: {
    liveDemo: string;
    github: string;
  };
  legalLinks?: {
    privacyPolicy: string;
    termsOfService: string;
  };
};

type ResolvedProjectContent = Omit<ProjectContent, "coverImage" | "galleryImages"> & {
  coverImage: string;
  galleryImages: string[];
};

export type ProfileContent = WebsiteContent;

export type CareerProfileContent = {
  document: {
    sourceType: string;
    exportedAtUtc: string;
  };
  preferences: {
    remotePreference: string;
    availability: string;
    compensationStance: string;
    relocationStance: string;
  };
  strengths: Array<{
    title: string;
    evidence: string;
  }>;
  careerGoals: string[];
  jobTargets: string[];
};

export type PortfolioContent = {
  appDefaults: WebsiteContent & {
    projects: ProjectContent[];
  };
  profile: ProfileContent;
  careerProfile: CareerProfileContent;
  careerContent: ResumeData & Record<string, unknown>;
};

const projectAssets = {
  "cognify-01": cognifyScreenshot01,
  "cognify-02": cognifyScreenshot02,
  "cognify-03": cognifyScreenshot03,
  "cognify-04": cognifyScreenshot04,
  "cognify-05": cognifyScreenshot05,
  "cognify-06": cognifyScreenshot06,
  "rightspeak-01": rightspeakScreenshot01,
  "rightspeak-02": rightspeakScreenshot02,
  "rightspeak-03": rightspeakScreenshot03,
  "audioscript-01": audioscriptScreenshot01,
  "audioscript-02": audioscriptScreenshot02,
  "audioscript-03": audioscriptScreenshot03,
  "audioscript-04": audioscriptScreenshot04,
  "audioscript-05": audioscriptScreenshot05,
  "memocards-01": memocardsScreenshot01,
  "memocards-02": memocardsScreenshot02,
  "memocards-03": memocardsScreenshot03,
  "memocards-04": memocardsScreenshot04,
  "memocards-05": memocardsScreenshot05,
  "product-costing-01": productCostingScreenshot01,
  "product-costing-02": productCostingScreenshot02,
  "product-costing-03": productCostingScreenshot03,
  "product-costing-04": productCostingScreenshot04,
  "product-costing-05": productCostingScreenshot05,
  "product-costing-06": productCostingScreenshot06,
  "product-costing-07": productCostingScreenshot07,
  "product-costing-08": productCostingScreenshot08,
  "product-costing-09": productCostingScreenshot09,
  "product-costing-10": productCostingScreenshot10,
  "gedac-01": gedacCompanyWebsiteScreenshot01,
  "gedac-02": gedacCompanyWebsiteScreenshot02,
  "gedac-03": gedacCompanyWebsiteScreenshot03,
  "gedac-04": gedacCompanyWebsiteScreenshot04,
  "gedac-05": gedacCompanyWebsiteScreenshot05,
} as const;

function assertPortfolioContent(value: unknown): asserts value is PortfolioContent {
  if (!value || typeof value !== "object") {
    throw new Error("Portfolio content must be a JSON object.");
  }

  const content = value as Partial<PortfolioContent>;
  if (!content.appDefaults || !content.profile || !content.careerProfile || !content.careerContent) {
    throw new Error("Portfolio content is missing a required section.");
  }

  const projects = content.appDefaults.projects;
  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error("Portfolio content must include at least one project.");
  }

  const projectIds = new Set<string>();
  for (const project of projects) {
    if (!project.id || projectIds.has(project.id)) {
      throw new Error("Portfolio project IDs must be present and unique.");
    }

    projectIds.add(project.id);
    const imageKeys = [project.coverImage, ...project.galleryImages];
    if (imageKeys.some((imageKey) => !(imageKey in projectAssets))) {
      throw new Error(`Portfolio project "${project.id}" references an unknown image asset.`);
    }
  }
}

const parsedPortfolioContent: unknown = JSON.parse(portfolioRaw);
assertPortfolioContent(parsedPortfolioContent);

export const portfolioContent = parsedPortfolioContent;

function resolveProjectAssets(project: ProjectContent): ResolvedProjectContent {
  return {
    ...project,
    coverImage: projectAssets[project.coverImage],
    galleryImages: project.galleryImages.map((imageKey) => projectAssets[imageKey]),
  };
}

export const appDefaultData = {
  ...portfolioContent.appDefaults,
  projects: portfolioContent.appDefaults.projects.map(resolveProjectAssets),
};
