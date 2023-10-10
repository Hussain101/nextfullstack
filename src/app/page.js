import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
   <div>
     <p>
      you are at Home

     </p>
     <Link href={"/login"}>Login</Link>
   </div>
  )
}
