import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} | IT Services | Sahaayam`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#0077b6] font-medium text-sm mb-8 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
          Back to IT Services
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#0077b6] flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06-1.06l1.47-1.47-1.47-1.47a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
          </div>

          <p className="text-gray-600 leading-relaxed text-base">{service.description}</p>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="bg-[#0077b6] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#005f96] transition-colors">
              Request This Service
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
