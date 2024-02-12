import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-40 flex bg-slate-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-14 md:justify-center">
          <div className="flex flex-wrap gap-8 pt-2 md:gap-14">
            <div className="flex items-center gap-y-4 justify-between">
              <h1 className="font-semibold mt-4 text-xl ">© Copyright 2024</h1>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
