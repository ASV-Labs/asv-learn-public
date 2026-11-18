# Scanning & Enumeration

## Why this lesson exists

Scanning identifies reachable services. Enumeration adds detail. Neither step proves a vulnerability until evidence is verified. Beginners often jump from “port open” to “critical finding.” Professionals build an inventory first.

In this lesson you will create **service inventory rows** for an authorized lab host: target, port, service guess, enumeration evidence, confidence, and one safe next step.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-03
cd ~/asv-learn-ethical-hacking/stage-03
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-03"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-03"
```

Keep Stage 01 scope and Stage 02 recon notes open. Scanning outside those notes is out of scope by definition.

## Start here: inventory before vulnerability claims

A port, banner, or service guess is inventory evidence. It becomes useful when you can explain:

1. Which authorized host it belongs to
2. What was observed
3. How confident the service guess is
4. What still needs verification
5. Why the next check is still inside scope

Do not start by calling the service vulnerable. First say the inventory row in one sentence.

## Networking facts that keep scans honest

You do not need a full networking textbook for this stage, but you do need these distinctions:

| Idea | Why scanners care |
| --- | --- |
| Host discovery | “Is this address worth scanning?” is different from “what ports are open?” |
| TCP vs UDP | Open UDP is harder to interpret; absence of response is not always closed |
| Port states | Open, closed, filtered, and unknown mean different evidence qualities |
| Banner / version clues | Helpful hypotheses; often wrong, incomplete, or intentionally misleading |
| Timing and noise | Faster scans are louder and less polite; lab timing still belongs in notes |

If your lab uses host-only networking, write that down. Bridged adapters make accidental contact with non-lab hosts much easier.

## Scan types as evidence choices

| Approach | Typical use in lab | What it proves | What it does not prove |
| --- | --- | --- | --- |
| Host discovery | Confirm `lab.local` is up | Reachability clue | Softness of the host |
| TCP port scan | Map likely service entry points | Possible listeners | Exploitability |
| Version detection | Guess product/version | Stronger service hypothesis | Confirmed CVE |
| Scripted checks | Gather structured clues | More inventory detail | Automatic finding validity |
| Manual banner grab | Read a service response carefully | Exact observed text | That the text is trustworthy |

Prefer a narrow authorized scan over a wide “everything” run. Wide scans create more noise than understanding when you are still learning the inventory habit.

## Enumeration without overclaiming

Enumeration means asking a service for more detail after you know it exists. Examples in an authorized lab:

- HTTP title or server header on an approved web target
- SMB share listing only if the lab target and scope allow it
- SNMP community checks only on labeled lab devices
- SMTP commands that identify service behavior without sending spam

Each enumeration action should answer one inventory question. If you cannot name the question, you are browsing, not enumerating.

| Field | Purpose |
| --- | --- |
| Scan target | In-scope host label |
| Port | Numeric network endpoint |
| Service guess | Likely service based on evidence |
| Enumeration evidence | Banner, response, or clue observed |
| Confidence | How strong the guess is |
| Safe next step | Scoped verification action |

## Example inventory rows

```text
target=lab.local
port=22
service_guess=ssh
enumeration_evidence=SSH banner observed on authorized lab host
confidence=medium
safe_next_step=record banner text; do not attempt credential guessing yet

target=lab.local
port=80
service_guess=http
enumeration_evidence=HTTP response returned a training application title
confidence=medium
safe_next_step=map method/path/input in Stage 04 before changing parameters
```

## Common beginner mistakes

- Treating an open port as a confirmed vulnerability
- Scanning a subnet larger than the scope card
- Saving only tool HTML/XML output with no human inventory row
- Running aggressive scripts before a baseline port map
- Copying CVE names from a script title into the report
- Enumerating services on hosts that merely appeared nearby

## Your local task

### Step 1 — Name the authorized scan target

Write the top of `service_inventory.txt`:

```text
authorized_target=lab.local
scan_purpose=build service inventory for authorized lab host
out_of_scope=any host not labeled lab.local
```

### Step 2 — Run one scoped inventory action

If nmap is available in your lab VM and scope allows it, prefer a focused command against the labeled host:

```bash
nmap -sV -p 22,80,443 lab.local
```

If nmap is not available, use an authorized manual check you can explain, such as:

```bash
nc -vz lab.local 80
```

Replace host and ports with your labeled lab values. Do not invent a public target.

### Step 3 — Write at least two inventory rows

```bash
scan_target="lab.local"
port="443"
service_guess="https"
enumeration_evidence="TLS service responded with a training banner"
safe_next_step="verify the banner on the authorized lab target"

printf '%s\n' \
  "target=$scan_target" \
  "port=$port" \
  "service=$service_guess" \
  "evidence=$enumeration_evidence" \
  "next=$safe_next_step"
```

Put the durable version in `service_inventory.txt`.

### Step 4 — Self-review

For each row, answer out loud:

- What did I observe?
- What am I only guessing?
- What verification is still required before risk language?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Scanning | Mapping reachable hosts/ports inside scope |
| Enumeration | Collecting service detail after a target is known |
| Banner | Service-provided text that may hint at product/version |
| False confidence | Treating scanner labels as verified truth |
| Inventory row | Human-readable record of observed service evidence |

## Proof checklist

- [ ] `service_inventory.txt` names authorized target and out-of-scope line
- [ ] At least two ports/services are recorded with evidence
- [ ] Each row has confidence and a safe next step
- [ ] No row claims a vulnerability without verification language
- [ ] Scan commands stayed on the labeled lab host

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Scan only systems you own or are explicitly authorized to test on an isolated lab network. Neighbor devices and random internet hosts are not practice targets.

When those items are true, continue to **Web Application Testing Basics**.
