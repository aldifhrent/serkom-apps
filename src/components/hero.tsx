import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex items-center justify-around p-12 h-[500px] bg-slate-100">
      <div className="flex flex-col gap-y-4">
        <h1 className="max-w-lg text-6xl font-bold">
          Unlock Your Future: Scholarships for Success
        </h1>
        <Link href={"/sign-up"}>
          <Button className="w-24">Sign up</Button>
        </Link>
      </div>
      <div>
        <Image src="/hero.png" alt="Hero Image" width={440} height={440}/>
      </div>
    </div>
  );
};

export default Hero;
