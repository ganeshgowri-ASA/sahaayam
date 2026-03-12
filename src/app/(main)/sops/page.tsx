import type { Metadata } from 'next';
import SopList from '@/components/sops/SopList';

export const metadata: Metadata = {
  title: 'IT SOPs / DIY | Sahaayam',
  description:
    'IT Standard Operating Procedures and Do-It-Yourself guides for USC employees.',
};

export default function SopsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Red Banner Header */}
      <header
        className="w-full py-6 px-6 shadow-md"
        style={{ backgroundColor: '#c0392b' }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">
          IT SOPs / DIY
        </h1>
        <p className="mt-1 text-red-100 text-sm">
          Standard Operating Procedures &amp; self-service guides
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SopList />
      </main>
    </div>
  );
}
