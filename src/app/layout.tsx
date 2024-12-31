import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import './globals.css';
import SignUp from './pages/SignUpForm'; // Import the SignUp component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw new Error('Missing Clerk publishable key');
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <SignedOut>
              <SignUp /> {/* Render SignUp component for users who are signed out */}
            </SignedOut>
            <SignedIn>
              <div className="mb-4">
                <UserButton />
              </div>
            </SignedIn>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}