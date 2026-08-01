import { useCallback, useEffect, useState, type FormEvent } from "react";
import profilePhoto from "./assets/images/profile-photo.webp";
import { appDefaultData, portfolioContent } from "./content/portfolio";
import type { ResumeData } from "./components/ResumePdfDocument";

type ContactSubmitStatus = "idle" | "sending" | "success" | "error";

const defaultData = appDefaultData;

type ProfileContent = Pick<typeof defaultData, "name" | "headline" | "lead" | "heroChips" | "socialLinks" | "about" | "contact" | "footer" | "nav">;
type CareerProfileContent = {
  preferences?: {
    availability?: string;
  };
  strengths?: Array<{
    title: string;
    evidence: string;
  }>;
};

const profileContent = portfolioContent.profile as Partial<ProfileContent>;
const careerProfileContent = portfolioContent.careerProfile as CareerProfileContent;
const defaultHighlights = defaultData.about.highlights;
const careerHighlights = (careerProfileContent.strengths ?? []).map((item) => `${item.title}: ${item.evidence}`);
const mergedAboutHighlights =
  profileContent.about?.highlights && profileContent.about.highlights.length > 0
    ? profileContent.about.highlights
    : careerHighlights.length > 0
      ? careerHighlights
      : defaultHighlights;
const availabilityValue = careerProfileContent.preferences?.availability?.trim();
const baseEngagementText = profileContent.contact?.engagement ?? defaultData.contact.engagement;
const hasAvailabilityInEngagement = /availability/i.test(baseEngagementText);
const availabilityNote = availabilityValue && !hasAvailabilityInEngagement ? ` ${availabilityValue} availability.` : "";

const data = {
  ...defaultData,
  ...profileContent,
  about: {
    ...defaultData.about,
    ...profileContent.about,
    highlights: mergedAboutHighlights,
  },
  contact: {
    ...defaultData.contact,
    ...profileContent.contact,
    engagement: `${baseEngagementText}${availabilityNote}`.trim(),
    channels: profileContent.contact?.channels ?? defaultData.contact.channels,
  },
  footer: {
    ...defaultData.footer,
    ...profileContent.footer,
    social: profileContent.footer?.social ?? defaultData.footer.social,
  },
  nav: profileContent.nav ?? defaultData.nav,
};

const formspreeEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || "https://formspree.io/f/mpqjyoov";
const resumeData = portfolioContent.careerContent as ResumeData;
const skillGroups = resumeData.skills;
const workExperiences = resumeData.work_experience;
const currentlyActiveExperience = workExperiences.find((item) => item.end.toLowerCase().includes("present"));

function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.14)] to-transparent" />
    </div>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const isContactSectionVisible = false;
  const projectEntries = data.projects.map((project, index) => ({ project, index }));
  const productProjectEntries = projectEntries.filter(({ project }) => project.id !== "gedac-company-website");
  const otherWorkEntries = projectEntries.filter(({ project }) => project.id === "gedac-company-website");
  const visibleNavItems = data.nav.filter((item) => isContactSectionVisible || item.href !== "#contact");

  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [contactStatus, setContactStatus] = useState<ContactSubmitStatus>("idle");
  const [contactFeedback, setContactFeedback] = useState("");
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [isResumePreviewLoading, setIsResumePreviewLoading] = useState(false);
  const [isResumeDownloading, setIsResumeDownloading] = useState(false);
  const [pdfProfilePhotoSrc, setPdfProfilePhotoSrc] = useState<string | null>(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);
  const [resumePdfBlob, setResumePdfBlob] = useState<Blob | null>(null);
  const [resumeFeedback, setResumeFeedback] = useState("");

  const activeProject = activeProjectIndex !== null ? data.projects[activeProjectIndex] : null;
  const activeGallery = activeProject?.galleryImages ?? [];
  const activeImage = activeGallery[activeImageIndex];
  const isGalleryOpen = activeProject !== null;
  const openGallery = (projectIndex: number, startAt = 0) => {
    setActiveProjectIndex(projectIndex);
    setActiveImageIndex(startAt);
  };

  const closeGallery = () => {
    setActiveProjectIndex(null);
  };

  const showPreviousImage = () => {
    if (activeGallery.length <= 1) return;
    setActiveImageIndex((current) => (current - 1 + activeGallery.length) % activeGallery.length);
  };

  const showNextImage = () => {
    if (activeGallery.length <= 1) return;
    setActiveImageIndex((current) => (current + 1) % activeGallery.length);
  };

  const openResumePreview = () => {
    setResumeFeedback("");
    setIsResumePreviewOpen(true);
  };

  const getPdfProfilePhotoSrc = useCallback(async () => {
    if (pdfProfilePhotoSrc) {
      return pdfProfilePhotoSrc;
    }

    const convertedPhotoSrc = await new Promise<string>((resolve) => {
      const image = new window.Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        try {
          const width = image.naturalWidth || image.width;
          const height = image.naturalHeight || image.height;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");

          if (!context || width === 0 || height === 0) {
            resolve(profilePhoto);
            return;
          }

          context.drawImage(image, 0, 0, width, height);
          resolve(canvas.toDataURL("image/png"));
        } catch {
          resolve(profilePhoto);
        }
      };

      image.onerror = () => resolve(profilePhoto);
      image.src = profilePhoto;
    });

    setPdfProfilePhotoSrc(convertedPhotoSrc);
    return convertedPhotoSrc;
  }, [pdfProfilePhotoSrc]);

  const generateResumePdfBlob = useCallback(async () => {
    const { renderResumePdfBlob } = await import("./components/renderResumePdf");
    const resolvedPhotoSrc = await getPdfProfilePhotoSrc();
    return renderResumePdfBlob(resumeData, resolvedPhotoSrc);
  }, [getPdfProfilePhotoSrc]);

  const setResumePreviewUrlFromBlob = (blob: Blob) => {
    const nextUrl = URL.createObjectURL(blob);
    setResumePreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return nextUrl;
    });
  };

  const closeResumePreview = () => {
    if (isResumeDownloading) return;
    setIsResumePreviewOpen(false);
    setIsResumePreviewLoading(false);
    setResumePreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return null;
    });
  };

  const downloadResumePdf = async () => {
    setIsResumeDownloading(true);
    setResumeFeedback("");

    try {
      const pdfBlob =
        resumePdfBlob ??
        (await generateResumePdfBlob());

      if (!resumePdfBlob) {
        setResumePdfBlob(pdfBlob);
      }

      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Justiniano-Tagarda-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 2000);

      setResumeFeedback("Resume PDF downloaded.");
    } catch {
      setResumeFeedback("Unable to generate the PDF right now. Please try again.");
    } finally {
      setIsResumeDownloading(false);
    }
  };

  useEffect(() => {
    if (!isResumePreviewOpen) return;

    setResumeFeedback("");

    if (resumePdfBlob) {
      setIsResumePreviewLoading(false);
      setResumePreviewUrlFromBlob(resumePdfBlob);
      return;
    }

    let isCancelled = false;
    setIsResumePreviewLoading(true);

    const renderResumePreview = async () => {
      try {
        const nextBlob = await generateResumePdfBlob();
        if (isCancelled) return;
        setResumePdfBlob(nextBlob);
        setResumePreviewUrlFromBlob(nextBlob);
      } catch {
        if (!isCancelled) {
          setResumeFeedback("Unable to render the resume preview right now. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsResumePreviewLoading(false);
        }
      }
    };

    void renderResumePreview();

    return () => {
      isCancelled = true;
    };
  }, [generateResumePdfBlob, isResumePreviewOpen, resumePdfBlob]);

  useEffect(() => {
    if (isResumePreviewOpen) return;

    setIsResumePreviewLoading(false);
    setResumePreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return null;
    });
  }, [isResumePreviewOpen]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!formspreeEndpoint) {
      setContactStatus("error");
      setContactFeedback(`Contact form is not configured yet. Please email ${data.contact.email}.`);
      return;
    }

    const formData = new FormData(form);
    const honeypotValue = formData.get("_gotcha");
    if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setContactStatus("error");
      setContactFeedback("Please complete all required fields.");
      return;
    }

    setContactStatus("sending");
    setContactFeedback("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name}`,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Unable to send your message right now. Please try again shortly.";

        try {
          const payload = (await response.json()) as { errors?: Array<{ message?: string }> };
          const apiMessage = payload.errors
            ?.map((entry) => entry.message?.trim())
            .filter((entry): entry is string => Boolean(entry))
            .join(", ");

          if (apiMessage) {
            errorMessage = apiMessage;
          }
        } catch {
          // Keep default fallback error message.
        }

        throw new Error(errorMessage);
      }

      setContactStatus("success");
      setContactFeedback("Message sent. I will get back to you soon.");
      form.reset();
    } catch (error) {
      const fallback = "Unable to send your message right now. Please email me directly.";
      const errorMessage = error instanceof Error ? error.message : fallback;
      setContactStatus("error");
      setContactFeedback(errorMessage);
    }
  };

  useEffect(() => {
    if (!isGalleryOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
        return;
      }

      if (activeGallery.length <= 1) return;

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) => (current - 1 + activeGallery.length) % activeGallery.length);
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) => (current + 1) % activeGallery.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isGalleryOpen, activeGallery.length]);

  useEffect(() => {
    if (!isResumePreviewOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isResumeDownloading) {
        setIsResumePreviewOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isResumePreviewOpen, isResumeDownloading]);

  return (
    <main id="top" className="relative min-h-screen overflow-x-clip bg-[#0B1220] text-[rgba(255,255,255,0.92)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.45)_0%,_rgba(59,130,246,0)_70%)] opacity-30 blur-3xl" />
        <div className="absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.40)_0%,_rgba(245,158,11,0)_70%)] opacity-25 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.13),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.10),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.28)_0%,rgba(15,23,42,0)_60%)] opacity-80" />
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.10)] bg-[rgba(11,18,32,0.60)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 md:px-8">
            <a href="#top" className="text-sm font-medium tracking-tight text-[rgba(255,255,255,0.94)] sm:text-base">
              {data.name}
            </a>

            <nav className="flex w-full flex-wrap items-center justify-start gap-1 text-[11px] font-medium text-[rgba(255,255,255,0.78)] sm:w-auto sm:justify-end sm:gap-2 md:gap-3 md:text-sm">
              {visibleNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-2.5 py-1.5 transition hover:bg-[rgba(255,255,255,0.08)] hover:text-[rgba(255,255,255,0.96)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] md:px-3 md:py-1.5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#products"
                className="rounded-full bg-[#3B82F6] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] md:px-4 md:py-1.5 md:text-sm"
              >
                View Products
              </a>
            </nav>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl items-start gap-6 px-4 pb-6 pt-6 sm:px-5 md:px-8 md:pb-8 md:pt-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-6 lg:pb-10 lg:pt-10 xl:gap-8">
          <div className="space-y-6 lg:max-w-[52rem]">
              <p className="inline-flex rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[rgba(255,255,255,0.70)]">
               AI-assisted delivery / human review / .NET / React
              </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-[rgba(255,255,255,0.92)] md:text-5xl lg:text-[3rem] lg:leading-tight xl:text-[3.75rem]">
                {data.headline.split("Full-Stack").map((part, index, parts) => (
                  <span key={`${part}-${index}`}>
                    {part}
                    {index < parts.length - 1 && <span className="whitespace-nowrap">Full-Stack</span>}
                  </span>
                ))}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.70)] md:text-lg">
                {data.lead}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {data.heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.16)] px-3 py-1.5 text-xs font-medium text-[rgba(255,255,255,0.92)] md:text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.30)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
              >
                View Products
              </a>
              <button
                type="button"
                onClick={openResumePreview}
                className="rounded-xl border border-[rgba(59,130,246,0.40)] bg-[rgba(59,130,246,0.16)] px-5 py-3 text-sm font-semibold text-[rgba(255,255,255,0.96)] transition hover:-translate-y-0.5 hover:border-[rgba(59,130,246,0.68)] hover:bg-[rgba(59,130,246,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                Download Resume
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[rgba(255,255,255,0.70)]">
              {data.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 transition hover:text-[rgba(255,255,255,0.92)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:mx-0">
            <article className="group relative overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-3.5 shadow-[0_24px_70px_rgba(2,6,23,0.40)] transition hover:-translate-y-1">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_20%,rgba(59,130,246,0.18),transparent_55%)] opacity-80" />
              <div className="relative overflow-hidden rounded-[1.2rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)]">
                <img
                  src={profilePhoto}
                  alt={`${data.name} portrait`}
                  width={800}
                  height={1000}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
              </div>
            </article>

            <div className="mt-3 grid grid-cols-1 gap-3">
              <div className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_14px_36px_rgba(2,6,23,0.28)] transition hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.74)]">How I work</span>
                  <span className="rounded-full border border-[rgba(59,130,246,0.30)] bg-[rgba(59,130,246,0.16)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(191,219,254,0.96)]">
                    AI-assisted
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {["Plan", "Agent", "Review", "Ship"].map((step) => (
                    <div
                      key={step}
                      className="rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-2 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.88)]">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[rgba(255,255,255,0.70)]">
                  {data.about.paragraphs[0]}
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section
          id="experience"
          className="mx-auto max-w-7xl scroll-mt-[52px] px-4 py-8 sm:px-5 md:scroll-mt-[54px] md:px-8 md:py-10 lg:scroll-mt-[56px] lg:py-12"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">
              Career Timeline
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Work Experience</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.75)] md:text-base">
              Roles and delivery scope sourced from the current resume, focused on enterprise systems, .NET APIs,
              React/Next.js interfaces, and long-term production support.
            </p>
          </div>

          <div className="mt-3 grid items-start gap-5 md:mt-4 md:gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="space-y-3 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-4 shadow-[0_18px_50px_rgba(2,6,23,0.30)] sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.72)]">
                Snapshot
              </p>
              <div className="space-y-2.5">
                <div className="rounded-2xl border border-[rgba(59,130,246,0.36)] bg-[rgba(59,130,246,0.16)] px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[rgba(255,255,255,0.70)]">Experience</p>
                  <p className="mt-1 text-sm font-semibold text-[rgba(255,255,255,0.94)]">15+ years</p>
                </div>
                <div className="rounded-2xl border border-[rgba(245,158,11,0.36)] bg-[rgba(245,158,11,0.14)] px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[rgba(255,255,255,0.70)]">Roles Listed</p>
                  <p className="mt-1 text-sm font-semibold text-[rgba(255,255,255,0.94)]">{workExperiences.length}</p>
                </div>
                <div className="rounded-2xl border border-[rgba(16,185,129,0.36)] bg-[rgba(16,185,129,0.14)] px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[rgba(255,255,255,0.70)]">Current Track</p>
                  <p className="mt-1 text-sm font-semibold text-[rgba(255,255,255,0.94)]">
                    {currentlyActiveExperience?.job_title ?? "Freelance delivery"}
                  </p>
                </div>
              </div>
            </aside>

            <div className="relative space-y-4 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-px before:bg-[linear-gradient(180deg,_rgba(59,130,246,0.65)_0%,_rgba(148,163,184,0.20)_45%,_rgba(245,158,11,0.55)_100%)]">
              {workExperiences.map((role) => {
                const companyLine = role.company ? role.company : "Freelance";
                const metaLine = role.location ? `${companyLine} · ${role.location}` : companyLine;
                return (
                  <article
                    key={`${role.job_title}-${role.start}`}
                    className="relative rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] p-4 shadow-[0_18px_50px_rgba(2,6,23,0.28)] transition hover:-translate-y-0.5 hover:border-[rgba(59,130,246,0.48)] sm:p-5"
                  >
                    <span className="absolute -left-[1.45rem] top-7 h-3 w-3 rounded-full border border-[#0B1220] bg-[#3B82F6] shadow-[0_0_0_4px_rgba(59,130,246,0.25)]" />

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-[rgba(255,255,255,0.94)]">
                          {role.job_title}
                        </h3>
                        <p className="mt-1 text-sm text-[rgba(255,255,255,0.72)]">{metaLine}</p>
                      </div>
                      <span className="rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs font-medium text-[rgba(255,255,255,0.88)]">
                        {role.start} - {role.end}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[rgba(255,255,255,0.90)] md:text-[15px]">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#F59E0B]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section
          id="products"
          className="mx-auto max-w-7xl scroll-mt-[52px] px-4 py-8 sm:px-5 md:scroll-mt-[54px] md:px-8 md:py-10 lg:scroll-mt-[56px] lg:py-12"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">Shipped Products</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Products</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.75)] md:text-base">
              Products I have shipped and currently maintain, with live links, screenshots, and implementation details.
            </p>
          </div>

          <div className="mt-3 space-y-4 md:mt-4 md:space-y-5">
            {productProjectEntries.map(({ project, index: projectIndex }) => (
              <article
                key={project.id}
                className="grid items-start gap-6 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] p-4 shadow-[0_18px_60px_rgba(2,6,23,0.35)] transition hover:-translate-y-1 sm:p-5 md:gap-8 md:p-8 lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] p-4 sm:p-5">
                  <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.10)] pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                    <span className="ml-2 text-xs text-[rgba(255,255,255,0.70)]">{project.browserLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const coverIndex = project.galleryImages.findIndex((image) => image === project.coverImage);
                      openGallery(projectIndex, coverIndex >= 0 ? coverIndex : 0);
                    }}
                    className="group mt-4 block w-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-left transition hover:border-[rgba(59,130,246,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.coverAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.10)] bg-[rgba(11,18,32,0.70)] px-3 py-2 text-[11px] text-[rgba(255,255,255,0.84)] backdrop-blur">
                      <span>Open gallery</span>
                      <span>{project.galleryImages.length} screenshots</span>
                    </div>
                  </button>
                </div>

                <div className="space-y-6 lg:pt-1">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-[rgba(255,255,255,0.92)]">{project.title}</h3>
                    {"featureNote" in project && project.featureNote && (
                      <span className="inline-flex rounded-full border border-[rgba(245,158,11,0.30)] bg-[rgba(245,158,11,0.14)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FBBF24]">
                        {project.featureNote}
                      </span>
                    )}
                    <p className="text-base leading-relaxed text-[rgba(255,255,255,0.70)]">{project.subtitle}</p>
                  </div>

                  <ul className="space-y-2 text-sm leading-relaxed text-[rgba(255,255,255,0.92)] md:text-base">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#F59E0B]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 text-xs font-medium text-[rgba(255,255,255,0.92)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      {project.primaryLinkLabel || "Live Demo"}
                    </a>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-[rgba(255,255,255,0.22)] px-5 py-3 text-sm font-semibold text-[rgba(255,255,255,0.92)] transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      >
                        GitHub Repo
                      </a>
                    )}
                  </div>
                  {"legalLinks" in project && project.legalLinks && (
                    <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[12px] font-medium text-[rgba(255,255,255,0.70)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                      <a
                        href={project.legalLinks.privacyPolicy}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full px-1.5 py-0.5 transition hover:bg-[rgba(255,255,255,0.06)] hover:text-[rgba(255,255,255,0.94)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      >
                        Privacy Policy
                      </a>
                      <span aria-hidden className="h-3.5 w-px bg-[rgba(255,255,255,0.18)]" />
                      <a
                        href={project.legalLinks.termsOfService}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full px-1.5 py-0.5 transition hover:bg-[rgba(255,255,255,0.06)] hover:text-[rgba(255,255,255,0.94)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      >
                        Terms of Service
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="other-work"
          className="mx-auto max-w-7xl scroll-mt-[52px] px-4 py-8 sm:px-5 md:scroll-mt-[54px] md:px-8 md:py-10 lg:scroll-mt-[56px] lg:py-12"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">Selected Work</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Client &amp; Company Work</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.75)] md:text-base">
              Client and company work that does not belong in the products shelf, but still demonstrates delivery
              scope, implementation depth, and long-term maintenance.
            </p>
          </div>

          <div className="mt-3 space-y-4 md:mt-4 md:space-y-5">
            {otherWorkEntries.map(({ project, index: projectIndex }) => (
              <article
                key={project.id}
                className="grid items-start gap-6 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] p-4 shadow-[0_18px_60px_rgba(2,6,23,0.35)] transition hover:-translate-y-1 sm:p-5 md:gap-8 md:p-8 lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] p-4 sm:p-5">
                  <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.10)] pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                    <span className="ml-2 text-xs text-[rgba(255,255,255,0.70)]">{project.browserLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const coverIndex = project.galleryImages.findIndex((image) => image === project.coverImage);
                      openGallery(projectIndex, coverIndex >= 0 ? coverIndex : 0);
                    }}
                    className="group mt-4 block w-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-left transition hover:border-[rgba(59,130,246,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.coverAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.10)] bg-[rgba(11,18,32,0.70)] px-3 py-2 text-[11px] text-[rgba(255,255,255,0.84)] backdrop-blur">
                      <span>Open gallery</span>
                      <span>{project.galleryImages.length} screenshots</span>
                    </div>
                  </button>
                </div>

                <div className="space-y-6 lg:pt-1">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-[rgba(255,255,255,0.92)]">{project.title}</h3>
                    {"featureNote" in project && project.featureNote && (
                      <span className="inline-flex rounded-full border border-[rgba(245,158,11,0.30)] bg-[rgba(245,158,11,0.14)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FBBF24]">
                        {project.featureNote}
                      </span>
                    )}
                    <p className="text-base leading-relaxed text-[rgba(255,255,255,0.70)]">{project.subtitle}</p>
                  </div>

                  <ul className="space-y-2 text-sm leading-relaxed text-[rgba(255,255,255,0.92)] md:text-base">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#F59E0B]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 text-xs font-medium text-[rgba(255,255,255,0.92)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      {project.primaryLinkLabel || "Live Demo"}
                    </a>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-[rgba(255,255,255,0.22)] px-5 py-3 text-sm font-semibold text-[rgba(255,255,255,0.92)] transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      >
                        GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section
          id="skills"
          className="mx-auto max-w-7xl scroll-mt-[52px] px-4 py-8 sm:px-5 md:scroll-mt-[54px] md:px-8 md:py-10 lg:scroll-mt-[56px] lg:py-12"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">Capability Map</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Skills & Delivery Capabilities</h2>
            <p className="w-full text-sm leading-relaxed text-[rgba(255,255,255,0.75)] md:text-base">
              Capabilities I use to build, modernize, and support production systems across web, mobile, legacy, Flutter, Supabase, and AI-assisted delivery workflows.
            </p>
            <p className="text-xs font-medium text-[rgba(255,255,255,0.56)] md:text-sm">
              {skillGroups.length} capability groups · {skillGroups.reduce((total, group) => total + group.items.length, 0)} skills across delivery, platforms, and infrastructure.
            </p>
          </div>
          <div className="mt-3 grid gap-4 md:mt-4 md:grid-cols-2 md:gap-5">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="group rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] p-5 shadow-[0_18px_50px_rgba(2,6,23,0.30)] transition hover:-translate-y-1 hover:border-[rgba(59,130,246,0.45)] md:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: group.accent }} />
                      <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.68)] transition group-hover:text-[rgba(255,255,255,0.82)]">
                      {group.focus}
                    </p>
                  </div>
                  <span
                    className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium text-[rgba(255,255,255,0.86)]"
                    style={{ borderColor: `${group.accent}66`, backgroundColor: `${group.accent}1A` }}
                  >
                    {group.items.length} skills
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    return (
                      <span
                        key={item.label}
                        className={
                          item.highlighted
                            ? "rounded-full border px-2.5 py-1 text-xs font-medium text-[rgba(255,255,255,0.96)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                            : "rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-2.5 py-1 text-xs text-[rgba(255,255,255,0.92)]"
                        }
                        style={
                          item.highlighted
                            ? { borderColor: `${group.accent}80`, backgroundColor: `${group.accent}26` }
                            : undefined
                        }
                      >
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        {isContactSectionVisible && <SectionDivider />}

        {isContactSectionVisible && (
          <section
            id="contact"
            className="mx-auto max-w-7xl scroll-mt-[52px] px-4 pb-10 pt-8 sm:px-5 md:scroll-mt-[54px] md:px-8 md:pb-14 md:pt-10 lg:scroll-mt-[56px] lg:pt-12 lg:pb-14"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">Get In Touch</p>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Contact</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.75)] md:text-base">
                Share your project goals, scope, and timeline. I usually respond within 24 hours.
              </p>
            </div>
            <div className="mt-3 grid gap-6 md:mt-4 md:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-5 rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_18px_50px_rgba(2,6,23,0.26)] md:p-6">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">Let&apos;s build something reliable</h3>
                <p className="max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.70)] md:text-lg">
                  I help teams design, build, and modernize .NET APIs, React/Next.js interfaces, and internal systems with production-ready execution.
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-[rgba(59,130,246,0.45)] bg-[rgba(59,130,246,0.18)] px-3 py-1.5 font-medium text-[rgba(255,255,255,0.94)]">
                    {data.contact.location}
                  </span>
                  <span className="rounded-full border border-[rgba(16,185,129,0.45)] bg-[rgba(16,185,129,0.16)] px-3 py-1.5 font-medium text-[rgba(255,255,255,0.94)]">
                    {data.contact.responseTime}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.74)]">{data.contact.engagement}</p>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {data.contact.channels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                      className={`rounded-2xl border px-3.5 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                        channel.primary
                          ? "border-[rgba(59,130,246,0.52)] bg-[rgba(59,130,246,0.16)] hover:border-[rgba(59,130,246,0.78)]"
                          : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] hover:border-[rgba(14,165,233,0.56)]"
                      }`}
                      style={!channel.primary ? { boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" } : undefined}
                    >
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.68)]">{channel.label}</span>
                      <span className="mt-1 block text-sm font-medium text-[rgba(255,255,255,0.96)]">{channel.value}</span>
                    </a>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleContactSubmit}
                noValidate
                className="rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] p-4 shadow-[0_18px_50px_rgba(2,6,23,0.30)] sm:p-5 md:p-7"
              >
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.92)]">
                    Name
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1.5 w-full rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-4 py-2.5 text-[rgba(255,255,255,0.92)] placeholder:text-[rgba(255,255,255,0.45)] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.92)]">
                    Email
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1.5 w-full rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-4 py-2.5 text-[rgba(255,255,255,0.92)] placeholder:text-[rgba(255,255,255,0.45)] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.92)]">
                    Message
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="mt-1.5 w-full resize-y rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-[rgba(255,255,255,0.92)] placeholder:text-[rgba(255,255,255,0.45)] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      placeholder="Tell me about your project, current stack, timeline, and goals."
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className={`mt-3 inline-flex rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                    contactStatus === "sending"
                      ? "cursor-not-allowed opacity-75"
                      : "hover:-translate-y-0.5 hover:brightness-110"
                  }`}
                >
                  {contactStatus === "sending" ? "Sending..." : "Send message"}
                </button>

                {contactFeedback && (
                  <p
                    role={contactStatus === "error" ? "alert" : "status"}
                    className={`mt-3 text-sm leading-relaxed ${
                      contactStatus === "success" ? "text-[#86EFAC]" : "text-[#FCA5A5]"
                    }`}
                  >
                    {contactFeedback}
                  </p>
                )}
              </form>
            </div>
          </section>
        )}

        <footer className="border-t border-[rgba(255,255,255,0.10)]">
          <div className="mx-auto max-w-7xl px-4 py-7 sm:px-5 md:px-8 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold tracking-tight text-[rgba(255,255,255,0.92)]">{data.name}</p>
                <p className="max-w-md text-sm leading-relaxed text-[rgba(255,255,255,0.70)]">{data.footer.note}</p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[rgba(255,255,255,0.74)] md:justify-end">
                  {visibleNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="rounded-full px-1 py-0.5 transition hover:text-[rgba(255,255,255,0.94)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  {data.footer.social.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-3 py-1.5 text-xs text-[rgba(255,255,255,0.86)] transition hover:border-[rgba(59,130,246,0.52)] hover:text-[rgba(255,255,255,0.96)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      {link.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={openResumePreview}
                    className="rounded-xl border border-[rgba(59,130,246,0.40)] bg-[rgba(59,130,246,0.16)] px-4 py-2 text-xs font-semibold text-[rgba(255,255,255,0.96)] transition hover:-translate-y-0.5 hover:border-[rgba(59,130,246,0.68)] hover:bg-[rgba(59,130,246,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.10)] pt-4 text-xs text-[rgba(255,255,255,0.66)] sm:flex-row sm:items-center sm:justify-between">
              <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <span>© {year} {data.name}. All rights reserved.</span>
                <span aria-hidden>·</span>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="rounded-sm underline decoration-[rgba(255,255,255,0.35)] underline-offset-2 transition hover:text-[rgba(255,255,255,0.88)] hover:decoration-[rgba(255,255,255,0.80)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  {data.contact.email}
                </a>
              </span>
              <span className="max-w-[42rem] text-[rgba(255,255,255,0.58)] sm:text-right">{data.footer.projectStack}</span>
            </div>
          </div>
        </footer>
      </div>

      {isResumePreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume PDF preview"
          className="fixed inset-0 z-[88] flex items-center justify-center bg-[rgba(2,6,23,0.86)] p-3 backdrop-blur-md md:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeResumePreview();
            }
          }}
        >
          <div className="flex max-h-[94vh] w-full max-w-[98vw] flex-col overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.16)] bg-[rgba(11,18,32,0.94)] shadow-[0_30px_90px_rgba(2,6,23,0.78)] md:max-w-[94vw]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.10)] px-4 py-3 md:px-6">
              <div>
                <p className="text-sm font-semibold text-[rgba(255,255,255,0.94)]">Resume Preview</p>
                <p className="text-xs text-[rgba(255,255,255,0.70)]">A4 format • Download ready PDF</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadResumePdf}
                  disabled={isResumeDownloading}
                  className={`rounded-xl bg-[#3B82F6] px-4 py-2 text-xs font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                    isResumeDownloading ? "cursor-not-allowed opacity-75" : "hover:brightness-110"
                  }`}
                >
                  {isResumeDownloading ? "Generating..." : "Download PDF"}
                </button>
                <button
                  type="button"
                  onClick={closeResumePreview}
                  disabled={isResumeDownloading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.92)] transition hover:scale-105 hover:border-[rgba(59,130,246,0.65)] hover:bg-[rgba(59,130,246,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-4.5 w-4.5" fill="none">
                    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="h-[80vh] bg-[rgba(2,6,23,0.50)] p-2 md:h-[84vh] md:p-4">
              {resumePreviewUrl ? (
                <iframe
                  title="Resume PDF preview"
                  src={resumePreviewUrl}
                  className="h-full w-full rounded-2xl border border-[rgba(255,255,255,0.16)] bg-white"
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-4 text-center text-sm text-[rgba(255,255,255,0.76)]">
                  {isResumePreviewLoading ? "Rendering PDF preview..." : "Preview unavailable. Use Download PDF to try again."}
                </div>
              )}
            </div>

            {resumeFeedback && (
              <p className="border-t border-[rgba(255,255,255,0.10)] px-4 py-3 text-sm text-[rgba(255,255,255,0.84)] md:px-6">
                {resumeFeedback}
              </p>
            )}
          </div>
        </div>
      )}

      {isGalleryOpen && activeProject && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} screenshots`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,6,23,0.84)] p-4 backdrop-blur-md md:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeGallery();
            }
          }}
        >
          <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.16)] bg-[rgba(11,18,32,0.92)] shadow-[0_30px_90px_rgba(2,6,23,0.75)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.10)] px-4 py-3 md:px-6">
                <div>
                  <p className="text-sm font-semibold text-[rgba(255,255,255,0.92)]">{activeProject.title}</p>
                  <p className="text-xs text-[rgba(255,255,255,0.70)]">
                    Screenshot {activeImageIndex + 1} of {activeGallery.length}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.70)]">
                  <button
                    type="button"
                    onClick={closeGallery}
                    aria-label="Close gallery"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.92)] transition hover:scale-105 hover:border-[rgba(59,130,246,0.65)] hover:bg-[rgba(59,130,246,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden className="h-4.5 w-4.5" fill="none">
                      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

            <div className="relative px-3 pb-3 pt-4 md:px-6 md:pb-6 md:pt-6">
              <img
                src={activeImage}
                alt={`${activeProject.title} screenshot ${activeImageIndex + 1}`}
                loading="eager"
                decoding="async"
                className="mx-auto max-h-[74vh] w-full rounded-2xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] object-contain"
              />

              {activeGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.22)] bg-[linear-gradient(180deg,_rgba(15,23,42,0.95)_0%,_rgba(30,41,59,0.85)_100%)] text-[rgba(255,255,255,0.96)] shadow-[0_12px_30px_rgba(2,6,23,0.55)] backdrop-blur-md transition duration-200 hover:-translate-y-1/2 hover:scale-105 hover:border-[rgba(59,130,246,0.70)] hover:bg-[linear-gradient(180deg,_rgba(30,58,138,0.75)_0%,_rgba(30,64,175,0.55)_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] md:left-5"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[rgba(255,255,255,0.10)]" />
                    <svg viewBox="0 0 24 24" aria-hidden className="relative h-5 w-5" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.22)] bg-[linear-gradient(180deg,_rgba(15,23,42,0.95)_0%,_rgba(30,41,59,0.85)_100%)] text-[rgba(255,255,255,0.96)] shadow-[0_12px_30px_rgba(2,6,23,0.55)] backdrop-blur-md transition duration-200 hover:-translate-y-1/2 hover:scale-105 hover:border-[rgba(59,130,246,0.70)] hover:bg-[linear-gradient(180deg,_rgba(30,58,138,0.75)_0%,_rgba(30,64,175,0.55)_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] md:right-5"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[rgba(255,255,255,0.10)]" />
                    <svg viewBox="0 0 24 24" aria-hidden className="relative h-5 w-5" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {activeGallery.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[rgba(255,255,255,0.10)] px-4 py-3 md:px-6">
                {activeGallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View screenshot ${index + 1}`}
                    className={`h-2.5 rounded-full transition ${
                      activeImageIndex === index
                        ? "w-7 bg-[#3B82F6]"
                        : "w-2.5 bg-[rgba(255,255,255,0.30)] hover:bg-[rgba(255,255,255,0.55)]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
