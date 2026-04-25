//🧩 4. React Component (RazorPayButton.tsx)
"use client";

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/redux/slices/paymentSlice";
//import { RootState } from "@/redux/store";
import { useRazorpay } from "@/redux/hooks/useRazorpay";
import { showModal as modalShow, showError } from '@/components/common/service/ModalService';

const RazorPayButton = ({amount = "2499.00", currency="INR " ,receipt ,description,  onToken}) => {
  const dispatch = useDispatch();
  let keyRazor = "2853QGpWUiQAri"
  const { order, loading } = useSelector(
    (state) => state.razorpay
  );

  const { openRazorpay } = useRazorpay();

  const handlePayment = async () => {

      try {
    const payload = {
      amount: amount,
      currency: currency,
      receipt: receipt,
      location: "en-IN",
      description: description,
    };

    const res = await dispatch(createOrder(payload));

    if (res.payload) {

          // Redux Toolkit safe extraction
    const order = res?.payload;

    // 🚨 HARD VALIDATION
    if (!order || !order.id || !order.amount || !order.currency) {
      console.error("Invalid order response:", order);
       dispatch(modalShow({title: 'Payment Order', message: "Payment initialization failed. Please try again.", } ));
      return;
    }

    // 🚨 Extra safety: Razorpay requires minimum 100 paise
    if (Number(order.amount) < 100) {
      console.error("Amount too low:", order.amount);
       dispatch(modalShow({title: 'Payment Order', message: "Amount must be at least ₹1", } ));
      return;
    }

    console.log("Order validated. Opening Razorpay:", order.id);

    // ✅ Only now open Razorpay
    await openRazorpay(order, `rzp_test_${keyRazor}`, dispatch).then( comp => {
           let razorPayOrder = { modalType : "razorpayorder" , ...order}
            // razorPayOrder = { ...razorPayOrder , order };
            //, type:'info', payload : razorPayOrder
            console.log(`razorPayOrder ${JSON.stringify(razorPayOrder)} `)
          dispatch(modalShow({title: 'Payment Order', message: `Your Order is proceesed :: ${order.id} ` ,payload : razorPayOrder} ));
           onToken?.(order)
    }).catch(perr => {

         dispatch(modalShow({title: 'Payment Order', message: "Please follow-up with support \n order id :: "+order.id , } ));
    });

    // once above is completed then show ORDER placed Payment in Processing

      //openRazorpay(res.payload, `rzp_test_${keyRazor}`, dispatch);
    }
     } catch (err) {
    console.error("Payment flow error:", err);
     dispatch(modalShow({ title: 'Payment Order', message: `Something went wrong while initiating payment. `, } ));
   // alert("Something went wrong while initiating payment.");
  }


  };

  return (
    <button
      onClick={handlePayment} 
      className="bg-blue-600 text-white px-4 py-2 rounded razorbutton"
      disabled={loading}
    > {/** bg-green-600 */}

<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-ekc7fv">
 <path d="M7.077 6.476l-.988 3.569 5.65-3.589-3.695 13.54 3.752.004 5.457-20L7.077 6.476z" fill="#fff" class="svelte-ekc7fv">
  </path>
   <path d="M1.455 14.308L0 20h7.202L10.149 8.42l-8.694 5.887z" fill="#fff" class="svelte-ekc7fv"></path>
   </svg> 
    



      {loading ? "Processing..." : "Pay Razor"}

        <div class="PaymentButton-contents svelte-ekc7fv">
     <span class="PaymentButton-text svelte-ekc7fv">TipStore</span>
      <div class="PaymentButton-securedBy svelte-ekc7fv">Secured by Razorpay</div>
      
      </div>
    </button>
  );
};

export default RazorPayButton;
//________________________________________
