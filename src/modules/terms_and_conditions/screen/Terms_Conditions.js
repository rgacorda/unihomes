import { BackgroundBeams } from "@/components/ui/background-beams";
import Terms from "../components/terms";

const Terms_Conditions = () => {
  const handleItemClick = (item) => {};

  return (
    <section className="dark:bg-black pt-[105px] md:p-8 md:pt-[100px] lg:pt-[30px] lg:p-16 h-full">
      <div className="lg:flex lg:justify-center">
        <Terms />
      </div>
      <BackgroundBeams />
    </section>
  );
};

export default Terms_Conditions;
