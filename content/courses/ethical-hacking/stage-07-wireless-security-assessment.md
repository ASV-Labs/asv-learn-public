# Wireless Security Assessment

## Why this lesson exists

Wireless testing touches shared radio space. Nearby networks are not automatically targets because they appear in a scan. Professional work names the authorized SSID or lab network, approved hardware, capture purpose, privacy rule, and cleanup before any monitor-mode excitement.

In this lesson you will create a **wireless test card** for an authorized lab network only — ideally an isolated practice AP you own, not your neighbor’s Wi‑Fi.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-07
cd ~/asv-learn-ethical-hacking/stage-07
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-07"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-07"
```

If you do not have a dedicated practice AP, complete this stage as a **planning and privacy-boundary exercise**. Do not “practice” on unknown networks.

## Start here: radio scope before capture

Wireless packets do not respect your intentions. Before enabling monitor mode or any capture tool, write:

1. Authorized SSID / BSSID
2. Channel (if known)
3. Approved adapter
4. Capture purpose
5. Privacy rule for unrelated networks and clients
6. Cleanup for temporary capture files

If those fields are blank, the card is not ready.

## Wireless fundamentals that matter for testers

| Concept | Why it matters |
| --- | --- |
| SSID / BSSID | Human name vs radio identity; duplicates and spoofs exist |
| Channel / band | Capture without channel focus collects irrelevant noise |
| Open / WPA2 / WPA3 | Security posture changes what “assessment” even means |
| Client vs AP | Clients may be guest phones; privacy rules still apply |
| Monitor mode | Powerful and easy to misuse outside a lab AP |

WEP cracking demos from older curricula are historical learning material. They are not a reason to attack any live network you do not own. Prefer modern lab setups where you control the AP and the clients.

## Privacy is part of scope

| Rule | Practical meaning |
| --- | --- |
| Authorized network only | Filter or ignore SSIDs that are not on the card |
| No bystander content | Do not inspect unrelated client traffic for fun |
| Purpose-bound capture | Handshake/metadata for the lab AP, not “everything in the air” |
| Retention limit | Delete captures after notes are saved unless evidence rules require keeping them |
| Location honesty | Coffee-shop airspace is not your classroom |

A strong signal from a neighbor network is still unauthorized. Signal strength is not consent.

## Wireless test card fields

| Field | Purpose |
| --- | --- |
| Wireless target | Authorized SSID or lab network |
| Channel | Radio channel being observed |
| Approved adapter | Hardware allowed for the lab |
| Capture purpose | Why metadata is being collected |
| Privacy rule | How unrelated networks/clients are excluded |
| Cleanup note | How temporary captures are handled |

Example:

```text
wireless_target=ASV-LAB-AP
channel=6
approved_adapter=lab wireless adapter
capture_purpose=document authorized lab handshake metadata
privacy_rule=ignore non-lab networks and unrelated clients
cleanup_note=delete temporary capture files after evidence notes are saved
```

## Assessment questions that stay honest

Good lab questions:

- Is the practice AP using the expected security mode?
- Are guest and lab SSIDs separated as intended?
- Does the lab documentation match the observed BSSID/channel?
- Are capture files stored only in the course notes workspace?

Questions that usually leave the house style:

- Can I break into the cafe Wi‑Fi?
- What is my neighbor’s password?
- Can I deauth strangers to force handshakes?

Those are not course practice tasks.

## Common beginner mistakes

- Enabling monitor mode on a laptop at home and treating every SSID as a lab
- Saving large pcaps to shared folders without review
- Running deauth floods because a tutorial showed the command
- Forgetting cleanup so captures linger on USB disks
- Calling “detected WPA2” a vulnerability by itself
- Skipping the privacy rule because “I’m only looking”

## Your local task

### Step 1 — Decide practice mode

Write one of these at the top of `wireless_test_card.txt`:

```text
practice_mode=authorized-lab-ap
```

or

```text
practice_mode=planning-only-no-capture
```

### Step 2 — Fill the card

```bash
wireless_target="ASV-LAB-AP"
channel="6"
approved_adapter="lab wireless adapter"
capture_purpose="document authorized lab handshake metadata"
privacy_rule="ignore non-lab networks and unrelated clients"
cleanup_note="delete temporary capture files after evidence notes are saved"

printf '%s\n' \
  "ssid=$wireless_target" \
  "channel=$channel" \
  "adapter=$approved_adapter" \
  "purpose=$capture_purpose" \
  "privacy=$privacy_rule" \
  "cleanup=$cleanup_note"
```

### Step 3 — Optional authorized observation

Only if `practice_mode=authorized-lab-ap` and you own/control the AP, perform the minimum observation needed for your purpose. Prefer listing the lab SSID and channel over long open-air captures. Record what you saw in `wireless_notes.txt`.

### Step 4 — Cleanup and self-review

Delete temporary captures you do not need. Ask:

- Would this card protect a bystander network?
- Is the purpose narrower than “see what happens”?
- Can I prove authorization for the SSID I named?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| SSID | Network name advertised by an access point |
| BSSID | Radio identifier for a specific AP interface |
| Monitor mode | Adapter mode that can observe wireless frames |
| Privacy rule | Written limit that excludes unrelated networks/clients |
| Practice AP | Access point you own/control for lab learning |

## Proof checklist

- [ ] `wireless_test_card.txt` includes target, channel, adapter, purpose, privacy, cleanup
- [ ] Practice mode is explicit
- [ ] Privacy rule excludes non-lab networks
- [ ] No capture of unauthorized networks occurred
- [ ] Temporary files cleaned or planning-only status stated

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not assess, deauthenticate, capture, or crack networks you do not own or lack written authorization to test. Shared radio space makes mistakes easy; your card must make the boundary obvious.

When those items are true, continue to **Social Engineering Defense Testing**.
