import ServiceCarousel from "@/components/services/ServiceCarousel";
import ServiceSearch from "@/components/services/ServiceSearch";
import { services } from "@/lib/data/services";

export const metadata = {
  title: "IT Services Catalog | Sahaayam",
  description: "Browse and search all available IT services",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0077b6]">
      <div className="max-w-6xl mx-auto px-8 py-14">
        <h1 className="text-white text-3xl font-bold mb-10 tracking-tight">
          Top IT Services
        </h1>

        {/* Carousel */}
        <div className="mb-12 px-6">
          <ServiceCarousel services={services} />
        </div>

        {/* Search */}
        <ServiceSearch />
      </div>
    </main>
  );
}
