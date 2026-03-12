import { headers } from 'next/headers';

async function getNetworkInfo() {
  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const host = headersList.get('host') ?? 'localhost';

  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp ?? '127.0.0.1';
  const hostname = host.split(':')[0];

  return { hostname, ip };
}

interface WelcomeBarProps {
  userName?: string;
}

export default async function WelcomeBar({ userName = 'User' }: WelcomeBarProps) {
  const { hostname, ip } = await getNetworkInfo();

  return (
    <div
      className="w-full py-1.5"
      style={{ backgroundColor: '#2d2d2d' }}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 text-xs sm:px-6 lg:px-8">
        {/* Welcome */}
        <p className="font-medium">
          <span className="text-gray-400">Welcome,&nbsp;</span>
          <span className="italic font-semibold" style={{ color: '#d4a853' }}>
            {userName}
          </span>
        </p>

        {/* Hostname + IP */}
        <div className="flex items-center gap-4 text-gray-400">
          <span>
            <span className="mr-1 text-gray-500">Hostname:</span>
            <span className="font-mono text-gray-300">{hostname}</span>
          </span>
          <span>
            <span className="mr-1 text-gray-500">IP:</span>
            <span className="font-mono text-gray-300">{ip}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
