import dynamic from "next/dynamic";
import Link from "next/link";

/*const ApexCoreChart = dynamic(
  () => import("./apexcorechart"),
  { ssr: false } // 👈 critical
);*/
let ApexCoreChart:any   = undefined;
const ACC = (async () => {   ApexCoreChart =   (await import(  './apexcorechart')).default;  } )();
let ReactStockChart:any   = undefined;
let ReactPresent:boolean = false;
const RS =  (async () => {   (  ReactStockChart = await import(  './reactstockchart')).default;  ReactPresent =true; } )();

export default function AboutPage() {
  const defaultP :any  =  Promise.resolve({slug : "IBM"}); //Default
  return (
    <div className="flex min-h-screen  justify-center bg-zinc-50 dark:bg-black">
      <div className="flex w-full max-w-6xl flex-col my-[45px]">
        {/* <ApexCoreChart />*/}
       {/*  {ReactPresent && (<ReactStockChart params={defaultP}/>)} */}
      </div>

       
    </div>
  );
}
