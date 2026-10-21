function iconClassName(className) {
  return ['ec-icon', className].filter(Boolean).join(' ')
}

export function GitHubIcon({ className = '' }) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function RepoIcon({ className = '' }) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 3.75h11.25A2.75 2.75 0 0 1 19 6.5v14H7.25A2.25 2.25 0 0 1 5 18.25V3.75Z" />
      <path d="M5 17.75a2.25 2.25 0 0 1 2.25-2.25H19" />
      <path d="M9 7.5h6" />
    </svg>
  )
}

export function GitBranchIcon({ className = '' }) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="6" cy="5.5" r="2.25" />
      <circle cx="6" cy="18.5" r="2.25" />
      <circle cx="18" cy="8" r="2.25" />
      <path d="M6 7.75v8.5" />
      <path d="M18 10.25v1.5a3.25 3.25 0 0 1-3.25 3.25H8.25" />
    </svg>
  )
}

export function CodeIcon({ className = '' }) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m8.25 7.5-4.5 4.5 4.5 4.5" />
      <path d="m15.75 7.5 4.5 4.5-4.5 4.5" />
      <path d="m13.5 4.5-3 15" />
    </svg>
  )
}

export function ExternalLinkIcon({ className = '' }) {
  return (
    <svg
      className={iconClassName(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 16 16 8" />
      <path d="M9 8h7v7" />
    </svg>
  )
}
