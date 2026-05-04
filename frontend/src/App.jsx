import { useEffect, useMemo, useState } from 'react'

import AdminPanel from './components/AdminPanel'
import Header from './components/Header'
import NotificationFeed from './components/NotificationFeed'
import Toast from './components/Toast'
import UserList from './components/UserList'
import { requestJson } from './lib/api'

export default function App() {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingFeed, setLoadingFeed] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [initLoading, setInitLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    title: '',
    message: '',
    is_global: true,
    roles: ['manager'],
  })

  const selectedUser = useMemo(
    () => users.find((user) => String(user.id) === String(selectedUserId)),
    [users, selectedUserId],
  )

  const isAdminUser = String(selectedUser?.role || '').toLowerCase() === 'admin'

  async function loadUsers() {
    setLoadingUsers(true)
    setError('')
    try {
      const data = await requestJson('/users/')
      setUsers(data)
      if (!selectedUserId && data.length > 0) {
        setSelectedUserId(String(data[0].id))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingUsers(false)
    }
  }

  async function loadNotifications(userId) {
    if (!userId) return
    setLoadingFeed(true)
    setError('')
    try {
      const data = await requestJson(`/notifications/${userId}`)
      setUnreadCount(data.unread_count || 0)
      setNotifications(data.notifications || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingFeed(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    if (selectedUserId) {
      loadNotifications(selectedUserId)
    } else {
      setNotifications([])
      setUnreadCount(0)
    }
  }, [selectedUserId])

  async function handleInitDb() {
    setInitLoading(true)
    setMessage('')
    setError('')
    try {
      const result = await requestJson('/api/init-db', { method: 'POST' })
      setMessage(result.message)
      await loadUsers()
    } catch (err) {
      setError(err.message)
    } finally {
      setInitLoading(false)
    }
  }

  async function handleSendNotification(event) {
    event.preventDefault()
    setSending(true)
    setMessage('')
    setError('')

    try {
      const payload = {
        title: form.title,
        message: form.message,
        is_global: form.is_global,
        roles: form.is_global ? [] : form.roles,
      }

      await requestJson('/notifications/', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setMessage('Notification sent successfully.')
      setForm((current) => ({
        ...current,
        title: '',
        message: '',
      }))

      if (selectedUserId) {
        await loadNotifications(selectedUserId)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  async function handleMarkAsRead(notificationId) {
    if (!selectedUserId) return

    try {
      await requestJson(`/notifications/${selectedUserId}/${notificationId}/read`, {
        method: 'POST',
      })
      await loadNotifications(selectedUserId)
    } catch (err) {
      setError(err.message)
    }
  }

  function updateForm(partial) {
    setForm((current) => ({
      ...current,
      ...partial,
      ...(partial.is_global === true ? { roles: [] } : {}),
    }))
  }

  return (
    <div className="app-shell">
      <Header unreadCount={unreadCount} onInitDb={handleInitDb} initLoading={initLoading} />
      <Toast message={message} error={error} />

      <main className="grid">
        <UserList
          users={users}
          selectedUserId={selectedUserId}
          loadingUsers={loadingUsers}
          onSelectUser={setSelectedUserId}
        />

        <NotificationFeed
          selectedUser={selectedUser}
          notifications={notifications}
          unreadCount={unreadCount}
          loadingFeed={loadingFeed}
          onMarkAsRead={handleMarkAsRead}
        />

        {isAdminUser && (
          <AdminPanel form={form} sending={sending} onChangeForm={updateForm} onSubmit={handleSendNotification} />
        )}
      </main>
    </div>
  )
}