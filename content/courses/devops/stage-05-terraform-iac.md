# Infrastructure as Code with Terraform

## Why this lesson exists

**Infrastructure as code** turns changes into reviewable files. The habit is not "apply quickly" — it is **plan → review → apply → verify drift**. Terraform (and similar tools) is safest when state, scope, and approval are visible before reality changes.

This stage teaches you to write an **infrastructure change card** before any `terraform apply`. You do not need cloud credentials for the card exercise. ASV Learn does not provide a hosted Terraform cloud sandbox for this lesson — practice is local notes plus optional local CLI.

## Reminder: where you work

```bash
cd ~/asv-learn-devops
mkdir -p stage-05
cd stage-05
```

Create `iac_change_card.sh`. If Terraform is installed locally, `terraform version` is optional proof only.

## Change discipline

| Item | Purpose |
| --- | --- |
| Resource scope | Names affected infrastructure |
| State backend | Protects record of managed resources |
| Plan review | Shows changes before apply |
| Variable rule | Environment data explicit |
| Apply gate | Controls who may change reality |
| Drift check | Detects changes made outside code |

**State** is not a casual note file. It maps code to real resources. Protect it (remote backend, locking, access control).

## Plan output: what reviewers scan for

When you attach `terraform plan` to a PR, skim for:

| Signal | Concern level |
| --- | --- |
| `+ create` small resource | Usually normal |
| `~ update in-place` | Read argument changes carefully |
| `-/+ destroy and then create replacement` | Downtime or new identity — high scrutiny |
| `- destroy` | Must be intentional; data loss risk |
| Unexpected resource count | Scope creep — card said "one LB" but plan touches ten resources |

If plan and card scope disagree, stop. Fix scope or fix code before apply.

## Useful local commands (optional)

| Goal | Example | Notes |
| --- | --- | --- |
| Confirm install | `terraform version` | No cloud needed |
| Format | `terraform fmt -check` | When you have `.tf` files |
| Validate syntax | `terraform validate` | After `init` in a real module |
| Plan (authorized) | `terraform plan -out=tfplan` | Never against accounts you do not own |
| Show plan | `terraform show tfplan` | Review before apply |

Without cloud credentials, still complete the change card and reviewer checklist — that is the stage proof.

## Variables and secrets

- **Variables** — environment size, region, instance type (checked into sane defaults + tfvars per env).
- **Secrets** — database passwords, API keys (vault, cloud secret manager, CI-injected — **not** git).

Terraform state may still contain sensitive values if providers mark them — restrict state access like production credentials.

| Kind | OK in git? | Better home |
| --- | --- | --- |
| Region / instance size | Often yes (non-secret) | `variables.tf` + env tfvars |
| DB password | No | Secret manager / CI secret |
| State file | No (local casual copies) | Remote backend + locking |
| Provider tokens | No | Environment / CI |

## Modules and reuse (one paragraph)

Teams split Terraform into **modules** when the same pattern repeats (standard web tier, database subnet). Modules do not change the discipline: plan, review, apply, drift check. Your change card scope should still say whether this PR touches a root module only or a shared module others depend on — shared modules deserve extra review because blast radius grows.

## Start here: plan before apply

Say the card: *scope is web instance + load balancer, remote locked state, plan reviewed in PR, secrets not in state when avoidable, apply needs peer review + window, scheduled plan detects drift.*

## Common beginner mistakes

- `apply` from laptop without plan review
- Local state file on one engineer's machine only
- Secrets in `.tfvars` committed to git
- No scope — "terraform the whole account"
- Treating destroy operations as low risk
- Expecting ASV Learn to provision cloud resources for practice
- Applying a plan generated days ago without re-planning

## Your local task

### Step 1 — Create the change card

Create `iac_change_card.sh`:

```bash
#!/usr/bin/env bash
# iac_change_card.sh — Stage 05: Terraform / IaC

resource_scope="web service instance + load balancer + target group"
state_backend="remote S3-equivalent backend with state locking"
plan_review="terraform plan output attached to PR; no apply without approval"
variable_rule="env via tfvars; secrets from vault — not committed"
apply_gate="apply requires peer review + maintenance window"
drift_check="scheduled terraform plan in CI flags unmanaged changes"

printf '%s\n' \
  "scope=$resource_scope" \
  "state=$state_backend" \
  "plan_review=$plan_review" \
  "variables=$variable_rule" \
  "apply_gate=$apply_gate" \
  "drift=$drift_check"
```

### Step 2 — Run

```bash
bash iac_change_card.sh
```

### Step 3 — Plan review practice

Create `plan_review_checklist.txt` with five yes/no questions a reviewer asks before approve (e.g. "Any unexpected destroy?", "Blast radius documented?").

### Step 4 — One scoped change story

Add a paragraph to the checklist describing a **small** change (add tag, resize instance) vs a **risky** change (replace load balancer). Same card format; different approval bar.

### Step 5 — Blast-radius sketch

Create `blast_radius.txt` naming: (1) resources in scope, (2) resources explicitly out of scope, (3) what you would do if `terraform plan` shows an unexpected destroy. This is paper discipline — no cloud apply required.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| IaC | Infrastructure defined in version-controlled files |
| plan | Preview of changes Terraform will make |
| apply | Execute planned changes against real infra |
| state | Mapping between resources in code and in cloud |
| drift | Real infra differs from code |
| backend | Where state is stored and locked |
| blast radius | How much can break if this change is wrong |

## Proof checklist

- [ ] Change card prints six discipline fields
- [ ] Plan review is required before apply in your card
- [ ] State backend mentions locking or protection
- [ ] `plan_review_checklist.txt` has five reviewer questions
- [ ] `blast_radius.txt` names in-scope / out-of-scope / unexpected destroy response
- [ ] You can explain why state needs stronger protection than notes
- [ ] Any terraform CLI use was local or authorized account only

When those are true, continue to **Monitoring & Observability**.

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
