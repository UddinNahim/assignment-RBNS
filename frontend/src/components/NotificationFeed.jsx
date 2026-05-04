export default function NotificationFeed({ selectedUser, notifications, unreadCount, loadingFeed, onMarkAsRead }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-label">User View</p>
          <h2>
            {selectedUser ? `${selectedUser.username}'s notifications` : 'Select a user to continue'}
          </h2>
        </div>
        <div className="badge-card compact">
          <span>Unread</span>
          <strong>{unreadCount}</strong>
        </div>
      </div>

      {!selectedUser ? (
        <p className="empty-state">Choose a user on the left to see their feed.</p>
      ) : loadingFeed ? (
        <p className="empty-state">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="empty-state">No notifications yet for this user.</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <article key={notification.id} className={`notification-card ${notification.is_read ? 'read' : 'unread'}`}>
              <div className="notification-topline">
                <strong>{notification.title}</strong>
                <span>{new Date(notification.created_at).toLocaleString()}</span>
              </div>
              <p>{notification.message}</p>
              <div className="notification-footer">
                <span className="pill small">{notification.is_global ? 'All users' : 'Role-based'}</span>
                {!notification.is_read ? (
                  <button className="secondary-button small" onClick={() => onMarkAsRead(notification.id)}>
                    Mark read
                  </button>
                ) : (
                  <span className="muted">Read</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}