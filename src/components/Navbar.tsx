import Image from "next/image"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      
      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full"/>
      </div>
    </div>
  )
}

export default Navbar