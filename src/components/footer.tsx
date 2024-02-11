import Image from "next/image"
const Footer = () => {
    return (
        <footer className="bg-orange-500 mt-40">
      <div className="container py-6 px-4 mx-auto">
        <div className="flex flex-wrap gap-14 md:justify-center">
          <div className="flex flex-wrap gap-8 md:gap-14 pt-2">
            <div>
              <div className="text-gray-300 font-bold text-sm mb-2">
                Resource
              </div>
            </div>
            <div>
              <div className="text-gray-300 font-bold text-sm mb-2">
                Company
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="text-gray-300 font-bold text-sm mb-2">Apply</div>
            </div>
            <div>
              <div className="text-gray-300 font-bold text-sm mb-2">Links</div>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
}

export default Footer