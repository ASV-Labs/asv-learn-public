# Defense & Hardening

## Why this lesson exists

Ethical hacking is incomplete if it stops at finding problems. Hardening turns findings into controls and verifies that risk is reduced. A report without validation of fixes trains people to collect trophies instead of reducing exposure.

In this lesson you will write a **hardening row** that connects one weakness to a control, validation step, owner, and residual risk decision.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-15
cd ~/asv-learn-ethical-hacking/stage-15
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-15"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-15"
```

Reuse a finding from Stage 12 when possible.

## Start here: control evidence before closure

The work is not done when a weakness is found. Closure needs:

1. Asset being improved
2. Control that should reduce the issue
3. Validation step that proves the control works
4. Owner who maintains it
5. Residual risk that remains after the fix
6. Decision to accept, mitigate further, or retest later

“We patched it” without a retest is a hope statement.

## Hardening themes mapped to earlier stages

| Earlier finding type | Example control | Validation idea |
| --- | --- | --- |
| Open admin route | Authz middleware + least privilege | Non-admin receives forbidden response |
| Verbose error / debug page | Disable debug in lab-prod-like mode | Debug path returns generic error |
| Weak password hashing | Migrate to slow salted hashing | Config shows new algorithm; old hashes upgraded on login |
| Public cloud storage | Block public ACLs / enable private defaults | Policy evidence + list attempt denied |
| Excess mobile permission | Remove unused permission | Fresh install permission list updated |
| Wireless lab misconfig | Enforce WPA3/WPA2 as intended | AP settings match documentation |

Defense also includes detection: logs, alerts, and response paths from Stage 14.

## Hardening row fields

| Field | Purpose |
| --- | --- |
| Asset | System being improved |
| Hardening control | Fix or control |
| Validation step | How the control is tested |
| Owner | Who maintains it |
| Residual risk | What risk remains after the fix |

Example:

```text
asset=lab admin portal
hardening_control=require MFA and restrict admin route access
validation_step=confirm non-admin users receive a forbidden response
owner=application security owner
residual_risk=accept low residual risk after monitoring is enabled
```

## Residual risk without hand-waving

| Residual statement | When it is honest |
| --- | --- |
| Accepted low risk with monitoring | Control works; remaining edge cases are tracked |
| Mitigated, retest scheduled | Fix landed; validation not yet complete |
| Not accepted — escalate | Risk still too high for the asset’s role |
| Transferred / shared | Another team owns the control and acknowledged it |

“Accepted” is a decision, not a synonym for “ignored.”

## Detection and malware-defense crossover

Hardening is not only prevention:

- Enable relevant audit logs for the fixed control
- Add an alert for repeat admin-path probes in the lab story
- Document IOCs only when they help defenders, and keep them in the evidence index
- Prefer reduce-then-monitor over monitor-instead-of-fix

If your lab includes suspicious-file hygiene, isolate, hash, and dispose of samples carefully. Do not harden one host by contaminating another.

## Common beginner mistakes

- Declaring victory after changing a setting with no retest
- Owner field left blank
- Residual risk copied as “none” for everything
- Applying every CIS benchmark item without tying to the finding
- Disabling a service that breaks the lab story without documenting tradeoffs
- Treating hardening as optional appendix content

## Your local task

### Step 1 — Pick one finding to close

Use a real note from earlier stages when you can.

### Step 2 — Write `hardening_row.txt`

```bash
asset="lab admin portal"
hardening_control="require MFA and restrict admin route access"
validation_step="confirm non-admin users receive a forbidden response"
owner="application security owner"
residual_risk="accept low residual risk after monitoring is enabled"

printf '%s\n' \
  "asset=$asset" \
  "control=$hardening_control" \
  "validation=$validation_step" \
  "owner=$owner" \
  "residual=$residual_risk"
```

### Step 3 — Optional validation run

If the control exists in your lab, run the validation step and append the result to `hardening_validation.txt`. If not, write the exact validation you would run after the control is implemented.

### Step 4 — Self-review

Ask:

- Does validation prove the control, or only that someone intended a control?
- Is residual risk a decision with an owner?
- Would Stage 14’s handoff path still work if the control failed?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Hardening | Strengthening controls to reduce evidenced risk |
| Validation | Retest that confirms the control works |
| Residual risk | Risk remaining after mitigation |
| Compensating control | Alternate control when the ideal fix is delayed |
| Closure | Finding state when fix + validation + ownership are real |

## Proof checklist

- [ ] `hardening_row.txt` includes asset, control, validation, owner, residual risk
- [ ] Validation step is concrete and retestable
- [ ] Owner is a role or named person
- [ ] Residual risk is an explicit decision
- [ ] Optional validation result or planned validation note exists

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Apply hardening only on systems you own or administer with permission. Do not “helpfully” reconfigure third-party systems discovered on a network scan.

When those items are true, continue to **Capstone: Authorized Assessment**.
