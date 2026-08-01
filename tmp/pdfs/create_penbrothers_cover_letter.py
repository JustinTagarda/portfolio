from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

output = r"D:\Projects\portfolio\records\cover-letter-penbrothers-full-stack-engineer.pdf"

doc = SimpleDocTemplate(
    output,
    pagesize=LETTER,
    rightMargin=0.78 * inch,
    leftMargin=0.78 * inch,
    topMargin=0.68 * inch,
    bottomMargin=0.68 * inch,
)

styles = getSampleStyleSheet()
name = ParagraphStyle("Name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=colors.HexColor("#163A5F"), spaceAfter=3)
role = ParagraphStyle("Role", parent=styles["Normal"], fontName="Helvetica", fontSize=9.5, leading=12, textColor=colors.HexColor("#4B6478"), spaceAfter=10)
contact = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=colors.HexColor("#4B6478"), spaceAfter=12)
body = ParagraphStyle("Body", parent=styles["Normal"], fontName="Helvetica", fontSize=10.3, leading=15.2, textColor=colors.HexColor("#253746"), spaceAfter=10)
closing = ParagraphStyle("Closing", parent=body, spaceAfter=0)

story = [
    Paragraph("Justiniano Tagarda", name),
    Paragraph("Senior .NET Backend & Full-Stack Developer", role),
    Paragraph("Cagayan de Oro City, Philippines  |  justintagarda@gmail.com  |  (+63) 927-380-0613  |  linkedin.com/in/justintagarda", contact),
    HRFlowable(width="100%", thickness=1, color=colors.HexColor("#D5E3EF"), spaceAfter=16),
    Paragraph("August 1, 2026", body),
    Paragraph("Hiring Team", body),
    Paragraph("Penbrothers", body),
    Spacer(1, 3),
    Paragraph("Dear Hiring Team,", body),
    Paragraph("I am applying for the Full Stack Engineer position supporting your client. I bring more than 20 years of experience building and maintaining production software, with hands-on delivery across backend services, web interfaces, databases, integrations, deployment, and operational support.", body),
    Paragraph("This role's focus on end-to-end product ownership aligns closely with my background. I have delivered production APIs and business systems using C# and .NET, built React, Next.js, and TypeScript interfaces, worked with SQL-backed workflows, and supported applications through deployment, troubleshooting, and continuous improvement. I am comfortable translating product and stakeholder needs into practical, maintainable software and taking responsibility for the result beyond implementation.", body),
    Paragraph("I also bring experience with REST API integrations, Docker, Git and GitHub, CI/CD practices, dashboards, authentication, and cloud-hosted applications. My current work includes AI-assisted development with human review, allowing me to move quickly while keeping code quality, reliability, and maintainability in view. My portfolio at <link href='https://www.justintagarda.com' color='#1769AA'>www.justintagarda.com</link> showcases selected web, desktop, AI, and cross-platform applications, including React/Next.js interfaces, .NET-backed business workflows, and production-oriented project work. I would welcome the opportunity to contribute in a fully remote, product-minded environment where autonomy, clear communication, and measurable delivery matter.", body),
    Paragraph("Thank you for your consideration. I would welcome the opportunity to discuss how my full-stack delivery and production ownership experience can support your client's product and engineering goals.", body),
    Paragraph("Sincerely,", closing),
    Spacer(1, 18),
    Paragraph("Justiniano Tagarda", body),
]

doc.build(story)
