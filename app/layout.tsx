import type { Metadata } from "next"; 
import {SessionProvider} from "next-auth/react"
import localFont from "next/font/local"
import "./globals.css";
import ThemeProvider from "@/context/Theme"; 
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from 'react';
import { auth } from "@/auth";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900"
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700"
});
 

export const metadata: Metadata = {
  title: "Easy DevFlow",
  description: "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons:{
    icon: "/images/site-logo.svg"
  }
};

const RootLayout = async ({ children} : {children:ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}> 
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      > 

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >  
      {children}

      </ThemeProvider> 
      <Toaster/>
       
      </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;
