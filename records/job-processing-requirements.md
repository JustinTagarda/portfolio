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

Application-instruction compliance:

- When reading a verified job post, extract every employer-specific application instruction, especially content under "How to Apply," "Application Instructions," or equivalent sections.
- Keep application instructions separate from job requirements, recruiter guidance, candidate directives, fit assessment, and cover-letter content.
- Classify each instruction when possible, including subject line, opening phrase, email address, application form, required attachment, résumé or portfolio link, screening question, availability detail, technical test, video request, or other submission requirement.
- Preserve exact wording, capitalization, URLs, recipient details, and required phrases from the verified source.
- Show required application instructions separately from the cover letter in the assistant response when they affect the user's next application step.
- Keep subject-line phrases, opening phrases, form instructions, and submission directions outside the cover-letter body unless the employer explicitly requires them inside the letter.
- Before presenting a final cover letter or application response, check every extracted instruction and mark it as satisfied, pending, or not applicable.
- If an instruction cannot be verified or completed, state that clearly and do not guess, omit it silently, or place it in the wrong application field.
- When the user confirms that an application was sent, record the verified application instructions and their completion status in the tracker when known.

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
- Use the following fit guidance: draft confidently for an 80–100 fit score, draft with one concise gap statement for a 65–79 fit score, and stop without drafting below 65 unless the user explicitly accepts the mismatch and asks to proceed.

Cover letter template guidance:

- Use a short, copy-ready format with clean paragraphs.
- Format the subject and cover letter as plain text only—do not use Markdown, HTML, bullets, headings, or block quotes. Always provide a separate `Subject:` line before the cover-letter body, even when the employer did not specify a subject. Insert exactly two newline characters (`LF LF`) between every paragraph, creating one fully empty line. The copied text must preserve this empty line in a standard text editor. Return only the subject line and cover letter, with no analysis or commentary.
- Keep the tone professional, direct, and specific to the role.
- Never suggest providing an introduction video, résumé video, or other application video in a cover letter. If the job post requests a video, keep that requirement separate from the cover letter.
- Mention the role title, core fit, relevant stack, and production experience.
- Use an evidence-based structure of approximately 180–240 words: exact role and seniority, the verified employer name when available, a focused verified stack, two or three matching responsibilities, one or two concrete production examples, an optional single-sentence gap statement, a direct contribution statement, and the portfolio link followed by the résumé link.
- Keep the opening technology list focused on the five to seven most relevant verified technologies; do not list the entire skills inventory.
- Replace generic capability lists with one or two concrete verified examples, such as production APIs, a Twilio communications dashboard, a Windows Server and SQL Server migration, React/Next.js interfaces integrated with .NET APIs, ERP or inventory systems, customer portals, or production incident support.
- Prefer concrete security wording such as JWT authentication, role-based access control, PostgreSQL security rules, OAuth, or RLS when those details match the role and are verified.
- Include a verified portfolio project only when it directly supports the job requirements; summarize its relevance in one sentence rather than turning the letter into a project description.
- If the employer name is verified, mention it once in the opening or contribution statement. If it is unknown, do not invent or infer it.
- Use `20+ years of software development experience` for broad professional seniority claims when relevant. Do not assign unsupported year counts to narrowly scoped technologies.
- Use the portfolio link first and the résumé link second: https://www.justintagarda.com followed by https://www.justintagarda.com/pdf/Resume-Justiniano-Tagarda.pdf
- Always create the subject from the employer's exact required phrase or format when verified. If no employer subject is specified, use `Subject: Application – [exact job title]` and keep the subject separate from the letter body.
- Never place an employer-required subject phrase, opening phrase, form instruction, or submission direction inside the cover-letter body unless the employer explicitly requires it there.
- Say that the résumé is attached only when an attachment is actually part of the application. Otherwise say that it is available at the résumé link.
- Mention gaps only when they are central to the role, keep them to one concise sentence, and immediately connect verified transferable experience to the employer's need.
- Add a direct contribution statement before the résumé links, such as "I would welcome the opportunity to contribute my experience in [role-specific strengths] to your team."
- Remove generic sentences such as "I am comfortable contributing to secure, testable, and maintainable systems" when the letter already demonstrates those qualities through concrete examples.
- Avoid repetitive wording such as "production ownership," "practical solutions," and "maintainable software" unless the phrase is tied to a specific verified example.
- Keep the completed letter within the 180–240-word target whenever the application format permits; remove repetition before removing role-specific evidence.
- Do not draft letters for weak-fit roles below 65 unless the user explicitly accepts the mismatch and asks to proceed.
- Avoid unsupported claims, inflated metrics, or tools that were not verified in the session.
- Do not over-explain AI usage unless the role specifically asks for it.

Base template:

Subject: Application – [exact job title]

Dear [Hiring Team / Recruiter Name],

I am applying for the [exact job title] position. I bring 20+ years of experience building, maintaining, and supporting production software, with a focused background in [five to seven most relevant verified technologies].

My experience matches your need for [two or three specific responsibilities]. I have built and supported [one or two relevant verified examples], including [specific responsibility or result]. My work has covered backend services, APIs, databases, frontend integration, concrete security practices, deployment, troubleshooting, and ongoing production support.

[Only when necessary: My strongest experience is in [verified primary stack] rather than [gap], but my experience in [transferable area] is directly relevant to this role.]

I would welcome the opportunity to contribute my experience in [role-specific strengths] to your team.

Selected projects are available at https://www.justintagarda.com, and my résumé is [attached / available] at https://www.justintagarda.com/pdf/Resume-Justiniano-Tagarda.pdf.

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

## Application History and Audit Trail

The tracker must preserve a chronological history for application activity. Existing summary fields remain for backward compatibility, but `history` is the authoritative record of events over time.

The canonical tracker metadata includes `history_schema_version: 1`. Each application record should contain a `history` array. Each history item must include:

- `event_id`: stable unique identifier for the event
- `event_type`: a standardized event name
- `occurred_at`: when the event happened, using an ISO date or timestamp
- `recorded_at`: when the event was added to the tracker
- `date_precision`: `exact`, `date_only`, or `unknown`
- `source`: `user`, `job_post`, `recruiter_message`, `employer_email`, `application_form`, `system`, or `migration`
- `source_reference`: message subject, screenshot, URL, or other evidence reference when available
- `summary`: concise factual description
- `details`: an object for additional verified structured data

Allowed event types include `record_created`, `job_assessed`, `application_started`, `application_submitted`, `application_acknowledged`, `assessment_invited`, `assessment_started`, `assessment_completed`, `interview_invited`, `interview_scheduled`, `interview_completed`, `technical_exercise_received`, `technical_exercise_submitted`, `employer_replied`, `candidate_replied`, `cover_letter_created`, `application_rejected`, `application_withdrawn`, `application_status_changed`, and `next_action_updated`.

Whenever a verified application event is received or recorded:

1. Append a new history event; never silently overwrite prior events.
2. Update the current summary fields such as `application_status`, `last_activity`, `next_action`, and `notes`.
3. Verify the event against the exact tracker record before adding it.
4. Do not invent dates, times, outcomes, or interview/assessment completion status. Use `date_only` or `unknown` when precision is unavailable.
5. Prevent duplicates using `event_id`, event type, source reference, and the matching application record.
6. Preserve conflicting information as a later event with an explanatory note rather than deleting the earlier event.

For existing records, reconstruct only verifiable historical events from existing dated fields and notes. Mark reconstructed entries with `source: migration`; leave unverifiable gaps unrecorded. Existing records may temporarily have an empty or absent history array during migration, but all newly created or updated records must include `history`.

After every tracker update, validate the JSON, confirm history entries are valid and chronologically ordered, and run `git diff --check`.
