# How DWP Appears to Have Maintained and Versioned the Decision Makers’ Guide (DMG) Over Time

## Overview

The Department for Work and Pensions (DWP) Decision Makers' Guide (DMG) appears to have been maintained using a **continuously updated manual model**, rather than by publishing a completely new edition whenever guidance changed.

Historically, the DMG was divided into volumes and chapters. Changes were distributed through numbered **amendment packages**, while **DMG Memos** provided another mechanism for introducing or communicating changes.

Over time, the publication model appears to have moved away from printable remove-and-insert amendment packages towards maintaining current chapter PDFs accompanied by change summaries.

This history is important when using archived DMG material because:

> **An amendment PDF should not necessarily be treated as a complete historical version of the DMG.**

It may instead contain only the replacement pages required to update an existing copy of a volume.

---

## 1. DMG as a Continuously Maintained Manual

The historical DMG appears to have operated much like a traditional loose-leaf legal or administrative manual.

The structure was broadly:

```text
Decision Makers' Guide
│
├── Volume 1
│   ├── Chapter ...
│   └── Chapter ...
│
├── Volume 2
│
...
│
├── Volume 13
│   └── Pension Credit
│
└── Volume 14
    └── Pension Credit
```

Rather than periodically replacing an entire volume, DWP issued amendments to the existing volume.

This means the conceptual versioning model was approximately:

```text
Original volume
      │
      ▼
Amendment 1
      │
      ▼
Amendment 2
      │
      ▼
Amendment 3
      │
     ...
      ▼
Current maintained volume
```

The current state of a volume was therefore the result of applying successive amendments.

---

## 2. Numbered Amendment Packages

Historically DWP issued numbered amendments for individual DMG volumes.

An amendment could instruct the user to:

1. remove specified pages from the existing manual;
2. insert replacement pages;
3. update the amendment record.

Replacement pages commonly identified the amendment in their footer.

For example, an amendment might effectively operate as:

```text
Existing Volume 14

Page 35 ───── REMOVE
Page 36 ───── REMOVE
Page 37 ───── REMOVE

        ↓

Amendment package

        ↓

Page 35 ───── INSERT
Page 36 ───── INSERT
Page 37 ───── INSERT
```

The resulting manual, rather than the amendment package itself, represented the updated guidance.

### Consequence for historical research

An archived file called something such as:

```text
Volume 14 Amendment 45
```

should therefore not automatically be interpreted as:

```text
Volume 14 — Version 45
```

in the modern software-versioning sense.

It may instead mean:

```text
changes required to bring an existing
Volume 14 installation up to Amendment 45
```

This distinction is important when reconstructing historical DWP guidance.

---

## 3. Amendments Could Contain Several Different Types of Change

A numbered amendment was not necessarily associated with one particular legislative change.

An amendment could incorporate several kinds of maintenance at the same time, including:

- new legislation;
- changes resulting from case law;
- incorporation of DMG Memos;
- revised legal references;
- substantive rewriting of guidance;
- clarification of existing guidance;
- correction of errors;
- paragraph renumbering;
- minor drafting changes.

Consequently:

> **DMG amendment number does not correspond directly to a particular version of the legislation.**

An amendment number is better understood as a **publication or maintenance event for a DMG volume**.

---

## 4. DMG Memos

DWP also used **Decision Makers' Guide Memos (DMG Memos)**.

Memos appear to have provided a mechanism for issuing guidance that supplemented the main DMG.

A typical lifecycle appears to have been:

```text
Legislation / case law / policy change
                 │
                 ▼
              DMG Memo
                 │
       interim/new guidance
                 │
                 ▼
       later DMG amendment
                 │
                 ▼
      guidance incorporated
       into DMG chapter
```

A subsequent amendment could therefore state that particular DMG Memos had been incorporated into specified chapters.

Once incorporated into the main guidance, references to the memo could subsequently be removed.

This creates an important provenance relationship:

```text
DMG paragraph
     │
     ├── may originate from legislation
     │
     ├── may originate from case law
     │
     └── may originate from a DMG Memo
                         │
                         ▼
                  later incorporated
                   into the chapter
```

For historical research, the relevant memo may therefore explain **why a paragraph appeared or changed**, even where the current chapter no longer mentions that memo.

---

## 5. Online Guidance and Printable Amendment Packages

Older amendment documents indicate that changes could already have been incorporated into the DWP **Intranet and Internet versions** of the DMG before or alongside publication of the printable amendment package.

This suggests that DWP eventually maintained two representations of essentially the same guidance:

```text
                 DWP guidance
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
 Online maintained copy     Printable manual
          │                       │
          │                 amendment package
          │                       │
          │                 remove old pages
          │                 insert new pages
          │                       │
          └───────────┬───────────┘
                      ▼
                Current guidance
```

The amendment PDFs increasingly appear to have supported maintenance of printed copies rather than functioning as the primary electronic version of the guidance.

---

## 6. Transition Away From Remove-and-Insert Amendments

The GOV.UK publication structure suggests that around **2020** DWP changed the way DMG updates were published.

Earlier material commonly contains:

```text
Amendment 57
Amendment 58
Amendment 59
Amendment 60
Amendment 61
```

with replacement-page instructions.

Later publication pages instead provide updated chapter documents together with material such as:

```text
Summary of changes from October 2020
```

The apparent change in publication strategy can therefore be represented as:

### Earlier model

```text
Current chapter
      │
      ▼
Numbered amendment package
      │
      ▼
Remove old pages
      │
      ▼
Insert replacement pages
      │
      ▼
Updated manual
```

### Later model

```text
Current chapter PDF
        │
        ├──────────────┐
        │              │
        ▼              ▼
 updated chapter   change summary
        │
        │
        └──── DMG Memos where relevant
```

This appears much closer to normal web-document maintenance.

---

## 7. DMG and ADM

DWP decision-making guidance has also been divided between two major documentation families:

```text
DWP Decision-Making Guidance
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
      DMG         ADM

Decision       Advice for
Makers'        Decision
Guide          Making
```

The **Decision Makers' Guide (DMG)** continues to cover a number of older or legacy benefit systems and Pension Credit.

The **Advice for Decision Making (ADM)** is used for benefits including Universal Credit and Personal Independence Payment and certain other newer benefit regimes.

For Pension Credit research, the relevant DMG material is principally contained within **Volumes 13 and 14**.

---

## 8. Paragraph Numbers Provide an Important Stable Identifier

DMG guidance uses paragraph identifiers such as:

```text
77013
77117
77128
77129
77130
```

These identifiers are more useful for historical research than PDF page numbers.

PDF pagination can change when:

- material is inserted;
- material is removed;
- chapters are republished;
- formatting changes;
- amendment packages contain only replacement sheets.

A research system should therefore treat the **DMG paragraph number as the principal logical identifier**.

For example:

```text
DMG 77130
```

is preferable to:

```text
Volume 13, PDF page 24
```

as the primary identity of the guidance.

The PDF page should instead be recorded as information about a particular publication instance.

---

## 9. A Better Model for Versioning DMG Paragraphs

For research or machine-readable representations of the DMG, it would be useful to distinguish the **logical paragraph** from individual published versions of that paragraph.

For example:

```text
DMG 77130
   │
   ├── Version A
   │      ├── amendment: ?
   │      ├── effective date: ?
   │      └── text: ...
   │
   ├── Version B
   │      ├── amendment: ?
   │      ├── effective date: ?
   │      └── text: ...
   │
   └── Current Version
          ├── publication date: ...
          └── text: ...
```

This makes it possible to preserve both:

```text
logical identity
```

and:

```text
historical versions
```

without treating every PDF as a completely independent document.

---

## 10. Provenance Should Be Traced Beyond the DMG Paragraph

A DMG paragraph may ultimately derive from several different sources.

A useful provenance model would therefore be:

```text
Legislation
     │
     ├───────────────┐
     │               │
Case law         DWP policy/guidance
     │               │
     └───────┬───────┘
             ▼
          DMG Memo
             │
             ▼
        DMG Amendment
             │
             ▼
        DMG Paragraph
             │
             ▼
      Later amendments
             │
             ▼
      Current paragraph
```

Not every paragraph will pass through every stage.

For example, a paragraph may be based directly on legislation or case law without an identifiable DMG Memo.

---

## 11. Example: DMG 77130

DMG 77130 provides a useful example of why provenance matters.

The current guidance sits within the Pension Credit household provisions and follows DMG 77129.

DMG 77129 states that whether people are members of the same household is a **question of fact and degree** and discusses whether they share a domestic establishment.

DMG 77130 then gives factors that a Decision Maker may consider.

The paragraph cites:

```text
R(IS) 1/99
```

This suggests a relationship with earlier Income Support case law.

Therefore, merely locating the current version of DMG 77130 does not establish:

- when the paragraph first appeared;
- whether it originally appeared in Pension Credit guidance;
- whether it was adapted from earlier Income Support guidance;
- whether its wording has changed;
- which amendment introduced it;
- whether a DMG Memo preceded it;
- which parts derive from the cited case;
- whether subsequent amendments changed its meaning.

A fuller provenance investigation would therefore be:

```text
R(IS) 1/99
      │
      ▼
earlier DWP guidance?
      │
      ▼
DMG Memo?
      │
      ▼
Volume 13 amendment
      │
      ▼
DMG 77130
      │
      ▼
later amendments
      │
      ▼
current DMG 77130
```

The intermediate stages need to be established from documentary evidence rather than assumed.

---

## 12. Implications for Reconstructing Historical DMG Guidance

A reliable historical reconstruction should therefore avoid treating the GOV.UK PDF collection simply as a sequence of complete versions.

Instead, reconstruction should consider:

```text
Current chapter
      │
      ▼
paragraph numbers
      │
      ▼
previous chapter publications
      │
      ▼
numbered amendment packages
      │
      ▼
DMG Memos
      │
      ▼
earlier DMG guidance
      │
      ▼
case law / legislation
```

For each paragraph it would be useful to record:

| Field | Purpose |
|---|---|
| DMG paragraph | Logical identifier |
| Volume | DMG volume |
| Chapter | DMG chapter |
| Text | Paragraph text for that version |
| Publication date | Date of source publication |
| Amendment | Amendment associated with change |
| Previous version | Previous known paragraph version |
| Change type | Added / amended / deleted / renumbered |
| DMG Memo | Related memo where known |
| Legislation | Relevant legislative authority |
| Case law | Relevant cited decisions |
| Source document | Original DWP/GOV.UK source |
| Source page | Page within that particular document |
| Evidence status | Whether provenance has been verified |

---

## 13. Suggested Historical Reconstruction Strategy

For a project reconstructing the Pension Credit guidance, a sensible approach would be:

```text
1. Obtain current Volume 13/14 chapters
                 │
                 ▼
2. Extract DMG paragraph numbers
                 │
                 ▼
3. Obtain historical amendment packages
                 │
                 ▼
4. Identify replacement pages
                 │
                 ▼
5. Compare paragraph text
                 │
                 ▼
6. Identify additions/deletions/renumbering
                 │
                 ▼
7. Locate referenced DMG Memos
                 │
                 ▼
8. Identify legislation and case-law references
                 │
                 ▼
9. Construct paragraph-level history
                 │
                 ▼
10. Produce current rules with provenance
```

This produces something substantially more useful than merely archiving PDFs.

The resulting dataset could answer questions such as:

```text
When was DMG 77130 introduced?

Which amendment introduced it?

What did it say originally?

Has its wording changed?

Which DMG Memo introduced the change?

Which case or legislation supports it?

What wording was in force on a particular date?

What is the current wording?
```

---

## 14. Overall Interpretation

The DWP's historical DMG maintenance strategy appears to have evolved through roughly three overlapping mechanisms:

```text
                 DWP DMG
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
   DMG Memos     Amendments    Current chapters
       │            │            │
 interim/new    incorporate     consolidated
  guidance        changes         guidance
       │            │            │
       └────────────┴────────────┘
                    │
                    ▼
             maintained DMG
```

Historically, numbered amendments supported a **loose-leaf replacement-page model**.

DMG Memos provided a mechanism for issuing or explaining guidance that could subsequently be incorporated into the main manual.

As electronic publication became dominant, DWP appears to have moved towards **directly updating consolidated chapter PDFs and publishing change summaries**, rather than continuing the old remove-and-insert model.

The key implication for historical or machine-readable research is:

> **The unit that should be versioned is the DMG paragraph, not simply the PDF document.**

A PDF represents a publication artefact. The paragraph number represents the logical guidance provision whose wording and provenance can be traced through amendments, memos, legislation and case law.

---

## Sources

- DWP, *Decision Makers' Guide: staff guide*, GOV.UK.
- DWP, historical DMG volume amendment packages published through GOV.UK.
- DWP, *Decision Makers' Guide memos: staff guide*, GOV.UK.
- DWP, current DMG Volumes 13 and 14.
- DWP, *Advice for Decision Making (ADM)* documentation.
- DMG Chapter 77, including paragraphs 77129–77130.
- **R(IS) 1/99**, cited by DMG 77130.

## Evidence Note

This document describes the **apparent documentation and versioning strategy** observable from DWP's published DMG material. It should not be interpreted as an assertion about DWP's internal document-management systems unless supported by separate evidence.

In particular, relationships such as:

```text
case law → DMG Memo → amendment → paragraph
```

should be established individually from documentary evidence rather than assumed.

The Ask OKF material used during the related investigation describes its output as a bounded evidence package and cautions that it does not itself establish current law or determine entitlement.
