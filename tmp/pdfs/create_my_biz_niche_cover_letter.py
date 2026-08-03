from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

output = r"D:\My-Biz-Niche-Cover-Letter-Justiniano-Tagarda.pdf"
doc = SimpleDocTemplate(
    output,
    pagesize=LETTER,
    rightMargin=0.85 * inch,
    leftMargin=0.85 * inch,
    topMargin=0.8 * inch,
    bottomMargin=0.8 * inch,
)
styles = getSampleStyleSheet()
body = ParagraphStyle(
    "LetterBody",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=11,
    leading=16,
    alignment=TA_LEFT,
    spaceAfter=14,
)
name = ParagraphStyle(
    "Name",
    parent=body,
    fontName="Helvetica-Bold",
    fontSize=15,
    leading=19,
    spaceAfter=4,
)
contact = ParagraphStyle(
    "Contact",
    parent=body,
    fontSize=9.5,
    leading=13,
    textColor="#4B5563",
    spaceAfter=24,
)

story = [
    Paragraph("Justiniano Tagarda", name),
    Paragraph("justintagarda@gmail.com | www.justintagarda.com", contact),
    Paragraph("Dear Hiring Team,", body),
    Paragraph("I am applying for the Junior Web Developer position at My Biz Niche. I am a web and software developer with extensive experience building, maintaining, and supporting production websites and business applications using HTML, CSS, JavaScript, REST APIs, React, Next.js, and TypeScript.", body),
    Paragraph("My background aligns with your need for reliable website development, landing-page implementation, API integrations, troubleshooting, quality assurance, and continuous improvement. I have delivered websites and web applications end-to-end, including the GEDAC Electric Company website, customer portals, dashboards, and internal business systems. I am comfortable translating requirements into practical solutions, testing changes before release, maintaining production systems, and collaborating with stakeholders.", body),
    Paragraph("I would welcome the opportunity to contribute my technical experience, attention to detail, and dependable approach to your team. My resume is attached, and selected projects are available at https://justintagarda.com.", body),
    Paragraph("Thank you for your time and consideration.", body),
    Spacer(1, 4),
    Paragraph("Sincerely,", body),
    Paragraph("Justiniano Tagarda", body),
]
doc.build(story)
