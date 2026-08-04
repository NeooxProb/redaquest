export default function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-bar__time">9:41</span>
      <div className="status-bar__icons">
        <svg width="17" height="12" viewBox="0 0 17 12">
          <rect x="0" y="4" width="3" height="8" rx="1" fill="currentColor" />
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="currentColor" />
          <rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" opacity="0.3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path d="M8 1.5C5 1.5 2.3 2.8.5 5l1.7 1.7C3.5 5 5.6 4 8 4s4.5 1 5.8 2.7L15.5 5C13.7 2.8 11 1.5 8 1.5Z" fill="currentColor" />
          <path d="M8 5.5c-1.8 0-3.2.7-4.2 1.8L5.5 9C6.1 8.4 7 8 8 8s1.9.4 2.5 1l1.7-1.7C11.2 6.2 9.8 5.5 8 5.5Z" fill="currentColor" />
          <circle cx="8" cy="11" r="1.5" fill="currentColor" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12">
          <rect x=".75" y=".75" width="21.5" height="10.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="2.5" y="2.5" width="15" height="7" rx="1" fill="currentColor" />
          <path d="M23.5 4.5v3c.8-.4 1.3-1 1.3-1.5s-.5-1.1-1.3-1.5Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
