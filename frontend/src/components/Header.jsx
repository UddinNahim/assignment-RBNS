export default function Header({ unreadCount, onInitDb, initLoading }) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">RBNS</p>
        <h1>Role-based notifications, wired to FastAPI</h1>
        <p className="hero-copy">
          Pick a user, send notifications as an admin, and watch unread counts update in one place.
        </p>
      </div>
      <div className="hero-actions">
        <button className="secondary-button" onClick={onInitDb} disabled={initLoading}>
          {initLoading ? 'Initializing...' : 'Initialize sample data'}
        </button>
        <div className="badge-card">
          <span>Unread</span>
          <strong>{unreadCount}</strong>
        </div>
      </div>
    </header>
  )
}