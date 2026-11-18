# Review all 13 courses (local)

**Use these URLs — not `/orgs/...` paths.**

This local install is single-tenant. The catalog lives at:

## Start here

**http://localhost:8088/courses**

## Course pages

| # | Course | Open |
| --- | --- | --- |
| 1 | Python Zero to Useful | http://localhost:8088/course/ea63f73a-a1c3-4581-a488-ef2043f1351f |
| 2 | CompTIA Security+ | http://localhost:8088/course/71f2d464-d997-4e98-97d2-6f0c715abc59 |
| 3 | Ethical Hacking & PT | http://localhost:8088/course/b9a42307-1ae2-48e8-86c0-8a475fb36733 |
| 4 | Kali Linux & PT Tools | http://localhost:8088/course/1d8c44b1-597b-48a1-b458-71fce37ab865 |
| 5 | SOC & Blue Team | http://localhost:8088/course/dd3c7490-4927-41fc-b000-ef5853c19570 |
| 6 | Python for Cybersecurity | http://localhost:8088/course/776c6203-334d-438d-8380-a010ebca3237 |
| 7 | Applied Agentic AI | http://localhost:8088/course/44b6dcde-e812-4711-8ae2-9a3c233e85d9 |
| 8 | AI Fundamentals for Builders | http://localhost:8088/course/8d4468d9-5e14-43a8-82da-6bd554c55fd3 |
| 9 | AI Foundations Engineering | http://localhost:8088/course/28d6fa2c-d07c-40d1-8e5c-cec0ccfbefdb |
| 10 | Python Full Stack | http://localhost:8088/course/dbb622a1-536b-4c87-bcf0-b4701c0ef00b |
| 11 | Full Stack Development | http://localhost:8088/course/b043c3e3-a61d-4aed-8cff-08a2d5a27910 |
| 12 | React & Modern Frontend | http://localhost:8088/course/34fdce31-7ae0-4506-8316-ffb1a7e0ba4f |
| 13 | DevOps & Infrastructure | http://localhost:8088/course/86b646be-6d4d-4b10-972a-2aebfeb8b4ea |

Lessons open as `/course/<id>/activity/<activity-id>` once you hit Continue Learning or a chapter.

## If the site breaks again after a rebuild

```bash
cd ~/.learnhouse/local-community
docker compose up -d ssr-fwd --force-recreate
```

(That SSR helper dies when the app container is recreated.)

## Feedback

Per course: what’s wrong, thin, confusing, or good. I’ll fix in place. No commit until you’re happy.
