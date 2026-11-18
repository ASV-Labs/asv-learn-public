# Scanning & Enumeration Tools

## Why this lesson exists

Scanning produces **inventory evidence**. It does not automatically prove a vulnerability. A professional service note separates host, port, likely service, confidence, and the next safe verification step.

In this lesson you will build a small **service inventory** for an authorized lab host: at least two rows that treat scan output as a map, not a verdict.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-kali-linux/stage-03
cd ~/asv-learn-kali-linux/stage-03
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-03"
Set-Location "$HOME\asv-learn-kali-linux\stage-03"
```

You will write `service_inventory.txt`. Any real scanner practice must stay on `lab.local` (or your written authorized label) on an isolated lab network. Keep Stage 01’s lab note nearby.

## Start here: inventory before conclusions

Do not turn scan output into a finding. First name:

1. Authorized host
2. Port
3. Likely service
4. Confidence
5. One safe verification step

A port, banner, or service guess is inventory. It becomes useful when you can explain what it proves, what it does not prove, and what still needs verification.

## Networking facts that keep scans honest

You do not need a full networking textbook for this stage, but you do need these distinctions when reading Kali scan tools:

| Idea | Why it matters in the lab |
| --- | --- |
| Host discovery | “Is this address worth scanning?” is different from “what ports are open?” |
| TCP vs UDP | Open UDP is harder to interpret; silence is not always “closed” |
| Port states | Open, closed, filtered, and unknown are different evidence qualities |
| Banner / version clues | Helpful hypotheses; often wrong, incomplete, or intentionally misleading |
| Timing and noise | Faster scans are louder; lab timing still belongs in your notes |

If your lab uses host-only networking, write that down. Bridged adapters make accidental contact with non-lab hosts much easier.

## Inventory row model

| Field | Example | Honest limit |
| --- | --- | --- |
| Host | lab.local | Must be in scope |
| Port | 443 | Open ≠ vulnerable |
| Likely service | https | Banner can lie or be incomplete |
| Confidence | medium | Guessed services stay medium/low |
| Next safe check | verify TLS cert / banner on authorized host | Check must stay scoped |

One sentence check: *host, port, likely service, confidence, and one safe verification step.*

## Reading scan output professionally

Typical Kali scanning tools (Nmap-family workflows and similar) can show ports, states, and guessed services. Treat the columns like this:

| Output piece | What it is | What it is not |
| --- | --- | --- |
| Open port | Reachability clue | Proof of exploitability |
| Service guess | Hypothesis | Confirmed software + version |
| Banner | Hint | Guaranteed truth |
| Many open ports | Wider inventory | Automatic critical finding |
| Script title mentioning a CVE | A clue to review later | A confirmed finding for Stage 04 |

Prefer a small, explained inventory over a huge dump nobody will reread. Save raw tool output under an `evidence/` folder if you keep it, and keep the human rows in `service_inventory.txt`.

## Scan choices that stay reviewable

| Approach | Typical lab use | What it proves | What it does not prove |
| --- | --- | --- | --- |
| Host discovery | Confirm `lab.local` is up | Reachability clue | Softness of the host |
| Focused TCP ports | Map likely service entry points | Possible listeners | Exploitability |
| Version detection | Guess product/version | Stronger service hypothesis | Confirmed CVE |
| Manual banner grab | Read one service carefully | Exact observed text | That the text is trustworthy |

Prefer a narrow authorized scan over a wide “everything” run while you are still learning the inventory habit.

## Safe verification steps

Good next checks stay narrow and authorized:

- Confirm the service banner on the same authorized host
- Note whether the service matches the engagement purpose
- Record version only when the tool actually returns it
- Avoid exploitation language in this stage

Bad next checks:

- “Try exploits”
- “Scan the whole subnet I can see”
- “Test the neighbor’s printer”

## Common beginner mistakes

- Calling an open port a vulnerability
- Trusting version-detection guesses as facts
- Expanding scope because more hosts answered
- Pasting raw scanner walls into a report without a human row
- Skipping confidence so every line looks equally certain
- Expecting ASV Learn to run Nmap inside the lesson page

## Your local task

### Step 1 — Name the authorized scan target

Write the top of `service_inventory.txt`:

```text
authorized_target=lab.local
scan_purpose=build service inventory for authorized lab host
out_of_scope=any host not labeled lab.local
network=host-only / isolated lab
```

### Step 2 — Run one scoped inventory action

If nmap is available in your Kali/lab VM and scope allows it, prefer a focused command against the labeled host:

```bash
mkdir -p evidence
nmap -sV -p 22,80,443 lab.local -oN evidence/nmap-lab-local.txt
```

If nmap is not available, use an authorized manual check you can explain:

```bash
nc -vz lab.local 80
```

Replace host and ports with your labeled lab values. Do not invent a public target.

### Step 3 — Write at least two inventory rows

Append durable rows to `service_inventory.txt` (edit for your real output):

```text
host=lab.local
port=22
likely_service=ssh
confidence=medium
evidence=port open; SSH-style banner observed; version not confirmed
next_safe_check=record banner text; do not attempt credential guessing yet

host=lab.local
port=443
likely_service=https
confidence=medium
evidence=port open; service guess https; version not confirmed
next_safe_check=verify the service banner and certificate subject on lab.local only
```

Optional shell print for one row:

```bash
host="lab.local"
port="443"
likely_service="https"
confidence="medium"
next_safe_check="verify the service banner against the authorized lab host"

printf '%s\n' \
  "host=$host" \
  "port=$port" \
  "service=$likely_service" \
  "confidence=$confidence" \
  "next_check=$next_safe_check"
```

### Step 4 — Self-review

- Did you avoid calling either row a vulnerability?
- Is each next check safe and in scope?
- Could a defender use these rows as a starting inventory?

### Step 5 — One change you can explain

Change confidence or `next_safe_check` on one row and say why the new wording better matches the evidence.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Scan | Active check that maps reachable services |
| Enumeration | Gathering more detail about a service |
| Inventory | Structured list of observed services |
| Banner | Text a service returns that may hint identity |
| Verification | Narrow follow-up that confirms or weakens a guess |

## Proof checklist

- [ ] `service_inventory.txt` names authorized target and out-of-scope line
- [ ] At least two ports/services are recorded with evidence
- [ ] Each row has confidence and a safe next step
- [ ] Open ports are treated as inventory, not compromise
- [ ] Scan commands stayed on the labeled lab host
- [ ] Practice is local / authorized lab only

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not scan networks or hosts you do not own or have written permission to test. Unauthorized scanning can be illegal and harmful.

When those items are true, continue to **Vulnerability Assessment**.
