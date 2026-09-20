# Demo 2 - Overview

Build a website for a DWP Benefit Application which includes support for webMCP.

A user should be able to use the website to submit a Pension Credit Application.

In addition the user should be able to use an AI agent to submit the application leveraging webMCP tooling

A pdf documents describing what data is required can be found [here](https://www.gov.uk/government/publications/pension-credit-claim-form--2)

## Tech stack

The website should leverage the open-source DWP UI framework called CASA which is based on express. CASA is a 
framework for building forms based on the [GOV.UK Design System](https://design-system.service.gov.uk/).

The published CASA artifact can be found [here](https://www.npmjs.com/package/@dwp/govuk-casa)) note the github repository is not up to date.

## High level Plan 

- Use Information in the OKF bundle for the first demonstration and the pdf forms to decide what data should be collected. 

- Create a website to collect information for the pension credit application based on the CASA framework.    

- Update the website to use webMCP. Annotate the site appropriately and provide tools to submit an application.
