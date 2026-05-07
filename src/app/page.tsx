import DonationSection from "@/components/DonationSection/DonationSection";
import FAQ from "@/components/FAQ/FAQ";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Stats></Stats>
      <FAQ></FAQ>
      <DonationSection></DonationSection>
    </div>
  );
}
