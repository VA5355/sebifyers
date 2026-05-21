import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Copy, Eye, EyeOff, CheckCircle2, 
  AlertCircle, ArrowRight, Server, Key 
} from 'lucide-react';
import { selectPaymentData } from '../redux/slices/paymentSlice';
import { activateVirtualAccount } from '../redux/slices/virtualAccountSlice';
import {
  saveVirtualCredentials , loadVirtualCredentials
} from "@/utils/virtualAccountStorage";
import { showModal as modalShow, showError } from '@/components/common/service/ModalService';
 import { useModal } from '@/providers/ModalProvider';
 import {StorageUtils} from "@/libs/cache";
import {CommonConstants, isNullOrUndefined,environment} from "@/utils/constants";
import { sendTradingInviteEmail } from "@/utils/emailInviteApi";
// usually shoould not include service propogation from Modals as they stall session and can cause breaks 
import {changeTab} from '@/redux/slices/miscSlice';
import { useVirtualAccountContext } from './useVirtualAccountContext';


const RefinedVirtualAccountModalImproved = ({ isOpen=true, onClose  = () => {handleClose() } , onConfirm = () => {handleConfirm() } }) => {
    const dispatch = useDispatch();
     const router = useRouter();
  const [credentials, setCredentials] = useState({ vId: '', vPass: '', salt: '' });
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [virtualAccountDone, setVirtualAccountDone] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(isOpen);
const { confirmActivation } = useVirtualAccountContext();
  const paymentData = useSelector(selectPaymentData);
       const { showFramerModal, hideModal } = useModal();
   const [inviteEmail, setInviteEmail] = useState("");
const [inviteSent, setInviteSent] = useState(false);
const [sendingInvite, setSendingInvite] = useState(false);
     
  let spinnerIsAvailable = false;
  let spinnerEmailIsAvailable = false;
   const MENUEDUCATE = 'Educate'

   
  // Mocking the Redux selector logic inside useEffect for the generation logic
  useEffect(() => {
    if (isModalOpen) {
      // Logic based on your provided order data example
              /*
          razorpayorder = {
          orderType : "",   // razor or gpaydirect (by scanning )
          amt:   "" , // "1",
          

            cur: "" , // "INR",
          recpt: "" , //  "razor_receipt_2026-03-04 18:04:44  ",
            n1:"en-IN",
          n2:"Life time subscription virtual tradning @onedinaar.com  ",
          show : true,
            amount: '',
            amount_due: '',
          amount_paid: '', 
          created_at : '', 
          currency : '', 
          id: '', 
          notes : { 
            key1 : "",
            key2 : "", 

          }, 
          offer_id : '', 
          receipt: '', 
          status : '', 


        }
        */
      let  razorPayOrder =  StorageUtils._retrieve('razorpayorder_recent');
          razorPayOrder = razorPayOrder.data;
        if(!isNullOrUndefined( paymentData)  && !isNullOrUndefined( paymentData.order ) || (!isNullOrUndefined(razorPayOrder)) ){
          console.log(`order data ${JSON.stringify(razorPayOrder)}`);
      const orderId =  razorPayOrder.id ??  paymentData?.order?.id     // "order_ShHjKtA45C4T3u"; 
      const receiptId = razorPayOrder.receipt ?? paymentData?. order?.receipt  // "razor_receipt_2026-03-05 15:04:31";

      try {
        // 1. Extract parts
        const partAfterUnderScore = orderId.split('_')[1]; // ShHjKtA45C4T3u
        const datePart = receiptId.match(/\d{4}-\d{2}-\d{2}/)[0]; // 2026-03-05
        const timePart = receiptId.trim().slice(-8).replace(/:/g, ''); // 150431

        // 2. Generate gVirtualId: reverse of orderPart + date (no dashes)
        const reversedPart = partAfterUnderScore.split('').reverse().join('');
        const gVirtualId = `VT_${reversedPart}_${datePart.replace(/-/g, '')}`;

        // 3. Generate gSalt: (date numbers sum + 15) + timePart
        // Simplified sum logic for date: 2026+03+05 = 2034
        const dateSum = datePart.split('-').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const gSalt = `${dateSum + 15}${timePart}`;

        // 4. Generate gVirtualPass
        const gVirtualPass = `${partAfterUnderScore}${gSalt}`;

        setCredentials({ vId: gVirtualId, vPass: gVirtualPass, salt: gSalt });
      } catch (err) {
        console.error("Credential Generation Failed", err);
      }
    }
    else {
        console.log("Payment Data not avaliable ...");
        console.log("Virtual Account creationg not possible...");
        setIsModalOpen(false);
    } 
    }
  }, [isModalOpen]);
  const handleClose = () => {
      setIsModalOpen(false);
  };
  const virtualDirectHome = () => {
        dispatch(changeTab(MENUEDUCATE));
         router.push(`/`);
  };

  const handleConfirm = async () => {
//      console.log(credentials);
      // save
      // dispatch
      // api call
      // websocket
      // redirect
//    setIsModalOpen(false);
 //      onConfirm(credentials)
   try {
        console.log("Activating Virtual Account...", credentials);
       showFramerModal({ 
              status: 'loading', 
              message: ` Initiating Virtual Account ... ` 
              }); 
            spinnerIsAvailable = true;

      // localStorage.setItem("virtualAccountCredentials",JSON.stringify(credentials)  );
        /*          2 + 3. DISPATCH + API CALL          Happens inside confirmActivation()        */
        const result = await confirmActivation(credentials);
        console.log("Activation Result", result);
                (spinnerIsAvailable ?   setTimeout( () => { hideModal() 
                                         spinnerIsAvailable =false;
                                     } , 300): console.log("Spinner unavailavle to close ") ) ; 

        /*          FAILURE        */
        if (!result.success) {
            console.error(result.error);
              dispatch(modalShow({ title: 'Virtual Account Status', message: `${result.message ||  result.error || 'Virtual Account Activation Failed...'} `, }  ));
              /*showFramerModal({ 
              status: 'Virtual Account ', 
              message: `${result.message ||  result.error || 'Virtual Account Activation Failed...'} ` 
              }); 
            spinnerIsAvailable = true;*/
          //  alert(result.message ||  result.error || "Virtual Account Activation Failed" );
            return;
        }
         /* 1. SAVE LOCALLY   */
        await saveVirtualCredentials(credentials);

        const creds = await loadVirtualCredentials();

        /*          OPTIONAL:          save backend rsponse        */
         localStorage.setItem( "virtualAccountUser",          JSON.stringify(result.data)       );
         if(result.success){ 

        
         showFramerModal({ 
              status: 'loading', 
              message: ` Creating Virtual Account ... ` 
              }); 
            spinnerIsAvailable = true; 

            (spinnerIsAvailable ?   setTimeout( () => { hideModal() 
                                         spinnerIsAvailable =false;
                // ask for KYC Email to send the invitation link 



                                     } , 300): console.log("Spinner unavailavle to close ") ) ;  
        }
        /*          OPTIONAL WEBSOCKET          Can safely skip for now        */
        // socket.emit("virtual-account-created", result.data);
        /*          CLOSE MODAL        */
        setIsModalOpen(false);
        setVirtualAccountDone(true)
        /*          5. REDIRECT        */
        //window.location.href = "/trade";
                /*          OR NEXT ROUTER        */
        // router.push("/trade");

    } catch (err) {

        console.error("Virtual Account Activation Error", err);

        alert("Something went wrong during activation.");
    }




  };

  const sendTradingInvite = async () => {
    if (!inviteEmail || !inviteEmail.includes("@")) {
       // alert("Please enter valid email");
        dispatch(modalShow({ title: 'Invite Email', message: `Virtual Account Activation Needs a valid Email Address `, }  ));
        return;
    }

    try {
        setSendingInvite(true);
         showFramerModal({ 
              status: 'loading', 
              message: `Invitation prepare ... ` 
              }); 
            spinnerEmailIsAvailable = true;

              
        // API CALL HERE
        // await axios.post("/api/sendinvite", { email: inviteEmail });
          let email1 = inviteEmail
        const body=JSON.stringify({email : email1});
        console.log("email  "+body);
     /*  const headers =   new HttpHeaders({ 'Content-Type': 'application/json' ,  
             'Authorization': 'text/plain'}); */
         
            let lU = environment.netlifyBackend.urlVerify;
              //  let netlifyUrl = `/.netlify/functions/netlifyproxyawsapigateway?remoteUrl=${lU}`;
            //  netlifyUrl += `&payLoad=${body}`;
            // OLD Auth 
            // let netlifyUrl = "/.netlify/functions/netlifyproxygoogleauth";
            // New Google Apps Password based 
            let netlifyUrl = "/.netlify/functions/netlifyproxyemailverify"+lU+"/write";
            if(!environment.production || window.location.href.indexOf('192') > -1){
              // FOR NETLIFY DEV 
              netlifyUrl = "https://192.168.1.2:8888"+netlifyUrl
              // netlifyUrl = "https://localhost:8888"+netlifyUrl
              // FOR NETLIFY Functions:serve this CORS not WORKS
              // netlifyUrl = "http://localhost:9999"+netlifyUrl
            }
          // OLD AUTH 
          //  let postB = {  remoteUrl : lU , payLoad: body };
           let pos= body; //{  remoteUrl : lU , payLoad: body };
           
              const result = await sendTradingInviteEmail({
                  email: inviteEmail,
                  virtualId: credentials.vId,
                  platform: "virtual",
                  inviteType: "trading"
              });

              console.log(result);
 (spinnerEmailIsAvailable ?   setTimeout( () => { hideModal() 
                                         spinnerIsAvailable =false;
                                     } , 300): console.log("Spinner unavailavle to close ") ) ; 
              if (result.success) {

                  dispatch(modalShow({title: 'Invite Email Status ', message: "Invite sent successfully" }  ));

              } else {

                 dispatch(modalShow({title: 'Invite Email Status ', message:result.message}  ));
              }

          // await   this.http.post( netlifyUrl, pos,{withCredentials: true, 'headers':headers , observe: 'response'});
      
                
         
        console.log("Invite sent to", inviteEmail);

        setInviteSent(true);

    } catch (err) {
        console.log(err);
          dispatch(modalShow({ title: 'Invite Email Status ', message: `Some error reported with Email Address please contact sales-man@storenotify.in with details `, }  ));
        //alert("Failed to send invite");
    } finally {
        setSendingInvite(false);
    }
};


  if (!isModalOpen && !virtualAccountDone) return (  <AnimatePresence> 

        {/* Payment Data unavailbale , VIRTUAL ACCOUNT not  CREATED  bg-gradient-to-br from-orange-500 to-orange-600*/}
            <div className=" p-8 text-center text-dark relative">
              <div className="absolute top-4 right-6 opacity-20">
                <Server size={80} />
              </div>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ShieldCheck size={32} />
              </motion.div>
              <h2 className="text-2xl font-bold">Payment data unavailable !</h2>
              <p className="text-orange-500 font-bold text-sm mt-1">Your virtual trading account could not be created </p>
               {/* OK  BUTTON */}
               <div className="p-8 space-y-6 items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { dispatch(changeTab(MENUEDUCATE)); router.push('/');}}
                  className="w-[150px] py-4 bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
               Go Home
              </motion.button></div>
            </div>
  </AnimatePresence>) ;
   const inputStyle =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-10 py-3 text-sm sm:text-base text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400";




  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {(isModalOpen && !virtualAccountDone) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* STATUS HEADER */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center text-white relative">
              <div className="absolute top-4 right-6 opacity-20">
                <Server size={80} />
              </div>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ShieldCheck size={32} />
              </motion.div>
              <h2 className="text-2xl font-bold">Account Generated!</h2>
              <p className="text-green-100 text-sm mt-1">Your virtual trading desk is ready</p>
            </div>

            <div className="p-8 space-y-6">
              {/* VIRTUAL ID BOX */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Virtual Account User ID
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <code className="flex-1 text-blue-700 font-mono font-bold text-sm truncate">
                    {credentials.vId}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(credentials.vId)}
                    className="p-2 hover:bg-blue-100 rounded-lg text-blue-500 transition-colors"
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* PASSWORD BOX */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Trading Password
                </label>
                <div className="flex items-center gap-2 bg-slate-900 p-4 rounded-2xl shadow-inner">
                  {/** flex-1 text-emerald-400 font-mono font-bold text-sm" */}
                  <code className={inputStyle}>
                    {showPass ? credentials.vPass : "••••••••••••••••"}
                  </code>
                  <button 
                    onClick={() => setShowPass(!showPass)}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SECURITY NOTE */}
              <div className="flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <Key className="text-amber-600 shrink-0" size={18} /> {/** text-[11px] text-amber-800 leading-relaxed */}
                <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed">
                  Please save these credentials securely. You will need them to log in to the 
                  <span className="font-bold"> OneDinaar</span> trading terminal.
                </p>
              </div>

              {/* PROCEED BUTTON w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-200 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>handleConfirm()}
                className="   w-full 
                  bg-gradient-to-r from-yellow-200 via-amber-300 to-green-300
                  text-gray-900
                  font-semibold 
                  py-3 
                  rounded-xl 
                  flex items-center justify-center gap-2
                  shadow-md"
              >
                Complete Setup <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>  
        </motion.div>
      )}
      {(virtualAccountDone && !isModalOpen  )&& (<>
    {/* VIRTUAL ACCOUNT ALREADY CREATED bg-gradient-to-br from-green-500 to-emerald-600  */}
    <div className="p-8 text-center text-dark relative">

        <div className="absolute top-4 right-6 opacity-20">
            <Server size={80} />
        </div>

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4"
        >
            <ShieldCheck size={32} />
        </motion.div>

        <h2 className="text-2xl font-bold">
            Virtual Account Successfully Generated!
        </h2>

        <p className="text-orange-500 font-bold text-sm mt-1">
            Your virtual trading account is successfully created
        </p>

        {/* EMAIL INVITE SECTION */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3">

            <input
                type="email"
                placeholder="Enter your email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="
                    w-full
                    max-w-[320px]
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-400
                "
            />

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={sendTradingInvite}
                disabled={sendingInvite || inviteSent}
                className={`
                    w-full
                    max-w-[320px]
                    py-3
                    rounded-2xl
                    font-bold
                    text-white
                    transition-all
                    ${
                        inviteSent
                            ? "bg-green-500"
                            : "bg-orange-500 hover:bg-orange-600"
                    }
                `}
            >
                {
                    sendingInvite
                        ? "Sending Invite..."
                        : inviteSent
                        ? "Invite Sent Successfully"
                        : "Get Email Invite"
                }
            </motion.button>

        </div>

        {/* START BUTTON */}
        <div className="w-64 space-y-1 mx-auto flex items-center justify-center mt-6">

            <motion.button
                whileHover={{ scale: inviteSent ? 1.02 : 1 }}
                whileTap={{ scale: inviteSent ? 0.98 : 1 }}
                onClick={() => virtualDirectHome()}
                disabled={!inviteSent}
                className={`
                    w-[250px]
                    py-4
                    rounded-2xl
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition-all
                    ${
                        inviteSent
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                `}
            >
                Start Virtual Trading
            </motion.button>

        </div>

    </div>
</>
 )}
    </AnimatePresence>
  );
};
export default RefinedVirtualAccountModalImproved;
