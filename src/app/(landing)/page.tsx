
import Hero from "@/src/components/Hero";
import Spaces from "@/src/components/Spaces";
import { getSpacesConfigs } from "../../libs/spaces/getSpaces";

export default async function LandingPage() {
  const configs = await getSpacesConfigs();

  return (
    <main>
      <Hero />
      <Spaces configs={configs}/>
    </main>
  );
}
