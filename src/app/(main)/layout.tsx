import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementTicker from '@/components/home/AnnouncementTicker';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#f0f4f8' }}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AnnouncementTicker />
    </div>
  );
}
