import Header from "../components/Header";
import Footer from "../components/Footer";
import { AudioProvider } from "../components/AudioPlayer";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AudioProvider><Header />{children}<Footer /></AudioProvider>;
}
