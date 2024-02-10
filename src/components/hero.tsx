import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex justify-between p-24">
      <div className="flex flex-col gap-y-4">
        <h1 className="max-w-lg text-5xl font-bold">
          Free Join Scholarship with us
        </h1>
        <Link href={"/sign-up"}>
          <Button size={"sm"}>Sign up Beasiswa</Button>
        </Link>
      </div>
      <div>
        Image in here
      </div>
    </div>
  );
};

export default Hero;
