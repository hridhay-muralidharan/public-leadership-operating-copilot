window.COPILOT_WORKSTREAMS = [
  "Citizen Intake",
  "Issue Clustering",
  "Jurisdiction And Ownership",
  "Evidence Collection",
  "Stakeholder Coordination",
  "Public Communication",
  "Follow-Up And Closure",
  "Governance And Privacy",
  "Institutional Memory"
];

window.COPILOT_STEPS = [
  {
    title: "Civic complaints enter intake",
    readiness: 14,
    label: "Raw inputs captured",
    prompt: "Residents from a Bengaluru South ward report a pothole that is affecting daily commuters. Some type the complaint in English, some send Kannada voice notes, some attach photos, and some describe the location using nearby shops and landmarks.",
    response: "The input is not one neat form submission. It is a set of citizen signals that may refer to the same civic issue. The office needs to preserve every complaint, extract location and evidence signals, and decide whether these are separate issues or one shared case.",
    affected: ["Citizen Intake", "Issue Clustering", "Evidence Collection", "Governance And Privacy"],
    select: "Citizen Intake",
    updates: {
      "Citizen Intake": {
        status: "in_discovery",
        note: "Free-form citizen inputs converted into structured intake records.",
        logged: [
          "Complaint types: typed notes, voice inputs, photos, landmarks and location descriptions.",
          "Issue theme: pothole affecting local commuters in a Bengaluru South ward."
        ],
        missing: ["Precise location.", "Number of unique complainants.", "Photo quality.", "Consent for public use of citizen material."],
        risks: ["A normal form-based workflow may split one public issue into many disconnected records."],
        questions: ["Do these complaints describe one pothole, multiple potholes on the same stretch, or separate road issues?"]
      },
      "Issue Clustering": {
        status: "missing_evidence",
        note: "Similarity check pending.",
        missing: ["Language translation.", "Photo comparison.", "Landmark extraction.", "Approximate geocode."]
      },
      "Evidence Collection": {
        status: "missing_evidence",
        note: "Evidence needs source tagging.",
        missing: ["Photo timestamp.", "Road stretch.", "Traffic impact evidence.", "Repeat complaint history."]
      },
      "Governance And Privacy": {
        status: "at_risk",
        note: "Citizen submissions may contain personal data.",
        missing: ["Consent rule.", "PII cleanup.", "Storage owner.", "Allowed-public-use policy."]
      }
    }
  },
  {
    title: "AI detects one shared issue",
    readiness: 29,
    label: "Duplicates clustered",
    prompt: "More than 100 residents submit complaints over two days. The descriptions vary, but the photos show the same broken road surface and the landmark references point to the same junction.",
    response: "The co-pilot clusters the complaints into one actionable pothole case while retaining each citizen record. This prevents the office from treating one issue as 100 unrelated tickets and allows one verified responder update to inform all affected citizens.",
    affected: ["Issue Clustering", "Citizen Intake", "Evidence Collection", "Institutional Memory"],
    select: "Issue Clustering",
    updates: {
      "Issue Clustering": {
        status: "ready_for_review",
        note: "Complaints clustered into one likely civic case.",
        logged: [
          "Cluster basis: similar photos, overlapping landmarks, same ward, close submission timing.",
          "Citizen records retained while operational case is merged."
        ],
        missing: ["Human confirmation of cluster.", "Confidence threshold.", "Boundary for near-duplicate issues."],
        decisions: ["Treat this as one case for operational follow-up, while preserving all complainant records for updates."]
      },
      "Citizen Intake": {
        status: "ready_for_review",
        note: "Duplicate records linked to the same case.",
        logged: ["100+ citizen complaints mapped to one pothole case."]
      },
      "Evidence Collection": {
        status: "in_discovery",
        note: "Photo and location evidence consolidated.",
        missing: ["Best representative images.", "Before/after evidence requirement.", "Severity assessment."]
      },
      "Institutional Memory": {
        status: "in_discovery",
        note: "Duplicate-handling pattern can become reusable.",
        questions: ["What similarity signals should future complaint clusters inherit?"]
      }
    }
  },
  {
    title: "Jurisdiction determines the route",
    readiness: 42,
    label: "Owner identified",
    prompt: "The clustered case points to a ward road maintained by BBMP. The MP office cannot directly repair the pothole, but can route the issue to the right official, track response, and escalate if citizen safety is at risk.",
    response: "The office role becomes sharper. The co-pilot separates direct ownership from coordination responsibility, identifies the likely department, and prepares a routed evidence pack for the responsible authority.",
    affected: ["Jurisdiction And Ownership", "Stakeholder Coordination", "Public Communication", "Follow-Up And Closure"],
    select: "Jurisdiction And Ownership",
    updates: {
      "Jurisdiction And Ownership": {
        status: "ready_for_review",
        note: "Likely authority route identified.",
        logged: [
          "Likely owner: BBMP ward-level road maintenance function.",
          "Office role: route, follow up, escalate where justified, and inform citizens."
        ],
        missing: ["Named official.", "Official complaint channel.", "SLA or expected response time.", "Escalation contact."],
        decisions: ["Do not frame the office as the direct execution owner. Frame it as evidence-led coordination and follow-up."]
      },
      "Stakeholder Coordination": {
        status: "in_discovery",
        note: "Authority and ward stakeholder map required.",
        missing: ["Ward engineer.", "Local elected representative.", "Traffic police if safety issue is severe."]
      },
      "Public Communication": {
        status: "ready_for_review",
        note: "Citizen update boundary clarified.",
        decisions: ["Tell citizens the case has been clustered and routed, without promising a repair date until the authority confirms."]
      },
      "Follow-Up And Closure": {
        status: "missing_evidence",
        note: "Follow-up cadence pending.",
        missing: ["Date of routing.", "Reminder schedule.", "Escalation threshold.", "Closure evidence."]
      }
    }
  },
  {
    title: "Evidence pack is prepared for response",
    readiness: 55,
    label: "Evidence ready",
    prompt: "The office prepares a response pack containing the issue summary, mapped location, representative photos, number of affected citizens, safety risk, previous complaint IDs if available, and the requested action from the authority.",
    response: "The co-pilot turns citizen frustration into a usable evidence packet. It keeps the responder's cognitive load low while keeping the office's records traceable and reviewable.",
    affected: ["Evidence Collection", "Jurisdiction And Ownership", "Governance And Privacy", "Follow-Up And Closure"],
    select: "Evidence Collection",
    updates: {
      "Evidence Collection": {
        status: "ready_for_review",
        note: "Responder evidence pack drafted.",
        logged: [
          "Evidence pack: summary, location, representative photos, citizen count, safety risk, previous complaint IDs, requested action."
        ],
        missing: ["Final human review.", "Photo anonymisation.", "Official routing format."],
        decisions: ["Use representative evidence rather than forwarding every raw complaint."]
      },
      "Governance And Privacy": {
        status: "ready_for_review",
        note: "Privacy gate added before external routing.",
        missing: ["Remove phone numbers, faces, house numbers or other unnecessary personal details."]
      },
      "Jurisdiction And Ownership": {
        status: "ready_for_review",
        note: "Evidence pack aligned to authority route."
      },
      "Follow-Up And Closure": {
        status: "in_discovery",
        note: "Closure evidence must be defined before routing.",
        questions: ["What proof will count as closure: authority response, repair photo, citizen confirmation, or field verification?"]
      }
    }
  },
  {
    title: "One responder update reaches every affected citizen",
    readiness: 68,
    label: "Update loop drafted",
    prompt: "The responsible official acknowledges the routed case and says inspection will happen within 48 hours. The office wants to update all complainants without manually replying to each complaint.",
    response: "Because the complaints were clustered, one verified update can be translated and sent back to all linked citizens. The update preserves the official response, expected timeline, and next follow-up date.",
    affected: ["Public Communication", "Citizen Intake", "Follow-Up And Closure", "Governance And Privacy"],
    select: "Public Communication",
    updates: {
      "Public Communication": {
        status: "ready_for_review",
        note: "Citizen update drafted from official response.",
        logged: [
          "Message: case acknowledged, inspection expected within 48 hours, next follow-up date recorded."
        ],
        missing: ["Language variants.", "Approval by office owner.", "Channel selection."]
      },
      "Citizen Intake": {
        status: "approved",
        note: "All linked complainants can receive the same case update."
      },
      "Follow-Up And Closure": {
        status: "ready_for_review",
        note: "Next check-in date added.",
        decisions: ["Trigger reminder if inspection confirmation is not received within 48 hours."]
      },
      "Governance And Privacy": {
        status: "ready_for_review",
        note: "External message requires human approval before sending."
      }
    }
  },
  {
    title: "Escalation keeps the case moving",
    readiness: 76,
    label: "Escalation rule active",
    prompt: "No inspection evidence is received after 48 hours. New photos show the pothole has worsened after rain. The office needs to escalate without losing the original record.",
    response: "The co-pilot reopens the case with new evidence, updates risk level, suggests the next escalation contact, and prepares a concise follow-up note that includes the original complaint cluster and the missed response window.",
    affected: ["Follow-Up And Closure", "Stakeholder Coordination", "Evidence Collection", "Public Communication"],
    select: "Follow-Up And Closure",
    updates: {
      "Follow-Up And Closure": {
        status: "retry_needed",
        note: "SLA missed; escalation required.",
        logged: [
          "Inspection not confirmed after 48 hours.",
          "New citizen photos indicate worsening road condition after rain."
        ],
        missing: ["Escalation owner.", "Updated authority contact.", "Revised timeline."],
        decisions: ["Escalate with evidence of missed response, not only citizen dissatisfaction."]
      },
      "Evidence Collection": {
        status: "ready_for_review",
        note: "New evidence appended to original case.",
        logged: ["Rain-related worsening evidence added."]
      },
      "Stakeholder Coordination": {
        status: "in_discovery",
        note: "Escalation stakeholder map updated."
      },
      "Public Communication": {
        status: "at_risk",
        note: "Citizen update should be factual and avoid overpromising.",
        risks: ["Public communication can create pressure but must remain accurate."]
      }
    }
  },
  {
    title: "Closure becomes institutional memory",
    readiness: 88,
    label: "Case asset created",
    prompt: "The pothole is repaired and citizens confirm the road is usable. The office wants to close the case, send a final update, and retain a reusable operating template for future civic complaints.",
    response: "The case is closed only after repair evidence and citizen confirmation are recorded. The co-pilot converts the case into a reusable template for future complaint clustering, jurisdiction routing, evidence packs, public updates and escalation rules.",
    affected: ["Institutional Memory", "Follow-Up And Closure", "Citizen Intake", "Public Communication"],
    select: "Institutional Memory",
    updates: {
      "Citizen Intake": {
        status: "approved",
        note: "All linked complainants received closure update."
      },
      "Issue Clustering": {
        status: "approved",
        note: "Duplicate complaints successfully handled as one case while preserving citizen records."
      },
      "Jurisdiction And Ownership": {
        status: "approved",
        note: "Authority route verified for this issue type."
      },
      "Evidence Collection": {
        status: "approved",
        note: "Before and after evidence recorded."
      },
      "Stakeholder Coordination": {
        status: "approved",
        note: "Responder and escalation contacts stored for reuse."
      },
      "Public Communication": {
        status: "approved",
        note: "Final citizen update ready."
      },
      "Follow-Up And Closure": {
        status: "approved",
        note: "Closure criteria met.",
        logged: ["Repair evidence received.", "Citizen confirmation received.", "Final update prepared."]
      },
      "Governance And Privacy": {
        status: "ready_for_review",
        note: "Retain only required records and remove unnecessary personal data."
      },
      "Institutional Memory": {
        status: "case_asset",
        note: "Reusable civic complaint resolution template created.",
        logged: [
          "Template: intake fields, clustering signals, jurisdiction route, evidence pack, update cadence, escalation rule, closure proof."
        ],
        questions: ["Which other issue types should inherit this operating pattern?"]
      }
    }
  }
];
