import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ui/Theme';

export const metadata: Metadata = {
    title: 'UniLink',
    description: 'University SaaS',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased" suppressHydrationWarning>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
