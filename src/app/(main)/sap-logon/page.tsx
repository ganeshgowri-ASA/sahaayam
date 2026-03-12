import { sapFiles } from "@/lib/data/sap-files";

export const metadata = {
  title: "SAP Logon Group Files",
};

function FolderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-yellow-500 flex-shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function SapLogonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Red banner header */}
      <div className="w-full bg-[#c0392b] px-6 py-4 text-white">
        <h1 className="text-2xl font-bold tracking-wide">
          SAP Logon Group Files
        </h1>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Warning notice */}
        <div className="mb-6 flex items-start gap-3 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Please save all your work in SAP before
            updating the logon group files. Updating these files will close any
            active SAP sessions. Ensure all transactions are complete before
            proceeding.
          </p>
        </div>

        {/* File list */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-600">
              {sapFiles.length} files available for download
            </p>
          </div>
          <ul className="divide-y divide-gray-100">
            {sapFiles.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <FolderIcon />
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {file.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {file.filename}
                    </span>
                  </div>
                </div>
                <a
                  href={`/downloads/sap/${file.filename}`}
                  download
                  className="flex items-center gap-1.5 rounded bg-[#c0392b] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#a93226]"
                >
                  <DownloadIcon />
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
