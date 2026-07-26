# Job Post Analysis and Cover Letter Workflow

This document is the session-local operating rule for any JobStreet or recruiter-related request in this repository.

When a new session starts with a job-post URL, screenshots, recruiter message, or a request to analyze a role or draft a cover letter, follow this workflow before answering:

1. Automatically search `records/job-applications.json` first. Do not ask for confirmation before doing this search.
2. Match against existing records using all available evidence, not just the URL.
3. Treat these as matching signals:
   - exact job-post URL
   - job ID in the URL
   - recruiter name
   - job title / role name
   - company name
   - role description
   - key requirements and must-have skills
   - visible screenshots or recruiter message content
4. Search existing job posts in this order:
   - exact job-post URL match
   - if not found, company/recruiter and position/role match
   - if not found, do a quick verification that the job post is a new record and not already represented by a similar post
5. If an exact or close match exists, show the job-post details, status, and action taken in the assistant reply right away and wait for further instructions.
6. If a similar post exists, show the similar post details in the assistant reply and ask for confirmation before creating a new record.
7. If no exact or close match found after quick verification, create a new entry in `records/job-applications.json` right away without requesting confirmation.
8. Keep the record updated with:
   - source URL
   - job title and company
   - recruiter name if known
   - application status
   - fit score or qualification assessment
   - whether a cover letter was drafted
   - next action
   - concise notes about why the role is a match or mismatch

Background source rule:

- Always read the files inside `D:\Projects\portfolio\src\content` when you need information about the user's professional background, work history, skills, resume content, or other verified career evidence.
- Treat `src/content` as the primary source of truth for background facts in this repo.
- Do not rely only on memory or prior session summaries when the relevant facts can be verified in `src/content`.
- If a detail is not present in `src/content`, mark it as unverified unless the user explicitly provides it in the current session.

Decision rules:

- If the role is clearly outside the verified experience, record it as `skipped` and do not draft a cover letter.
- If the role is a partial match, give an honest fit assessment before drafting anything.
- If the role is a strong match, proceed with the analysis or cover letter after the tracker has been updated.
- Do not invent qualifications, tools, or employer details that were not verified in the session.
- Quick verification only applies to `records/job-applications.json`.
- Treat posts as similar when they share similar company and position, similar job description, similar stack or requirements, or are almost identical in job nature.
- The job must be 100% remote to proceed normally.
- If the job post clearly says `hybrid`, `onsite`, or any similar in-office requirement, record it as `skipped`.
- If the job post is clearly 100% remote, proceed as normal.
- If the location wording is unclear, show the job-post details and wait for further instructions before deciding.

Recommended matching order:

1. Exact URL or job ID.
2. Recruiter message referencing the same role.
3. Same company and role title.
4. Same role description or core requirements.
5. Closest semantic match across title, stack, and responsibilities.

When the user asks for a cover letter:

- First verify whether the role is a reasonable fit.
- If the fit is weak, explain the gap and stop.
- If the fit is acceptable, draft a concise, copy-ready letter.
- Keep the letter aligned to the verified resume content and the original job requirements.

Cover letter template guidance:

- Use a short, copy-ready format with clean paragraphs.
- Keep the tone professional, direct, and specific to the role.
- Mention the role title, core fit, relevant stack, and production experience.
- Mention the attached résumé and portfolio link when relevant.
- Avoid unsupported claims, inflated metrics, or tools that were not verified in the session.
- Do not over-explain AI usage unless the role specifically asks for it.

Base template:

Dear [Hiring Team / Recruiter Name],

I am applying for the [job title] position. I am a [seniority] developer with experience building, maintaining, and supporting production applications using [verified stack and relevant technologies].

My background aligns well with this role’s focus on [key responsibilities from the job post]. I have worked on [briefly mention relevant work examples, such as APIs, databases, frontend integration, production support, migrations, dashboards, or client-facing systems], and I focus on delivering maintainable software that solves real business problems.

I would welcome the opportunity to contribute my experience in [role-specific strengths] to your team. My résumé is attached, and selected projects are available at https://justintagarda.com.

Thank you for your time and consideration.

Sincerely,
[Full Name]

This workflow exists only for the repo-local record-keeping process. It must not be added to the public portfolio website.
