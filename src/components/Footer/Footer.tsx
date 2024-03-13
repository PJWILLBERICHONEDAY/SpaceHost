import Link from "next/link";
import { BiMessage, BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";

const Footer = () => {
    return ( 
    <footer className="mt-16">
        <div className="container mx-auto px-4 ">
            <Link href='/' className="font-black text-tertiary-dark">
                SpaceHost 
            </Link>
            <h4 className="font-semibold text-[40px] py-6">Contact</h4>

            <div className="flex flex-wrap gap-16 items-center justify-between">
                <div className="fles-1"> 
                <p>Mahapura</p>
                <div className="flex items-center py-4">
                    <BsFillSendFill/>
                    <p className="ml-2">codewithprakshat</p>
                    </div>

                    <div className="flex items-center ">
                    <BsTelephoneOutbound/>
                    <p className="ml-2">9352396652</p>
                    </div>

                    <div className="flex items-center py-4">
                    <BiMessageDetail/>
                    <p className="ml-2">codewithprakshat</p>
                    </div>
                </div>

                <div className="flex-1 md:text-right">
                    <p className="pb-4">Our Story </p>
                    <p className="pb-4">Get in Touch </p>
                    <p className="pb-4">Our privacy policy </p>
                    <p className="pb-4">Terms and servic es</p>
                    <p className="pb-4">customer Assistance</p>
                </div>

                 
          <div className='flex-1 md:text-right'>
            <p className='pb-4'>Sports facilities</p>
            <p className='pb-4'>Grounds</p>
            <p className='pb-4'>Auditorium</p>
            <p className='pb-4'>Hackathons</p>
            <p>Events</p>      
                </div>
            </div>
        </div>

        <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0' />
    </footer> );
}
 
export default Footer
