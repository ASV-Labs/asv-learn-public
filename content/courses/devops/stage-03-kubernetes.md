# Kubernetes Orchestration

## Why this lesson exists

Kubernetes runs containers as **managed workloads**. The beginner model that matters: desired state, controlled rollout, stable service routing, readiness probes, verification, and rollback. A running pod is not the same as a safe release.

This stage teaches you to write a **Kubernetes rollout card** in shell before touching cluster objects. If you have minikube or kind locally, you may run read-only `kubectl get` later — unauthorized clusters are out of scope. There is no hosted cluster inside ASV Learn for this lesson.

## Reminder: where you work

```bash
cd ~/asv-learn-devops
mkdir -p stage-03
cd stage-03
```

Create `k8s_rollout_card.sh`.

## Core objects (plain language)

| Object | Meaning |
| --- | --- |
| Deployment | Desired app version + replica count |
| Pod | One running copy of the workload |
| Service | Stable network path to pods |
| Probe | Health signal Kubernetes acts on |
| Rollout | Controlled move from old version to new |
| ReplicaSet | Generation of pods owned by a Deployment |

**Readiness** probe: pod may receive traffic. **Liveness** probe: pod should restart if broken. Do not send traffic to pods that fail readiness.

## Rollout narrative (plain language)

Imagine two replicas running version **A**. You deploy version **B**:

1. Kubernetes starts a new pod with **B**.
2. Readiness must pass before the pod joins the Service endpoints.
3. Traffic shifts gradually; old **A** pods drain after connections finish (depending on strategy).
4. If **B** fails readiness repeatedly, rollout stalls — that is preferable to sending users to broken pods.
5. `kubectl rollout undo` returns to the last known-good ReplicaSet when health evidence demands it.

Your rollout card is the cheat sheet you want **before** step 1 happens at 2 a.m.

## Useful kubectl commands (authorized lab / local cluster only)

| Goal | Example | Notes |
| --- | --- | --- |
| Context check | `kubectl config current-context` | Confirm you are not on prod by accident |
| Cluster reachability | `kubectl cluster-info` | Read-only |
| Nodes | `kubectl get nodes` | Read-only |
| Workloads | `kubectl get deploy,po,svc` | Read-only overview |
| Rollout watch | `kubectl rollout status deploy/NAME` | After an authorized change |
| Rollback | `kubectl rollout undo deploy/NAME` | Named on the card before you need it |
| Describe | `kubectl describe pod NAME` | Events often explain probe failures |

If you do not have a cluster, still write the card and notes. Installing minikube/kind is optional local homework — not graded inside the lesson UI.

## Service and Ingress (one sentence each)

- **Service** — stable cluster IP / DNS name selecting healthy pods by label.
- **Ingress** (optional layer) — HTTP routing from outside the cluster to Services (TLS, host rules). Many teams use a cloud load balancer instead; the card still needs a named stable route to users.

## Resource requests and limits (awareness)

Pods declare **requests** (scheduler uses for placement) and **limits** (maximum CPU/memory). Under-provisioned apps fail readiness or get OOM-killed; over-provisioned clusters waste cost. You do not need to tune them perfectly in this card — but your rollout notes should mention whether memory spikes during deploy could fail readiness.

## Labels and selectors (why Service finds pods)

Deployments label pods (`app=learner-api`). Services route to pods matching those labels. If labels drift, traffic goes nowhere even when pods run. Your card's `service_name` and `deployment_name` should imply a label strategy you could explain to a teammate.

| Piece | Example | Failure mode if wrong |
| --- | --- | --- |
| Pod label | `app=learner-api` | Service selects nothing |
| Service selector | `app=learner-api` | Must match pod labels |
| Deployment name | `learner-api` | Rollout status / undo target |

## Start here: readiness before rollout

Say the card: *deployment learner-api, two replicas, service learner-api-service, readiness on /health, verify with rollout status, undo if health fails.*

## Common beginner mistakes

- Treating `Running` pod status as user-ready
- Rolling out 100% at once with no surge strategy awareness
- No rollback command written down before deploy
- Applying manifests from memory without review
- Practicing against production clusters without authorization
- Confusing liveness (restart) with readiness (traffic)
- Expecting a free hosted Kubernetes sandbox from this course card

## Your local task

### Step 1 — Create the rollout card

Create `k8s_rollout_card.sh`:

```bash
#!/usr/bin/env bash
# k8s_rollout_card.sh — Stage 03: Kubernetes

deployment_name="learner-api"
replicas="2"
service_name="learner-api-service"
readiness_probe="HTTP GET /health on port 3000"
rollout_check="kubectl rollout status deployment/learner-api --timeout=120s"
rollback_command="kubectl rollout undo deployment/learner-api"
verify_steps="check rollout status, hit service /health, compare error rate"

printf '%s\n' \
  "deployment=$deployment_name" \
  "replicas=$replicas" \
  "service=$service_name" \
  "readiness=$readiness_probe" \
  "rollout_check=$rollout_check" \
  "rollback=$rollback_command" \
  "verify=$verify_steps"
```

### Step 2 — Run

```bash
bash k8s_rollout_card.sh
```

Read each line as pre-deploy homework.

### Step 3 — Readiness story

In `rollout_notes.txt`, write three sentences:

1. What happens if readiness fails during rollout?
2. Why does the Service matter when pods change?
3. When would you run the rollback command?

### Step 4 — Optional local cluster

If minikube/kind is installed and you are authorized:

```bash
kubectl config current-context
kubectl cluster-info
kubectl get nodes
```

Read-only only. Do not apply untested manifests to shared clusters.

### Step 5 — Probe decision table

Create `probe_decisions.txt` with two rows you fill in:

| Situation | Prefer readiness change or liveness change? | Why |
| --- | --- | --- |
| App boots slowly but becomes healthy | | |
| App deadlocks and never recovers | | |

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| desired state | What the cluster should match (declarative config) |
| replica | Copy of a pod for availability |
| rollout | Update of deployment to new image/version |
| readiness | Pod ready to receive traffic |
| liveness | Pod should be restarted if check fails |
| kubectl | CLI for Kubernetes clusters |
| context | Which cluster/user kubectl targets |

## Proof checklist

- [ ] Rollout card prints deployment, replicas, service, readiness, check, rollback
- [ ] `rollout_notes.txt` answers three readiness questions
- [ ] `probe_decisions.txt` distinguishes readiness vs liveness
- [ ] You can explain readiness vs liveness in plain language
- [ ] Rollback command is named before any deploy story
- [ ] Any kubectl use was read-only on authorized lab only

When those are true, continue to **CI/CD Pipelines & GitHub Actions**.

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
