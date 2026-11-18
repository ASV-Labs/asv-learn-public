type EthicalStage = {
  slug: string;
  title: string;
  hours: string;
  sortOrder: number;
  focus: string;
  concept: string;
  fields: Array<[string, string]>;
  example: string;
  practice: string;
  bridge: {
    start: string;
    artifact: string;
    startText: string;
    beforeHeading: string;
    beforeText: string;
    passingStandard: string;
  };
  quizQuestion: string;
  quizOptions: string[];
};

const ETHICAL_STAGES: EthicalStage[] = [
  {
    slug: "stage-01",
    title: "Ethical Hacking Fundamentals",
    hours: "2-3",
    sortOrder: 1,
    focus: "Scope, authorization, and rules of engagement before tool use.",
    concept:
      "Ethical hacking is authorized security testing. The work begins with permission, target boundaries, timing, reporting, and stop rules.",
    fields: [
      ["Authorized target", "The system or lab range explicitly approved for testing."],
      ["Forbidden target", "Anything excluded from the assessment."],
      ["Test window", "The time when testing is allowed."],
      ["Report fields", "The evidence, impact, remediation, and owner details a defender needs."],
    ],
    example: `authorized_target="lab.local"
forbidden_target="public internet"
test_window="Saturday 10:00-12:00 UTC"
report_fields="scope evidence impact remediation owner"

printf '%s\\n' "authorized_target=$authorized_target" "forbidden_target=$forbidden_target" "test_window=$test_window" "report_fields=$report_fields"`,
    practice:
      "Write a scope card that proves permission, target boundary, time window, and report expectations before any command is trusted.",
    bridge: {
      start: "Permission Before Technique",
      artifact: "scope card",
      startText:
        'At the start, do not think like "what tool can I run?" Think like "what was authorized, what is excluded, when can testing happen, and what evidence would help the defender?"',
      beforeHeading: "Before Writing the Scope Card",
      beforeText:
        "Do not write a tool plan yet. Make the allowed target, exclusions, timing, report audience, and stop rule visible first.",
      passingStandard: "clear authorization, exclusions, timing, report expectations, and a stop rule",
    },
    quizQuestion: "What turns security testing into ethical hacking?",
    quizOptions: ["Explicit authorization and scope", "Using a popular tool", "Finding an open port", "Running tests quickly"],
  },
  {
    slug: "stage-02",
    title: "Reconnaissance Planning",
    hours: "3-4",
    sortOrder: 2,
    focus: "Plan passive and active reconnaissance without crossing the authorization boundary.",
    concept:
      "Reconnaissance is evidence collection. Passive sources observe public information; active checks contact targets and require clear scope.",
    fields: [
      ["Recon source", "Where the clue came from."],
      ["Contact level", "Whether the method is passive or active."],
      ["Authorized target", "The approved system for follow-up."],
      ["Evidence note", "What the clue actually supports."],
      ["Confidence", "How strongly the evidence supports the next step."],
    ],
    example: `recon_source="public lab DNS records"
contact_level="passive"
authorized_target="lab.local"
evidence_note="DNS records identify the lab host name"
confidence="medium"

printf '%s\\n' "source=$recon_source" "contact=$contact_level" "target=$authorized_target" "evidence=$evidence_note" "confidence=$confidence"`,
    practice:
      "Build a recon plan that separates passive research from active contact and names the evidence behind the next allowed step.",
    bridge: {
      start: "Recon Boundary Before Clues",
      artifact: "recon plan",
      startText:
        "Reconnaissance starts as a question list, not a hunt for every clue on the internet. Separate public observation from active contact so the next step stays inside authorization.",
      beforeHeading: "Before Writing the Recon Plan",
      beforeText:
        "Name the source, contact level, target, evidence note, and confidence before deciding whether a clue earns follow-up.",
      passingStandard: "a recon plan that separates passive evidence from active contact and names the approved next step",
    },
    quizQuestion: "What is the key difference between passive and active reconnaissance?",
    quizOptions: ["Active recon contacts the target", "Passive recon always proves compromise", "Active recon does not need scope", "Passive recon means no notes"],
  },
  {
    slug: "stage-03",
    title: "Scanning & Enumeration",
    hours: "3-4",
    sortOrder: 3,
    focus: "Turn scan output into service inventory before making vulnerability claims.",
    concept:
      "Scanning identifies reachable services. Enumeration adds details. Neither step proves a vulnerability until evidence is verified.",
    fields: [
      ["Scan target", "The in-scope host label."],
      ["Port", "The numeric network endpoint."],
      ["Service guess", "The likely service based on evidence."],
      ["Enumeration evidence", "The banner, response, or clue observed."],
      ["Safe next step", "A scoped verification action."],
    ],
    example: `scan_target="lab.local"
port="443"
service_guess="https"
enumeration_evidence="TLS service responded with a training banner"
safe_next_step="verify the banner on the authorized lab target"

printf '%s\\n' "target=$scan_target" "port=$port" "service=$service_guess" "evidence=$enumeration_evidence" "next=$safe_next_step"`,
    practice:
      "Create one service inventory row and explain why a port or banner is only a clue until verified.",
    bridge: {
      start: "Inventory Before Vulnerability Claims",
      artifact: "service inventory row",
      startText:
        "Scanning gives you signals. Enumeration turns those signals into a careful inventory before anyone calls something vulnerable.",
      beforeHeading: "Before Writing the Service Inventory Row",
      beforeText:
        "Keep the row factual: target, port, service guess, observed evidence, and one safe next step. A reachable port is not a finding by itself.",
      passingStandard: "a service inventory row that separates observed evidence from unproven vulnerability claims",
    },
    quizQuestion: "What does an open port prove by itself?",
    quizOptions: ["A service may be reachable", "The target is compromised", "A critical vulnerability exists", "The report is complete"],
  },
  {
    slug: "stage-04",
    title: "Web Application Testing Basics",
    hours: "4-5",
    sortOrder: 4,
    focus: "Read request and response behavior before changing input.",
    concept:
      "Web testing starts with understanding normal behavior: method, path, controllable input, expected result, observed result, and a safe question to test.",
    fields: [
      ["Web method", "The HTTP action."],
      ["Web path", "The endpoint being reviewed."],
      ["Input parameter", "A value the user can control."],
      ["Expected behavior", "What should happen normally."],
      ["Observed behavior", "What the application actually did."],
      ["Risk question", "The safe question the next test answers."],
    ],
    example: `web_method="GET"
web_path="/login"
input_parameter="redirect"
expected_behavior="login page allows only local redirects"
observed_behavior="redirect stayed inside the lab application"
risk_question="can redirects leave the approved lab domain"

printf '%s\\n' "method=$web_method" "path=$web_path" "parameter=$input_parameter" "expected=$expected_behavior" "observed=$observed_behavior" "question=$risk_question"`,
    practice:
      "Write a web test note that connects request shape, expected behavior, observed behavior, and the next safe test.",
    bridge: {
      start: "Normal Web Behavior Before Tests",
      artifact: "web test note",
      startText:
        "A web test starts by reading what normal should look like. Method, path, input, expected result, and observed result give the test a baseline.",
      beforeHeading: "Before Writing the Web Test Note",
      beforeText:
        "Do not change inputs until you can explain the request shape and what safe question the next test answers.",
      passingStandard: "a web test note that connects request shape, baseline behavior, observed behavior, and one scoped next test",
    },
    quizQuestion: "Why record expected behavior before a web security test?",
    quizOptions: ["It gives the test a baseline", "It replaces authorization", "It proves exploitation", "It hides uncertainty"],
  },
  {
    slug: "stage-05",
    title: "Controlled Exploitation Validation",
    hours: "4-5",
    sortOrder: 5,
    focus: "Use proof only to validate a confirmed finding with least impact.",
    concept:
      "Controlled validation proves risk. It should name the confirmed finding, required precondition, proof goal, impact limit, stop condition, and cleanup.",
    fields: [
      ["Confirmed finding", "The issue already supported by evidence."],
      ["Precondition", "What must be true before proof is valid."],
      ["Proof goal", "The minimum evidence needed."],
      ["Impact limit", "What the test must not do."],
      ["Stop condition", "When the validation ends."],
      ["Cleanup note", "How temporary evidence files are handled."],
    ],
    example: `confirmed_finding="outdated lab service"
precondition="authorized lab target and verified vulnerable version"
proof_goal="show controlled validation without data access"
impact_limit="no persistence, no sensitive data access, no lateral movement"
stop_condition="stop after proof output is captured"
cleanup_note="remove temporary proof files from the lab workspace"

printf '%s\\n' "finding=$confirmed_finding" "precondition=$precondition" "goal=$proof_goal" "limit=$impact_limit" "stop=$stop_condition" "cleanup=$cleanup_note"`,
    practice:
      "Draft a validation plan that proves risk with the smallest safe evidence and an explicit stop condition.",
    bridge: {
      start: "Least-Impact Proof Before Validation",
      artifact: "controlled proof card",
      startText:
        "Controlled validation is not the beginning of the assessment. It happens after scope and earlier evidence support a finding worth proving.",
      beforeHeading: "Before Writing the Controlled Proof Card",
      beforeText:
        "Write the confirmed finding, precondition, proof goal, impact limit, stop condition, and cleanup note before any proof step.",
      passingStandard: "a controlled proof card that proves only the minimum risk signal and stops before extra impact",
    },
    quizQuestion: "When should controlled exploitation happen in a professional assessment?",
    quizOptions: ["After scope and evidence support a finding", "Before permission is written", "Whenever a tool exists", "After the report is finished"],
  },
  {
    slug: "stage-06",
    title: "Post-Exploitation Evidence Handling",
    hours: "3-4",
    sortOrder: 6,
    focus: "Document limited access, protect data, and hand off evidence without persistence.",
    concept:
      "Post-exploitation in a lab is not a free pass to keep going. It documents what access would mean, what data is off limits, and how the finding moves to remediation.",
    fields: [
      ["Access level", "The minimum access observed in the lab."],
      ["Evidence boundary", "What evidence is enough."],
      ["Sensitive data rule", "What must not be collected."],
      ["Persistence rule", "Why persistence is not used."],
      ["Handoff note", "How the defender receives the finding."],
    ],
    example: `access_level="lab service account"
evidence_boundary="capture command output proving account context only"
sensitive_data_rule="do not access personal or secret data"
persistence_rule="do not install persistence or background access"
handoff_note="send evidence, impact, and remediation owner to the defender"

printf '%s\\n' "access=$access_level" "boundary=$evidence_boundary" "data_rule=$sensitive_data_rule" "persistence=$persistence_rule" "handoff=$handoff_note"`,
    practice:
      "Write a post-validation evidence note that limits access, avoids sensitive data, and prepares a clean defender handoff.",
    bridge: {
      start: "Evidence Boundary Before Access Details",
      artifact: "evidence handoff",
      startText:
        "After proof, the safest professional move is to stop expanding access and make the evidence useful to defenders.",
      beforeHeading: "Before Writing the Evidence Handoff",
      beforeText:
        "Name the access level, evidence boundary, sensitive data rule, persistence rule, and handoff note before adding details.",
      passingStandard: "an evidence handoff that documents enough proof without collecting unrelated or sensitive data",
    },
    quizQuestion: "What is the safest default after proof of access?",
    quizOptions: ["Stop, document, clean up, and report", "Maintain access", "Collect unrelated data", "Hide the finding"],
  },
  {
    slug: "stage-07",
    title: "Wireless Security Assessment",
    hours: "3-4",
    sortOrder: 7,
    focus: "Treat wireless testing as radio-scope evidence with privacy boundaries.",
    concept:
      "Wireless testing touches shared space. Professional work names the authorized network, approved hardware, capture purpose, privacy rule, and cleanup.",
    fields: [
      ["Wireless target", "The authorized SSID or lab network."],
      ["Channel", "The radio channel being observed."],
      ["Approved adapter", "The hardware allowed for the lab."],
      ["Capture purpose", "Why metadata is being collected."],
      ["Privacy rule", "How unrelated networks and clients are excluded."],
      ["Cleanup note", "How temporary captures are handled."],
    ],
    example: `wireless_target="TDX-LAB"
channel="6"
approved_adapter="lab wireless adapter"
capture_purpose="document authorized lab handshake metadata"
privacy_rule="ignore non-lab networks and unrelated clients"
cleanup_note="delete temporary capture files after evidence notes are saved"

printf '%s\\n' "ssid=$wireless_target" "channel=$channel" "adapter=$approved_adapter" "purpose=$capture_purpose" "privacy=$privacy_rule" "cleanup=$cleanup_note"`,
    practice:
      "Create a wireless test card that proves target, hardware, purpose, privacy handling, and cleanup before collection.",
    bridge: {
      start: "Radio Scope Before Capture",
      artifact: "wireless test card",
      startText:
        "Wireless work happens in shared space. The professional boundary is the approved network, approved hardware, privacy rule, and cleanup path.",
      beforeHeading: "Before Writing the Wireless Test Card",
      beforeText:
        "Name the SSID, channel, approved adapter, capture purpose, privacy rule, and cleanup before collecting anything.",
      passingStandard: "a wireless test card that excludes unrelated networks and explains why the capture is authorized",
    },
    quizQuestion: "Why is a nearby wireless network not automatically a target?",
    quizOptions: ["It may not be authorized", "It has a channel number", "It appears in a scan", "It has a strong signal"],
  },
  {
    slug: "stage-08",
    title: "Social Engineering Defense Testing",
    hours: "2-3",
    sortOrder: 8,
    focus: "Plan approved awareness simulations without deception that escapes the rules.",
    concept:
      "Social engineering assessments require approval, audience limits, safe pretexts, reporting, and care for people affected by the exercise.",
    fields: [
      ["Simulation goal", "What behavior the exercise measures."],
      ["Audience", "Who is included."],
      ["Pretext boundary", "What the scenario will not claim or impersonate."],
      ["Approval contact", "Who authorized the exercise."],
      ["Reporting plan", "How results become training and remediation."],
    ],
    example: `simulation_goal="measure reporting of suspicious training emails"
audience="approved lab cohort"
pretext_boundary="no crisis claims, no credential collection, no personal pressure"
approval_contact="security training owner"
reporting_plan="share aggregate results and recommended awareness updates"

printf '%s\\n' "goal=$simulation_goal" "audience=$audience" "boundary=$pretext_boundary" "approval=$approval_contact" "reporting=$reporting_plan"`,
    practice:
      "Draft a safe simulation card that protects people while still producing useful training evidence.",
    bridge: {
      start: "People First In Awareness Testing",
      artifact: "safe simulation card",
      startText:
        "Social engineering defense testing measures process and training. It must protect people, avoid pressure tactics, and stay inside approved audience limits.",
      beforeHeading: "Before Writing the Safe Simulation Card",
      beforeText:
        "Write the goal, audience, pretext boundary, approval contact, and reporting plan before designing any message or scenario.",
      passingStandard: "a safe simulation card that measures awareness without collecting credentials or creating personal harm",
    },
    quizQuestion: "What belongs in an approved social engineering simulation plan?",
    quizOptions: ["Audience, boundaries, approval, and reporting", "Private pressure", "Credential collection", "Unapproved impersonation"],
  },
  {
    slug: "stage-09",
    title: "Cryptography Weakness Review",
    hours: "3-4",
    sortOrder: 9,
    focus: "Review cryptography decisions without inventing attacks or custom algorithms.",
    concept:
      "Crypto review asks what asset is protected, what primitive is used, what weakness signal exists, how to test safely, and what remediation is practical.",
    fields: [
      ["Asset name", "What the cryptography protects."],
      ["Crypto use", "Hashing, encryption, signing, or verification."],
      ["Weakness signal", "The clue that a decision may be unsafe."],
      ["Safe test method", "How the issue can be reviewed without exposing secrets."],
      ["Remediation note", "The safer standard or migration path."],
    ],
    example: `asset_name="student password verifier"
crypto_use="password hashing for verification"
weakness_signal="unsalted fast hash observed in legacy records"
safe_test_method="review configuration and sample metadata without collecting passwords"
remediation_note="migrate to slow password hashing with unique salts"

printf '%s\\n' "asset=$asset_name" "use=$crypto_use" "signal=$weakness_signal" "test=$safe_test_method" "remediation=$remediation_note"`,
    practice:
      "Write a crypto review card that identifies the asset, weakness signal, safe review method, and remediation.",
    bridge: {
      start: "Crypto Purpose Before Weakness Claims",
      artifact: "crypto review card",
      startText:
        "Crypto review starts by naming the asset and the purpose of the cryptography. Beginners should not invent attacks or custom algorithms.",
      beforeHeading: "Before Writing the Crypto Review Card",
      beforeText:
        "Connect the asset, crypto use, weakness signal, safe test method, and remediation note before calling the design unsafe.",
      passingStandard: "a crypto review card that uses evidence and established standards instead of guesses",
    },
    quizQuestion: "What is the safest beginner position on cryptography?",
    quizOptions: ["Use established primitives and document the purpose", "Invent a custom cipher", "Log secrets for proof", "Reuse salts everywhere"],
  },
  {
    slug: "stage-10",
    title: "Cloud Security Assessment",
    hours: "3-4",
    sortOrder: 10,
    focus: "Assess cloud configuration through scope, identity, storage, logging, and ownership.",
    concept:
      "Cloud testing is mostly configuration and evidence review. Scope must name the account or project, identity boundary, storage checks, logging signals, and owner.",
    fields: [
      ["Cloud account scope", "The approved account, subscription, or project."],
      ["Identity boundary", "Which roles and permissions are in review."],
      ["Storage check", "What exposure or encryption evidence is inspected."],
      ["Logging signal", "Which logs prove monitoring exists."],
      ["Remediation owner", "Who owns the fix."],
    ],
    example: `cloud_account_scope="tdx-training-project"
identity_boundary="review lab roles only"
storage_check="confirm private buckets and encryption settings"
logging_signal="cloud audit log enabled for admin actions"
remediation_owner="cloud platform owner"

printf '%s\\n' "scope=$cloud_account_scope" "identity=$identity_boundary" "storage=$storage_check" "logging=$logging_signal" "owner=$remediation_owner"`,
    practice:
      "Create a cloud assessment row that ties scope, identity, storage, logging, and ownership to one reviewable control.",
    bridge: {
      start: "Cloud Scope Before Configuration Review",
      artifact: "cloud assessment row",
      startText:
        "Cloud security work is mostly boundary and configuration evidence. The approved account, identity scope, storage rule, and logs matter before any conclusion.",
      beforeHeading: "Before Writing the Cloud Assessment Row",
      beforeText:
        "Tie the account scope, identity boundary, storage check, logging signal, and owner to one control that can be reviewed.",
      passingStandard: "a cloud assessment row that names scope, evidence, and ownership without reaching into unrelated accounts",
    },
    quizQuestion: "What makes a cloud assessment safe and useful?",
    quizOptions: ["Scoped configuration evidence and ownership", "Testing every account found", "Ignoring identity boundaries", "Reporting without remediation"],
  },
  {
    slug: "stage-11",
    title: "Mobile Security Review",
    hours: "3-4",
    sortOrder: 11,
    focus: "Review mobile apps with a test device, data rule, permissions review, and finding note.",
    concept:
      "Mobile security review focuses on app behavior, permissions, storage, network use, and data handling inside an approved test setup.",
    fields: [
      ["App package", "The approved app build or package name."],
      ["Test device", "The device or emulator used for the lab."],
      ["Data handling rule", "What test data can be used."],
      ["Permission review", "Which permissions are being checked."],
      ["Finding note", "What evidence would support a reportable issue."],
    ],
    example: `app_package="io.technodex.training"
test_device="approved lab emulator"
data_handling_rule="use synthetic accounts and no personal data"
permission_review="compare requested permissions to the app feature need"
finding_note="document permission, evidence, impact, and remediation"

printf '%s\\n' "app=$app_package" "device=$test_device" "data_rule=$data_handling_rule" "permissions=$permission_review" "finding=$finding_note"`,
    practice:
      "Write a mobile review card for one permission or data-handling question using only approved synthetic data.",
    bridge: {
      start: "Test Device Before App Claims",
      artifact: "mobile review card",
      startText:
        "Mobile review looks at behavior inside an approved test setup. A test device, synthetic data rule, and permission question keep the review controlled.",
      beforeHeading: "Before Writing the Mobile Review Card",
      beforeText:
        "Name the package, test device, data rule, permission under review, and finding note before inspecting app behavior.",
      passingStandard: "a mobile review card that uses approved test data and connects one permission or data signal to evidence",
    },
    quizQuestion: "What data should a beginner mobile security lab use?",
    quizOptions: ["Synthetic approved test data", "Personal production data", "A stranger's account", "Untracked secrets"],
  },
  {
    slug: "stage-12",
    title: "Reporting & Remediation",
    hours: "2-3",
    sortOrder: 12,
    focus: "Turn findings into clear defender action.",
    concept:
      "A professional report is useful because it gives evidence, impact, remediation, verification, and ownership without drama.",
    fields: [
      ["Finding title", "A concise issue name."],
      ["Evidence summary", "The proof a reviewer can inspect."],
      ["Impact summary", "Why the issue matters."],
      ["Remediation step", "What should be changed."],
      ["Verification step", "How the fix will be checked."],
    ],
    example: `finding_title="Open admin panel on lab host"
evidence_summary="authenticated lab scan showed admin route reachable"
impact_summary="could expose privileged functions if access controls fail"
remediation_step="restrict route and require admin authorization"
verification_step="retest route access after control change"

printf '%s\\n' "title=$finding_title" "evidence=$evidence_summary" "impact=$impact_summary" "remediation=$remediation_step" "verification=$verification_step"`,
    practice:
      "Write a finding row that a defender could use to reproduce, fix, and verify the issue.",
    bridge: {
      start: "Defender Action Before Report Polish",
      artifact: "finding row",
      startText:
        "A finding is useful when a defender can understand the evidence, impact, fix, and verification step without reading your mind.",
      beforeHeading: "Before Writing the Finding Row",
      beforeText:
        "Write the title, evidence summary, impact, remediation, and verification step before worrying about report style.",
      passingStandard: "a finding row that a defender can reproduce, prioritize, fix, and verify",
    },
    quizQuestion: "What makes a finding actionable?",
    quizOptions: ["Evidence, impact, remediation, and verification", "A dramatic title", "Tool output only", "No owner"],
  },
  {
    slug: "stage-13",
    title: "Metasploit Framework in the Lab",
    hours: "3-4",
    sortOrder: 13,
    focus: "Use exploitation frameworks as controlled lab validation tools, not shortcuts.",
    concept:
      "A framework can help validate a lab finding, but the tester still owns scope, module choice, safety options, stop condition, and report evidence.",
    fields: [
      ["Module name", "The lab validation module or technique category."],
      ["Lab target", "The approved target."],
      ["Expected signal", "The evidence the module should produce."],
      ["Safety option", "The setting or behavior that limits impact."],
      ["Stop condition", "When the framework use ends."],
      ["Report note", "How results become a finding."],
    ],
    example: `module_name="lab validation module"
lab_target="lab.local"
expected_signal="version check confirms the finding signal"
safety_option="check mode before any proof action"
stop_condition="stop after version evidence is recorded"
report_note="record evidence, impact, remediation, and verification"

printf '%s\\n' "module=$module_name" "target=$lab_target" "signal=$expected_signal" "safety=$safety_option" "stop=$stop_condition" "report=$report_note"`,
    practice:
      "Draft a framework-use plan that starts with check mode, limits impact, and produces report-ready evidence.",
    bridge: {
      start: "Tester Judgment Before Framework Use",
      artifact: "framework-use plan",
      startText:
        "An exploitation framework does not make the decision for you. Scope, module choice, safe options, stop condition, and evidence still belong to the tester.",
      beforeHeading: "Before Writing the Framework-Use Plan",
      beforeText:
        "Write the module name, target, expected signal, safety option, stop condition, and report note before treating a framework result as proof.",
      passingStandard: "a framework-use plan that starts with safe verification and ends with report-ready evidence",
    },
    quizQuestion: "Who owns the risk when using an exploitation framework in a lab?",
    quizOptions: ["The tester following scope and safety rules", "The tool alone", "The target", "Nobody if it is automated"],
  },
  {
    slug: "stage-14",
    title: "Incident Response Handoff",
    hours: "3-4",
    sortOrder: 14,
    focus: "Hand findings to defenders with preservation, containment, and communication notes.",
    concept:
      "Security testing can reveal urgent risk. A good handoff names the trigger, contact, evidence to preserve, communication path, and lesson learned.",
    fields: [
      ["Incident trigger", "What would cause immediate escalation."],
      ["Containment contact", "Who can act."],
      ["Evidence to preserve", "What logs or artifacts should be saved."],
      ["Communication path", "How the handoff is made."],
      ["Lesson note", "What process should improve."],
    ],
    example: `incident_trigger="evidence of active misuse during lab review"
containment_contact="security operations lead"
evidence_to_preserve="timestamps, source IPs, affected account, tool output"
communication_path="call on-duty lead and attach evidence package"
lesson_note="update scope and monitoring before retest"

printf '%s\\n' "trigger=$incident_trigger" "contact=$containment_contact" "preserve=$evidence_to_preserve" "communication=$communication_path" "lesson=$lesson_note"`,
    practice:
      "Write an incident handoff card that would help a defender preserve evidence and act quickly.",
    bridge: {
      start: "Defender Handoff Before Urgent Action",
      artifact: "incident handoff card",
      startText:
        "If testing reveals urgent risk, the assessment has to support defenders. Preservation, contact, communication, and lessons learned come first.",
      beforeHeading: "Before Writing the Incident Handoff Card",
      beforeText:
        "Name the trigger, containment contact, evidence to preserve, communication path, and lesson note before escalation.",
      passingStandard: "an incident handoff card that helps defenders preserve evidence and act through the approved path",
    },
    quizQuestion: "What should an urgent security handoff include?",
    quizOptions: ["Trigger, contact, preserved evidence, and communication path", "Only a tool name", "A public post", "No timestamps"],
  },
  {
    slug: "stage-15",
    title: "Defense & Hardening",
    hours: "3-4",
    sortOrder: 15,
    focus: "Connect each weakness to a control, validation step, owner, and residual risk decision.",
    concept:
      "Ethical hacking is incomplete if it stops at finding problems. Hardening turns findings into controls and verifies the risk is reduced.",
    fields: [
      ["Asset", "The system being improved."],
      ["Hardening control", "The fix or control."],
      ["Validation step", "How the control is tested."],
      ["Owner", "Who maintains it."],
      ["Residual risk", "What risk remains after the fix."],
    ],
    example: `asset="lab admin portal"
hardening_control="require MFA and restrict admin route access"
validation_step="confirm non-admin users receive a forbidden response"
owner="application security owner"
residual_risk="accept low residual risk after monitoring is enabled"

printf '%s\\n' "asset=$asset" "control=$hardening_control" "validation=$validation_step" "owner=$owner" "residual=$residual_risk"`,
    practice:
      "Create a hardening row that proves the fix, the owner, and the remaining risk decision.",
    bridge: {
      start: "Control Evidence Before Closure",
      artifact: "hardening row",
      startText:
        "The work is not done when a weakness is found. Hardening connects the weakness to a control, a validation step, an owner, and a remaining risk decision.",
      beforeHeading: "Before Writing the Hardening Row",
      beforeText:
        "Name the asset, control, validation step, owner, and residual risk before saying the issue is reduced.",
      passingStandard: "a hardening row that proves the control was checked and the remaining risk has an owner",
    },
    quizQuestion: "What proves hardening reduced risk?",
    quizOptions: ["A validation step tied to the control", "A screenshot alone", "A louder severity label", "Deleting the report"],
  },
  {
    slug: "stage-16",
    title: "Capstone: Authorized Assessment",
    hours: "4-6",
    sortOrder: 16,
    focus: "Assemble a complete assessment path from scope through remediation priority.",
    concept:
      "The capstone joins the workflow: scope, recon, inventory, validation, evidence index, remediation priority, and final readout.",
    fields: [
      ["Scope summary", "The authorized boundary."],
      ["Test sequence", "The ordered assessment steps."],
      ["Evidence index", "Where each proof item is recorded."],
      ["Remediation priority", "Which fix comes first and why."],
      ["Final readout", "How the result is explained to the defender."],
    ],
    example: `scope_summary="authorized lab host and web application only"
test_sequence="scope, recon, inventory, web review, validation, report"
evidence_index="E1 scope card; E2 service inventory; E3 finding row"
remediation_priority="fix admin access control before cosmetic findings"
final_readout="explain evidence, impact, remediation, and verification plan"

printf '%s\\n' "scope=$scope_summary" "sequence=$test_sequence" "evidence=$evidence_index" "priority=$remediation_priority" "readout=$final_readout"`,
    practice:
      "Build a capstone assessment summary that shows the full professional loop from permission to fix verification.",
    bridge: {
      start: "Assessment Story Before Final Readout",
      artifact: "assessment summary",
      startText:
        "The capstone is the whole workflow in order. Permission, recon, inventory, validation, evidence, remediation, and readout should form one defensible story.",
      beforeHeading: "Before Writing the Assessment Summary",
      beforeText:
        "Assemble the scope, test sequence, evidence index, remediation priority, and final readout before calling the assessment complete.",
      passingStandard: "an assessment summary that shows the authorized path from permission to fix verification",
    },
    quizQuestion: "What should a capstone assessment prove?",
    quizOptions: ["A complete authorized workflow and defensible evidence", "Only that a tool ran", "That scope can be skipped", "That remediation is optional"],
  },
];

function fieldTable(fields: Array<[string, string]>) {
  return fields.map(([field, purpose]) => `| ${field} | ${purpose} |`).join("\n");
}

function workspaceProofRows(fields: Array<[string, string]>) {
  return fields.map(([field, purpose]) => `| ${field} | ${purpose} |`).join("\n");
}

function bridgeContent(stage: EthicalStage) {
  return `
## Start Here: ${stage.bridge.start}

${stage.bridge.startText}

You are building one ${stage.bridge.artifact}, not running an unbounded assessment. The goal is to make the next action reviewable before any tool output feels persuasive.

## How to Use This Room Screen

Read the screen as a guided assessment path:

- Learn: connect the topic to the rule that keeps the work authorized.
- Inspect: read the fields as the evidence your ${stage.bridge.artifact} must contain.
- Build: draft one ${stage.bridge.artifact} before changing inputs or running commands.
- Prove: explain why the ${stage.bridge.artifact} is safe, scoped, and useful to a defender.

"Practice after the lesson" means you should be able to say what the workspace wants and what it is not asking you to do before you use the example.

## One Clean Pass Through This Room

Before the workspace, read the assessment as a permission-to-proof chain:

1. Permission names the work that is allowed.
2. Scope names the system, account, range, or lab that is inside the boundary.
3. Exclusions name what must not be touched.
4. Timing names when testing may happen.
5. Evidence names what a defender can review afterward.
6. Stop rules name when the work pauses instead of pushing further.

That chain matters more than tool speed. A professional test is not "I ran a command and found something." A professional test is "I stayed inside the approved boundary, collected evidence the defender can use, and stopped where the rules said to stop."

| Question to answer | What it protects |
| --- | --- |
| What was authorized? | The work stays ethical and reviewable. |
| What is excluded? | Nearby systems and unrelated people stay out of scope. |
| When is testing allowed? | The test does not disrupt the wrong moment. |
| What evidence is useful? | The defender gets proof, impact, and remediation context. |
| When should testing stop? | Uncertainty, unexpected access, or safety concerns get escalated. |

Do not start by planning tools. First say the assessment boundary in one sentence: testing is allowed on this target, during this window, for this purpose, with these exclusions and stop rules.

## What the Workspace Will Ask You To Do

The workspace will ask for one ${stage.bridge.artifact} that proves:

| Workspace item | What it proves |
| --- | --- |
${workspaceProofRows(stage.fields)}

It is not asking you to contact anything outside the approved lab, collect sensitive data, or turn a clue into a finding without explanation.

## Your First Ten Minutes

Use this order:

1. Read the room focus and say the safety boundary in your own words.
2. Inspect the fields and decide which evidence belongs in the ${stage.bridge.artifact}.
3. Write one plain-language draft before using the example.
4. Check that the draft names what is allowed, what is excluded, and what would make you stop.
5. Use the example only after you can explain why the next step is safe.

## ${stage.bridge.beforeHeading}

${stage.bridge.beforeText}

You are ready when the work shows ${stage.bridge.passingStandard}.
`;
}

function lessonContent(stage: EthicalStage) {
  return `# ${stage.title}

${stage.concept}
${bridgeContent(stage)}

## What You Are Learning

${stage.focus}

| Field | Purpose |
| --- | --- |
${fieldTable(stage.fields)}

## Safe Lab Example

~~~shell
${stage.example}
~~~

## Practice

${stage.practice}

Keep the work inside the training lab. You are ready when the work shows clear, scoped work that a defender or instructor could review without guessing what happened.`;
}

export const ETHICAL_HACKING_COURSE = {
  slug: "ethical-hacking",
  title: "Ethical Hacking & Penetration Testing",
  description:
    "Learn authorized security assessment workflow: scope, reconnaissance, validation, evidence handling, reporting, remediation, and defender handoff.",
  icon: "EH",
  difficulty: "Intermediate",
  hours: "40-50",
  topics: [
    "Authorization",
    "Reconnaissance",
    "Web Security",
    "Cloud Security",
    "Reporting",
  ],
  certBadges: ["CEH", "OSCP Prep"],
  stages: ETHICAL_STAGES.map((stage) => ({
    slug: stage.slug,
    title: stage.title,
    hours: stage.hours,
    sortOrder: stage.sortOrder,
    content: lessonContent(stage),
    quiz: [
      {
        type: "multiple_choice",
        question: stage.quizQuestion,
        options: stage.quizOptions,
        correct: 0,
        explanation:
          "Professional security testing starts with permission, evidence, impact control, and remediation value.",
      },
    ],
  })),
};
