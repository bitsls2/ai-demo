If by “amendment strategies” you mean how DWP appears to have maintained and versioned the Decision Makers’ Guide (DMG) over time, the published material shows a fairly clear evolution. It looks less like conventional document versioning and more like a layered maintenance system inherited from loose-leaf manuals.
1. The original model was “remove and insert” amendment packages
Historically, each DMG volume was treated as a continuously maintained manual. DWP issued numbered amendments — for example Volume 14 Amendment 45, February 2018 — containing replacement pages.
The instructions were literally to remove specified sheets and insert replacement sheets. Replacement pages carried the amendment number in the footer, while the volume maintained a record of amendments. GOV.UK
So conceptually:
Volume 14
   │
   ├── original pages
   │
   ├── Amendment 43
   ├── Amendment 44
   └── Amendment 45
          │
          ├── remove old pages
          └── insert replacement pages

This explains something important when reverse-engineering the documentation: an “Amendment 45” PDF isn't necessarily a complete historical edition of Volume 14. It is an update package against the maintained volume.
2. DMG Memos were an intermediate/rapid-update mechanism
DWP also publishes DMG Memos, explicitly described as guidance that supplements the DMG. GOV.UK
The amendment packages show the relationship particularly clearly. For example, Volume 14 Amendment 45 says it:
- incorporated DMG Memo 12/15 into Chapter 83;
- incorporated Memos 14/17 and 20/17 into Chapter 84;
- incorporated several memos into Chapter 85, including redrafting paragraphs;
- made smaller legal-reference and explanatory changes elsewhere. GOV.UK
That suggests a lifecycle along these lines:
Legislation / case law / policy development
                  │
                  ▼
             DMG Memo
       (interim/new guidance)
                  │
                  ▼
        numbered amendment
                  │
        incorporates the memo
                  ▼
        revised DMG chapter

Once incorporated, references to the memo could subsequently disappear. We can see this explicitly elsewhere: Volume 9 Amendment 26 says Chapter 49 removed reference to DMG Memo 11/16, while other chapters incorporated later memos. GOV.UK
3. Several kinds of change were bundled into one amendment
The amendments weren't exclusively responses to new legislation. The examples show at least four kinds of maintenance happening together: incorporation of memos; substantive redrafting; minor corrections; and changes to legal references. They could also involve renumbering paragraphs. GOV.UK
That matters because:
Amendment number ≠ legislation version.
An amendment represents a publication/update event for a volume, potentially containing unrelated changes arising for different reasons.
4. The online master was apparently updated before/alongside the amendment package
A particularly revealing statement appears repeatedly in the older amendment documents. For example, Volume 2 Amendment 33 says the changes had already been incorporated into the Intranet and Internet versions of the DMG. The PDF amendment package existed so replacement pages could be printed. GOV.UK
So by that period DWP effectively seems to have been maintaining two representations:
                 DWP maintained guidance
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
     Intranet / Internet       printable manual
        current copy          amendment package
                                      │
                              remove/insert pages

The amendment PDF was therefore increasingly an artefact of the paper/manual maintenance process rather than necessarily the primary current publication.
5. Around 2020, the publication strategy appears to change
The current GOV.UK pages expose an interesting boundary. Volume 1, for example, retains numbered historical amendment packages through Amendment 61, June 2020, but now also publishes a document called “Summary of changes from October 2020.” GOV.UK
Current updates are described differently. GOV.UK says things such as:
Updated DMG chapters 2, 3 and 6. These are reflected in the updated DMG Vol 1: Summary of changes from October 2020.

So the maintenance model appears to have moved approximately from:
pre-2020

chapter
   +
numbered amendment package
   +
remove/insert instructions

towards:
post-2020

current chapter PDF
       +
summary/change record
       +
DMG memos where required

That is a significant distinction if you're trying to reconstruct the historical state of DWP guidance.
6. DWP also split the guidance architecture by benefit
There is another higher-level strategy. DMG isn't now the decision-making guide for every benefit.
DWP says Decision Makers now use Advice for Decision Making (ADM) rather than DMG for Universal Credit, PIP and specified New Style/contribution-based benefits. Pension Credit remains within DMG, specifically Volumes 13 and 14. GOV.UK
So there are effectively two related documentation families:
DWP decision-making guidance
             │
       ┌─────┴──────┐
       │            │
      DMG          ADM
       │            │
 legacy benefits    UC
 pensions           PIP
 Pension Credit     relevant NS JSA/ESA

What this means for your Pension Credit research
This has a fairly important consequence for what we're doing with DMG 77130.
I wouldn't regard a single PDF containing 77130 as sufficient to establish the history of that paragraph. The better model is:
current paragraph → current chapter → summary/change history → earlier amendment packages → incorporated DMG memos → legislation/case-law authority.
For example, 77130 itself cites R(IS) 1/99. The fact that the wording persists in the current chapter doesn't tell us from the current PDF alone when it entered the Pension Credit guidance, whether its wording subsequently changed, or whether it was inherited/adapted from older Income Support guidance.
That is also why the Ask OKF evidence you've been examining needs some care: its evidence viewer itself describes what it provides as a bounded evidence package, not something that independently establishes current law
