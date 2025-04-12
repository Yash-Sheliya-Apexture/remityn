import HeroSection from "./components/Hero/HeroSection";
import ProtectionSection from "./components/ProtectionSection";
import SecuritySection from "./components/SecuritySection";
import SocialTrustSection from "./components/SocialTrust";
import MissionSection from "./components/MissionSection";
import AppSection from "./components/AppSection";
import Principles from "./components/Principles";
import TransferMoney from "./components/TransferMoney"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProtectionSection />
      <SecuritySection />
      {/* <FlagSection /> */}
      <SocialTrustSection />
      <MissionSection />
      <Principles />
      <TransferMoney />
      <AppSection videoSrc="/videos/images_15b1d0d5d4e856086edfd8b3a335b405-tapestry-background.mp4" />
    </>
  );
}
