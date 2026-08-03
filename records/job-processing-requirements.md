# Job Post Analysis and Cover Letter Workflow

This document is the session-local operating rule for any JobStreet or recruiter-related request in this repository.

When a new session starts with a job-post URL, screenshots, recruiter message, or a request to analyze a role or draft a cover letter, follow this workflow before answering:

Job-post retrieval:

- For Indeed job-post URLs, use the Google Chrome ChatGPT extension to retrieve the visible job-post data when available.
- If Chrome retrieval is unavailable, use the Codex app's built-in browser as the alternative.
- Use the retrieved page data—including title, company, location, work arrangement, job type, description, and requirements—for tracker matching and role analysis.
- If both browser options fail, report which job details could not be verified and do not infer them from the URL alone.

Required response for supplied job posts:

- Whenever a job-post URL, screenshot, or recruiter message is provided, analyze the role using the verified posting data and the verified professional background before answering.
- Always provide a recommendation after the analysis, such as pursue, consider, wait for clarification, or skip, with the main reasons and any important gaps.
- A recommendation does not by itself authorize creating or updating a tracker record.

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
6. If a similar post exists, show the similar post details in the assistant reply and wait for the user's follow-up before taking any application-tracking action.
7. When a job-post URL is shared without a follow-up instruction, still analyze the role and provide a recommendation, but treat it as not pursued and do not create or update a tracker record.
8. If the user says "skip" or uses a similar phrase, do not create or update a tracker record.
9. Create or update a tracker record only when the user clearly indicates pursuit, such as saying "applied," "applying," requesting a cover letter, or giving a similar instruction to proceed with the role.
10. Keep the record updated with:
   - source URL
   - job title and company
   - recruiter name if known
   - application status
   - fit score or qualification assessment
   - whether a cover letter was drafted
   - next action
   - concise notes about why the role is a match or mismatch

Background source rule:

- Always read `D:\Projects\portfolio\src\content\portfolio.json` when you need verified professional background, work history, skills, resume content, or other career evidence.
- Use `careerContent` for resume, work history, skills, education, and resume contact facts.
- Use `careerProfile` for availability, remote preference, strengths, career goals, and target roles.
- Use `profile` for current website positioning and contact copy, and `appDefaults.projects` for verified portfolio-project descriptions and technology claims.
- `src/content/portfolio.ts` is not professional-background evidence; use it only to confirm project image-key mapping when that is relevant.
- Do not rely only on memory or prior session summaries when the relevant facts can be verified in `portfolio.json`.
- If a detail is not present in the applicable `portfolio.json` section, mark it as unverified unless the user explicitly provides it in the current session.

Decision rules:

- If the role is clearly outside the verified experience, explain the mismatch and do not draft a cover letter. Create a `skipped` tracker record only if the user clearly indicates pursuit or asks for the role to be recorded.
- If the role is a partial match, give an honest fit assessment before drafting anything.
- If the role is a strong match, proceed with the analysis or cover letter after the tracker has been updated.
- Do not invent qualifications, tools, or employer details that were not verified in the session.
- Quick verification only applies to `records/job-applications.json`.
- Treat posts as similar when they share similar company and position, similar job description, similar stack or requirements, or are almost identical in job nature.
- The job must be 100% remote to proceed normally.
- If the job post clearly says `hybrid`, `onsite`, or any similar in-office requirement, explain that it does not meet the fully remote preference. Create a `skipped` tracker record only if the user clearly indicates pursuit or asks for the role to be recorded.
- If the job post is clearly 100% remote, proceed as normal.
- If the location wording is unclear, show the job-post details and wait for further instructions before deciding.

Recommended matching order:

1. Exact URL or job ID.
2. Recruiter message referencing the same role.
3. Same company and role title.
4. Same role description or core requirements.
5. Closest semantic match across title, stack, and responsibilities.

Application-channel guidance:

- Indeed applications on ph.indeed.com do not require a cover letter unless the employer separately requests one.
- JobStreet applications completed on jobstreet.com may require a cover letter; draft and show a copy-ready letter when the application form requests it.
- Record the application channel and cover-letter requirement in the tracker when the information is known.

Message and email handling guidance:

- If the user posts or attaches a screenshot of an email, DM, or any message that implies a job-application update, first identify the sender and search the tracker for the matching record.
- Never update a tracker record based only on the assumption that the newest screenshot or pasted message belongs to the most recent job record.
- A tracker update based on an email or message requires a 100% verified match between the message and the record.
- If the sender, company, role, or application context does not clearly match an existing record, ask for confirmation before updating anything.
- Treat each screenshot or pasted message as a separate item to verify and match against the tracker before making changes.
- Do not guess, infer, or “best-guess” the target record when the match is uncertain.

When the user asks for a cover letter:

- First verify whether the role is a reasonable fit.
- If the fit is weak, explain the gap and stop.
- If the fit is acceptable, draft a concise, copy-ready letter.
- Keep the letter aligned to the verified resume content and the original job requirements.

Cover letter template guidance:

- Use a short, copy-ready format with clean paragraphs.
- Format the cover letter as plain text only—do not use Markdown, HTML, bullets, headings, or block quotes. Insert exactly two newline characters (`LF LF`) between every paragraph, creating one fully empty line. The copied text must preserve this empty line in a standard text editor. Return only the cover letter.
- Keep the tone professional, direct, and specific to the role.
- Never suggest providing an introduction video, résumé video, or other application video in a cover letter. If the job post requests a video, keep that requirement separate from the cover letter.
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

Application form guidance:

- For recurring numeric experience questions on relevant frontend/full-stack/JavaScript forms, use `8+` years when the role is asking for broad professional experience and the earlier web/software work is relevant.
- Keep lower numbers only for narrowly scoped technologies that are only verified in the recent stack history, such as React or Next.js when the form asks for those specifically.
- If a form asks for exact years rather than ranges, prefer the closest truthful whole number that supports the stronger professional framing, unless a narrower verified count is clearly more accurate.

## Squirex Job Post Profile Data

`job_post_profile` is optional and additive. It is intended for Squirex's read-only job-post grounding; the portfolio workflow, not Squirex, creates and updates it.

Populate a profile only from verified job-post, recruiter, or candidate sources. Preserve provenance through `source_documents` and each structured item's `source_id`. Extract structured responsibilities, requirements, and technologies whenever verified source material is available.

Keep recruiter guidance and candidate directives distinct from advertised job-post facts. Omit unknown or unverified data, including empty placeholder fields. Preserve backward compatibility for existing tracker consumers, and validate the JSON after every update.

### Schema and Generation Rules

The canonical additive structure is:

```json
{
  "job_post_profile": {
    "source_documents": [
      {
        "id": "job-post",
        "type": "job_post",
        "title": "Original job post",
        "url": "https://...",
        "captured_at": "YYYY-MM-DDTHH:mm:ssZ",
        "reliability": "primary",
        "text": "Concise verified job-post source text or accurately preserved relevant excerpt",
        "notes": ""
      }
    ],
    "responsibilities": [
      { "text": "Verified role responsibility", "priority": 100, "source_id": "job-post" }
    ],
    "requirements": [
      { "text": "Verified requirement", "class": "required", "mandatory": true, "minimum_years": null, "priority": 100, "source_id": "job-post" }
    ],
    "technologies": [
      { "name": "Technology name", "area": "backend", "proficiency": "professional", "requirement_class": "required", "priority": 100, "source_id": "job-post" }
    ],
    "interview_priorities": [
      { "audience": "hiring_manager", "text": "Verified interview focus", "priority": 100, "source_id": "recruiter-guidance" }
    ],
    "directives": [
      { "kind": "never_claim", "text": "Candidate-specific verified safeguard", "enabled": true, "source_id": "candidate-note" }
    ],
    "conflicts": [
      { "topic": "Conflicting claim", "source_a_id": "job-post", "source_b_id": "recruiter-guidance", "status": "unresolved", "resolution_note": "Keep claims separate until verified." }
    ]
  }
}
```

`source_documents` is required whenever a profile exists. Every `source_id` must match a document ID. Source `type` is one of `job_post`, `recruiter_guidance`, `candidate_note`, or `manual`; source `reliability` is one of `primary`, `recruiter_provided`, or `candidate_provided`. Requirement classes are `required`, `preferred`, `responsibility`, `communication`, and `eligibility`. Technology areas are `frontend`, `backend`, `api`, `database`, `cloud`, `delivery`, and `tooling`. Directive kinds are `emphasis`, `avoid`, `answer_style`, `verification`, and `never_claim`. Conflict status is `unresolved`, `confirmed`, or `superseded`.

Assess every new or updated tracker record for Squirex eligibility. Enrich each existing record when verified source material is available; otherwise leave it unprofiled with no invented fallback. Use descending integer priorities, normally 100 for core facts and 70–90 for important preferences. Omit `interview_priorities`, `directives`, and `conflicts` when no verified data exists.

Keep advertised job-post facts, recruiter guidance, candidate directives, and application-tracker analysis strictly separate. Do not convert `fit_score`, `fit_summary`, `notes`, `next_action`, cover-letter data, or application status into employer requirements. Squirex has read-only access; the portfolio workflow owns all profile generation and updates.

Completion requires JSON validation after every update and a clean `git diff --check` result.

This workflow exists only for the repo-local record-keeping process. It must not be added to the public portfolio website.
