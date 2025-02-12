import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
      <h1 className="h1-bold text-primary-100">Welcome To My Course </h1>
      <Link href='/about'>
      <h1 className="h2-bold">About </h1>
      </Link>
     
   </div>
  );
}
