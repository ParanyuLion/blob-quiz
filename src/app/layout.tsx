import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'คุณคือเจ้าก้อน (Blob) สายพันธุ์ไหน? 🫧',
  description:
    'ทดสอบบุคลิกภาพสไตล์ก้อนๆ น่ารักแต่ปั่น — มี 6 สายพันธุ์ ตั้งแต่ Common ไปถึง Mythic หายาก 1%!',
  keywords: ['blob quiz', 'personality test', 'แบบทดสอบ', 'ก้อน', 'kawaii'],
  openGraph: {
    title: 'คุณคือเจ้าก้อน (Blob) สายพันธุ์ไหน? 🫧',
    description: 'ทดสอบบุคลิกภาพสไตล์ก้อนๆ น่ารักแต่ปั่น มี 6 สายพันธุ์!',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen mesh-bg">{children}</body>
    </html>
  );
}
