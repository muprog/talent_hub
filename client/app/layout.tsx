import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from './ThemeProvider' // client provider wrapper

export const metadata: Metadata = {
  title: 'Talent Hub',
  description:
    'The system is a TalentHub Job Portal designed to connect employers and job applicants efficiently',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
