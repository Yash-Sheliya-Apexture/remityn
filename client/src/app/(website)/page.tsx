import HeroSection from "./components/Hero/HeroSection";
import ProtectionSection from "./components/ProtectionSection";
import SecuritySection from "./components/SecuritySection";
import SocialTrustSection from "./components/SocialTrust";
import MissionSection from "./components/MissionSection";
import Principles from "./components/Principles";
import TransferMoney from "./components/TransferMoney";
import Faq from "./components/Faq";
import StepSendmoney from "./components/StepSendmoney";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProtectionSection />
      <SecuritySection />
      <SocialTrustSection />
      <MissionSection />
      <Principles />
      <TransferMoney />
      <Faq />
    </>
  );
}
