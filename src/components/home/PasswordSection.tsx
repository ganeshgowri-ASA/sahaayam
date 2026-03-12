'use client';

interface PasswordSectionProps {
  onClickHere?: () => void;
  onGuidelinesClick?: () => void;
}

export default function PasswordSection({ onClickHere, onGuidelinesClick }: PasswordSectionProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-2">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base">Looking to Change Your Domain Password?</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Follow company guidelines to keep your account secure.{' '}
              <button
                onClick={onGuidelinesClick}
                className="text-blue-600 hover:underline font-medium"
              >
                View Password Guidelines
              </button>
            </p>
          </div>
        </div>
        <button
          onClick={onClickHere}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
        >
          Click Here
        </button>
      </div>
    </div>
  );
}
