export default function Toast({ message, error }) {
  if (!message && !error) {
    return null
  }

  return <div className={`toast ${error ? 'toast-error' : 'toast-success'}`}>{error || message}</div>
}