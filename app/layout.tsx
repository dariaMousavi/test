import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Boss 😎',
  description: 'Be the boss of your health!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO: global loggedIn state storing user data

  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
