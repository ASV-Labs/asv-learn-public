# Cloud Security Assessment

## Why this lesson exists

Cloud testing is mostly configuration and evidence review. The approved account, identity boundary, storage checks, logging signals, and remediation owner matter more than flashy exploit demos. Many real cloud incidents start as misconfiguration, not movie hacking.

In this lesson you will write a **cloud assessment row** for an authorized training project/account — or a planning row if you are using local mocks and documentation only.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-10
cd ~/asv-learn-ethical-hacking/stage-10
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-10"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-10"
```

You will write `cloud_assessment_row.txt`. Keep provider credentials out of git and out of lesson screenshots.

## Start here: cloud scope before configuration review

Write the boundary first:

1. Which account, subscription, or project is approved?
2. Which identities/roles are in review?
3. Which storage or network controls are being checked?
4. Which logs prove monitoring exists?
5. Who owns the fix?
6. What is explicitly out of scope (other accounts, customer tenancies, production)?

Cloud power makes cross-account mistakes expensive. Scope is the safety rail.

## Shared responsibility without slogans

| Layer | Provider usually owns | Customer / lab owner usually owns |
| --- | --- | --- |
| Physical data centers | Facilities and hardware controls | Almost nothing here |
| Managed service runtime | Platform patching for the service | Configuration of the service |
| Identity and access | IAM features | Who gets which role |
| Data | Encryption features | Classification, key choices, exposure settings |
| Logging | Log products | Enabling, retention, review, response |

A managed database being “in the cloud” does not mean the provider chose your public exposure settings for you.

## High-value misconfiguration themes

| Theme | Lab review question | Evidence to capture |
| --- | --- | --- |
| Storage exposure | Is the bucket/container private by default policy? | Policy JSON / console evidence, not downloaded private data |
| IAM excess | Does a lab role allow `*` on sensitive actions? | Role policy summary |
| Network exposure | Are admin ports open to the world? | Security group / firewall rules |
| Secrets in code | Are keys committed to a lab repo? | File path and redacted snippet |
| Logging gaps | Are admin actions audited? | Log config enabled/disabled |

If you find a publicly listable training bucket in your own authorized cloud lab account, document exposure settings. Do not download other people’s data if you stumble into something unexpected — stop and fix ownership assumptions.

## Cloud assessment row fields

| Field | Purpose |
| --- | --- |
| Cloud account scope | Approved account, subscription, or project |
| Identity boundary | Roles and permissions in review |
| Storage check | Exposure or encryption evidence inspected |
| Logging signal | Logs that prove monitoring exists |
| Remediation owner | Who owns the fix |

Example:

```text
cloud_account_scope=asv-training-project
identity_boundary=review lab roles only
storage_check=confirm private buckets and encryption settings
logging_signal=cloud audit log enabled for admin actions
remediation_owner=cloud platform owner
```

## Containers and Kubernetes as cloud-adjacent scope

If your lab includes containers:

- Review whether the container runs as root unnecessarily
- Check whether secrets are baked into images
- Confirm network policies are intentional
- Keep cluster credentials out of notes that sync publicly

Treat cluster names like hostnames: only touch labeled lab clusters.

## Common beginner mistakes

- Scanning the public internet for open buckets as homework
- Using personal cloud root credentials for experiments
- Screenshotting full access keys into chat
- Calling “cloud” a finding without naming the control
- Testing a workplace cloud account without written permission
- Ignoring logging because storage findings feel more exciting

## Your local task

### Step 1 — Declare practice mode

```text
practice_mode=authorized-cloud-lab-account
```

or

```text
practice_mode=planning-only
```

### Step 2 — Write `cloud_assessment_row.txt`

```text
cloud_account_scope=asv-training-project
identity_boundary=review lab roles only
storage_check=confirm private buckets and encryption settings
logging_signal=cloud audit log enabled for admin actions
remediation_owner=cloud platform owner
out_of_scope=any cloud account not named in this row
```

Optional shell print:

```bash
cloud_account_scope="asv-training-project"
identity_boundary="review lab roles only"
storage_check="confirm private buckets and encryption settings"
logging_signal="cloud audit log enabled for admin actions"
remediation_owner="cloud platform owner"

printf '%s\n' \
  "scope=$cloud_account_scope" \
  "identity=$identity_boundary" \
  "storage=$storage_check" \
  "logging=$logging_signal" \
  "owner=$remediation_owner"
```

### Step 3 — Collect one evidence note

If you have an authorized cloud lab account, export or copy one non-secret configuration evidence item (for example: “bucket public access block = on”). If planning-only, write the exact console/CLI check you would run.

### Step 4 — Self-review

Ask:

- Is the account scope unmistakable?
- Did I avoid collecting foreign data?
- Does an owner exist for the remediation?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Shared responsibility | Split of security duties between provider and customer |
| IAM | Identity and access management |
| Misconfiguration | Unsafe settings that create exposure without a novel exploit |
| Audit log | Record of administrative or data-plane actions |
| Sandbox account | Isolated cloud project approved for learning |

## Proof checklist

- [ ] Practice mode is explicit
- [ ] `cloud_assessment_row.txt` includes scope, identity, storage, logging, owner
- [ ] Evidence note avoids secrets and foreign data
- [ ] Out-of-scope accounts are named
- [ ] No public-bucket hunting on the open internet

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not probe random public buckets “to learn.”

Assess only cloud accounts and projects you own or are explicitly authorized to test. Public exposure on the internet is not an invitation.

When those items are true, continue to **Mobile Security Review**.
