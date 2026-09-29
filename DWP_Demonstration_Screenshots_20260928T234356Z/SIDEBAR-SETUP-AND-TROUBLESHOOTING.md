# Set up and check the real browser sidebar

This guide is for a novice rehearsing the public DWP evidence demonstration. It records the settings observed on 29 September 2026 and the permission exception the owner approved. It is not a promise that every browser, work profile or ChatGPT client supports the same interface. The screenshots are from an independent experimental publication, not an official DWP service.

## Start here

Open [the exact public staff-016 workbench](https://chris-page-gov.github.io/okf-explorer/evidence/?manifest=https%3A%2F%2Fraw.githubusercontent.com%2Fchris-page-gov%2Fokf-dwp%2Fd31f16fb7143d04b9de73e14cd493cfb832ae83e%2Fevaluation%2Fevidence-workbench%2Ftools-manifest.json&case=staff-016&tab=requirements). Keep this tab open. The address should begin `https://chris-page-gov.github.io/okf-explorer/evidence/` and name the pinned `d31f16fb7143d04b9de73e14cd493cfb832ae83e` manifest. Do not replace it with an unrelated ChatGPT or Explorer landing page.

Use a clean window containing only public demonstration material. Sign in yourself if the real ChatGPT sidebar requests it; do not give passwords or sign-in codes to the assistant. The browser-owned panel headed “ChatGPT” is the required sidebar. A chat-shaped panel drawn inside the workbench is not a substitute.

## Four things that are easy to confuse

| Item | What it controls | What happened in this session |
| --- | --- | --- |
| Edge extension site access | Whether an installed extension can operate on a website | Owner screenshots already showed the public site allowed. No extension permission was changed by this capture. |
| ChatGPT Settings → Computer use → Microsoft Edge | Connection to the browser integration | Owner screenshots showed “Browser extension installed” and the switch on. Edge was reported as always allowed. |
| ChatGPT Settings → Browser → Developer mode → Enable full CDP access | A deeper developer interface to browser internals | The owner showed this already on. It has an elevated-risk warning; it is not a harmless presentation preference. |
| Approval for this controller to access this origin | Permission for this particular browser-control session to read and operate on the public website | Initially denied under the brief's no-permission-change rule. The owner explicitly authorised this one origin, after which the same public-tab access request succeeded. |

Edge's **Extensions → Developer mode** switch is a different control. It was off in the supplied screenshot. We did not turn it on, load an unpacked extension or install anything. It is not the switch named “Enable full CDP access”.

The official [Browser developer mode guide](https://learn.chatgpt.com/docs/browser#developer-mode) describes the CDP setting, its sensitivity and the need for explicit website approval. Its documented Chrome/built-in-browser route should not be read as a guarantee of every Edge configuration. The Edge observations above are specific to this session.

## The permission change that actually cleared a gate

The controller requested access to **`https://chris-page-gov.github.io` only**. That is an origin: the scheme and host, not just one `/evidence/` path. It can cover other pages on that host. The authorised task remains limited to the public demonstration; no unrelated page, profile or private chat is in scope.

The owner was asked to authorise a new controller access grant for this exact origin, overriding the original brief's no-permission-change rule for this origin only. The owner replied: “I authorise the permission change”. The next attempt to bind the existing public workbench tab returned its actual accessibility content successfully. This is the confirmed gate cleared by the approval. No browser flag, extension setting, profile, microphone permission or organisation policy was altered. The grant's persistence beyond this session was not independently established.

For a fresh rehearsal, read any access prompt carefully. Check that its destination is this public origin, its purpose is this demonstration and it does not request other sites or sensitive information. Approve only the intended scope. A saved “Always allow” choice is not a reason to broaden access to every website. Record the time, requested scope, approval and the next successful check; “it is on” alone does not prove that the session can use the page.

The [official local-security guide](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-local-security#browser-sessions-and-existing-sign-ins) explains that existing sign-ins and approvals are separate, and that user approval cannot override an administrator's denial. If a setting is locked or a managed policy denies access, stop and ask the administrator. Do not use a personal profile to evade work policy or copy work credentials into it. No profile switch was made here.

## Rehearse with an observable acceptance test

1. Check the public workbench's staff-016 question, Requirements heading, `insufficient` status and partial rows 1–3 of 6. “Page tools registered” only establishes page registration, not assistant support.
2. Send Turn 1 exactly as supplied in `specification/01-codex-screenshot-instructions.md`. Ask the assistant to identify the interface it actually used. Keep returned snapshot, result and revision identities. Do not ask it to invent a missing capability or use outside benefits knowledge.
3. Save a genuine whole-window before screenshot containing the public page and the real sidebar. Redact private account/profile and bookmark chrome before sharing. Keep the substantive status and limitations.
4. Send Turn 2 exactly once in the same sidebar conversation. Success requires the requested page to change from **staff-016 → Requirements** to **staff-039 → Interactions**, not merely a confident chat answer or a different tab that was already open.
5. Check rows 1–3 of 4 if that is what is delivered. The carer and cared-for person must remain distinct; directions, unreviewed authority, unknown dates, missing conditions and the omitted row must remain explicit. No award is calculated.
6. Retain the actual tool route and receipt. Developer-assisted native page tools via CDP are not automatic dedicated WebMCP discovery, remote MCP or universal client support. Ordinary clicked navigation must be labelled as UI navigation, not registered-tool invocation.

## Troubleshooting without weakening security

| Symptom | What to do |
| --- | --- |
| Extension absent or disconnected | Use the app's **Manage** control to check the intended browser connection and official publisher. Do not remove duplicate-looking extensions based only on their shared “ChatGPT” name. No installation was needed or performed here. |
| Site access refused | Read the precise scope and policy reason. Obtain explicit authority if the task's permissions need to change; repeat only the same permitted check afterwards. Do not switch to raw CDP or another browser to bypass a refusal. |
| “Enable full CDP access” already on, but access still fails | Check the separate site/session approval and managed policy. Toggling the existing switch repeatedly is not a diagnosis. |
| Developer connection detaches while attaching | Keep the error in the receipt. Use one active controller for the tab; avoid concurrent debugger sessions. This is a troubleshooting suggestion, not a proven fix in this run. Do not cancel another owner's session or change permissions without approval. |
| Assistant opens a different tab or only clicks page controls | Verify the original visible tab and the actual route. Do not claim the specified registered-tool transition unless it is observed and evidenced. |
| Sidebar remains unavailable | Present the captured manual S10/S11 views and report the specific S12 limitation. The rest of the demonstration does not depend on a successful live sidebar. |

## Outcome of this rehearsal

The access approval worked for this capture controller. The genuine before window and the original staff-016 sidebar response were captured. Two new, identical Turn 2 attempts then completed with developer-connection attachment failures; the original public page remained on staff-016 Requirements. Neither returned staff-039 Interactions rows. The first failure and the retry are preserved as actual screenshots and sanitised accessibility receipts. No manual view change was made to imitate tool use.

The owner's ten-attempt approval was a ceiling, not a requirement to repeat an unchanged failure ten times. After the same failure recurred, further repetitions stopped. **S12's required registered-tool transition remains blocked.** The approval is therefore a documented fix for one access gate, not a proven end-to-end repair. A novice should use the acceptance test above and the manual screenshot fallback if the connection does not work.

See `receipts/S12.json` for the exact outcome and `captions-and-speaker-notes.md` for the permitted presentation claim. Earlier blocked receipts remain preserved: they are not retrospectively rewritten as successes. The original screenshot ZIP is also preserved separately.

After the rehearsal, the owner should review saved app/site approvals and any temporary CDP opt-in in the app's settings. Retain only access they still intend to allow. This run did not automatically revoke or broaden their existing settings; it did not establish whether the newly approved origin grant persists beyond the session.
