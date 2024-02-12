"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
      <>
       <div className='cover'>
        <img src="https://images.pexels.com/photos/4007744/pexels-photo-4007744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="cover" width={100} height={200} className='rounded'/>
        <div className='name'>Mukundan</div>
        <div className='follow'>1.5k followers</div>
        </div>

        <div className='profile '>
       <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile" width={100} height={200} />
        </div>
      
        <div className="navbar-block">
         <div className="navbar">
         <ul>
            <li className={pathname === "/albums" ? "active" : ""}>
              <Link href="/albums">Albums</Link>
            </li>
            <li className={pathname === "/posts" ? "active" : ""}>
              <Link href="/posts">Posts</Link>
            </li>
            <li className={pathname === "/photos" ? "active" : ""}>
              <Link href="/photos">Photos</Link>
            </li>
          </ul>
         </div>
        </div>
    </>

        {children}
      </body>
    </html>
  );
}
