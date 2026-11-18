# Capstone: Authorized Assessment

## Why this lesson exists

The capstone joins the workflow: scope, recon, inventory, validation, evidence index, remediation priority, hardening, and final readout. Tool tricks do not graduate you. A defensible story from permission to fix verification does.

In this lesson you will assemble one **assessment summary** for an authorized local lab target. Capstone work can run longer than a single evening; keep the course card honest at roughly **40–50 hours** for the whole path, with this stage commonly needing a focused multi-hour block.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-16
cd ~/asv-learn-ethical-hacking/stage-16
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-16"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-16"
```

Create a `capstone/` bundle that links or copies your best artifacts from Stages 01–15.

## Start here: assessment story before final readout

The capstone is one narrative with seven beats:

1. **Scope** — what was allowed
2. **Recon** — what you learned before deep contact
3. **Inventory** — what services/apps were present
4. **Validation** — what risk you proved with least impact
5. **Evidence index** — where proof lives
6. **Remediation priority** — what to fix first and why
7. **Final readout** — how you explain the result to a defender

If any beat is missing, the assessment is unfinished even if a tool “succeeded.”

## Capstone deliverables

| Deliverable | Minimum content |
| --- | --- |
| `assessment_summary.txt` | Scope, sequence, evidence index, priority, readout |
| `scope_card.txt` | Authorization boundary used for the run |
| `evidence_index.txt` | E1..En map to files |
| `findings/` | One or more finding rows with remediation + verification |
| `hardening_row.txt` | At least one control closure plan |
| `handoff_card.txt` | Escalation path if urgent risk appears |
| `readme.txt` | How a reviewer should read the bundle in order |

You may reuse earlier files. Prefer truth over volume. One strong finding beats ten decorative scanner lines.

## Assessment summary fields

| Field | Purpose |
| --- | --- |
| Scope summary | Authorized boundary |
| Test sequence | Ordered assessment steps actually used |
| Evidence index | Where each proof item is recorded |
| Remediation priority | Which fix comes first and why |
| Final readout | How the result is explained to the defender |

Example:

```text
scope_summary=authorized lab host and web application only
test_sequence=scope, recon, inventory, web review, validation, report, hardening
evidence_index=E1 scope card; E2 service inventory; E3 finding row; E4 hardening row
remediation_priority=fix admin access control before cosmetic findings
final_readout=explain evidence, impact, remediation, and verification plan
```

## Recommended end-to-end sequence (lab only)

Use this as a checklist, not as a requirement to force every specialty stage into one weekend:

1. Refresh the Stage 01 scope card for the capstone window.
2. Confirm recon notes still match the lab.
3. Build or refresh a short service inventory for `lab.local` (or your label).
4. Perform one web or service review with baseline-before-mutation discipline.
5. Validate at most one finding with an explicit stop condition.
6. Package evidence; refuse sensitive-data collection and persistence.
7. Write the finding row and executive summary.
8. Draft hardening + validation for the top issue.
9. Draft the incident handoff path in case something urgent appears.
10. Deliver the readout as if a busy defender has five minutes.

Specialty stages (wireless, social, cloud, mobile, crypto, Metasploit) are optional intensifiers. Include them only when your lab and authorization honestly support them. Do not fake wireless captures or cloud screenshots.

## Hours honesty

This course card is **40–50 hours**, not a multi-hundred-hour omnibus. Capstone time should deepen integration and evidence quality, not explode into unpaid second curricula. If a specialty area needs more depth, schedule it as deliberate follow-on practice after you finish a clean authorized loop.

## Quality bar for the final readout

Your readout should let a defender answer:

- What was tested?
- What was out of scope?
- What is the top risk and why?
- What evidence supports it?
- What should be fixed first?
- How will we know the fix worked?
- What residual risk remains?
- Who owns the next action?

Practice saying the readout out loud in under three minutes.

## Common beginner mistakes

- Dumping every command ever run into the summary
- Including out-of-scope specialty work without authorization
- Prioritizing severity labels over business/lab impact
- Skipping hardening and handoff because reporting felt finished
- Inflating hours with unfocused tool browsing
- Expecting an automatic grading inside the lesson or inventing unauthorized practice targets

## Your local task

### Step 1 — Build the bundle skeleton

```bash
mkdir -p findings
touch assessment_summary.txt scope_card.txt evidence_index.txt hardening_row.txt handoff_card.txt readme.txt
```

### Step 2 — Fill `assessment_summary.txt`

```bash
scope_summary="authorized lab host and web application only"
test_sequence="scope, recon, inventory, web review, validation, report, hardening"
evidence_index="E1 scope card; E2 service inventory; E3 finding row; E4 hardening row"
remediation_priority="fix admin access control before cosmetic findings"
final_readout="explain evidence, impact, remediation, and verification plan"

printf '%s\n' \
  "scope=$scope_summary" \
  "sequence=$test_sequence" \
  "evidence=$evidence_index" \
  "priority=$remediation_priority" \
  "readout=$final_readout"
```

### Step 3 — Attach real artifacts

Copy or reference your best Stage 01–15 files into the bundle. Update `evidence_index.txt` so every `E#` resolves.

### Step 4 — Write one primary finding and one hardening row

Place the finding in `findings/F1.txt`. Ensure remediation and verification are present. Link the hardening row to F1.

### Step 5 — Deliver the readout

Write `readme.txt` with the three-minute spoken readout script. Then actually speak it once and note any sentence that required guessing — those sentences need better evidence or clearer scope.

### Step 6 — Final self-audit

Ask:

- Would this bundle survive a skeptical reviewer?
- Did every active action stay inside authorization?
- Is remediation priority obvious?
- Are hours spent proportional to the 40–50h course promise?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Assessment summary | Top-level story from scope to readout |
| Evidence index | Map from claim to artifact |
| Remediation priority | Ordered fix plan based on evidenced impact |
| Residual risk | Risk left after hardening decisions |
| Readout | Short defender-facing explanation of results |

## Proof checklist

- [ ] Capstone folder contains summary, scope, evidence index, finding, hardening, handoff, readme
- [ ] Test sequence matches work actually performed
- [ ] At least one finding has evidence, impact, remediation, verification
- [ ] Hardening row ties to the top finding
- [ ] Handoff card exists for urgent escalation
- [ ] Readout can be spoken in under three minutes without inventing facts
- [ ] All practice stayed on authorized local lab/VM targets

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

The capstone is still ethical hacking only when authorization is real. Do not expand into neighbor networks, employer systems, or random internet hosts to make the portfolio look bigger.

When those items are true, you have completed the ASV Learn Ethical Hacking & Penetration Testing path at the depth this course card promises.
