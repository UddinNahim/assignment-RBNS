export default function UserList({ users, selectedUserId, loadingUsers, onSelectUser }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Users</p>
          <h2>Select a user</h2>
        </div>
        {loadingUsers && <span className="muted">Loading...</span>}
      </div>

      <div className="user-list">
        {users.length === 0 ? (
          <p className="empty-state">No users yet. Click “Initialize sample data” first.</p>
        ) : (
          users.map((user) => {
            const isSelected = String(user.id) === String(selectedUserId)
            return (
              <button
                key={user.id}
                className={`user-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectUser(String(user.id))}
              >
                <span>
                  <strong>{user.username}</strong>
                  <small>Role: {String(user.role).toLowerCase()}</small>
                </span>
                {isSelected && <span className="pill">Selected</span>}
              </button>
            )
          })
        )}
      </div>
    </section>
  )
}