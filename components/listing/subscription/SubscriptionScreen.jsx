import React from 'react';
import { useEffect, useState } from "react";
import { motion, AnimatePresence  , useMotionValue, useTransform } from 'framer-motion';
import { Check, X, ShieldCheck, Diamond, Star } from 'lucide-react';
import {   CheckCircle, Minus, Plus } from "lucide-react";
import {  Clock, Zap, Shield, Info } from 'lucide-react';
import {StorageUtils} from "@/libs/cache";
import {CommonConstants} from "@/utils/constants";
import { useDispatch, useSelector   } from "react-redux";
 import { completeKyc as forwardKyc } from "./completeKyc.action";
import SubscribeSwipeButton from '../../../app/SubscribeSwipeButton';
import MountStartVerification  from './MountStartVerification';

 import   useIsMobile   from "../tradeGrid/useIsMobile";
 import { useModal } from '@/providers/ModalProvider';
//import VroomSwipeButton from '../../../app/VroomSwipeButton';
const SubscriptionScreen = () => {
   const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const sheet = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { y: "100%" },
};

const firstNameRegex = /^[A-Za-z ]{2,30}$/;
const lastNameRegex  = /^[A-Za-z\s'-]{1,30}$/;
const emailRegex     = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const dobRegex       = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
 const phonePattern = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

  const userKyc = { 
        firstName:'',
        lastName:'',
        email:'',
        dob:'',
        mobileNumber:'',

  }
  const userError  = { 
           firstError:'',
        lastError:'',
        emailError:'',
        dobError:'',
        mobileNumberError:'',
  }
const [errors, setErrors] = useState({
  firstError: "",
  lastError: "",
  emailError: "",
  dobError: "",
  mobileNumberError: "",
});
   const [firstName , setFirstName ] = useState('');
   const [lastName , setLastName ] = useState('');
   const [email , setEmail ] = useState('');
   const [dob , setDob ] = useState('');
   const [mobileNumber, setMobileNumber ] = useState('');

  const [currentUser , setCurrentUser ] = useState(userKyc);
  const [errorUser , setErrorUser ] = useState(userError);

const [completeKYC, setCompleteKYC] = useState(false);
const [mountKYC, setMountKYC] = useState(false);
const [clientDetails, setClientDetails] = useState({"id":"","type":"person","email":"",
               "personDetails":{"firstName":"","lastName":"","dob":""},
        "updatedAt":"","createdAt":"","token": ""} );  // id: 69c904eeaddd2f00020565c4 ,  "updatedAt":"2026-03-29T10:54:38.358Z","createdAt":"2026-03-29T10:54:38.358Z"
//const [mountKYC, setMountKYC] = useState(false); 
//const [mountKYC, setMountKYC] = useState(false);


const [isGuestUser, setGuestUser] = useState(true);
const [cancelled, setCancelled] = useState(false);
const [showComplyCubeModal, setShowComplyCubeModal] = useState(false);
const [showClientIdGeneratedModal, setShowClientIdGeneratedModal] = useState(false);
 const { showFramerModal, hideModal } = useModal();
  const dispatch = useDispatch();

// Convert dd-mm-yyyy → yyyy-mm-dd (for input value)
const convertToISO = (date) => {
  if (!date) return "";
  const [dd, mm, yyyy] = date.split("-");
  return `${yyyy}-${mm}-${dd}`;
};

// Convert yyyy-mm-dd → dd-mm-yyyy (for storage/display)
const convertToDDMMYYYY = (date) => {
  if (!date) return "";
  const [yyyy, mm, dd] = date.split("-");
  return `${dd}-${mm}-${yyyy}`;
};
    const isMobile = useIsMobile();

  const features = [
    "Indices Websocket streaming",
    "Market Status",
    "Indices Option-chain",
    "Positions/ Trade Book",
    "Stocks Charts"
  ];
  // "#f1f17c"
  const plans = [
    { name: "Basic", price: "Free", checks: [true, true, false, false, false], accent: "#f5a254" },
    { name: "Premium", price: "₹999", checks: [true, true, true, true, false], accent: "#f00f22", popular: true },
    { name: "AI Advanced", price: "₹2499", checks: [true, true, true, true, true], accent: "#070ac2" }
  ];
const handleCompleteKYC = (e) => {
    // check if free plan and complete kyc clicked 
    let isCompleteKyc = e.target.value;
    if(isCompleteKyc === 'Complete KYC'){

         setCompleteKYC(true);
          setShowComplyCubeModal(true);

    }

}
const mountStartVerify = (mountVerification , clientObj) => { 

            if(mountVerification){

                      setMountKYC(mountVerification ); //(stKyc)  => ( !stKyc)
                     setClientDetails((doneKyc)  => ( { ...doneKyc , ...clientObj}));


            }

}
const handleMobileCompleteKYC = (e )=> {


}
const handleProceedKYC  = (e) => {
     let hasError = false;
     e.preventDefault();
     Object.entries(currentUser).forEach(([key, value]) => {
    if (value  ) {
       if(value.trim() !== "" && (currentUser !==undefined && currentUser !==null) ){
         
          
          if   (    (currentUser.firstName !=="" ) && !firstNameRegex.test(currentUser.firstName)) {
            console.log("Invalid First Name");
                  setErrors((prev) => ({
                    ...prev,
                    firstError: "Invalid First Name"
                  }));
                     hasError = true;
          }
            if   (    (currentUser.lastName!=="" ) && !firstNameRegex.test(currentUser.lastName)) {
            console.log("Invalid Last Name");
                  setErrors((prev) => ({
                    ...prev,
                    firstError: "Invalid Last Name"
                  }));
                     hasError = true;
          }

          if ( (currentUser.email !=="" ) &&  !emailRegex.test(currentUser.email)) {
            console.log("Invalid Email");
                 setErrors((prev) => ({
                    ...prev,
                    emailError: "Invalid email"
                  }));
                     hasError = true;
          }
            if ( (currentUser.mobileNumber !=="" ) &&  !phonePattern.test(currentUser.mobileNumber)) {
            console.log("Invalid Mobile");
                 setErrors((prev) => ({
                    ...prev,
                    mobileNumberError: "Invalid Mobile"
                  })); 
                       hasError = true;
          }

          if ( (currentUser.dob !=="" ) && !dobRegex.test(currentUser.dob)) {
            console.log("Invalid DOB");
                setErrors((prev) => ({
                  ...prev,
                  dobError: "Invalid Dob"
                }));
                   hasError = true;

          }
       }
   

      // Call respective setter dynamically
     /* if (errorSetters[key]) {
        errorSetters[key](value);
      }*/
    }
  });




 /* let hasError = false;

  Object.entries(userError).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      hasError = true;

      // Call respective setter dynamically
      if (errorSetters[key]) {
        errorSetters[key](value);
      }
    }
  });

  // 🚫 Stop submission if any error exists
  if (hasError) {
    return;
  }*/
    if (!hasError){
        // CLEAR the previous errors 
        setErrors(
            Object.keys(errors).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {})
      
      );   hasError = false;
    }
   // ONCE error found RESET above is not working so commented 
 /* Object.entries(errors).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
        console.log(" key "+key+" value "+value)
      hasError = true;
    }
  });*/
      //CLEAR the errors 

  if (hasError) return;

  // ✅ Continue if no errors
  console.log("Proceeding with KYC...");


              let idCurrentUser = { _id : Math.floor(Math.random() * 9000000000) + 1000000000}; 
                           let newCurrent = { ...idCurrentUser , ...currentUser }
                       StorageUtils._save(CommonConstants.recentKycExclusive, JSON.stringify(newCurrent));
                showFramerModal({ 
                   status: 'initiating', 
                    message: `KYC for  ${firstName} ${lastName}...` 
              });           
                dispatch(forwardKyc({ _id: '' , firstName: firstName, lastName: lastName , email:email, typeOfEnity : 'person' , dob: dob, showFramerModal , hideModal , mountStartVerify  }));
              // display the GUEST USER screen after submission to backen to verifiy 
                setTimeout( () => { setShowComplyCubeModal(false) } , 400);
                 // CHECK USER LOGGED IN 


         /*  const res1 = StorageUtils._retrieve(CommonConstants.fyersToken);
            if (res1.isValid && res1.data !== null &&  res1.data !== undefined) {
                        let idCurrentUser = { _id : Math.floor(Math.random() * 9000000000) + 1000000000}; 
                           let newCurrent = { ...idCurrentUser , ...currentUser }
                       StorageUtils._save(CommonConstants.recentKycExclusive, JSON.stringify(newCurrent));
                         
                              dispatch(completeKYC({ _id: '' , firstName: firstName, lastName: lastName , email:email, typeOfEnity : 'person' , dob: dob, showFramerModal , hideModal  }));
            }
           else {
                            // Show Time out User Loging Required 
                    console.log("User not Logged in ");
                      showFramerModal({ 
                          status: 'Verify', 
                          message: `User not Logged in ...` 
                        }); 
                  setTimeout(() => {
                        hideModal();
                      // setShowModal(false);
                  }, 2000);
            } */


}
const GoldBarIcon = ({ size = 26 }) => (
  <svg
    width={size}
     height={(size * 50) / 64}   // 👈 increase height ratio
    viewBox="0 0 64 40"
    className="drop-shadow-[0_3px_10px_rgba(255,215,0,0.7)]"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff6b7" />
        <stop offset="40%" stopColor="#f7f2e2" />
        <stop offset="70%" stopColor="#f7f0db" />
        <stop offset="100%" stopColor="#f7e1d0" />
      </linearGradient>  {/*"#facc15"  "#eab308" "#b45309" */}
    </defs>

    {/* Main bar */}
    <rect
      x="2"
      y="6"
      width="60"
      height="28"
      rx="8"
      fill="url(#goldGradient)"
    />

    {/* Shine rgba(255, 255, 255, 0.35) */}
    <rect
      x="6"
      y="8"
      width="52"
      height="8"
      rx="4"
      fill={!isMobile ? "rgb(91, 158, 245)": "#ffff"}
    />

    {/* DEMO text #7c5a00 #abf5cc*/}
    <text
      x="50%"
      y="60%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={!isMobile ? "21": "20"}
      fill={!isMobile ? "#f7eac9": "#e7c51b"}
      fontWeight="bold"
      letterSpacing="1"
    >
      DEMO
    </text>
  </svg>
);

// [#0f172a] 
  return (
    <div className="min-h-screen bg--gray-100 text-slate-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          {/* <h1 className="text-3xl md:text-5xl font-extrabold rounded-full  bg-blue-600 hover:bg-blue-700 text-white mb-4">Choose Your Edge</h1>*/ } 
            <SubscribeSwipeButton />
            {/*<VroomSwipeButton/> */}

          <p className="bg-blue-100 rounded-full text-green-900 max-w-2xl mx-auto">Elevate your trading with real-time data and AI-driven insights.</p>
        </div>

        {/* Main Grid: Responsive Stack to 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0">
          
          {/* Feature Titles (Hidden on small mobile, shown as a side-bar on desktop)bg-[#1e293b]/50 */}
          <div className="hidden lg:block lg:col-span-3 mt-[180px] bg-green-500 rounded-l-2xl border-y border-l border-slate-700">
            {features.map((f, i) => (
              <div key={i} className="h-16 flex items-center px-6  text-yellow-300 text-[24px]  font-semibold border-b border-slate-700 last:border-0">
                {f}
              </div>
            ))}
          </div>

          {/* Pricing Cards bg-[#1e293b]*/}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-0">
            {plans.map((plan, pIdx) => (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pIdx * 0.1 }}
                className={`relative flex flex-col bg-blue-400 border border-slate-700 p-6 
                  ${plan.popular ? 'lg:scale-105 lg:z-10 border-amber-500 shadow-2xl shadow-amber-500/10' : ''} 
                  ${pIdx === 0 ? 'lg:rounded-l-none lg:rounded-r-none' : ''}
                  ${pIdx === 2 ? 'lg:rounded-r-2xl' : ''}
                  rounded-2xl lg:rounded-none`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    Recommended
                  </span>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2" style={{ color: plan.accent }}>{plan.name}</h3>
                  <div className="text-4xl font-black text-white">{plan.price}<span className="text-xl text-blue-900 font-normal">/mo</span></div>
                </div>

                {/* Mobile Feature List (Only shows on small screens)
                <div className="lg:hidden mb-6">
                  {features.map((f, fIdx) => (
                    <div key={fIdx} className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-xs text-[23px]  font-bold  text-yellow-300 ">{f}</span>
                      {plan.checks[fIdx] ? <Check size={16} className="bg-amber-100 rounded-full text-green-400" /> : <X size={16} className="bg-amber-100 rounded-full text-slate-600" />}
                    </div>
                  ))}
                </div> */}
                <div className="lg:hidden mb-6">
                    {features.map((f, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex justify-between items-center py-2 border-b border-slate-700/50"
                      >
                        <span className="text-xs text-[23px] font-bold text-yellow-300">
                          {f}
                        </span>

                        {plan.checks[fIdx] ? (
                          <Check size={16} className="bg-amber-100 rounded-full text-green-400" />
                        ) : plan.name === "Basic" ? (  
                          <GoldBarIcon size={43} />  
                        ) : (
                          <X size={16} className="bg-amber-100 rounded-full text-slate-600" />
                        )}
                      </div>
                    ))}
                  </div>



                {/* Desktop Checkmarks (Hidden on mobile)
                <div className="hidden lg:block">
                  {plan.checks.map((check, cIdx) => (
                    <div key={cIdx} className="h-16 flex justify-center items-center border-b border-slate-700 last:border-0">
                      {check ? <ShieldCheck fill={plan.accent} size={22} className="text-[#0f172a]" /> : <X size={20} className="text-slate-600" />}
                    </div>
                  ))}
                </div> */}
                  <div className="hidden lg:block">
                      {plan.checks.map((check, cIdx) => (
                        <div
                          key={cIdx}
                          className="min-h-[80px] flex justify-center items-center border-b border-slate-700 last:border-0"
                        >
                          {check ? (
                            <ShieldCheck fill={plan.accent} size={26} className="text-[#0f172a]" />
                          ) : plan.name === "Basic" ? (   <div className="flex items-center justify-center w-full h-full">
                            <GoldBarIcon size={42} />   </div>
                          ) : (
                            <X size={24} className="text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>



                <button className="mt-8 w-full py-3 rounded-lg font-bold transition-all hover:brightness-110 active:scale-95" 
                  onClick={ !isMobile ? (e) => handleCompleteKYC( e)
                   : ( e)=> {handleMobileCompleteKYC(e) }
                }
                        style={{ backgroundColor: plan.accent, color: plan.name === 'Premium' ? '#000' : '#fff' }}
                        value={plan.name==="Basic" ? "Complete KYC" : "Upgrade Now"}
                        
                        >
                 { plan.name==="Basic" ? "Complete KYC" : "Upgrade Now"} 
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
           {/** ComplyCube button modal dialog after below Add client validation and Proceed click  */}
                <AnimatePresence> 
           {(showClientIdGeneratedModal && completeKYC)   && (<> 
                      <div id="complycube-mount"></div>
                      
                      <button onClick="startVerification()">
                      Start verification
                      </button>
                 </>
              
           )}  
           </AnimatePresence>
                {/* this is to show the modal with the client already registered or a modal aksing for the ComplyCube Add Client details  */}

                <AnimatePresence>
        {(showComplyCubeModal && completeKYC)   && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
            onClick={() => {return true;}/*setShowComplyCubeModal(false)*/ }
          >
            <motion.div
              variants={sheet}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => { e.stopPropagation();/*  setSelectedSymbol(positionSymbol) */ } }
              className="bg-white w-full md:w-[400px] rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Comply Cube KYC </h2>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Quick KYC </p>
                </div>
                <button 
                  onClick={() => {  /*setShowComplyCubeModal(false);  setCancelled(true); setIsVisible(false);*/  setCancelled(old => { setShowComplyCubeModal(false);
                               /* StorageUtils._save(CommonConstants.cancelOrderDialogClosed, true); */  return true;
                              }); } }
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-5 space-y-5 max-h-[85vh] overflow-y-auto">
                
                {/* Symbol Selection - Horizontal Scroll 
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-tight">Select Instrument</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {symbolArray.map((symbol) => (
                      <button
                        key={symbol}
                        onClick={() => setSelectedSymbol(symbol)}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all whitespace-nowrap
                          ${selectedSymbol === symbol 
                            ? "border-red-500 bg-red-50 text-red-600" 
                            : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"}`}
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>
                </div>*/}

                {/* Toggle Group: Market/Limit & Product Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tight">Client Type</label>
                   {/*  <div className="flex bg-gray-100 p-1 rounded-lg">
                      {['Market', 'Limit'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setOrderType(t)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${orderType === t ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div> */}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tight"> Guest User  </label>
                  
                  </div>
                {/*<div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tight">Product</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      {['MARGIN', 'CNC'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setProductMode(p)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${productMode === p ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div> */}  
                </div>

                {/*  First Name  */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <Zap size={14} className="text-orange-400"/> First Name 
                    </label>
                    <span className="text-sm font-mono  font-bold text-gray-800">  </span>
                      <input
                    type="text"
                    pattern="([a-zA-Z]{3,30}\s*)+"
                    placeholder='e.g. Juiles Bayer'
                    value={currentUser.firstName}
                    onChange={(e) =>  {  let fnIn = e.target.value;  setFirstName(fn => {  fn =fnIn; return fn;  } ); setCurrentUser ( usr => { usr.firstName = fnIn; 
                          return usr;
                     }) } }
                     onBlur= { (e) => {  let fnIn = e.target.value;  setFirstName(fn => {  fn =fnIn; return fn;  } ); setCurrentUser ( usr => { usr.firstName = fnIn; 
                          return usr;
                     }); setErrors((prev) => ({...prev,  firstError: "" })); 
                    
                    }}
                    className="w-full h-4.5 bg-white-200 text-xl font-bold text-green-400 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />
                  </div>
                  {/*<input
                    type="range"
                    min="0"
                    step={lotSize}
                    max={boughtQty }
                    value={positionQty}
                    onChange={(e) => setPositionQty(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />*/}
                  <div className="flex justify-between text-[10px] text-red-400 font-medium">
                    {errors.firstError && <p>{errors.firstError}</p>}
                    {/*<span>0</span>
                    <span>Max: {boughtQty }</span> */}
                  </div>
                </div>
               {/*  Last Name  */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <Zap size={14} className="text-orange-400"/> Last Name 
                    </label>
                    <span className="text-sm font-mono  font-bold text-gray-800">  </span>
                      <input
                    type="text"
                     pattern='[a-zA-Z]{3,30}'
                    placeholder='e.g. Juiles Bayer'
                    value={currentUser.lastName}
                    onChange={(e) =>  {  let lsIn = e.target.value;   setLastName( ls => {ls = lsIn ; return ls;  } ); 
                           setCurrentUser ( usr => { usr.lastName = lsIn; 
                          return usr;
                     }); setErrors((prev) => ({...prev,  lastError: "" })); 
                     } }
                    className="w-full h-4.5 bg-white-200 text-xl font-bold  text-green-400 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />
                  </div>
                  
                  {/*<input
                    type="range"
                    min="0"
                    step={lotSize}
                    max={boughtQty }
                    value={positionQty}
                    onChange={(e) => setPositionQty(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />*/}
                  <div className="flex justify-between text-[10px] text-red-400 font-medium">
                    {errors.lastError && <p>{errors.lastError}</p>}
                    {/*<span>0</span>
                    <span>Max: {boughtQty }</span>*/}
                  </div>
                </div>       

                       {/*  Email   */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <Zap size={14} className="text-orange-400"/> Email
                    </label>
                    <span className="text-sm font-mono  font-bold text-gray-800">  </span>
                      <input
                    type="text"
                   
                    placeholder='e.g. pereie@xyx.com'
                    value={currentUser.email}
                    onChange={(e) =>  {  let lsIn = e.target.value;   setEmail( ls => {ls = lsIn ; return ls;  } ); 
                           setCurrentUser ( (usr) => ({ ...usr,
                         email: lsIn 
                     })); setErrors((prev) => ({...prev,  emailError: "" })); 
                      }}
                    className="w-full h-4.5 bg-white-200 text-xl font-bold  text-green-400 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />
                  </div>
                  
                  {/*<input
                    type="range"
                    min="0"
                    step={lotSize}
                    max={boughtQty }
                    value={positionQty}
                    onChange={(e) => setPositionQty(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />*/}
                  <div className="flex justify-between text-[10px] text-red-400 font-medium">
                    {errors.emailError && <p>{errors.emailError}</p>}
                    {/*<span>0</span>
                    <span>Max: {boughtQty }</span>*/}
                  </div>
                </div>       
                                {/*  DOB    */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <Zap size={14} className="text-orange-400"/> Date Birth
                    </label>
                    <span className="text-sm font-mono  font-bold text-gray-800">  </span>
                      <input
                     type="date"
                     pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}"
                    placeholder='e.g. 11-12-2026'
                    value={currentUser.dob ? convertToISO(currentUser.dob) : ""}
                    onChange={(e) =>  {  const formatted = convertToDDMMYYYY(e.target.value);  setDob(formatted);
                           setCurrentUser ( (usr) => ({ ...usr,
                         dob: formatted 
                     })); setErrors((prev) => ({...prev,  dobError: "" })); 
                      }}
                    className="w-full h-4.5 bg-white-200 text-xl font-bold  text-green-400 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />
                  </div>
                  
                  {/*<input
                    type="range"
                    min="0"
                    step={lotSize}
                    max={boughtQty }
                    value={positionQty}
                    onChange={(e) => setPositionQty(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />*/}
                  <div className="flex justify-between text-[10px] text-red-400 font-medium">
                    {errors.dobError && <p>{errors.dobError}</p>}
                    {/*<span>0</span>
                    <span>Max: {boughtQty }</span>*/}
                  </div>
                </div>       




                {/* Mobile Number  */}
                <div className={`space-y-3 p-4 rounded-xl border transition-all ${isGuestUser ? 'opacity-40 bg-gray-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <Shield size={14} className="text-blue-400"/>Mobile Number
                    </label>
                    <span className="text-sm font-mono  font-bold text-gray-800">{isGuestUser   ? '---' : +91 }</span>

                       <input
                    type="tel"
                     pattern="^(\+91[\-\s]?)?[0]?[6789]\d{9}$"
                   placeholder="e.g., +919876543210 or 9876543210"
                    value={currentUser.mobileNumber}
                    onChange={(e) =>   {  let mIn = e.target.value;   setMobileNumber(mN => {mN = mIn; return mN;  }); 
                                setCurrentUser ( usr => { usr.mobileNumber = mIn; 
                             return usr;
                          }); setErrors((prev) => ({...prev,  mobileNumberError: "" })); 

                       } }
                    className="w-full h-4.5 bg-white-200 text-xl font-bold text-green-800  rounded-lg mobile-margin-qty appearance-none cursor-pointer accent-red-500"
                  />
                  </div>
                   <div className="flex justify-between text-[10px] text-red-400 font-medium">  
                   {errors.mobileNumberError && <p>{errors.mobileNumberError}</p>}</div>
                  {/* <input
                    type="range"
                    disabled={orderType === 'Market'}
                    min="0"
                    step="0.05"
                    max={1000}
                    value={positionPrice}
                    onChange={(e) => setPositionPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 mobile-margin-price rounded-lg appearance-none cursor-pointer accent-red-500"
                  /> */}
                </div>

                {/* Scheduled Checkbox / Toggle 
                <div 
                  onClick={() => setIsScheduled(!isScheduled)}
                  className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100 cursor-pointer transition-colors hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isScheduled ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900">Schedule Order</p>
                      <p className="text-[10px] text-blue-600 font-medium">Execute at market open</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${isScheduled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isScheduled ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>*/}

                {/* Summary Info 
                <div className="flex items-start gap-2 text-[11px] text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  <p>Approx. transaction value will be <span className="font-bold text-gray-700">₹ {(positionQty * positionPrice).toLocaleString()}</span>. Charges are applicable as per your plan.</p>
                </div>*/}

                {/* Final Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={(e) => { handleProceedKYC(e); /* setShowComplyCubeModal(false);  setIsVisible(false); */ setCancelled(old => { 
                                /*StorageUtils._save(CommonConstants.cancelOrderDialogClosed, true); */  return true;
                              }); 
                              } }
                    className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                  >
                  Proceed KYC
                  </button>
                  <button     onClick={ async () =>  {   setCancelled(old => {  setShowComplyCubeModal(false); 
                                /*StorageUtils._save(CommonConstants.cancelOrderDialogClosed, true); */  return true;
                              });  /*  await dispatch(placeQuickCancelOrder(cancelOrderId));  setShowSymbolModal(false);*/ 
                              /* handleCancel(cancelOrderId);  setShowSymbolModal(false); */
                              
                              } }
                    disabled={!isGuestUser }
                    className={`flex-[2] py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-red-200 transition-all active:scale-95
                      ${!isGuestUser ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    <CheckCircle size={18} />
                   Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
            <MountStartVerification
              token={clientDetails.token}
              isOpen={mountKYC}
              onClose={() => setMountKYC(false)}/>



    </div>
  );
};

export default SubscriptionScreen;
