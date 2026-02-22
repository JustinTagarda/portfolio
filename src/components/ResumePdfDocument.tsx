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
    paddingTop: 18,
    paddingBottom: 11,
    paddingHorizontal: 24,
    fontSize: 9.5,
    lineHeight: 1.29,
  },
  topRule: {
    backgroundColor: "#CBD5E1",
    height: 1,
  },
  header: {
    alignItems: "center",
    borderBottomColor: "#CBD5E1",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7.5,
    paddingBottom: 6.5,
  },
  headerInfo: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 10,
  },
  name: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: -0.18,
    lineHeight: 1,
  },
  title: {
    color: "#1D4ED8",
    fontSize: 10.2,
    fontWeight: 700,
    letterSpacing: 0.95,
    marginTop: 2.4,
    textTransform: "uppercase",
  },
  contactRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5.4,
  },
  contactItem: {
    color: "#334155",
    fontSize: 8,
    marginBottom: 1.5,
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
    height: 20,
    justifyContent: "center",
    marginTop: 2,
    paddingHorizontal: 10,
  },
  contactPortfolioText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 0.25,
    lineHeight: 1.05,
    textAlign: "center",
  },
  photoWrap: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderRadius: 10,
    borderWidth: 1,
    height: 82,
    overflow: "hidden",
    width: 82,
  },
  photo: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  section: {
    marginTop: 5.8,
  },
  sectionTitle: {
    color: "#334155",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1.7,
    textTransform: "uppercase",
  },
  summary: {
    color: "#1E293B",
    fontSize: 9.2,
    lineHeight: 1.34,
    marginTop: 2.9,
  },
  roleList: {
    marginTop: 3,
  },
  roleCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DEE6F0",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 3.2,
    paddingHorizontal: 7.8,
    paddingVertical: 5.2,
  },
  roleHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 24,
  },
  roleTitleBlock: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 7,
  },
  roleTitle: {
    color: "#0F172A",
    fontSize: 10.5,
    fontWeight: 700,
    lineHeight: 1.1,
  },
  roleCompany: {
    color: "#334155",
    fontSize: 8.2,
    marginTop: 1.25,
  },
  roleDateBadge: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    height: 18.5,
    justifyContent: "center",
    minWidth: 108,
    paddingHorizontal: 8,
    width: 108,
  },
  roleDateText: {
    color: "#1E293B",
    fontSize: 7.95,
    fontWeight: 700,
    lineHeight: 1,
    textAlign: "center",
  },
  bullets: {
    marginTop: 2.7,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 0.8,
  },
  bulletDot: {
    color: "#2563EB",
    fontSize: 8.6,
    marginTop: -0.1,
    width: 6,
  },
  bulletText: {
    color: "#0F172A",
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 8.3,
    lineHeight: 1.25,
  },
  bottomGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  skillsColumn: {
    width: "55%",
  },
  educationColumn: {
    width: "43%",
  },
  blockList: {
    marginTop: 3,
  },
  blockCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5EBF3",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 3,
    paddingHorizontal: 7,
    paddingVertical: 3.8,
  },
  blockTitle: {
    color: "#0F172A",
    fontSize: 8.2,
    fontWeight: 700,
  },
  blockBody: {
    color: "#334155",
    fontSize: 7.95,
    lineHeight: 1.25,
    marginTop: 1.05,
  },
});

export default function ResumePdfDocument({ resume, profilePhotoSrc }: ResumePdfDocumentProps) {
  return (
    <Document title={`${resume.name} - Resume`} author={resume.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.topRule} />

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
            <Text style={styles.sectionTitle}>Core Skills</Text>

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

              <View style={styles.blockCard}>
                <Text style={styles.blockTitle}>Work Model</Text>
                <Text style={styles.blockBody}>Remote-ready, distributed team collaboration, async execution.</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
