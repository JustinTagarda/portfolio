import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export type ResumeWorkExperience = {
  job_title: string;
  company: string | null;
  location: string | null;
  start: string;
  end: string;
  responsibilities: string[];
};

export type ResumeEducation = {
  degree_or_certificate: string;
  institution: string;
  location: string;
  start?: string;
  end?: string;
};

export type ResumeContact = {
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  location?: string;
  portfolio: string;
};

export type ResumeSkillItem = {
  label: string;
  highlighted: boolean;
};

export type ResumeSkillGroup = {
  title: string;
  accent: string;
  focus: string;
  items: ResumeSkillItem[];
};

export type ResumeData = {
  name: string;
  title: string;
  profile: string;
  work_experience: ResumeWorkExperience[];
  skills: ResumeSkillGroup[];
  education: ResumeEducation[];
  contact: ResumeContact;
};

type ResumePdfDocumentProps = {
  resume: ResumeData;
  profilePhotoSrc: string;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
    fontFamily: "Helvetica",
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 20,
    fontSize: 9.1,
    lineHeight: 1.24,
  },
  header: {
    alignItems: "flex-start",
    borderBottomColor: "#CBD5E1",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingBottom: 5,
  },
  headerInfo: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 8,
  },
  name: {
    color: "#0F172A",
    fontSize: 21.6,
    fontWeight: 700,
    letterSpacing: -0.12,
    lineHeight: 1,
  },
  title: {
    color: "#1D4ED8",
    fontSize: 8.7,
    fontWeight: 700,
    letterSpacing: 0.46,
    marginTop: 4,
    textTransform: "uppercase",
  },
  contactRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3.6,
  },
  contactRowSecondary: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0.7,
  },
  contactItem: {
    color: "#334155",
    fontSize: 7.7,
    lineHeight: 1.14,
    marginBottom: 0,
    marginRight: 11,
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
    paddingVertical: 1.1,
  },
  contactPortfolioText: {
    color: "#FFFFFF",
    fontSize: 7.25,
    fontWeight: 700,
    letterSpacing: 0.2,
    lineHeight: 1.05,
    textAlign: "center",
  },
  photoWrap: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderRadius: 9,
    borderWidth: 1,
    height: 74,
    overflow: "hidden",
    width: 74,
  },
  photo: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    color: "#334155",
    fontSize: 7.7,
    fontWeight: 700,
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  summary: {
    color: "#1E293B",
    fontSize: 8.65,
    lineHeight: 1.25,
    marginTop: 2.35,
    maxWidth: 512,
  },
  roleList: {
    marginTop: 2.4,
  },
  roleCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DEE6F0",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 4.05,
  },
  roleCardGap: {
    marginTop: 2.4,
  },
  roleHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 20,
  },
  roleTitleBlock: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 6,
  },
  roleTitle: {
    color: "#0F172A",
    fontSize: 10.4,
    fontWeight: 700,
    lineHeight: 1.08,
  },
  roleCompany: {
    color: "#334155",
    fontSize: 7.75,
    marginTop: 2.3,
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
    width: 104,
  },
  roleDateText: {
    color: "#1E293B",
    fontSize: 7.35,
    fontWeight: 700,
    lineHeight: 1,
    textAlign: "center",
  },
  bullets: {
    marginTop: 1.85,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 0.62,
  },
  bulletDot: {
    color: "#2563EB",
    fontSize: 8,
    marginTop: -0.35,
    width: 5.2,
  },
  bulletText: {
    color: "#0F172A",
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 8.05,
    lineHeight: 1.17,
  },
  bottomGrid: {
    marginTop: 9,
  },
  gridSection: {
    marginTop: 0,
  },
  gridSectionGap: {
    marginTop: 9.6,
  },
  twoColumnGrid: {
    marginTop: 3.1,
  },
  twoColumnRow: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  twoColumnRowGap: {
    marginTop: 3.1,
  },
  twoColumnItem: {
    width: "48.7%",
  },
  twoColumnSpacer: {
    width: "48.7%",
  },
  blockList: {
    marginTop: 0,
  },
  blockCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5EBF3",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  skillCard: {
    paddingVertical: 2.8,
  },
  skillsIntro: {
    color: "#334155",
    fontSize: 7.55,
    lineHeight: 1.16,
    marginTop: 2.2,
  },
  educationCard: {
    paddingVertical: 4.4,
  },
  blockTitle: {
    color: "#0F172A",
    fontSize: 7.85,
    fontWeight: 700,
  },
  skillCardHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  skillCardDot: {
    borderRadius: 999,
    height: 5.1,
    marginRight: 3.8,
    marginTop: 1.2,
    width: 5.1,
  },
  blockBody: {
    color: "#334155",
    fontSize: 8.45,
    lineHeight: 1.18,
    marginTop: 0.8,
  },
  blockMeta: {
    color: "#475569",
    fontSize: 7.7,
    marginTop: 0.7,
  },
  skillBulletList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0.2,
  },
  skillBulletRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 0.35,
    marginRight: 4.2,
  },
  skillBulletDot: {
    color: "#2563EB",
    fontSize: 8.4,
    marginRight: 1.6,
  },
  skillBulletText: {
    color: "#334155",
    fontSize: 7.9,
    lineHeight: 1.1,
  },
});

function chunkIntoPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }
  return rows;
}

function extractYear(value?: string) {
  if (!value) return "";
  const yearMatch = value.match(/\b\d{4}\b/);
  return yearMatch ? yearMatch[0] : value;
}

function formatEducationYears(start?: string, end?: string) {
  const startYear = extractYear(start);
  const endYear = extractYear(end);

  if (startYear && endYear && startYear === endYear) {
    return startYear;
  }

  return [startYear, endYear].filter(Boolean).join(" - ");
}

export default function ResumePdfDocument({ resume, profilePhotoSrc }: ResumePdfDocumentProps) {
  const skillsRows = chunkIntoPairs(resume.skills);
  const educationRows = chunkIntoPairs(resume.education);

  return (
    <Document title={`${resume.name} - Resume`} author={resume.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{resume.name}</Text>
            <Text style={styles.title}>{resume.title}</Text>

            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>{resume.contact.email}</Text>
              <Text style={styles.contactItem}>{resume.contact.phone}</Text>
              {resume.contact.location && <Text style={styles.contactItem}>{resume.contact.location}</Text>}
            </View>
            <View style={styles.contactRowSecondary}>
              <Text style={styles.contactItem}>{resume.contact.linkedin}</Text>
              {resume.contact.github && <Text style={styles.contactItem}>{resume.contact.github}</Text>}
            </View>
            <View style={styles.contactPortfolioWrap}>
              <Text style={styles.contactPortfolioText}>Portfolio: {resume.contact.portfolio}</Text>
            </View>
          </View>

          <View style={styles.photoWrap}>
            <Image src={profilePhotoSrc} style={styles.photo} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{resume.profile}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>

          <View style={styles.roleList}>
            {resume.work_experience.map((role, index) => {
              const companyLine = role.company ? role.company : "Freelance";
              const locationLine = role.location ? ` - ${role.location}` : "";

              return (
                <View key={`${role.job_title}-${role.start}`} style={index > 0 ? [styles.roleCard, styles.roleCardGap] : styles.roleCard}>
                  <View style={styles.roleHeader}>
                    <View style={styles.roleTitleBlock}>
                      <Text style={styles.roleTitle}>{role.job_title}</Text>
                      <Text style={styles.roleCompany}>
                        {companyLine}
                        {locationLine}
                      </Text>
                    </View>

                    <View style={styles.roleDateBadge}>
                      <Text style={styles.roleDateText}>
                        {role.start} - {role.end}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.bullets}>
                    {role.responsibilities.map((item, index) => (
                      <View key={`${role.job_title}-responsibility-${index}`} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomGrid}>
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsIntro}>
              Core capabilities for backend systems, SQL-backed business workflows, modern frontend interfaces, deployment, and production support.
            </Text>

            <View style={styles.twoColumnGrid}>
              {skillsRows.map((row, rowIndex) => (
                <View key={`skills-row-${rowIndex}`} style={rowIndex > 0 ? [styles.twoColumnRow, styles.twoColumnRowGap] : styles.twoColumnRow}>
                  {row.map((group) => (
                    <View key={group.title} style={[styles.twoColumnItem, styles.blockCard, styles.skillCard]}>
                      <View style={styles.skillCardHeader}>
                        <View style={[styles.skillCardDot, { backgroundColor: group.accent }]} />
                        <Text style={styles.blockTitle}>{group.title}</Text>
                      </View>
                      <View style={styles.skillBulletList}>
                        {group.items.map((skill) => (
                          <View key={`${group.title}-${skill.label}`} style={styles.skillBulletRow}>
                            <Text style={[styles.skillBulletDot, { color: group.accent }]}>•</Text>
                            <Text style={styles.skillBulletText}>{skill.label}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                  {row.length === 1 && <View style={styles.twoColumnSpacer} />}
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.gridSection, styles.gridSectionGap]}>
            <Text style={styles.sectionTitle}>Education</Text>

            <View style={styles.twoColumnGrid}>
              {educationRows.map((row, rowIndex) => (
                <View key={`education-row-${rowIndex}`} style={rowIndex > 0 ? [styles.twoColumnRow, styles.twoColumnRowGap] : styles.twoColumnRow}>
                  {row.map((item) => (
                    <View key={`${item.degree_or_certificate}-${item.institution}`} style={[styles.twoColumnItem, styles.blockCard, styles.educationCard]}>
                      <Text style={styles.blockTitle}>{item.degree_or_certificate}</Text>
                      <Text style={styles.blockBody}>
                        {item.institution} - {item.location}
                      </Text>
                      {formatEducationYears(item.start, item.end) && (
                        <Text style={styles.blockMeta}>
                          {formatEducationYears(item.start, item.end)}
                        </Text>
                      )}
                    </View>
                  ))}
                  {row.length === 1 && <View style={styles.twoColumnSpacer} />}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
