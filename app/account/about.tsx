 import Link from "next/link";
 import dynamic from "next/dynamic";
import React ,  { useEffect } from 'react';
const  ApexCoreChart = dynamic(
  () => import("./apexcorechart"),
  { ssr: false }
);

export default function about({defaultchart = {} }) {

return (
    <div className="flex min-h-screen items-start justify-start bg-zinc-50 font-sans dark:bg-black">
     
         <div  className="flex w-full max-w-3xl flex-col my-[45px] ">
                {/*<div id="chart">
             
                </div>*/}   <ApexCoreChart/>
          </div>  <button type="button" > 
            <Link href={`/`}>
                  Back 
            </Link></button>
            <div> 
               
            </div>
    </div>
  );
}
export async function getStaticPaths(){
    
}
export async function getStaticProps({ params  = {} }){

    const res:any = await Promise.resolve( {params});

  return { props : params};
}