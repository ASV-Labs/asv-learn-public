# Threat Intelligence and MITRE ATT&CK

## Why this lesson exists

Threat intelligence helps analysts connect local evidence to known attacker behavior. MITRE ATT&CK gives that behavior a shared vocabulary.

In this lesson you will build a short threat-intel card: source, local indicator, tactic, technique, confidence, and one detection or hunt action that changes what the SOC does next.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-soc-blue-team/stage-03
cd ~/asv-learn-soc-blue-team/stage-03
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-soc-blue-team\stage-03"
Set-Location "$HOME\asv-learn-soc-blue-team\stage-03"
```

You will create `threat_intel_card.txt` in that folder.

## Start here: local evidence before intel labels

Do not paste an ATT&CK technique onto an alert just because the name sounds familiar. First name:

1. Intel source
2. Local indicator
3. Mapped tactic and technique
4. Confidence
5. Detection or hunt action

Threat intelligence should change what the SOC does next. A famous technique name is not proof by itself.

## What ATT&CK is for

| Piece | What it names | How analysts use it |
| --- | --- | --- |
| Tactic | Broad attacker goal (e.g. Credential Access) | Shared language for “what they were trying to do” |
| Technique | How that goal might be achieved (e.g. Brute Force) | Maps local behavior to a searchable label |
| Sub-technique | More specific method (when needed) | Only when evidence supports the extra precision |

ATT&CK is a map, not a conviction. Mapping helps detection and communication; it does not replace logs.

## Intelligence card fields

| Field | Purpose | Honest claim |
| --- | --- | --- |
| Intel source | Where the outside claim came from | Source quality varies |
| Local indicator | What appears in *your* environment | Outside IOCs may never show up locally |
| ATT&CK tactic | Attacker’s broad goal | Goal can be wrong if evidence is thin |
| Technique | Shared behavior label | Labels can be over-applied |
| Confidence | How much the SOC should trust the mapping | Weak intel stays medium/low |
| Detection action | Search, rule, or hunt to run | Action must be local and authorized |

Say the card in one sentence: source, local indicator, tactic, technique, confidence, and detection action.

## Confidence without theater

| Confidence | When to use it | What not to do |
| --- | --- | --- |
| High | Multiple local evidence points + trusted source | Still avoid absolute “guaranteed APT” claims |
| Medium | Partial local match or single strong source | Do not auto-block everything |
| Low | Speculative or incomplete match | Do not escalate as confirmed intrusion |

## From intel to SOC work

Useful outcomes look like:

- A focused authentication hunt for the same source IP
- A temporary detection rule with a clear false-positive note
- An investigation checklist for Tier 2
- A decision to *not* act because the indicator is weak or out of scope

Useless outcomes look like:

- Pasting IOCs into a block list with no context
- Renaming the ticket with an ATT&CK ID and stopping
- Claiming attribution from one public report

## Common beginner mistakes

- Mapping first, reading local logs second
- Treating every public IOC as high confidence
- Confusing tactic (goal) with technique (method)
- Blocking indicators without an owner or rollback plan
- Using ATT&CK labels to sound certain when evidence is thin

## Your local task

### Step 1 — Local evidence (authorized practice)

```text
Local signal: source IP 10.0.3.44 shows repeated failed logins then success for user alex
Outside note (practice): trusted report discusses brute-force credential access patterns
Your job: map carefully and pick one SOC action
```

### Step 2 — Write the threat-intel card

Create `threat_intel_card.txt`:

```text
intel_source=trusted threat report (practice summary)
mapped_tactic=credential access
attack_technique=T1110 brute force
indicator_value=10.0.3.44 repeated failed logins then success for alex
confidence=medium
detection_action=hunt for the same source_ip across authentication and VPN logs in an authorized window
```

Optional shell print:

```bash
intel_source="trusted threat report"
mapped_tactic="credential access"
attack_technique="T1110 brute force"
indicator_value="10.0.3.44 repeated failed logins"
confidence="medium"
detection_action="hunt for the same source_ip across authentication logs"

printf '%s\n' \
  "$intel_source" \
  "$mapped_tactic" \
  "$attack_technique" \
  "$indicator_value" \
  "$confidence" \
  "$detection_action"
```

### Step 3 — Justify confidence

Add one line:

```text
confidence_reason=local auth pattern matches brute-force shape; no malware or second-stage evidence yet
```

### Step 4 — Self-review

If you removed the ATT&CK label, would the detection action still make sense from the local evidence alone? If not, the mapping is decoration.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Threat intelligence | Outside or shared information used to improve local defense |
| IOC | Indicator of compromise (IP, hash, domain, …) — not proof alone |
| ATT&CK | Shared matrix of tactics and techniques |
| Confidence | How strongly evidence supports the claim |
| Detection action | Concrete SOC work that follows from the card |

## What good looks like

A strong Stage 3 card:

- Puts local evidence before the ATT&CK label
- Records confidence with a one-line reason
- Names one authorized detection or hunt action
- Would still make sense if the ATT&CK ID were removed

## Proof checklist

- [ ] `threat_intel_card.txt` includes source, indicator, tactic, technique, confidence, action
- [ ] Local evidence is named before the ATT&CK label
- [ ] Confidence has a one-line reason
- [ ] Detection action is authorized and specific
- [ ] You did not treat the technique ID as proof of compromise

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Consume intel sources you are allowed to use. Do not pivot into scanning, phishing, or attacking systems named in reports. Defensive mapping and authorized hunting only.

When those items are true, continue to **Incident Response from Detection to Containment**.
