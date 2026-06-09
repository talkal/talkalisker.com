---
title: "Zero-Code Orchestration Pipeline Architecture"
client: "TalKalisker"
project: "Antigravity Pipeline"
type: "System.Architecture"
date: "2026-06-09"
confidential: true
status: "final"
languages: '["en"]'
password: "kalisker123"
---

# 01. /executive_summary

This document outlines the complete architectural overhaul of the `agency-agents` ecosystem, executed across an 8-Sprint master plan. The system has been transformed from a loose collection of prompt templates into a highly resilient, autonomous, self-healing orchestration engine. 

By combining Hub-and-Spoke routing, JSON contracts, Circuit Breakers, and self-modifying identities, the system achieves near-perfect autonomy and resilience at a fraction of the traditional token cost.

# 02. /core_architecture

The system operates on a Hub-and-Spoke model to prevent cross-agent chaos and maintain strict operational boundaries.

* **Deliverable:** The Central Hub | **Details:** Agent Selector
Users no longer route tasks manually. All complex requests are sent directly to the Agent Selector (Project Management division). It deconstructs the request, selects the appropriate specialists, and delegates the tasks. Direct peer-to-peer (P2P) agent communication is strictly prohibited unless explicitly authorized.

- **Metric:** Active Agents | **Value:** 144+ | **Trend:** Stable

# 03. /communication_protocols

To eliminate the primary cause of agent hallucination—conversational drift—all inter-agent handoffs are now executed via rigid schemas.

* **Deliverable:** Strict JSON Contracts | **Details:** Token Bloat Reduction
When the Product Manager hands off a specification to the Frontend Architect, it does not send a conversational markdown file. It sends a rigid `PRD_Contract.json` schema. This forces agents to stick to exact parameters.

* **Deliverable:** The Debate Protocol | **Details:** Ambiguity Resolution
If a user submits a highly ambiguous request, the Hub invokes the Debate Moderator. It spawns 3 specialized subagents to argue different architectural approaches until a consensus is reached and compiled into a JSON contract.

# 04. /resilience_and_healing

The orchestration engine includes a centralized State Machine (`workflow_state.json`) to track task progress and prevent infinite loops.

- **Decision:** The 3-Strike Rule | **Impact:** High
If an agent fails a task, it is sent back for revision. If the agent fails 3 times, a Circuit Breaker trips, and the failed task is pulled into the Dead-Letter Queue (DLQ) to prevent infinite token burn.

* **Deliverable:** The Evolving Memory Trainer | **Details:** Self-Modification Loop
Unlike legacy systems, this system physically alters its own DNA. The Recovery Specialist performs Root Cause Analysis (RCA) on failed tasks, abstracts the failure into a generalized architectural principle, and rewrites the failing agent's source `.md` file to permanently bake the lesson into its identity. A human must approve the file modification to prevent identity corruption.

# 05. /qa_and_testing

Quality Assurance has been upgraded from a purely visual auditor to a strict terminal compiler.

* **Deliverable:** Deep Error Parsing | **Details:** Compilation Gate
Before checking visual layouts, QA must run terminal build commands (e.g., `npm run build`, `tsc --noEmit`). If the build fails, QA does not guess the fix. It extracts the stack trace, file name, and line number, and fails the phase immediately.

* **Deliverable:** Chaos Monkey | **Details:** The /chaos Drill
Triggering this protocol unleashes the Chaos Monkey into the staging environment. It deliberately sabotages the codebase (deleting brackets, corrupting CSS, injecting logic bombs) and pushes it to QA. The system is deemed healthy only if QA catches the error, the Circuit Breaker trips, and the Recovery Specialist autonomously heals the code.

# 06. /token_economy

To prevent catastrophic API costs, the agency is bound by the Global Token Economy Policy (`TOKEN_ECONOMY.md`).

- **Decision:** Caveman Full Mode | **Impact:** High
All internal agent-to-agent communication must use fragmented, article-free, terse communication to drastically reduce input/output tokens.

- **Decision:** The 500-Line Limit | **Impact:** High
No agent identity file may exceed 500 lines. Any file approaching the limit must be crushed using the `/compress` skill, preserving technical accuracy while eliminating linguistic fluff.
