// import { Layout } from '@/components/dom/Layout';
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { currentUser } from "./lib/auth";
import Providers from "./providers/SessionProvider";
import { MobileSimulatorProvider } from "./components/MobileSimulator/provider/MobileSimulatorContext";
import { AuroraBackground } from "./components/ui/background/aurora-background";
import { ThemeSwitcher } from "./components/ThemeToggler/ThemeSwitcher";
import FloatingDockInvertedComponent from "./components/dock/FloatingDockInverted";
import { ToastProvider } from "./providers/toast-provider";
import { UserProvider } from "./hooks/UserProvider";
import {
  AvatarProvider,
  AvatarType,
} from "@/components/AvatarManager/provider/AvatarManagerContext";
import { getUserAvatars } from "./actions/avatar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next Dashboard | Zulmy Azhary",
    template: "Next Dashboard | %s",
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    return (
      <>
        <html lang="en" className="h-full">
          <body className={inter.className}>
            <Toaster position="bottom-left" richColors theme="light" />
            <Providers>
              <MobileSimulatorProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <AuroraBackground>
                    <UserProvider>
                      {/* Theme switcher */}
                      <div className="absolute top-[8px] right-[73px] z-50">
                        <ThemeSwitcher />
                      </div>

                      {/* Dock section */}
                      <div className="w-full z-40">
                        <div className="p-4 text-black dark:text-white">
                          <FloatingDockInvertedComponent />
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex-1 px-8 py-4 w-full overflow-auto">
                        {children}
                      </div>
                    </UserProvider>
                    <ToastProvider />
                  </AuroraBackground>
                </ThemeProvider>
              </MobileSimulatorProvider>
            </Providers>
          </body>
        </html>
      </>
    );
  }

  const avatarsResponse = await getUserAvatars(user.id);
  const avatars: AvatarType[] =
    avatarsResponse.success && Array.isArray(avatarsResponse.data)
      ? avatarsResponse.data
      : [];

  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <Toaster position="bottom-left" richColors theme="light" />
        <Providers>
          <MobileSimulatorProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AuroraBackground>
                <UserProvider>
                  <AvatarProvider initialAvatars={avatars} user={user.id}>
                    {/* Theme switcher */}
                    <div className="absolute top-[8px] right-[73px] z-50">
                      <ThemeSwitcher />
                    </div>

                    {/* Dock section */}
                    <div className="w-full z-40">
                      <div className="p-4 text-black dark:text-white">
                        <FloatingDockInvertedComponent />
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex-1 px-8 py-4 w-full overflow-auto">
                      {children}
                    </div>
                  </AvatarProvider>
                </UserProvider>
                <ToastProvider />
              </AuroraBackground>
            </ThemeProvider>
          </MobileSimulatorProvider>
        </Providers>
      </body>
    </html>
  );
}
