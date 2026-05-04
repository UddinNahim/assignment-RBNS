const ROLE_OPTIONS = ['admin', 'manager', 'editor', 'viewer', 'support']

export default function AdminPanel({ form, sending, onChangeForm, onSubmit }) {
  return (
    <section className="panel admin-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Admin Panel</p>
          <h2>Create notification</h2>
        </div>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={form.title}
            onChange={(event) => onChangeForm({ title: event.target.value })}
            placeholder="System update"
            required
          />
        </label>

        <label>
          Message
          <textarea
            value={form.message}
            onChange={(event) => onChangeForm({ message: event.target.value })}
            placeholder="The system will be offline tonight from 10 PM to 11 PM."
            rows={4}
            required
          />
        </label>

        <div className="radio-row">
          <label className="radio-card">
            <input
              type="radio"
              name="audience"
              checked={form.is_global}
              onChange={() => onChangeForm({ is_global: true })}
            />
            <span>
              <strong>All users</strong>
              <small>Send the notification to everyone.</small>
            </span>
          </label>

          <label className="radio-card">
            <input
              type="radio"
              name="audience"
              checked={!form.is_global}
              onChange={() => onChangeForm({ is_global: false })}
            />
            <span>
              <strong>By role</strong>
              <small>Choose one or more roles.</small>
            </span>
          </label>
        </div>

        {!form.is_global && (
          <div className="role-grid">
            {ROLE_OPTIONS.map((role) => {
              const selected = form.roles.includes(role)
              return (
                <button
                  type="button"
                  key={role}
                  className={`role-chip ${selected ? 'active' : ''}`}
                  onClick={() => onChangeForm({ roles: selected ? form.roles.filter((item) => item !== role) : [...form.roles, role] })}
                >
                  {role}
                </button>
              )
            })}
          </div>
        )}

        <button className="primary-button" type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send notification'}
        </button>
      </form>
    </section>
  )
}