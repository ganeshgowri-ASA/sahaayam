"use client";

import Link from "next/link";

interface ServiceCardProps {
  name: string;
  slug: string;
}

export default function ServiceCard({ name, slug }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="flex-shrink-0 w-56 bg-white rounded-xl p-5 flex flex-col justify-between shadow-md
        transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer group min-h-[120px]"
    >
      <span className="text-gray-800 font-semibold text-sm leading-snug">
        {name}
      </span>
      <div className="flex justify-end mt-4">
        <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center
          group-hover:bg-[#0077b6] transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-[#0077b6] group-hover:text-white transition-colors duration-200"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
