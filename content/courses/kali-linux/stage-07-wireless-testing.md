# Wireless Testing Tools

## Why this lesson exists

Wireless testing uses shared radio space, so scope must be explicit. Nearby networks and unrelated clients are **not** targets just because they appear in tool output.

In this lesson you will write a wireless test card that names authorized SSID, channel, approved hardware, capture purpose, privacy rule, and cleanup.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-kali-linux/stage-07
cd ~/asv-learn-kali-linux/stage-07
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-07"
Set-Location "$HOME\asv-learn-kali-linux\stage-07"
```

You will write `wireless_test_card.txt`. If you lack an authorized lab SSID and compatible adapter, complete this stage as a **documentation-only** lab using the sample fields — do not capture neighbor traffic.

## Start here: authorization before wireless capture

Do not treat visible networks as targets. First name:

1. Authorized SSID
2. Channel
3. Approved hardware
4. Capture purpose
5. Privacy rule
6. Cleanup note

Wireless work needs extra care because unrelated people and devices may be nearby. The lab card should make non-lab networks and clients explicitly out of scope.

## Radio scope card

| Field | Reason | Honest limit |
| --- | --- | --- |
| Authorized SSID | Names the target network | Visibility ≠ authorization |
| Channel | Limits radio context | Other channels may still show noise |
| Approved hardware | Confirms the lab adapter | Wrong adapter → skip capture |
| Capture purpose | Explains why data is recorded | Purpose must be narrow |
| Privacy rule | Excludes unrelated networks/users | Must be enforced in practice |
| Cleanup note | Handles temporary capture files | Captures can contain sensitive data |

First say the radio scope in one sentence: *authorized SSID, channel, hardware, purpose, privacy rule, and cleanup.*

## Privacy and shared spectrum

| Situation | Correct response |
| --- | --- |
| Neighbor SSIDs appear in a scan | Ignore; do not record as targets |
| Client devices you do not own associate nearby | Do not target them |
| You only have a home guest SSID you administer | Document that SSID as authorized; keep purpose minimal |
| No authorized SSID available | Documentation-only practice; no capture |

Captures can include personal data. Prefer the minimum metadata needed for the lesson note. Delete temporary capture files after notes are saved unless you have a clear evidence retention reason in an authorized engagement.

## Tool mindset

Wireless tooling in Kali can list networks, set monitor mode, or capture handshakes in advanced labs. For this card:

1. Authorization text comes before adapter commands.
2. Purpose stays educational and minimal.
3. Privacy rule is written and followed.
4. Cleanup is mandatory.

If you are not sure the SSID is yours to test, you are done — stop.

## Common beginner mistakes

- Treating strong signal as permission
- Capturing “everything on the air” for practice
- Leaving capture files on shared disks
- Skipping hardware approval (broken or unauthorized adapters)
- Practicing on café / apartment / employer Wi‑Fi without written leave
- Expecting ASV Learn to provide a radio lab

## Your local task

### Step 1 — Authorization gate

Answer yes/no in `authorization_gate.txt`:

```text
i_own_or_have_written_permission_for_the_ssid=yes
ssid_label=ASV-LAB (replace with your authorized SSID or write NONE)
if_none=documentation_only_no_capture
```

If the answer is no / NONE, still complete Step 2 with the sample lab SSID as a **template only** and do not capture.

### Step 2 — Write the wireless test card

Create `wireless_test_card.txt`:

```text
authorized_ssid=ASV-LAB
channel=6
approved_hardware=lab wireless adapter
capture_purpose=document authorized lab handshake metadata only
privacy_rule=ignore non-lab networks and unrelated clients; do not store foreign SSIDs as targets
cleanup_note=delete temporary capture files after evidence notes are saved
out_of_scope=all SSIDs and clients not named ASV-LAB
```

Optional shell print:

```bash
authorized_ssid="ASV-LAB"
channel="6"
approved_hardware="lab wireless adapter"
capture_purpose="document authorized lab handshake metadata"
privacy_rule="ignore non-lab networks and unrelated clients"
cleanup_note="delete temporary capture files after evidence notes are saved"

printf '%s\n' \
  "ssid=$authorized_ssid" \
  "channel=$channel" \
  "hardware=$approved_hardware" \
  "purpose=$capture_purpose" \
  "privacy=$privacy_rule" \
  "cleanup=$cleanup_note"
```

### Step 3 — Self-review

- Is non-lab traffic explicitly excluded?
- Is cleanup concrete?
- If you lack authorization, did you stay documentation-only?

### Step 4 — One change you can explain

Tighten the privacy rule or capture purpose by one clause and say how that reduces risk to unrelated people.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| SSID | Network name broadcast by an access point |
| Channel | Radio channel used for the lab network |
| Capture | Recording wireless frames for analysis |
| Privacy rule | Written exclusion of unrelated networks/clients |
| Monitor mode | Adapter mode used in advanced wireless labs |

## Proof checklist

- [ ] Authorization gate answered honestly
- [ ] `wireless_test_card.txt` includes SSID, channel, hardware, purpose, privacy, cleanup
- [ ] Out-of-scope networks are excluded in writing
- [ ] No capture performed without authorization
- [ ] Temporary capture files (if any) deleted after notes

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Intercepting or attacking wireless networks without authorization can be illegal and invasive. Only practice on networks you own or have explicit written permission to test.

When those items are true, continue to **Forensics & Analysis**.
