## Research
- SpyFu data on search volume.
- Research [office feedback portal](https://feedbackportal.microsoft.com/feedback/search/c23f3b77-f01b-ec11-b6e7-0022481f8472?q=translate).
- Explore cost of adwords.
- Look at other add-ins for Sheets or Excel with similar functionality.
- Explore if suitably sized models exist.

## Website
- Write task page explaining models and initial one chosen for app.
- Write app page with overview, applications, etc. with HTML for listing and sidebar.  This becomes the copilot prompt for the creation of the workbook

## Workbook
- build example workbook with test data and lambda mockup.
- Add E2E test cases to workbook.
- create desktop version of workbook for development, do not open example in local desktop or will corrupt file.

## Add-in Local
- create repo, branch for v1.0.0
- mock worker to see data types, etc.
- build functioning worker and test with playwright.

## Add-in Preview
- create icon with powerpoint, resize.
- manifest with content from site.
- app registration.
- deploy to web with /v1-0 folder
- test, including telemetry using prod manifest on web.
- publish manifest to website as preview.

## Publish to Marketplace
- screenshots for website.
- video overview.
- create offer in partner center.
- description from website.
- update code to comment out debug_view parameter (setting false doesn't work)
- create tag in repo once version goes live.

## Updates
- follow same sequence as above
- overwrite container folder (e.g. v1-1) with minor patches (e.g. v1.1.2)
- put major version manifests on website in changelog so people can use old versions.