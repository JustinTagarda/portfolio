// tmp/custom-resume/generate-one-workforce-master-style.tsx
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import React from "react";
import { pdf } from "@react-pdf/renderer";

// src/components/ResumePdfDocument.tsx
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { jsx, jsxs } from "react/jsx-runtime";
var styles = StyleSheet.create({
  page: {
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
    fontFamily: "Helvetica",
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 20,
    fontSize: 9.1,
    lineHeight: 1.24
  },
  header: {
    alignItems: "flex-start",
    borderBottomColor: "#CBD5E1",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingBottom: 5
  },
  headerInfo: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 8
  },
  name: {
    color: "#0F172A",
    fontSize: 21.6,
    fontWeight: 700,
    letterSpacing: -0.12,
    lineHeight: 1
  },
  title: {
    color: "#1D4ED8",
    fontSize: 8.7,
    fontWeight: 700,
    letterSpacing: 0.46,
    marginTop: 4,
    textTransform: "uppercase"
  },
  contactRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3.6
  },
  contactRowSecondary: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0.7
  },
  availability: {
    color: "#1D4ED8",
    fontSize: 7.45,
    fontWeight: 700,
    marginTop: 1.6
  },
  contactItem: {
    color: "#334155",
    fontSize: 7.7,
    lineHeight: 1.14,
    marginBottom: 0,
    marginRight: 11
  },
  contactPortfolioWrap: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1D4ED8",
    borderColor: "#1D4ED8",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 2.5,
    paddingHorizontal: 7,
    paddingVertical: 1.1
  },
  contactPortfolioText: {
    color: "#FFFFFF",
    fontSize: 7.25,
    fontWeight: 700,
    letterSpacing: 0.2,
    lineHeight: 1.05,
    textAlign: "center"
  },
  photoWrap: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderRadius: 9,
    borderWidth: 1,
    height: 74,
    overflow: "hidden",
    width: 74
  },
  photo: {
    height: "100%",
    objectFit: "cover",
    width: "100%"
  },
  section: {
    marginTop: 8
  },
  sectionTitle: {
    color: "#334155",
    fontSize: 7.7,
    fontWeight: 700,
    letterSpacing: 2.2,
    textTransform: "uppercase"
  },
  summary: {
    color: "#1E293B",
    fontSize: 8.65,
    lineHeight: 1.25,
    marginTop: 2.35,
    maxWidth: 512
  },
  roleList: {
    marginTop: 2.4
  },
  roleCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DEE6F0",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 4.05
  },
  roleCardGap: {
    marginTop: 2.4
  },
  roleHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 20
  },
  roleTitleBlock: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 6
  },
  roleTitle: {
    color: "#0F172A",
    fontSize: 10.4,
    fontWeight: 700,
    lineHeight: 1.08
  },
  roleCompany: {
    color: "#334155",
    fontSize: 7.75,
    marginTop: 2.3
  },
  roleDateBadge: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    height: 16.2,
    justifyContent: "center",
    minWidth: 104,
    paddingHorizontal: 7,
    width: 104
  },
  roleDateText: {
    color: "#1E293B",
    fontSize: 7.35,
    fontWeight: 700,
    lineHeight: 1,
    textAlign: "center"
  },
  bullets: {
    marginTop: 1.85
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 0.62
  },
  bulletDot: {
    color: "#2563EB",
    fontSize: 8,
    marginTop: -0.35,
    width: 5.2
  },
  bulletText: {
    color: "#0F172A",
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 8.05,
    lineHeight: 1.22
  },
  bottomGrid: {
    marginTop: 9
  },
  gridSection: {
    marginTop: 0
  },
  gridSectionGap: {
    marginTop: 9.6
  },
  twoColumnGrid: {
    marginTop: 3.1
  },
  twoColumnRow: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  twoColumnRowGap: {
    marginTop: 3.1
  },
  twoColumnItem: {
    width: "48.7%"
  },
  twoColumnSpacer: {
    width: "48.7%"
  },
  blockList: {
    marginTop: 0
  },
  blockCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5EBF3",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 3
  },
  skillsIntro: {
    color: "#334155",
    fontSize: 7.55,
    lineHeight: 1.16
  },
  skillsCard: {
    paddingVertical: 4
  },
  educationCard: {
    paddingVertical: 4.4
  },
  blockTitle: {
    color: "#0F172A",
    fontSize: 7.85,
    fontWeight: 700
  },
  blockBody: {
    color: "#334155",
    fontSize: 8.45,
    lineHeight: 1.18,
    marginTop: 0.8
  },
  blockMeta: {
    color: "#475569",
    fontSize: 7.7,
    marginTop: 0.7
  },
  skillSummaryList: {
    marginTop: 3
  },
  skillSummaryRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    paddingVertical: 1.25
  },
  skillSummaryRowDivider: {
    borderBottomColor: "#E7EDF5",
    borderBottomWidth: 0.7
  },
  skillSummaryDot: {
    color: "#2563EB",
    fontSize: 8.4,
    marginRight: 3.2,
    width: 5.5
  },
  skillSummaryText: {
    color: "#334155",
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 8.05,
    lineHeight: 1.2
  },
  skillSummaryLabel: {
    color: "#1D4ED8",
    fontWeight: 700
  }
});
function chunkIntoPairs(items) {
  const rows = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }
  return rows;
}
function extractYear(value) {
  if (!value) return "";
  const yearMatch = value.match(/\b\d{4}\b/);
  return yearMatch ? yearMatch[0] : value;
}
function formatEducationYears(start, end) {
  const startYear = extractYear(start);
  const endYear = extractYear(end);
  if (startYear && endYear && startYear === endYear) {
    return startYear;
  }
  return [startYear, endYear].filter(Boolean).join(" - ");
}
function splitSkillSummaryItem(item) {
  const separatorIndex = item.indexOf(":");
  if (separatorIndex === -1) {
    return { label: "", value: item };
  }
  return {
    label: item.slice(0, separatorIndex),
    value: item.slice(separatorIndex + 1).trim()
  };
}
function ResumePdfDocument({ resume: resume2, profilePhotoSrc }) {
  const educationRows = chunkIntoPairs(resume2.resume_education ?? resume2.education);
  return /* @__PURE__ */ jsx(Document, { title: `${resume2.name} - Resume`, author: resume2.name, children: /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsxs(View, { style: styles.header, children: [
      /* @__PURE__ */ jsxs(View, { style: styles.headerInfo, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.name, children: resume2.name }),
        /* @__PURE__ */ jsx(Text, { style: styles.title, children: resume2.title }),
        /* @__PURE__ */ jsxs(View, { style: styles.contactRow, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.contactItem, children: resume2.contact.email }),
          /* @__PURE__ */ jsx(Text, { style: styles.contactItem, children: resume2.contact.phone }),
          resume2.contact.location && /* @__PURE__ */ jsx(Text, { style: styles.contactItem, children: resume2.contact.location })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: styles.contactRowSecondary, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.contactItem, children: resume2.contact.linkedin }),
          resume2.contact.github && /* @__PURE__ */ jsx(Text, { style: styles.contactItem, children: resume2.contact.github })
        ] }),
        resume2.resume_availability && /* @__PURE__ */ jsx(Text, { style: styles.availability, children: resume2.resume_availability }),
        /* @__PURE__ */ jsx(View, { style: styles.contactPortfolioWrap, children: /* @__PURE__ */ jsxs(Text, { style: styles.contactPortfolioText, children: [
          "Portfolio: ",
          resume2.contact.portfolio
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(View, { style: styles.photoWrap, children: /* @__PURE__ */ jsx(Image, { src: profilePhotoSrc, style: styles.photo }) })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: styles.section, children: [
      /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "Professional Summary" }),
      /* @__PURE__ */ jsx(Text, { style: styles.summary, children: resume2.profile })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: styles.section, children: [
      /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "Work Experience" }),
      /* @__PURE__ */ jsx(View, { style: styles.roleList, children: resume2.work_experience.map((role, index) => {
        const companyLine = role.company ? role.company : "Freelance";
        const locationLine = role.location ? ` - ${role.location}` : "";
        return /* @__PURE__ */ jsxs(View, { style: index > 0 ? [styles.roleCard, styles.roleCardGap] : styles.roleCard, children: [
          /* @__PURE__ */ jsxs(View, { style: styles.roleHeader, children: [
            /* @__PURE__ */ jsxs(View, { style: styles.roleTitleBlock, children: [
              /* @__PURE__ */ jsx(Text, { style: styles.roleTitle, children: role.job_title }),
              /* @__PURE__ */ jsxs(Text, { style: styles.roleCompany, children: [
                companyLine,
                locationLine
              ] })
            ] }),
            /* @__PURE__ */ jsx(View, { style: styles.roleDateBadge, children: /* @__PURE__ */ jsxs(Text, { style: styles.roleDateText, children: [
              role.start,
              " - ",
              role.end
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(View, { style: styles.bullets, children: (role.resume_pdf_responsibilities ?? role.responsibilities).map((item, index2) => /* @__PURE__ */ jsxs(View, { style: styles.bulletRow, children: [
            /* @__PURE__ */ jsx(Text, { style: styles.bulletDot, children: "\u2022" }),
            /* @__PURE__ */ jsx(Text, { style: styles.bulletText, children: item })
          ] }, `${role.job_title}-responsibility-${index2}`)) })
        ] }, `${role.job_title}-${role.start}`);
      }) })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: styles.bottomGrid, children: [
      /* @__PURE__ */ jsxs(View, { style: styles.gridSection, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "Skills" }),
        /* @__PURE__ */ jsxs(View, { style: [styles.blockCard, styles.skillsCard], children: [
          /* @__PURE__ */ jsx(Text, { style: styles.skillsIntro, children: "Core capabilities for backend systems, SQL-backed business workflows, modern frontend interfaces, deployment, and production support." }),
          /* @__PURE__ */ jsx(View, { style: styles.skillSummaryList, children: (resume2.resume_skill_summary ?? []).map((item, index, items) => {
            const { label, value } = splitSkillSummaryItem(item);
            return /* @__PURE__ */ jsxs(
              View,
              {
                style: index < items.length - 1 ? [styles.skillSummaryRow, styles.skillSummaryRowDivider] : styles.skillSummaryRow,
                children: [
                  /* @__PURE__ */ jsx(Text, { style: styles.skillSummaryDot, children: "\u2022" }),
                  /* @__PURE__ */ jsxs(Text, { style: styles.skillSummaryText, children: [
                    label && /* @__PURE__ */ jsxs(Text, { style: styles.skillSummaryLabel, children: [
                      label,
                      ": "
                    ] }),
                    value
                  ] })
                ]
              },
              item
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: [styles.gridSection, styles.gridSectionGap], children: [
        /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "Education" }),
        /* @__PURE__ */ jsx(View, { style: styles.twoColumnGrid, children: educationRows.map((row, rowIndex) => /* @__PURE__ */ jsxs(View, { style: rowIndex > 0 ? [styles.twoColumnRow, styles.twoColumnRowGap] : styles.twoColumnRow, children: [
          row.map((item) => /* @__PURE__ */ jsxs(View, { style: [styles.twoColumnItem, styles.blockCard, styles.educationCard], children: [
            /* @__PURE__ */ jsx(Text, { style: styles.blockTitle, children: item.degree_or_certificate }),
            /* @__PURE__ */ jsxs(Text, { style: styles.blockBody, children: [
              item.institution,
              " - ",
              item.location
            ] }),
            formatEducationYears(item.start, item.end) && /* @__PURE__ */ jsx(Text, { style: styles.blockMeta, children: formatEducationYears(item.start, item.end) })
          ] }, `${item.degree_or_certificate}-${item.institution}`)),
          row.length === 1 && /* @__PURE__ */ jsx(View, { style: styles.twoColumnSpacer })
        ] }, `education-row-${rowIndex}`)) })
      ] })
    ] })
  ] }) });
}

// src/content/career-content.json
var career_content_default = {
  source_file_name: "Resume - Justiniano Tagarda.pdf",
  name: "JUSTINIANO TAGARDA",
  title: "SENIOR .NET BACKEND & FULL-STACK DEVELOPER",
  profile: "Senior .NET developer with extensive experience building and supporting production APIs, SQL-backed business systems, internal platforms, and customer portals. Backend-first in C#, .NET, ASP.NET, and SQL Server, with full-stack delivery experience using React, Next.js, and TypeScript. Skilled at translating business requirements into maintainable software and supporting it through deployment, troubleshooting, and ongoing operations.",
  resume_profile: "Senior .NET backend and full-stack developer experienced in modernizing business-critical systems, production APIs, SQL-backed workflows, customer portals, and released products. Hands-on across system design, deployment, troubleshooting, and long-term support.",
  resume_show_photo: false,
  resume_availability: "Open to full-time remote senior .NET/backend or full-stack opportunities.",
  resume_portfolio_label: "Portfolio: published apps, production systems, and project case studies",
  resume_skill_summary: [
    "Core: C#, .NET, ASP.NET Core, ASP.NET Framework, REST APIs, SQL Server, Entity Framework Core",
    "Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS",
    "Delivery: IIS, Windows Server, Docker, Azure DevOps, xUnit, PostgreSQL",
    "Cross-platform: Flutter, Dart, Microsoft Store, Google Play"
  ],
  resume_education: [
    {
      degree_or_certificate: "BS Commerce major in Accounting",
      institution: "Xavier University College",
      location: "Cagayan de Oro City, Philippines",
      start: "",
      end: ""
    }
  ],
  work_experience: [
    {
      job_title: "Freelance Software Developer",
      company: "Independent",
      location: null,
      start: "2021",
      end: "Present (Active)",
      responsibilities: [
        "Built and shipped web, desktop, and cross-platform applications, including products published on the Microsoft Store and Google Play.",
        "Built responsive React, Next.js, and TypeScript interfaces integrated with .NET REST APIs.",
        "Implemented API integrations, authentication flows, dashboards, and data-driven business workflows.",
        "Worked directly with clients to define scope, refine functionality, and deliver maintainable production software."
      ],
      resume_responsibilities: [
        "Built and shipped web, desktop, and cross-platform products, including applications published on the Microsoft Store and Google Play.",
        "Delivered React, Next.js, and TypeScript interfaces integrated with .NET REST APIs, authentication flows, dashboards, and data-driven workflows.",
        "Partnered directly with clients to define scope and deliver maintainable production software."
      ]
    },
    {
      job_title: "Backend Developer - ASP.NET Framework & SQL Server",
      company: "Drizzio / Digital Entrepreneur LLC",
      location: "USA (Remote)",
      start: "Nov 2024",
      end: "Jan 2026",
      responsibilities: [
        "Improved the .NET backend codebase and strengthened data bindings between backend services and frontend pages.",
        "Delivered a Twilio communications dashboard across backend and frontend layers, giving support, operations staff, and company leadership visual reporting on SMS and email delivery status, failures, and client communication activity.",
        "Led the end-to-end migration of multiple production websites, services, and databases - including the primary website and SQL Server environment - from Windows Server 2022 to newly provisioned Windows Server 2025 hosts, completing the cutover and retiring the legacy servers from active use.",
        "Configured IIS, SQL Server, and dependent services on the new environment, supporting the migration and production cutover.",
        "Monitored and maintained production server infrastructure, providing prompt incident support during service downtime."
      ],
      resume_responsibilities: [
        "Delivered a Twilio communications dashboard with visual SMS and email status reporting for support, operations, and company leadership.",
        "Led the end-to-end migration of production websites, services, and databases - including the primary website and SQL Server environment - from Windows Server 2022 to Windows Server 2025.",
        "Improved .NET backend services and frontend data bindings for production workflows.",
        "Configured IIS, SQL Server, and dependent services for the new environment, supporting the migration and production cutover.",
        "Monitored production infrastructure and provided incident support during service downtime.",
        "Completed the production cutover and retired legacy servers from active use."
      ]
    },
    {
      job_title: "IT Manager",
      company: "GEDAC Electric Company",
      location: "Jeddah, Saudi Arabia",
      start: "2015",
      end: "2020",
      responsibilities: [
        "Promoted to IT Manager to supervise IT staff responsible for hardware, network maintenance, and employee technical support.",
        "Owned monitoring, maintenance, and rapid downtime support for company-wide applications and infrastructure serving the head office, Saudi regional branches, and international sales offices.",
        "Established and administered core infrastructure from the ground up, including SQL Server, IIS, file-sharing services, virtual machines, and network services used across departments."
      ],
      resume_responsibilities: [
        "Promoted to IT Manager to supervise IT staff responsible for hardware, network maintenance, and employee technical support.",
        "Owned monitoring, maintenance, and downtime support for company-wide applications and infrastructure across the head office, Saudi regional branches, and international sales offices.",
        "Established and administered SQL Server, IIS, file-sharing services, virtual machines, and network services used across departments."
      ]
    },
    {
      job_title: ".NET Developer / System Administrator",
      company: "GEDAC Electric Company",
      location: "Jeddah, Saudi Arabia",
      start: "2007",
      end: "2015",
      responsibilities: [
        "Solely designed and developed C#/.NET Framework WinForms applications for inventory, projects, engineering, procurement, sales, operations, and management reporting, deployed through ClickOnce.",
        "Modernized the legacy DOS-based inventory system into a customized Windows application, completing the transition and decommissioning the former platform.",
        "Built the company website, gedac.com, and an ASP.NET Web Forms customer portal for project-status inquiries, client messaging, feedback, and document sharing with sales and engineering teams."
      ],
      resume_responsibilities: [
        "Solely designed and developed C#/.NET Framework WinForms applications for inventory, projects, engineering, procurement, sales, operations, and management reporting across company locations.",
        "Modernized the legacy DOS-based inventory system into a customized Windows application and decommissioned the former platform.",
        "Built gedac.com and an ASP.NET Web Forms customer portal for project-status inquiries, messaging, feedback, and document sharing."
      ]
    },
    {
      job_title: "Computer Programmer",
      company: "Al Salem Kitchen Company",
      location: "Jeddah, Saudi Arabia",
      start: "1999",
      end: "2006",
      responsibilities: [
        "Developed a company-wide inventory management system in Microsoft Access to improve tracking and internal processes.",
        "Maintained internal software tools supporting daily operations and reporting.",
        "Supported LAN infrastructure across offices, factories, and warehouses.",
        "Provided systems, hardware, and network troubleshooting across departments."
      ],
      resume_pdf_responsibilities: [
        "Developed a company-wide Microsoft Access inventory management system to improve tracking and internal processes.",
        "Supported internal software, LAN infrastructure, and technical troubleshooting across offices, factories, and warehouses."
      ]
    }
  ],
  skills: [
    {
      title: "Backend",
      accent: "#3B82F6",
      focus: "C#, .NET APIs, integrations, and service layers for dependable business workflows.",
      items: [
        {
          label: "ASP.NET Core",
          highlighted: true
        },
        {
          label: ".NET",
          highlighted: true
        },
        {
          label: "C#",
          highlighted: false
        },
        {
          label: "REST APIs",
          highlighted: true
        },
        {
          label: "ASP.NET Framework",
          highlighted: false
        },
        {
          label: "Entity Framework Core",
          highlighted: false
        }
      ]
    },
    {
      title: "Business Systems",
      accent: "#38BDF8",
      focus: "Internal tools, portals, dashboards, and workflow systems for daily operations.",
      items: [
        {
          label: "Internal Tools",
          highlighted: true
        },
        {
          label: "Admin Portals",
          highlighted: false
        },
        {
          label: "Custom Dashboards",
          highlighted: false
        },
        {
          label: "Workflow Automation",
          highlighted: false
        },
        {
          label: "Reporting Interfaces",
          highlighted: false
        }
      ]
    },
    {
      title: "Frontend",
      accent: "#14B8A6",
      focus: "Responsive dashboards, portals, and business interfaces built for real workflows.",
      items: [
        {
          label: "TypeScript",
          highlighted: true
        },
        {
          label: "React",
          highlighted: true
        },
        {
          label: "Next.js",
          highlighted: true
        },
        {
          label: "JavaScript",
          highlighted: false
        },
        {
          label: "Tailwind CSS",
          highlighted: false
        },
        {
          label: "HTML",
          highlighted: false
        },
        {
          label: "CSS",
          highlighted: false
        }
      ]
    },
    {
      title: "Testing & Quality",
      accent: "#A3E635",
      focus: "Automated regression coverage and repeatable validation before release.",
      items: [
        {
          label: "xUnit",
          highlighted: false
        },
        {
          label: "Automated Regression Testing",
          highlighted: false
        },
        {
          label: "Build/Test Validation",
          highlighted: false
        }
      ]
    },
    {
      title: "Databases",
      accent: "#F59E0B",
      focus: "Database design, reporting queries, and performance tuning for reliable business data.",
      items: [
        {
          label: "SQL Server",
          highlighted: true
        },
        {
          label: "PostgreSQL",
          highlighted: false
        },
        {
          label: "Supabase",
          highlighted: false
        },
        {
          label: "NoSQL",
          highlighted: false
        },
        {
          label: "MySQL",
          highlighted: false
        }
      ]
    },
    {
      title: "DevOps & Infrastructure",
      accent: "#60A5FA",
      focus: "IIS deployments, monitoring, troubleshooting, and release workflows for production systems.",
      items: [
        {
          label: "Docker",
          highlighted: false
        },
        {
          label: "IIS",
          highlighted: true
        },
        {
          label: "Azure DevOps",
          highlighted: false
        },
        {
          label: "CI/CD Pipeline Practices",
          highlighted: false
        }
      ]
    },
    {
      title: "Additional Experience",
      accent: "#C084FC",
      focus: "Legacy business applications and desktop systems.",
      items: [
        {
          label: "WPF",
          highlighted: false
        },
        {
          label: "Windows Forms",
          highlighted: false
        },
        {
          label: "Microsoft Access",
          highlighted: false
        }
      ]
    }
  ],
  education: [
    {
      degree_or_certificate: "BS Commerce major in Accounting",
      institution: "Xavier University College",
      location: "Cagayan de Oro City, Philippines",
      start: "",
      end: ""
    },
    {
      degree_or_certificate: "COBOL Programming Certificate",
      institution: "Systems Technology Institute",
      location: "Cagayan de Oro City, Philippines",
      start: "",
      end: ""
    }
  ],
  contact: {
    email: "justintagarda@gmail.com",
    phone: "(+63) 927-380-0613",
    linkedin: "www.linkedin.com/in/justintagarda",
    github: "github.com/JustinTagarda",
    location: "Remote (UTC+8)",
    portfolio: "www.justintagarda.com"
  },
  extracted_text: "JUSTINIANO TAGARDA\nFULL-STACK .NET DEVELOPER | ASP.NET Core \xB7 REST APIs \xB7 SQL Server \xB7 React\nBackend Developer - ASP.NET Framework & SQL Server\nDrizzio / Digital Entrepreneur LLC - USA (Remote)\nNov 2024 - Jan 2026\n\u2022 Developed and maintained high-availability backend APIs using .NET, supporting production systems used by thousands of daily users.\n\u2022 Collaborated with stakeholders to translate business requirements into scalable backend solutions.\n\u2022 Managed SQL Server performance, backups, and troubleshooting.\n\u2022 Developed client-side components using Knockout.js and jQuery.\n\u2022 Administered IIS deployments and server monitoring.\nSoftware Developer - Freelance\n2021 - Present (Active)\n\u2022 Delivered end-to-end software solutions across e-commerce platforms, internal business systems, and custom enterprise applications using modern web technologies.\n\u2022 Developed responsive, production-ready user interfaces using React, Next.js, and TypeScript, integrated with .NET and RESTful backend services.\n\u2022 Built full-stack features including API integrations, authentication flows, dashboards, and data-driven interfaces.\n\u2022 Collaborated directly with clients to gather requirements, refine functionality, and deliver maintainable production software.\n.NET Developer / System Administrator\nGEDAC Electric Company - Jeddah, Saudi Arabia\n2007 - 2020\n\u2022 Built and maintained the company website and multiple internal web applications, including ERP and inventory management systems that streamlined operations and improved data accuracy.\n\u2022 Developed a customer portal for real-time project tracking and internal tools used by branch offices to manage daily workflows.\n\u2022 Designed, deployed, and maintained business-critical systems supporting company operations and cross-department processes.\n\u2022 Supervised IT operations, ensuring system reliability, infrastructure stability, and effective technical support across the organization.\nComputer Programmer\nAl Salem Kitchen Company - Jeddah, Saudi Arabia\n1999 - 2006\n\u2022 Developed a company-wide inventory management system using Microsoft Access, improving tracking accuracy and streamlining internal processes.\n\u2022 Maintained and enhanced internal software tools to support daily operations and reporting.\n\u2022 Installed, configured, and supported LAN infrastructure across offices, factories, and warehouses, ensuring reliable connectivity and communication.\n\u2022 Provided technical support and troubleshooting for systems, hardware, and network issues across departments.\nPROFILE\nWORK EXPERIENCE\nSoftware Developer with 15+ years of experience designing, building, and maintaining enterprise web and desktop applications using .NET, ASP.NET, and SQL Server. Specialized in backend architecture, API development, and database performance optimization. Experienced working across the full stack, including modern JavaScript frameworks, to deliver scalable production systems. Comfortable collaborating with distributed remote teams.\nSKILLS\n\u2022 Backend: C#, .NET, ASP.NET Core, REST APIs\n\u2022 Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, jQuery, Knockout.js\n\u2022 Databases: SQL Server, PostgreSQL (Supabase), NoSQL\n\u2022 DevOps & Infrastructure: Docker, IIS, Azure DevOps\n\u2022 Tools: Git, GitHub, Visual Studio, VS Code, PowerShell\n\u2022 Collaboration: Jira, Slack, Figma\n\u2022 Productivity: GitHub Copilot, ChatGPT\nEDUCATION\nBachelor of Arts in Accountancy\nXavier University College\nCagayan de Oro City, Philippines\nJune 1987 - March 1992\nCOBOL Programming Certificate\nSystems Technology Institute\nCagayan de Oro City, Philippines\nJune 1992 - November 1992\nCONTACT ME\nEmail: justintagarda@gmail.com\nPhone: (+63) 927-380-0613\nLinkedIn: www.linkedin.com/in/justintagarda\nPortfolio: www.justintagarda.com\n-- 1 of 1 --"
};

// tmp/custom-resume/one-workforce-global-tailoring.json
var one_workforce_global_tailoring_default = {
  title: "FULL-STACK SOFTWARE DEVELOPER | .NET, REACT & SQL SERVER",
  profile: "Full-stack .NET developer with extensive experience building and supporting production web applications, REST APIs, SQL-backed business systems, and customer portals. Strong in C#, .NET, ASP.NET, SQL Server, React, Next.js, and TypeScript, with hands-on delivery across deployment, troubleshooting, and long-term production support. Recent work includes remote delivery for a US-based client and independently shipped web, desktop, and cross-platform products."
};

// tmp/custom-resume/generate-one-workforce-master-style.tsx
var h = React.createElement;
var photoBuffer = await readFile(resolve(process.cwd(), "src/assets/images/profile-photo.png"));
var photoDataUrl = `data:image/png;base64,${photoBuffer.toString("base64")}`;
var resume = {
  ...career_content_default,
  title: one_workforce_global_tailoring_default.title,
  profile: one_workforce_global_tailoring_default.profile
};
var target = resolve(process.cwd(), "tmp/custom-resume/Resume - Justiniano Tagarda - One Workforce Global.pdf");
var buffer = await pdf(h(ResumePdfDocument, { resume, profilePhotoSrc: photoDataUrl })).toBuffer();
await writeFile(target, buffer);
console.log(target);
