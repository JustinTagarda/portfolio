import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import React from "react";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";

const outputDir = dirname(new URL(import.meta.url).pathname.replace(/^\//, ""));
const data = JSON.parse(await readFile(resolve(outputDir, "one-workforce-global-resume.json"), "utf8"));
const h = React.createElement;

const styles = StyleSheet.create({
  page: { backgroundColor: "#F8FAFC", color: "#172033", fontFamily: "Helvetica", paddingHorizontal: 35, paddingVertical: 32 },
  header: { borderBottomColor: "#BFDBFE", borderBottomWidth: 1.2, paddingBottom: 10 },
  name: { color: "#0F172A", fontSize: 21, fontWeight: 700, letterSpacing: 0.1 },
  title: { color: "#1D4ED8", fontSize: 10, fontWeight: 700, letterSpacing: 0.65, marginTop: 3 },
  contact: { color: "#334155", fontSize: 7.6, lineHeight: 1.4, marginTop: 5 },
  availability: { color: "#1D4ED8", fontSize: 7.8, fontWeight: 700, marginTop: 4 },
  section: { marginTop: 12 },
  sectionTitle: { color: "#334155", fontSize: 8.4, fontWeight: 700, letterSpacing: 2.1, textTransform: "uppercase" },
  summary: { color: "#1E293B", fontSize: 8.65, lineHeight: 1.32, marginTop: 4 },
  skillCard: { backgroundColor: "#FFFFFF", borderColor: "#DCE6F2", borderRadius: 5, borderWidth: 1, marginTop: 5, paddingHorizontal: 8, paddingVertical: 5 },
  skillRow: { flexDirection: "row", paddingVertical: 1.65 },
  skillDivider: { borderBottomColor: "#E7EDF5", borderBottomWidth: 0.65 },
  skillDot: { color: "#2563EB", fontSize: 8, marginRight: 4, width: 5 },
  skillText: { color: "#334155", flexGrow: 1, flexShrink: 1, fontSize: 8, lineHeight: 1.2 },
  skillLabel: { color: "#1D4ED8", fontWeight: 700 },
  roleCard: { backgroundColor: "#FFFFFF", borderColor: "#DCE6F2", borderRadius: 6, borderWidth: 1, marginTop: 5, paddingHorizontal: 8, paddingVertical: 6 },
  roleHeader: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" },
  roleTitle: { color: "#0F172A", fontSize: 9.8, fontWeight: 700 },
  roleMeta: { color: "#475569", fontSize: 7.65, marginTop: 1.8 },
  dateBadge: { backgroundColor: "#F8FAFC", borderColor: "#CBD5E1", borderRadius: 12, borderWidth: 1, marginLeft: 8, paddingHorizontal: 7, paddingVertical: 3 },
  dateText: { color: "#334155", fontSize: 7.5, fontWeight: 700 },
  bullets: { marginTop: 4 },
  bulletRow: { flexDirection: "row", marginBottom: 1.75 },
  bulletDot: { color: "#2563EB", fontSize: 7.7, marginRight: 3.5, width: 5 },
  bulletText: { color: "#172033", flexGrow: 1, flexShrink: 1, fontSize: 8.2, lineHeight: 1.25 },
  educationCard: { backgroundColor: "#FFFFFF", borderColor: "#DCE6F2", borderRadius: 5, borderWidth: 1, marginTop: 5, paddingHorizontal: 8, paddingVertical: 6 },
  educationText: { color: "#334155", fontSize: 7.9, lineHeight: 1.25 }
});

function Section({ title, children }) {
  return h(View, { style: styles.section }, h(Text, { style: styles.sectionTitle }, title), children);
}

function Resume() {
  return h(Document, { title: "Justiniano Tagarda - One Workforce Global" },
    h(Page, { size: "A4", style: styles.page },
      h(View, { style: styles.header },
        h(Text, { style: styles.name }, data.name),
        h(Text, { style: styles.title }, data.title),
        h(Text, { style: styles.contact }, data.contact.slice(0, 3).join("  |  ")),
        h(Text, { style: styles.contact }, data.contact.slice(3).join("  |  ")),
        h(Text, { style: styles.availability }, data.availability)
      ),
      h(Section, { title: "Professional Summary" }, h(Text, { style: styles.summary }, data.summary)),
      h(Section, { title: "Core Skills" },
        h(View, { style: styles.skillCard }, data.skills.map(([label, value], index) =>
          h(View, { key: label, style: index < data.skills.length - 1 ? [styles.skillRow, styles.skillDivider] : styles.skillRow },
            h(Text, { style: styles.skillDot }, "•"),
            h(Text, { style: styles.skillText }, h(Text, { style: styles.skillLabel }, `${label}: `), value)
          )
        ))
      ),
      h(Section, { title: "Relevant Experience" }, data.experience.map((role) =>
        h(View, { key: role.role, style: styles.roleCard },
          h(View, { style: styles.roleHeader },
            h(View, null, h(Text, { style: styles.roleTitle }, role.role), h(Text, { style: styles.roleMeta }, `${role.company} - ${role.location}`)),
            h(View, { style: styles.dateBadge }, h(Text, { style: styles.dateText }, role.dates))
          ),
          h(View, { style: styles.bullets }, role.bullets.map((bullet) =>
            h(View, { key: bullet, style: styles.bulletRow }, h(Text, { style: styles.bulletDot }, "•"), h(Text, { style: styles.bulletText }, bullet))
          ))
        )
      )),
      h(Section, { title: "Education" }, h(View, { style: styles.educationCard }, h(Text, { style: styles.educationText }, data.education)))
    )
  );
}

const target = resolve(outputDir, "Resume - Justiniano Tagarda - One Workforce Global.pdf");
const buffer = await pdf(h(Resume)).toBuffer();
await writeFile(target, buffer);
console.log(target);
