name: "Bug Report"
description: "File a bug report"
body:

- type: "markdown"
  attributes:
  value: |
  Thanks for creating an issue! 🙂

      Please search open/closed issues before submitting. Someone
      might have asked the same thing before! 🔎

- type: "input"
  id: "description"
  attributes:
  label: "Description"
  description: "A brief description of the issue."
  placeholder: |
  When I \_**\_, I expected \_\_** to happen but \_\_\_\_ happened instead.
  validations:
  required: true
- type: "input"
  id: "reproduction"
  attributes:
  label: "Link to Reproduction"
  description: |
  A link to a CodeSandbox reproduction which demonstrates the bug
  placeholder: "https://codesandbox.io/"
  validations:
  required: true
- type: "textarea"
  id: "steps"
  attributes:
  label: "Steps to reproduce"
  description: |
  Explain how to cause the issue in the provided reproduction.
  value: | 1. Go to '...' 2. Click on '...' 3. Scroll down to '...' 4. See error
- type: "input"
  id: "tastycss-version"
  attributes:
  label: "TastyCSS Version"
  description: "The version of Tastycss you use."
  placeholder: "0.8.9"
  validations:
  required: true
- type: "input"
  id: "browser"
  attributes:
  label: "Browser"
  description: "The browser(s) this issue occurred with."
  placeholder: "Google Chrome 93"
- type: "checkboxes"
  id: "operating-system"
  attributes:
  label: "Operating System"
  description: "The operating system(s) this issue occurred with."
  options: - label: "macOS" - label: "Windows" - label: "Linux"
- type: "textarea"
  id: "additional-information"
  attributes:
  label: "Additional Information"
  description: |
  Use this section to provide any additional information you might have
  like screenshots, notes, or links to ideas.
