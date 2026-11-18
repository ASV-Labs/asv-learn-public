# Cryptography Weakness Review

## Why this lesson exists

Crypto review asks what asset is protected, what primitive is used, what weakness signal exists, how to test safely, and what remediation is practical. Beginners should not invent ciphers, log secrets for “proof,” or treat hash length as a personality quiz.

In this lesson you will write a **crypto review card** for one lab asset — for example a password verifier, TLS endpoint, or token design in your authorized training app.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-09
cd ~/asv-learn-ethical-hacking/stage-09
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-09"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-09"
```

You will write `crypto_review_card.txt`. Prefer reviewing configuration and metadata over collecting secrets.

## Start here: purpose before weakness claims

Name the asset and the job cryptography is supposed to do:

1. What is being protected?
2. Is the goal confidentiality, integrity, authenticity, or password verification?
3. What primitive or protocol appears to be in use?
4. What signal suggests a weak decision?
5. How can you review it without exposing secrets?
6. What standard migration path exists?

If you cannot name the purpose, you are not ready to call the design unsafe.

## Primitive families without the folklore

| Family | Typical job | Beginner review focus |
| --- | --- | --- |
| Symmetric encryption | Confidentiality with a shared key | Key handling, mode misuse, hard-coded keys |
| Asymmetric encryption / signatures | Key exchange, identity, non-repudiation clues | Certificate validity, algorithm choices |
| Hashing | Integrity fingerprints, content addressing | Collision-prone legacy hashes used as security controls |
| Password hashing | Verifying secrets at rest | Fast hashes, missing salts, no work factor |
| TLS / HTTPS | Protecting data in transit | Protocol version, cipher suite, cert trust |

Classical cipher demos (Caesar, Vigenère) are historical teaching aids. They are not modern controls. Do not “upgrade” a lab by inventing a custom mix of XOR and hope.

## Weakness signals worth documenting

| Signal | Why it matters | Safer review method |
| --- | --- | --- |
| MD5/SHA-1 for password storage | Too fast / obsolete for password verification | Inspect config or code paths; do not harvest user passwords |
| Missing unique salts | Same passwords produce same hashes | Review storage format/metadata |
| TLS 1.0 / weak ciphers offered | Downgrade and compatibility risk | Use a lab TLS checker against your app |
| Hard-coded keys in source | Anyone with the repo gets the secret | Static review of lab code you own |
| Homegrown “encryption” | Usually confidentiality theater | Compare to established library guidance |

## Crypto review card fields

| Field | Purpose |
| --- | --- |
| Asset name | What the cryptography protects |
| Crypto use | Hashing, encryption, signing, or verification |
| Weakness signal | Clue that a decision may be unsafe |
| Safe test method | How to review without exposing secrets |
| Remediation note | Safer standard or migration path |

Example:

```text
asset_name=student password verifier
crypto_use=password hashing for verification
weakness_signal=unsalted fast hash observed in legacy records
safe_test_method=review configuration and sample metadata without collecting passwords
remediation_note=migrate to slow password hashing with unique salts
```

## TLS review in the lab

If your authorized lab app speaks HTTPS, a useful beginner review is:

```bash
# Example only — use your lab hostname
openssl s_client -connect lab.local:443 -servername lab.local </dev/null 2>/dev/null | openssl x509 -noout -dates -subject -issuer
```

Record protocol expectations, certificate subject, validity window, and whether the cert matches the lab hostname. Do not turn this into internet-wide scanning.

## Common beginner mistakes

- Inventing a custom cipher “for learning”
- Logging secrets or private keys into notes shared to cloud sync
- Calling Base64 encryption
- Reusing one salt “to keep things simple”
- Equating “HTTPS present” with “crypto is done”
- Running password-cracking tools against real user databases outside a dedicated lab story

## Your local task

### Step 1 — Pick one lab asset

Choose a password verifier, token, TLS endpoint, or file encryption setting you control.

### Step 2 — Write `crypto_review_card.txt`

```bash
asset_name="student password verifier"
crypto_use="password hashing for verification"
weakness_signal="unsalted fast hash observed in legacy records"
safe_test_method="review configuration and sample metadata without collecting passwords"
remediation_note="migrate to slow password hashing with unique salts"

printf '%s\n' \
  "asset=$asset_name" \
  "use=$crypto_use" \
  "signal=$weakness_signal" \
  "test=$safe_test_method" \
  "remediation=$remediation_note"
```

### Step 3 — Optional safe lab check

If you have a local HTTPS training app, capture certificate metadata only. If not, document the review method you would use and stop at planning.

### Step 4 — Self-review

Ask:

- Did I name purpose before weakness?
- Did my method avoid collecting secrets?
- Is remediation a recognized standard, not a custom invention?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Primitive | Established cryptographic building block |
| Password hashing | Slow, salted verification of secrets at rest |
| TLS | Protocol family protecting data in transit |
| Weakness signal | Observable clue that a crypto decision may be unsafe |
| Migration path | Practical move toward a stronger standard |

## Proof checklist

- [ ] `crypto_review_card.txt` includes asset, use, signal, safe method, remediation
- [ ] Safe method avoids collecting passwords or private keys
- [ ] Remediation names an established approach
- [ ] No custom cipher was proposed as a fix
- [ ] Any live check stayed on the lab asset

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Review cryptography on systems you own or are authorized to assess. Do not attempt to break cryptography on third-party services as “practice.”

When those items are true, continue to **Cloud Security Assessment**.
