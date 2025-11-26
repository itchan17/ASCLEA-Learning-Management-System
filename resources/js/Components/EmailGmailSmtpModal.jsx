import React from "react";

function EmailGmailSmtpModal({
  open = false,
  onClose = () => {},
  status = "idle", // idle | sending | success | error
  title = "Email Status",
  description = "",
  recipient = "",
  sender = "",
  error = "",
}) {
  if (!open) return null;

  const statusIcon = {
    idle: (
      <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
      </svg>
    ),
    sending: (
      <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 8v4m4-12h4M4 12H0m16.95 4.95l2.828 2.828M4.222 4.222L7.05 7.05M16.95 7.05l2.828-2.828M4.222 19.778L7.05 16.95" />
      </svg>
    ),
    success: (
      <svg className="w-6 h-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v5h-2V7zm0 6h2v2h-2v-2z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          {statusIcon[status]}
          <h3 className="text-lg font-semibold font-nunito-sans">{title}</h3>
        </div>

        <div className="space-y-3 px-4 py-3 font-nunito-sans">
          {description && <p className="text-sm text-gray-700">{description}</p>}

          <div className="grid grid-cols-1 gap-2 text-sm">
            {recipient && (
              <div className="flex justify-between">
                <span className="text-gray-500">To</span>
                <span className="font-medium">{recipient}</span>
              </div>
            )}
            {sender && (
              <div className="flex justify-between">
                <span className="text-gray-500">From</span>
                <span className="font-medium">{sender}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Provider</span>
              <span className="font-medium">Gmail SMTP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium capitalize">{status}</span>
            </div>
          </div>

          {status === "error" && error && (
            <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailGmailSmtpModal;