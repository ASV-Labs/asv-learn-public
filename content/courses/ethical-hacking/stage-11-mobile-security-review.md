# Mobile Security Review

## Why this lesson exists

Mobile security review focuses on app behavior, permissions, storage, network use, and data handling inside an approved test setup. A test device or emulator, synthetic data, and one clear permission question keep the review controlled.

In this lesson you will write a **mobile review card** for an approved lab app package — or a planning card if you do not have an emulator ready yet.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-11
cd ~/asv-learn-ethical-hacking/stage-11
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-11"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-11"
```

You will write `mobile_review_card.txt`. Keep personal phone backups and real contacts out of the exercise.

## Start here: test device before app claims

Before inspecting an app, write:

1. App package / build label
2. Test device or emulator
3. Data handling rule
4. Permission or storage question under review
5. What evidence would support a reportable issue
6. What is out of scope (production accounts, real SMS, friend devices)

Mobile platforms make it easy to touch real identity data. Your card must forbid that explicitly.

## Platform ideas without tool worship

| Area | Review question | Evidence examples |
| --- | --- | --- |
| Permissions | Does the feature need this permission now? | Permission list vs feature map |
| Local storage | Are tokens or PII stored in predictable world-readable places? | Storage path notes on a lab build |
| Transport | Does the lab build pin or at least require TLS? | Proxy notes against the lab app |
| Auth session | What happens on logout / token expiry? | Observed session behavior |
| WebViews | Is untrusted content executed with too much power? | Navigation and JS bridge notes |
| IoT-adjacent apps | Does the companion app expose device admin carelessly? | Pairing and local network notes |

Deep tooling (Frida, Objection, firmware extraction) appears in feedstock. In this course stage, mastery means **one controlled review question with synthetic data**, not a full mobile exploit pipeline.

## Synthetic data rules

| Allowed | Not allowed |
| --- | --- |
| Fake names and lab emails | Real customer or family data |
| Throwaway lab accounts | Production SSO accounts |
| Sample tokens generated for the lab | Stolen session cookies from real apps |
| Screenshots of lab-only screens | Photos of other people’s private content |

If the only way to test a feature is to use real personal data, redesign the lab or stop.

## Mobile review card fields

| Field | Purpose |
| --- | --- |
| App package | Approved app build or package name |
| Test device | Device or emulator used for the lab |
| Data handling rule | What test data can be used |
| Permission review | Which permissions are being checked |
| Finding note | What evidence would support a reportable issue |

Example:

```text
app_package=lab.training.mobile
test_device=approved lab emulator
data_handling_rule=use synthetic accounts and no personal data
permission_review=compare requested permissions to the app feature need
finding_note=document permission, evidence, impact, and remediation
```

## A simple review workflow

1. Install only the lab build on the lab emulator/device.
2. List permissions and map each to a feature.
3. Exercise one feature with synthetic data.
4. Note storage or network behaviors that seem excessive.
5. Write one finding note or an explicit “no issue evidenced” note.
6. Uninstall or reset the emulator snapshot when done.

“No issue evidenced” is a valid professional outcome.

## Common beginner mistakes

- Sideloading random APKs from the internet onto a daily-driver phone
- Using a personal Google/Apple account full of real data
- Calling every permission “malware”
- Proxying all phone traffic without noticing non-lab apps
- Publishing lab package names as if they were vendor 0-days
- Skipping uninstall/reset so lab credentials linger

## Your local task

### Step 1 — Declare practice mode

```text
practice_mode=lab-emulator
```

or

```text
practice_mode=planning-only
```

### Step 2 — Write `mobile_review_card.txt`

```bash
app_package="lab.training.mobile"
test_device="approved lab emulator"
data_handling_rule="use synthetic accounts and no personal data"
permission_review="compare requested permissions to the app feature need"
finding_note="document permission, evidence, impact, and remediation"

printf '%s\n' \
  "app=$app_package" \
  "device=$test_device" \
  "data_rule=$data_handling_rule" \
  "permissions=$permission_review" \
  "finding=$finding_note"
```

### Step 3 — Permission map

Create `permission_map.txt` with at least three permissions (real from your lab app, or realistic examples if planning-only) and whether each is justified by a feature.

### Step 4 — Self-review

Ask:

- Is all data synthetic?
- Is the device a lab device?
- Does the finding note require evidence, not vibes?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Package name | Application identifier on the platform |
| Emulator | Virtual device used for safer lab testing |
| Permission | OS-mediated access to sensitive capabilities |
| Synthetic data | Fake data created for testing |
| Companion app | Mobile app that controls or monitors a device |

## Proof checklist

- [ ] Practice mode is explicit
- [ ] `mobile_review_card.txt` complete
- [ ] `permission_map.txt` has at least three rows
- [ ] Data handling rule forbids personal/production data
- [ ] No review of unauthorized third-party production apps as “practice targets”

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Review only app builds and devices you are authorized to test. Do not reverse or intercept other people’s production apps or accounts for this course.

When those items are true, continue to **Reporting & Remediation**.
