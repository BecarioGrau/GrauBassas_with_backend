export function ToastNotifications({ message, error }) {
  if (!message && !error) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-[200] max-w-sm px-5 py-4 rounded-xl shadow-lg border text-sm font-semibold ${
        error
          ? "bg-red-50 border-red-200 text-red-800"
          : "bg-white border-primary/30 text-slate-800"
      }`}
      role="status"
    >
      {error || message}
    </div>
  );
}
