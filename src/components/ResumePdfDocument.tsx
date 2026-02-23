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
  portfolio: string;
};

export type ResumeData = {
  name: string;
  title: string;
  profile: string;
  work_experience: ResumeWorkExperience[];
  skills: Record<string, string[]>;
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
    marginTop: 3.1,
    textTransform: "uppercase",
  },
  contactRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  contactItem: {
    color: "#334155",
    fontSize: 7.7,
    marginBottom: 1,
    marginRight: 9,
  },
  contactPortfolioWrap: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1D4ED8",
    borderColor: "#1D4ED8",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    height: 18,
    justifyContent: "center",
    marginTop: 1.7,
    paddingHorizontal: 9,
  },
  contactPortfolioText: {
    color: "#FFFFFF",
    fontSize: 7.45,
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
  },
  roleList: {
    marginTop: 2.35,
  },
  roleCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DEE6F0",
    borderRadius: 7,
    borderWidth: 1,
    marginTop: 2.55,
    paddingHorizontal: 7,
    paddingVertical: 4.05,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9.4,
  },
  skillsColumn: {
    width: "58%",
  },
  educationColumn: {
    width: "40%",
  },
  blockList: {
    marginTop: 2.4,
  },
  blockCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5EBF3",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 2.25,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  blockTitle: {
    color: "#0F172A",
    fontSize: 7.85,
    fontWeight: 700,
  },
  blockBody: {
    color: "#334155",
    fontSize: 8.45,
    lineHeight: 1.18,
    marginTop: 0.8,
  },
});

export default function ResumePdfDocument({ resume, profilePhotoSrc }: ResumePdfDocumentProps) {
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
              <Text style={styles.contactItem}>{resume.contact.linkedin}</Text>
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
            {resume.work_experience.map((role) => {
              const companyLine = role.company ? role.company : "Freelance";
              const locationLine = role.location ? ` - ${role.location}` : "";

              return (
                <View key={`${role.job_title}-${role.start}`} style={styles.roleCard}>
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
          <View style={styles.skillsColumn}>
            <Text style={styles.sectionTitle}>Skills</Text>

            <View style={styles.blockList}>
              {Object.entries(resume.skills).map(([groupName, items]) => (
                <View key={groupName} style={styles.blockCard}>
                  <Text style={styles.blockTitle}>{groupName}</Text>
                  <Text style={styles.blockBody}>{items.join(", ")}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.educationColumn}>
            <Text style={styles.sectionTitle}>Education</Text>

            <View style={styles.blockList}>
              {resume.education.map((item, index) => (
                <View key={`${item.degree_or_certificate}-${item.institution}`} style={styles.blockCard}>
                  <Text style={styles.blockTitle}>
                    {item.degree_or_certificate}
                    {index === 0 ? " (Highest Qualification)" : ""}
                  </Text>
                  <Text style={styles.blockBody}>
                    {item.institution} - {item.location}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
