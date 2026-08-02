# Single Job-Post Squirex Enrichment Requirements

## Purpose

This requirement defines the repeatable portfolio-repository workflow for processing exactly one job post and generating the additive `job_post_profile` data consumed by Squirex.

The portfolio repository owns creation and updating of the external JSON. Squirex reads `D:\Projects\portfolio\records\job-applications.json` read-only and must not be modified by this workflow.

## Invocation

Replace the target value below with one job-post URL, job ID, or unambiguous company-and-role identifier:

```text
Target job post:
[PASTE THE JOB-POST URL, JOB ID, OR AN UNAMBIGUOUS COMPANY + ROLE IDENTIFIER HERE]
```

## Required Workflow

1. Read and follow:

   - `records/job-processing-requirements.md`
   - `records/job-applications.json`
   - `src/content/portfolio.json` when verified professional background or fit analysis is needed.

2. Identify the target record using the strongest available evidence, in this order:

   - exact URL or job ID;
   - company and role title;
   - recruiter, location, description, and requirements.

3. Process only the specified job post. Do not enrich, rewrite, normalize, or otherwise modify unrelated records.

4. Retrieve and verify the job-post data using the approved browser workflow. Capture, when available:

   - job title;
   - company;
   - location;
   - work arrangement;
   - employment type;
   - responsibilities;
   - required and preferred qualifications;
   - technologies and tools;
   - experience requirements;
   - interview or hiring priorities explicitly stated in the source.

5. If the job post cannot be verified, do not infer or invent missing information. Report what could not be verified and leave the Squirex profile unchanged.

6. Update the matching record in `records/job-applications.json` only when the target identity is sufficiently verified. Preserve all existing tracker fields and add or update only the additive `job_post_profile` field.

## Answer Assist Readiness Gate

The processed record is not complete merely because the JSON is valid. It is complete only when Squirex can create a useful `InterviewSessionBrief` and link the job post to an Answer Assist session without requiring unverified assumptions.

Before declaring the record Answer Assist-ready, verify all of the following:

- the target record identity is confirmed by URL, job ID, or sufficiently strong company-and-role evidence;
- `job_id`, `job_title`, `company`, and `location` are present at the tracker-entry level when available from the verified posting;
- the posting's work arrangement is captured in the tracker data or clearly stated in the source text;
- `source_documents` contains at least one verified primary job-post source;
- the primary source has a valid URL, title, UTC capture timestamp, reliability, and meaningful source text;
- the source text summarizes the role, scope, responsibilities, qualifications, technologies, and experience expectations relevant to interview preparation;
- at least one responsibility is extracted when the posting states responsibilities;
- every material required qualification is represented in `requirements`;
- required and preferred qualifications are classified separately;
- minimum experience requirements are represented in `minimum_years` when explicitly stated;
- every material technology, platform, framework, database, cloud service, or delivery tool named by the posting is represented in `technologies` when relevant to interview preparation;
- every structured item has a valid `source_id` pointing to a source document;
- `interview_priorities` are included when the posting or verified recruiter material identifies interview-relevant emphasis;
- candidate-specific safeguards are included in `directives` when needed to prevent unsupported claims;
- `conflicts` are included when verified sources disagree, and unresolved conflicts are not presented as settled facts;
- unknown, unavailable, or unverified facts are omitted or explicitly reported rather than guessed.

If a required readiness condition cannot be satisfied, do not claim the profile is complete. Obtain missing verified source material or report the record as `not Answer Assist-ready` with the exact missing fields.

## Required Role-Grounding Coverage

The generated profile must support the main categories of role-related interview questions:

| Interview grounding area | Required data or explicit absence report |
|---|---|
| Role identity | Job title, company, location, work arrangement, and source URL |
| Role scope | Responsibilities and expected outcomes stated by the posting |
| Required qualifications | Required skills, experience, education, eligibility, or communication requirements when stated |
| Preferred qualifications | Preferred or nice-to-have qualifications when stated |
| Technical scope | Technologies, frameworks, platforms, databases, cloud, delivery, and tooling requirements |
| Seniority and experience | Explicit years, seniority, ownership, or scope expectations when stated |
| Interview emphasis | Verified hiring-manager, recruiter, or posting priorities when available |
| Candidate safety | Verified `never_claim`, `avoid`, or verification directives when needed |
| Source uncertainty | Conflicts or an explicit statement that no conflict was found |

Do not manufacture data to fill this table. For a field that is not stated or cannot be verified, report `not available from verified sources`.

## Profile-Level Metadata Rules

Populate these tracker-entry fields from verified job-post data whenever available:

- `job_title`;
- `company`;
- `location`;
- `job_url`;
- work arrangement and employment type, using existing compatible tracker fields when present;
- recruiter or hiring contact only when explicitly verified.

Populate profile-supported values when the external schema provides them or when the existing additive schema is explicitly extended:

- employment type;
- client name;
- requisition reference;
- compensation text.

Do not add new fields solely to create plausible values. If Squirex supports a field but the portfolio schema does not carry it, report the omission as a schema limitation and preserve the current external schema unless an explicit schema change is authorized.

## Squirex Profile Generation

Generate `job_post_profile` according to the canonical schema in `records/job-processing-requirements.md`. The profile may contain:

- `source_documents`;
- `responsibilities`;
- `requirements`;
- `technologies`;
- `interview_priorities`, only when explicitly verified;
- `directives`, only for verified candidate-specific instructions;
- `conflicts`, only when there are genuinely conflicting verified sources.

Preserve provenance:

- every structured item must have a `source_id`;
- every `source_id` must match a `source_documents.id`;
- advertised job-post facts must remain separate from recruiter guidance, candidate notes, fit analysis, application status, cover-letter content, and next actions.

Do not create placeholder values or empty fallback content. Omit optional sections when no verified data exists.

## Compatibility Rules

The generated data must remain compatible with Squirex:

- `schema_version` must remain `2` or higher;
- `source_documents` must contain at least one valid source whenever a profile exists;
- source type must be one of `job_post`, `recruiter_guidance`, `candidate_note`, or `manual`;
- source reliability must be one of `primary`, `recruiter_provided`, or `candidate_provided`;
- requirement class must be one of `required`, `preferred`, `responsibility`, `communication`, or `eligibility`;
- technology area must be one of `frontend`, `backend`, `api`, `database`, `cloud`, `delivery`, or `tooling`;
- directive kind must be one of `emphasis`, `avoid`, `answer_style`, `verification`, or `never_claim`;
- conflict status must be one of `unresolved`, `confirmed`, or `superseded`;
- every `captured_at` value must be a valid UTC timestamp;
- all source references must resolve to valid source documents.

## Validation and Reporting

After the update:

1. Validate `records/job-applications.json`.
2. Run `git diff --check`.
3. Confirm that no unrelated record was changed.
4. Report:

   - which record was matched;
   - whether the profile was created or updated;
   - the source documents used;
   - the number of responsibilities, requirements, and technologies generated;
   - omitted sections or unverifiable details;
   - validation and `git diff --check` results;
   - confirmation that no unrelated record was changed.

## Prohibited Actions

- Do not modify Squirex.
- Do not modify unrelated job records.
- Do not invent job-post facts, recruiter guidance, candidate directives, qualifications, technologies, or interview priorities.
- Do not convert `fit_score`, `fit_summary`, `notes`, `next_action`, cover-letter data, or application status into employer requirements.
- Do not modify `records/job-processing-requirements.md` unless the canonical schema itself is inconsistent with the requested profile and the change is explicitly authorized.

## Final Answer Assist Acceptance Check

Before finishing, include exactly one readiness result:

- `Answer Assist-ready` — all required grounding coverage is present and provenance is valid;
- `Answer Assist-ready with documented omissions` — the profile is usable, but optional or unavailable fields are listed;
- `not Answer Assist-ready` — one or more required grounding areas could not be verified or represented.

For the second or third result, list every omitted field or grounding area and explain whether it was unavailable in the source, ambiguous, or unsupported by the current schema.

Confirm that the generated profile can be selected by Squirex and can produce non-empty context for role, requirements, and technologies when those categories are present in the verified posting.
