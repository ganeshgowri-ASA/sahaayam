"use client";

import { useState } from "react";

const GOLD = "#d4a843";
const NAVY = "#0a1628";
const NAVY2 = "#0f2040";
const NAVY3 = "#162540";

interface DiagnosticTool {
  id: string;
  title: string;
  description: string;
  command: string;
  batContent: string;
  icon: React.ReactNode;
}

const diagnosticTools: DiagnosticTool[] = [
  {
    id: "disk-cleanup",
    title: "Disk Cleanup",
    description: "Remove temporary files to free up disk space and improve system performance.",
    command: "del /q/f/s %TEMP%\\* && del /q/f/s C:\\Windows\\Temp\\*",
    batContent: `@echo off
echo ========================================
echo  Disk Cleanup - Sahaayam Diagnostics
echo ========================================
echo.
echo Cleaning user TEMP folder...
del /q/f/s "%TEMP%\\*" 2>nul
echo Cleaning Windows TEMP folder...
del /q/f/s "C:\\Windows\\Temp\\*" 2>nul
echo.
echo Disk cleanup complete!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    id: "clear-browser-cache",
    title: "Clear Browser Cache",
    description: "Clear Chrome and Edge browser cache to resolve browsing issues.",
    command: `del /q/f/s "%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Cache\\*" && del /q/f/s "%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Cache\\*"`,
    batContent: `@echo off
echo ========================================
echo  Clear Browser Cache - Sahaayam Diagnostics
echo ========================================
echo.
echo NOTE: Please close Chrome and Edge before running this script.
echo.
echo Clearing Chrome cache...
del /q/f/s "%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Cache\\*" 2>nul
del /q/f/s "%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Code Cache\\*" 2>nul
echo Clearing Edge cache...
del /q/f/s "%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Cache\\*" 2>nul
del /q/f/s "%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Code Cache\\*" 2>nul
echo.
echo Browser cache cleared!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: "system-file-check",
    title: "System File Check",
    description: "Scan and repair corrupted Windows system files using the built-in SFC utility.",
    command: "sfc /scannow",
    batContent: `@echo off
echo ========================================
echo  System File Check - Sahaayam Diagnostics
echo ========================================
echo.
echo Running as Administrator is required.
echo Scanning and repairing system files...
echo This may take several minutes.
echo.
sfc /scannow
echo.
echo System file check complete!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "network-diagnostics",
    title: "Network Diagnostics",
    description: "Run ipconfig, ping, and tracert to diagnose network connectivity issues.",
    command: "ipconfig /all && ping google.com -n 4 && tracert google.com",
    batContent: `@echo off
echo ========================================
echo  Network Diagnostics - Sahaayam Diagnostics
echo ========================================
echo.
echo --- IP Configuration ---
ipconfig /all
echo.
echo --- Ping Test (google.com) ---
ping google.com -n 4
echo.
echo --- Traceroute (google.com) ---
tracert google.com
echo.
echo Network diagnostics complete!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    id: "flush-dns",
    title: "Flush DNS Cache",
    description: "Clear the DNS resolver cache to fix DNS-related connectivity problems.",
    command: "ipconfig /flushdns",
    batContent: `@echo off
echo ========================================
echo  Flush DNS Cache - Sahaayam Diagnostics
echo ========================================
echo.
echo Flushing DNS resolver cache...
ipconfig /flushdns
echo.
echo Registering DNS...
ipconfig /registerdns
echo.
echo DNS cache flushed successfully!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: "check-disk",
    title: "Check Disk Health",
    description: "Scan the C: drive for errors and bad sectors using Windows CHKDSK.",
    command: "chkdsk C: /f",
    batContent: `@echo off
echo ========================================
echo  Check Disk Health - Sahaayam Diagnostics
echo ========================================
echo.
echo NOTE: A disk check will be scheduled on next restart if the drive is in use.
echo Running disk check on C: drive...
echo.
chkdsk C: /f /r
echo.
echo Disk health check complete!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: "windows-update",
    title: "Windows Update Check",
    description: "Trigger Windows Update detection to check for available system updates.",
    command: "wuauclt /detectnow",
    batContent: `@echo off
echo ========================================
echo  Windows Update Check - Sahaayam Diagnostics
echo ========================================
echo.
echo Triggering Windows Update detection...
wuauclt /detectnow
echo.
echo Starting Windows Update service...
sc start wuauserv
echo.
echo Update check triggered. Open Windows Update to see results.
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    id: "defragment-disk",
    title: "Defragment Disk",
    description: "Optimize and defragment the C: drive to improve read/write performance.",
    command: "defrag C: /O",
    batContent: `@echo off
echo ========================================
echo  Defragment Disk - Sahaayam Diagnostics
echo ========================================
echo.
echo NOTE: This may take a long time depending on drive size and fragmentation.
echo Optimizing and defragmenting C: drive...
echo.
defrag C: /O /V
echo.
echo Disk defragmentation complete!
pause`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
];

const mockHistory = [
  { id: 1, tool: "Disk Cleanup", ran: "2024-01-15 09:12:34", result: "Success", details: "Freed 2.3 GB of temporary files." },
  { id: 2, tool: "Flush DNS Cache", ran: "2024-01-14 14:55:20", result: "Success", details: "DNS resolver cache successfully flushed." },
  { id: 3, tool: "System File Check", ran: "2024-01-13 11:30:00", result: "Success", details: "Windows Resource Protection did not find any integrity violations." },
  { id: 4, tool: "Network Diagnostics", ran: "2024-01-12 16:22:45", result: "Warning", details: "Packet loss detected on ping test: 1/4 packets lost." },
  { id: 5, tool: "Check Disk Health", ran: "2024-01-11 08:00:00", result: "Success", details: "No errors found on C: drive." },
  { id: 6, tool: "Windows Update Check", ran: "2024-01-10 10:05:11", result: "Success", details: "3 updates found and queued for installation." },
];

function HealthCard({
  label,
  value,
  sub,
  pct,
  color,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  pct?: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ backgroundColor: NAVY2, border: `1px solid rgba(212,168,67,0.18)` }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-xs text-gray-400 truncate">{label}</div>
          <div className="text-base font-bold text-white truncate">{value}</div>
          {sub && <div className="text-[11px] text-gray-500 truncate">{sub}</div>}
        </div>
      </div>
      {pct !== undefined && (
        <div>
          <div className="mb-1 flex justify-between text-[11px]">
            <span className="text-gray-500">Usage</span>
            <span style={{ color }}>{pct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10">
            <div
              className="h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: color }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DiagnosticCard({ tool }: { tool: DiagnosticTool }) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(tool.command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([tool.batContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.id}.bat`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 2000);
  }

  return (
    <div
      className="rounded-xl flex flex-col gap-0 overflow-hidden"
      style={{ backgroundColor: NAVY2, border: `1px solid rgba(212,168,67,0.18)` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
          style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
        >
          {tool.icon}
        </span>
        <div>
          <div className="text-sm font-semibold text-white">{tool.title}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{tool.description}</div>
        </div>
      </div>

      {/* Command box */}
      <div className="px-4 py-3">
        <div
          className="rounded-lg px-3 py-2 font-mono text-[11px] break-all leading-relaxed"
          style={{ backgroundColor: "#0a1628", color: "#6ee7b7", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {tool.command}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <button
          onClick={handleRun}
          disabled={running || ran}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-60"
          style={{
            backgroundColor: ran ? "#16a34a22" : `${GOLD}22`,
            color: ran ? "#4ade80" : GOLD,
            border: `1px solid ${ran ? "#4ade8044" : `${GOLD}44`}`,
          }}
        >
          {running ? (
            <>
              <svg className="h-3 w-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Running…
            </>
          ) : ran ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Done
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
              </svg>
              Run
            </>
          )}
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            color: copied ? "#6ee7b7" : "#9ca3af",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy Command
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "#9ca3af",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3 w-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download .bat
        </button>
      </div>
    </div>
  );
}

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1b2e" }}>
      {/* Page header banner */}
      <div
        className="w-full px-6 py-5"
        style={{ backgroundColor: NAVY, borderBottom: `2px solid ${GOLD}33` }}
      >
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
            style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
            </svg>
          </span>
          <div>
            <h1 className="text-xl font-bold text-white">Laptop Diagnostics &amp; System Utilities</h1>
            <p className="text-xs text-gray-400 mt-0.5">Monitor system health and run diagnostic tools for your workstation</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">

        {/* ── 1. SYSTEM HEALTH DASHBOARD ─────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
            System Health Dashboard
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            <HealthCard
              label="CPU Usage"
              value="65%"
              sub="Intel Core i7-12th Gen"
              pct={65}
              color="#f59e0b"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                </svg>
              }
            />
            <HealthCard
              label="RAM Usage"
              value="72%"
              sub="11.5 GB / 16 GB"
              pct={72}
              color="#a78bfa"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
              }
            />
            <HealthCard
              label="Disk Space"
              value="45% used"
              sub="230 GB / 512 GB"
              pct={45}
              color="#34d399"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              }
            />
            <HealthCard
              label="Battery Health"
              value="Good"
              sub="89% capacity"
              color="#34d399"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                </svg>
              }
            />
            <HealthCard
              label="OS Version"
              value="Windows 11 Pro"
              sub="23H2 Build 22631"
              color={GOLD}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                </svg>
              }
            />
            <HealthCard
              label="Last Windows Update"
              value="Jan 9, 2024"
              sub="KB5034123 installed"
              color="#60a5fa"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              }
            />
            <HealthCard
              label="Antivirus Status"
              value="Active"
              sub="Definitions outdated"
              color="#f87171"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              }
            />
          </div>
        </section>

        {/* ── 2. DIAGNOSTIC TOOLS SECTION ────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
              Diagnostic Tools
            </h2>
            <span className="text-xs text-gray-500">Click &ldquo;Run&rdquo; to simulate or &ldquo;Download .bat&rdquo; to run on your machine</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {diagnosticTools.map((tool) => (
              <DiagnosticCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* ── 3. DIAGNOSTIC HISTORY ──────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
            Diagnostic History
          </h2>
          <div
            className="overflow-hidden rounded-xl"
            style={{ backgroundColor: NAVY2, border: `1px solid rgba(212,168,67,0.18)` }}
          >
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: NAVY3, borderBottom: `1px solid rgba(212,168,67,0.2)` }}>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>#</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>Tool</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>Timestamp</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>Result</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHistory.map((row, idx) => (
                    <tr
                      key={row.id}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.025)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <td className="px-5 py-3 text-xs text-gray-500">{row.id}</td>
                      <td className="px-5 py-3 text-xs font-medium text-white">{row.tool}</td>
                      <td className="px-5 py-3 text-xs text-gray-400 font-mono">{row.ran}</td>
                      <td className="px-5 py-3 text-xs">
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                          style={{
                            backgroundColor: row.result === "Success" ? "#16a34a22" : row.result === "Warning" ? "#f59e0b22" : "#ef444422",
                            color: row.result === "Success" ? "#4ade80" : row.result === "Warning" ? "#fbbf24" : "#f87171",
                          }}
                        >
                          {row.result === "Success" && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-2.5 w-2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                          {row.result === "Warning" && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-2.5 w-2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                          )}
                          {row.result}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-400">{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y md:hidden" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {mockHistory.map((row) => (
                <div key={row.id} className="px-4 py-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white">{row.tool}</span>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        backgroundColor: row.result === "Success" ? "#16a34a22" : row.result === "Warning" ? "#f59e0b22" : "#ef444422",
                        color: row.result === "Success" ? "#4ade80" : row.result === "Warning" ? "#fbbf24" : "#f87171",
                      }}
                    >
                      {row.result}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-gray-500">{row.ran}</div>
                  <div className="text-xs text-gray-400">{row.details}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
