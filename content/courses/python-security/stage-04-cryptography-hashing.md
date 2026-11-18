# Cryptography & Hashing Decisions

## Why this lesson exists

Security engineers do not pick cryptographic algorithms because the name sounds strong. They identify the **asset**, the **purpose**, how **secrets and salts** are handled, what must never be logged, and how the system **migrates** when policy improves.

Hashing, encryption, signing, and verification solve different problems. Using the wrong tool — or rolling your own — creates silent failures that look secure until they are not.

In this stage you will write a **crypto decision card** as a Python dictionary and optionally verify a password hash with the standard library (`hashlib` + `secrets`). You are documenting **operating rules**, not inventing a custom cipher.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-security/stage-04
cd ~/asv-learn-python-security/stage-04
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-security\stage-04"
Set-Location "$HOME\asv-learn-python-security\stage-04"
```

You will create `crypto_decision.py` in that folder.

## Start here: purpose before algorithm

At the start, do not pick SHA-256 or AES because you heard them in a video. First name:

1. **Asset** — what must be protected
2. **Purpose** — hashing, encryption, signing, or verification
3. **Salt or key rule** — how random material is stored and scoped
4. **Secret handling** — what never appears in logs or git
5. **Migration note** — how old records move to better protection

Cryptography decisions are safest when the goal is clear. Strong names do not make a safe design.

### Decision questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What asset is at risk? | The choice matches what you are protecting |
| What is the cryptographic purpose? | You do not use encryption where hashing belongs |
| How are salts or keys managed? | Identical inputs do not produce identical stored values |
| What must never be logged? | Secrets do not leak through debugging |
| How will policy upgrades happen? | Systems can improve without breaking every account at once |

Do not start by choosing an algorithm name. First say the decision in one sentence: *asset, purpose, salt or key rule, secret handling, and migration note.*

## How to use this lesson

Read in this order:

- **Learn:** understand why hashing, encryption, and signing solve different problems
- **Inspect:** identify asset, purpose, salt rule, secret handling, and migration note on the decision card
- **Build:** tighten one operating rule — not a custom cipher
- **Prove:** explain when you would rehash and what must never be logged

Practice after reading means you should understand the cryptographic **purpose** before editing code. Strong algorithm names do not replace clear operating rules.

## One clean pass through this lesson

Before the editor, read crypto choices as a purpose-before-algorithm chain:

1. The asset says what must be protected.
2. The purpose says whether you need hashing, encryption, signing, or verification.
3. The salt or key rule says how random material stays scoped per record.
4. Secret handling says what never appears in logs or git.
5. The migration note says how policy upgrades happen without breaking every account at once.

That chain is the security lesson. Picking SHA-256 because it sounds strong does not make password storage safe. A decision card that names purpose and migration is more trustworthy than code that hides the goal.

## Hashing is not encryption

| Need | Direction | Typical approach |
| --- | --- | --- |
| Password verification | One-way | Slow password hash + unique salt per record |
| Data at rest confidentiality | Reversible with key | Authenticated encryption with managed keys |
| Integrity / tamper detection | Compare digest | Hash or MAC over canonical bytes |
| Identity / authenticity | Verify with public key | Digital signatures |

For password storage, `hashlib.sha256(password)` alone is **not** enough: it is fast (bad for passwords) and lacks per-user salt in that naive form. Production systems use purpose-built password hashes (bcrypt, scrypt, Argon2) via established libraries. This lesson uses `hashlib` only to demonstrate **salt + compare** patterns in lab code.

## Reading the starter code

The decision card is the primary artifact:

```python
crypto_decision = {
    "asset": "student password verifier",
    "algorithm_purpose": "slow password hashing for verification",
    ...
}
```

The optional helper shows **salt generation** and **constant-time compare** habits:

```python
salt = secrets.token_hex(16)
digest = hashlib.sha256((salt + password).encode()).hexdigest()
```

Lab simplification — not production password storage. The comment in your file should say so.

```python
secrets.compare_digest(stored_hash, candidate_hash)
```

Use `compare_digest` when comparing secret strings to reduce timing side channels.

## Common beginner mistakes

**Using fast hashes (MD5, plain SHA-256) for passwords** without slow KDF or library support.

**One salt for all users** — identical passwords produce identical stored values.

**Logging passwords, keys, or salts** during debugging.

**Inventing a custom algorithm** — use established libraries and document purpose.

**Encrypting when you only need to verify** — passwords should not be decryptable.

## Your local task

### Step 1 — Create the starter

Create `crypto_decision.py`:

```python
# crypto_decision.py — Stage 04: Cryptography & Hashing Decisions
# Documents operating rules. Lab hash demo is NOT production password storage.

import hashlib
import secrets

crypto_decision = {
    "asset": "student password verifier",
    "algorithm_purpose": "slow password hashing for verification",
    "salt_rule": "unique salt per password record",
    "secret_handling": "do not log secrets or commit keys",
    "migration_note": "rehash on next successful login when policy changes",
}

def print_decision(card):
    print("=== Crypto decision card ===")
    for key, value in card.items():
        print(f"{key}: {value}")

def lab_hash_password(password):
    """Lab-only demo: salted SHA-256. Use bcrypt/Argon2 in production."""
    salt = secrets.token_hex(16)
    digest = hashlib.sha256((salt + password).encode()).hexdigest()
    return salt, digest

def lab_verify_password(password, salt, stored_hash):
    candidate = hashlib.sha256((salt + password).encode()).hexdigest()
    return secrets.compare_digest(stored_hash, candidate)

def main():
    print_decision(crypto_decision)
    password = "lab-only-password"
    salt, stored = lab_hash_password(password)
    ok = lab_verify_password(password, salt, stored)
    bad = lab_verify_password("wrong", salt, stored)
    print(f"Verify correct password: {ok}")
    print(f"Verify wrong password: {bad}")

if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 crypto_decision.py
```

Read the decision card output first. Confirm verify returns `True` then `False` — without printing the password or salt to a log file.

### Step 3 — Tighten one operating rule

Change **one** field in `crypto_decision` or add a comment that names a production-grade alternative (e.g. Argon2 via `argon2-cffi`). Examples:

- Strengthen `secret_handling` with “rotate keys via vault, never `.env` in git”
- Add a sixth key `"forbidden": "custom ciphers, ECB mode, unsalted SHA-256 for passwords"`

Save and run again.

### Step 4 — Explain migration

In a comment or note, write two sentences:

1. When would you rehash existing password records?
2. What must happen to old hashes during migration?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Hashing | One-way transform; cannot recover original from digest |
| Encryption | Reversible confidentiality with a key |
| Salt | Random per-record value mixed before hashing |
| compare_digest | Constant-time string compare for secrets |
| Migration | Moving stored credentials to a stronger policy over time |

## Proof checklist

- [ ] `crypto_decision.py` exists in `~/asv-learn-python-security/stage-04`
- [ ] Decision card prints all five fields
- [ ] Lab verify returns True for correct password, False for wrong
- [ ] Passwords and salts are not written to arbitrary log files
- [ ] You tightened one operating rule and re-ran
- [ ] You can explain hashing vs encryption in one sentence

## Secret-handling reminder

Never commit keys, salts, or passwords to git. Use synthetic lab values only. Production password storage belongs in established slow hashes (bcrypt, scrypt, Argon2) — not the lab SHA-256 demo in this stage.

When those items are true, continue to **Building Defensive Security Tools**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
