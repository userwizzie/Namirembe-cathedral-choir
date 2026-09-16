import Header from "../components/Header";
import Footer from "../components/Footer";
import { AudioProvider } from "../components/AudioPlayer";
import Breadcrumbs from "../components/Breadcrumbs";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AudioProvider><Header /><Breadcrumbs />{children}<Footer /></AudioProvider>;
}
