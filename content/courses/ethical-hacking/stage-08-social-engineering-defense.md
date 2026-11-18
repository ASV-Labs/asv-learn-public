# Social Engineering Defense Testing

## Why this lesson exists

Social engineering assessments measure process and training. They can harm people if they use pressure, humiliation, credential theft, or unapproved impersonation. Professional defense testing requires approval, audience limits, safe pretexts, reporting plans, and care for the humans affected.

In this lesson you will draft a **safe simulation card** for an approved awareness exercise — not a real phishing campaign against strangers.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-08
cd ~/asv-learn-ethical-hacking/stage-08
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-08"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-08"
```

You will write `safe_simulation_card.txt`. This stage is mostly planning and defense design.

## Start here: people first

Before inventing a pretext, answer:

1. What behavior are we measuring?
2. Who is in the approved audience?
3. What will the scenario refuse to do?
4. Who authorized the exercise?
5. How do results become training, not blame?

If the plan cannot protect people, it is not ready — regardless of how clever the story sounds.

## What social engineering tests can measure

| Goal | Useful signal | Harmful distortion |
| --- | --- | --- |
| Reporting habit | Users report suspicious training mail | Tricking users then mocking them |
| Verification habit | Users check a second channel before action | Creating fake emergencies |
| Process gaps | Help desk follows reset procedures | Pressuring staff into policy violations |
| Defense controls | Mail filters / banners catch the template | Collecting real passwords “to prove it” |

Defense testing is successful when it improves systems and training. It fails when it primarily produces embarrassment.

## Pretext boundaries that belong in writing

| Boundary | Why it matters |
| --- | --- |
| No credential collection | Real passwords turn training into an incident |
| No crisis impersonation | Fake medical/legal threats cause real harm |
| No executive spoofing without approval | Authority pressure warps consent |
| No targeting of excluded people | Interns, customers, or distressed staff may be off limits |
| Aggregate reporting by default | Individual gotcha lists create fear, not learning |

Feedstock material covers phishing platforms and physical techniques. In this ASV Learn path, you study those concepts through **safe planning and defense design**, not by running unauthorized campaigns.

## Safe simulation card fields

| Field | Purpose |
| --- | --- |
| Simulation goal | Behavior the exercise measures |
| Audience | Who is included |
| Pretext boundary | What the scenario will not claim or impersonate |
| Approval contact | Who authorized the exercise |
| Reporting plan | How results become training and remediation |

Example:

```text
simulation_goal=measure reporting of suspicious training emails
audience=approved lab cohort
pretext_boundary=no crisis claims, no credential collection, no personal pressure
approval_contact=security training owner
reporting_plan=share aggregate results and recommended awareness updates
```

## Defense notes you should write even in a lab

While drafting the simulation, also draft the defensive improvements you would recommend:

- Clear reporting button / mailbox
- Banner marking external mail
- Help-desk verification script for reset requests
- Tabletop for “urgent payment” and “urgent gift card” stories
- After-action training that avoids shaming

A simulation without a remediation path is entertainment.

## Common beginner mistakes

- Designing the cleverest lure before writing approval and audience
- Planning to collect passwords “just for metrics”
- Using fear, grief, or HR threats as pretexts
- Publishing named fail lists
- Practicing on friends/family without informed consent and a safe design
- Confusing OSINT curiosity about real people with course practice

## Your local task

### Step 1 — Choose a measurable goal

Pick one behavior, such as “report suspicious training email within one business day.”

### Step 2 — Write `safe_simulation_card.txt`

```bash
simulation_goal="measure reporting of suspicious training emails"
audience="approved lab cohort"
pretext_boundary="no crisis claims, no credential collection, no personal pressure"
approval_contact="security training owner"
reporting_plan="share aggregate results and recommended awareness updates"

printf '%s\n' \
  "goal=$simulation_goal" \
  "audience=$audience" \
  "boundary=$pretext_boundary" \
  "approval=$approval_contact" \
  "reporting=$reporting_plan"
```

### Step 3 — Write three defense recommendations

Create `defense_recommendations.txt` with three concrete controls or training updates that would make the measured behavior easier and safer.

### Step 4 — Self-review

Ask:

- Would I accept this exercise if I were in the audience?
- Does the plan avoid credential collection and crisis theater?
- Can results be reported without humiliating individuals?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Pretext | Cover story used in a social engineering exercise |
| Audience | Approved population included in the test |
| Awareness simulation | Authorized exercise that measures human/process defenses |
| Aggregate reporting | Results summarized without unnecessary naming |
| Verification habit | Checking a second trusted channel before acting |

## Proof checklist

- [ ] `safe_simulation_card.txt` includes goal, audience, boundary, approval, reporting
- [ ] Pretext boundary forbids credential collection and crisis claims
- [ ] `defense_recommendations.txt` has at least three improvements
- [ ] No live phishing was sent to unauthorized people
- [ ] You can explain how the exercise protects participants

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Any live simulation requires explicit organizational approval outside this course page.

Do not run phishing, vishing, or physical intrusion exercises against people or organizations that have not approved the engagement in writing. Course practice here is planning and defense design unless you have separate explicit authorization.

When those items are true, continue to **Cryptography Weakness Review**.
