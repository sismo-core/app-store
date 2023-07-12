import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import StyledComponentsRegistry from "../libs/styled-components/StyledComponentsRegistry";
import Footer from "../components/Footer";
import Theme from "../themes/provider";
import { PageContent } from "../components/Layouts/PageContent";
import PageContainer from "../components/Layouts/PageContainer";
import PlausibleProvider from "next-plausible";
import env from "../environments";
import AppProviders from "../components/AppProviders";

export const metadata = {
  title: env.isDemo
    ? "Sismo Demo App Store - Try Sismo Connect Demo Apps"
    : "Sismo App Store - Explore Sismo Connect Apps",
  description: env.isDemo
    ? "The Sismo Demo App Store showcases demo versions of Sismo Connect Apps. Any user can experiment with these apps without requiring a wallet or Sismo Data Vault."
    : "The Sismo App Store is a central hub for discovering new Sismo Connect Apps. Users can access these apps, and builders can easily create their own from templates and add them to the Store without needing coding skill.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div id="tooltip-root" style={{ position: "fixed", zIndex: 9999 }} />
        <div id="modal-root" style={{ zIndex: 9999 }} />
        <PlausibleProvider domain={env.isDemo ? "demo.apps.sismo.io" : "apps.sismo.io"}>
          <StyledComponentsRegistry>
            <Theme>
              <AppProviders>
                <PageContainer>
                  <Navbar />
                  <PageContent>{children}</PageContent>
                  <Footer />
                </PageContainer>
              </AppProviders>
            </Theme>
          </StyledComponentsRegistry>
        </PlausibleProvider>
      </body>
    </html>
  );
}
