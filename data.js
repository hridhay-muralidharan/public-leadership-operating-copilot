window.COPILOT_WORKSTREAMS = [
  "Citizen Intake",
  "Jurisdiction And Ownership",
  "Evidence Collection",
  "Stakeholder Coordination",
  "Scheme And Initiative Tracking",
  "Parliamentary Research",
  "Public Communication",
  "Follow-Up And Closure",
  "Governance And Privacy",
  "Institutional Memory"
];

window.COPILOT_STEPS = [
  {
    title: "Civic issue enters intake",
    readiness: 16,
    label: "Case framed",
    prompt: "Residents from a Bengaluru South ward say a proposed road expansion and flyover package may worsen local traffic, remove trees, and affect pedestrians. They mention there was no clear public consultation and ask the MP office to intervene before the project moves ahead.",
    response: "The input is a civic case, not a generic complaint. The office needs to preserve the citizen concern, identify the exact location and project reference, separate claims from evidence, and decide whether the first action is information gathering, consultation support, or escalation.",
    affected: ["Citizen Intake", "Evidence Collection", "Jurisdiction And Ownership", "Public Communication"],
    select: "Citizen Intake",
    updates: {
      "Citizen Intake": {
        status: "in_discovery",
        note: "Citizen concern converted into a structured civic case.",
        logged: ["Concern: road expansion and flyover package may affect traffic, trees, pedestrians, and consultation quality.", "Request: MP office intervention before project progress."],
        missing: ["Exact location and ward.", "Project name or tender reference.", "Photos, maps, complaint IDs, or meeting records.", "Number of affected residents and groups."],
        risks: ["The office may respond to emotion before verifying the project facts."],
        questions: ["What is the exact project, who raised the issue, and what evidence has already been collected?"]
      },
      "Evidence Collection": {
        status: "missing_evidence",
        note: "Core evidence is still absent.",
        missing: ["DPR or project brief.", "Traffic study.", "Tree impact note.", "Public consultation record.", "Budget source and implementing agency."],
        questions: ["Which documents must be obtained before the office takes a public position?"]
      },
      "Jurisdiction And Ownership": {
        status: "missing_evidence",
        note: "Authority map pending.",
        missing: ["Implementing agency.", "Approving department.", "State and city-level owners.", "Any central government linkage."],
        risks: ["The office may be blamed for decisions outside its direct authority if ownership is unclear."]
      },
      "Public Communication": {
        status: "at_risk",
        note: "Public response requires evidence discipline.",
        missing: ["Verified facts.", "Current status of project.", "Office action boundary."],
        risks: ["Premature messaging can create commitments the office cannot responsibly keep."]
      }
    }
  },
  {
    title: "Jurisdiction map changes the action route",
    readiness: 28,
    label: "Ownership emerging",
    prompt: "Initial review suggests BBMP and a state-level urban mobility body own the project. The MP office can support public consultation, request documents, coordinate with citizen groups, and raise central-government dependencies if any are found.",
    response: "The office role becomes sharper. Direct execution may sit elsewhere, but the MP office can still add value through evidence requests, public consultation discipline, stakeholder convening, and parliamentary or ministry routes when the facts justify it.",
    affected: ["Jurisdiction And Ownership", "Stakeholder Coordination", "Parliamentary Research", "Public Communication"],
    select: "Jurisdiction And Ownership",
    updates: {
      "Jurisdiction And Ownership": {
        status: "in_discovery",
        note: "Primary ownership sits with city and state actors.",
        logged: ["Likely owners: BBMP and state-level urban mobility authority.", "MP office role: document request, citizen consultation support, convening, and escalation where justified."],
        missing: ["Named official owner.", "Current project approval status.", "Legal route for public consultation.", "Central ministry or railway dependency, if any."],
        decisions: ["Frame the office role as evidence-led coordination and escalation within authority limits."],
        questions: ["Which action is available to the MP office today without overstating direct control?"]
      },
      "Stakeholder Coordination": {
        status: "missing_evidence",
        note: "Stakeholder list needs depth.",
        missing: ["Resident welfare associations.", "Ward-level leaders.", "Traffic experts.", "Pedestrian and accessibility groups.", "Relevant officials."],
        questions: ["Who must be heard before the office treats this as a representative public concern?"]
      },
      "Parliamentary Research": {
        status: "missing_evidence",
        note: "Parliamentary route depends on central linkage.",
        missing: ["Whether the project uses central funds, national policy, rail, highway, environment, or metro dependencies."],
        risks: ["A parliamentary question may be weak if the matter is purely city or state execution."]
      },
      "Public Communication": {
        status: "ready_for_review",
        note: "Communication boundary clarified.",
        decisions: ["Public note should say the office is seeking documents and consultation clarity before forming a final view."]
      }
    }
  },
  {
    title: "Evidence request becomes the first operating task",
    readiness: 39,
    label: "Evidence plan active",
    prompt: "The team decides to request the DPR, traffic impact study, tree and pedestrian impact assessment, consultation notice, minutes of any public meeting, budget note, and implementation timeline. Volunteers can collect photos and citizen statements from the affected stretches.",
    response: "The case now has an evidence plan. The co-pilot separates official documents from field evidence and citizen testimony, then assigns each evidence type to an owner and review path.",
    affected: ["Evidence Collection", "Stakeholder Coordination", "Follow-Up And Closure", "Governance And Privacy"],
    select: "Evidence Collection",
    updates: {
      "Evidence Collection": {
        status: "ready_for_review",
        note: "Evidence checklist and collection routes defined.",
        logged: ["Requested documents: DPR, traffic impact study, tree and pedestrian assessment, consultation notice, meeting minutes, budget note, implementation timeline.", "Field evidence: photos and citizen statements from affected stretches."],
        missing: ["Document request recipient.", "Date by which documents are expected.", "Format for volunteer field submissions."],
        decisions: ["Separate official documents, field observations, and citizen testimony in the evidence pack."]
      },
      "Stakeholder Coordination": {
        status: "in_discovery",
        note: "Volunteer role introduced.",
        logged: ["Volunteers can collect photos and citizen statements."],
        missing: ["Volunteer briefing note.", "Verification rules.", "Escalation owner for sensitive claims."]
      },
      "Follow-Up And Closure": {
        status: "missing_evidence",
        note: "Follow-up cadence needed.",
        missing: ["Document request date.", "Reminder schedule.", "Escalation threshold.", "Closure definition."]
      },
      "Governance And Privacy": {
        status: "at_risk",
        note: "Citizen statements need privacy controls.",
        missing: ["Consent language.", "Personal-data minimization.", "Storage owner.", "Public-use approval rule."],
        risks: ["Citizen identities and locations may be exposed if field evidence is handled casually."]
      }
    }
  },
  {
    title: "Public consultation becomes a workstream",
    readiness: 49,
    label: "Consultation route shaped",
    prompt: "Citizen groups ask for a public consultation before further execution. The office wants to convene residents, urban mobility experts, accessibility advocates, BBMP officials, and elected representatives, while keeping the discussion fact-based and civil.",
    response: "The office can turn public concern into a structured consultation. The co-pilot defines who should be invited, what evidence should be reviewed, which questions should be answered, and what record should be preserved after the meeting.",
    affected: ["Stakeholder Coordination", "Public Communication", "Evidence Collection", "Institutional Memory"],
    select: "Stakeholder Coordination",
    updates: {
      "Stakeholder Coordination": {
        status: "ready_for_review",
        note: "Consultation stakeholder map drafted.",
        logged: ["Participants: residents, urban mobility experts, accessibility advocates, BBMP officials, and elected representatives."],
        missing: ["Final attendee list.", "Moderator.", "Agenda.", "Evidence pre-read.", "Meeting record owner."],
        decisions: ["Use a structured consultation format with evidence review and recorded action items."],
        questions: ["Which voices are affected but under-represented in the current citizen group?"]
      },
      "Public Communication": {
        status: "ready_for_review",
        note: "Consultation message can be prepared.",
        decisions: ["Invite public inputs while stating that the office is collecting facts before recommending a route."]
      },
      "Evidence Collection": {
        status: "ready_for_review",
        note: "Evidence pack required before consultation.",
        missing: ["Pre-read summary.", "Verified project map.", "Known open questions."]
      },
      "Institutional Memory": {
        status: "in_discovery",
        note: "Consultation template can be reused.",
        logged: ["Reusable need: consultation agenda, evidence pre-read, minutes format, decision log."],
        questions: ["What template should future civic consultations inherit from this case?"]
      }
    }
  },
  {
    title: "Parliamentary and policy route is assessed",
    readiness: 57,
    label: "Policy route assessed",
    prompt: "Research finds the issue may connect to urban mobility coordination, pedestrian safety, accessibility, and disclosure of DPRs for major infrastructure projects. The team considers a policy note or parliamentary question if the central linkage is strong enough.",
    response: "The issue can become more than a local grievance if it reveals a repeatable governance problem. The co-pilot captures the potential policy angle while keeping the local case and parliamentary route separate.",
    affected: ["Parliamentary Research", "Scheme And Initiative Tracking", "Jurisdiction And Ownership", "Institutional Memory"],
    select: "Parliamentary Research",
    updates: {
      "Parliamentary Research": {
        status: "in_discovery",
        note: "Potential policy angle identified.",
        logged: ["Themes: urban mobility coordination, pedestrian safety, accessibility, DPR disclosure, public consultation standards."],
        missing: ["Central linkage.", "Comparable city precedents.", "Legal or regulatory basis.", "Draft question or policy note outline."],
        decisions: ["Keep the local case route separate from the policy route until the central linkage is verified."],
        questions: ["Is this a constituency grievance, a city governance issue, or a national policy question?"]
      },
      "Scheme And Initiative Tracking": {
        status: "in_discovery",
        note: "Related public initiatives may provide context.",
        missing: ["Relevant mobility schemes.", "Accessibility initiatives.", "Public-space improvement commitments.", "Known office initiatives in similar areas."]
      },
      "Jurisdiction And Ownership": {
        status: "ready_for_review",
        note: "Local and policy routes separated.",
        decisions: ["Track city/state action and parliamentary research as different routes with different owners."]
      },
      "Institutional Memory": {
        status: "in_discovery",
        note: "Issue pattern may become reusable.",
        logged: ["Potential pattern: infrastructure proposal with weak citizen-facing evidence and consultation record."]
      }
    }
  },
  {
    title: "Governance gates communication",
    readiness: 52,
    label: "Review gate active",
    prompt: "The office prepares a public update but marks it for human review because official documents are pending, citizen statements contain personal details, and the project authority has not yet responded.",
    response: "The co-pilot lowers operating confidence until governance is clean. Public communication must separate verified facts, citizen concerns, office action, and pending responses.",
    affected: ["Governance And Privacy", "Public Communication", "Evidence Collection", "Follow-Up And Closure"],
    select: "Governance And Privacy",
    updates: {
      "Governance And Privacy": {
        status: "blocked",
        note: "Public update needs approval and privacy cleanup.",
        logged: ["Documents pending.", "Citizen statements include personal details.", "Project authority response pending."],
        missing: ["Reviewer approval.", "Anonymized citizen evidence.", "Fact/source table.", "Allowed claims list."],
        risks: ["The office can create reputational and privacy risk by publishing unverified or personally identifiable information."],
        questions: ["Which claims are verified enough for public communication today?"]
      },
      "Public Communication": {
        status: "retry_needed",
        note: "Message needs fact boundaries.",
        missing: ["Verified facts.", "Pending facts.", "Office action taken.", "Next update date."],
        decisions: ["Use a factual holding update until documents and authority response arrive."]
      },
      "Evidence Collection": {
        status: "ready_for_review",
        note: "Evidence must be source-tagged.",
        missing: ["Source table and verification status for each claim."]
      },
      "Follow-Up And Closure": {
        status: "in_discovery",
        note: "Next update date needed.",
        missing: ["Follow-up owner.", "Authority response deadline.", "Citizen update cadence."]
      }
    }
  },
  {
    title: "Follow-up plan turns concern into movement",
    readiness: 71,
    label: "Action plan reviewable",
    prompt: "The office creates a follow-up plan: send document requests, schedule consultation, assign volunteer verification, track authority response, draft a factual public update, and prepare a policy note if the issue reveals a repeatable governance gap.",
    response: "The case is now operational. The co-pilot turns concern into a sequence of responsible actions with owners, evidence gates, and closure criteria.",
    affected: ["Follow-Up And Closure", "Public Communication", "Parliamentary Research", "Institutional Memory"],
    select: "Follow-Up And Closure",
    updates: {
      "Follow-Up And Closure": {
        status: "ready_for_review",
        note: "Action plan has owners and sequence.",
        logged: ["Actions: document requests, consultation scheduling, volunteer verification, authority response tracking, factual public update, policy note if justified."],
        missing: ["Named owners.", "Dates.", "Escalation rules.", "Closure criteria."],
        decisions: ["Move the case through evidence request, consultation, authority response, communication, and closure review."]
      },
      "Public Communication": {
        status: "ready_for_review",
        note: "Factual update can be drafted after review.",
        decisions: ["Public update should report actions taken and pending facts without promising outcome."]
      },
      "Parliamentary Research": {
        status: "ready_for_review",
        note: "Policy note is conditional.",
        decisions: ["Prepare a policy note only if evidence shows a repeatable governance gap beyond the local project."]
      },
      "Institutional Memory": {
        status: "ready_for_review",
        note: "Reusable operating pattern defined.",
        logged: ["Reusable pattern: issue intake, authority map, evidence pack, consultation format, communication review, closure log."]
      }
    }
  },
  {
    title: "Institutional memory becomes the final artifact",
    readiness: 84,
    label: "Case ready for execution",
    prompt: "Before closing the intake phase, the office wants the case to leave behind a reusable evidence checklist, jurisdiction map, consultation template, communication review checklist, and handover note for future civic infrastructure cases.",
    response: "The prototype treats each case as a way to strengthen the office. The output is not only a response to one issue, but an operating asset that future staff, volunteers, and leaders can reuse.",
    affected: ["Institutional Memory", "Follow-Up And Closure", "Governance And Privacy", "Citizen Intake"],
    select: "Institutional Memory",
    updates: {
      "Citizen Intake": { status: "approved", note: "Case intake is structured and reviewable." },
      "Jurisdiction And Ownership": { status: "approved", note: "Authority map is explicit." },
      "Evidence Collection": { status: "ready_for_review", note: "Evidence checklist and sources are defined." },
      "Stakeholder Coordination": { status: "ready_for_review", note: "Consultation route is drafted." },
      "Scheme And Initiative Tracking": { status: "ready_for_review", note: "Related initiatives and schemes can be monitored." },
      "Parliamentary Research": { status: "ready_for_review", note: "Policy route is conditional and evidence-led." },
      "Public Communication": { status: "ready_for_review", note: "Public updates require fact and privacy review." },
      "Follow-Up And Closure": {
        status: "approved",
        note: "Follow-up plan is execution-ready.",
        decisions: ["Close intake only after owners, dates, authority response path, and citizen update cadence are documented."],
        missing: ["Final dates and named staff owners."]
      },
      "Governance And Privacy": {
        status: "ready_for_review",
        note: "Review gates remain active.",
        decisions: ["Human approval required before external communication or escalation using citizen evidence."]
      },
      "Institutional Memory": {
        status: "case_asset",
        note: "Reusable office asset created.",
        logged: ["Reusable outputs: evidence checklist, jurisdiction map, consultation template, communication review checklist, handover note."],
        decisions: ["Store the case as a future template for civic infrastructure issues."],
        missing: ["Final handover owner.", "Repository location.", "Review cadence."],
        risks: ["Institutional learning will be lost if artifacts are not maintained after the immediate case pressure drops."],
        questions: ["Who owns the template after this case is closed?"]
      }
    }
  }
];
