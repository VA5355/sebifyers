//This hook bridges the UI credentials (vId, vPass, salt) to the Redux/API layer.

//ypeScript
import { useDispatch, useSelector } from 'react-redux';
import { activateVirtualAccount } from '../redux/slices/virtualAccountSliceOnedinaarVirtualAccount';
import { selectPaymentData } from '../redux/slices/paymentSlice';
 import {StorageUtils} from "@/libs/cache";
import {CommonConstants, isNullOrUndefined} from "@/utils/constants";
export const useVirtualAccountContext = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(selectPaymentData);

  const confirmActivation = async (credentials: { vId: string, vPass: string, salt: string }, storageRazorOrder: {
          orderType : string,   // razor or gpaydirect (by scanning )
          amt:  string , // "1",
          

            cur: string , // "INR",
          recpt:string, //  "razor_receipt_2026-03-04 18:04:44  ",
            n1: string , //"en-IN",
          n2:string , //"Life time subscription virtual tradning @onedinaar.com  ",
          show : true,
            amount: string,
            amount_due: string,
          amount_paid: string, 
          created_at : string, 
          currency : string, 
          id: string, 
          notes : { 
            key1 : string,
            key2 :string, 

          }, 
          offer_id : string, 
          receipt: string, 
          status :string, 


  }) => {
    let  razorPayOrder =  StorageUtils._retrieve('razorpayorder_recent');
    let   razorPayData = razorPayOrder.data ?? storageRazorOrder;
      if(!isNullOrUndefined( paymentData)  && !isNullOrUndefined( paymentData.order ) || (!isNullOrUndefined(razorPayData)) ){
          let orderId =  razorPayData.id ??  paymentData?.order?.id     // "order_ShHjKtA45C4T3u"; 
          let receiptId = razorPayData.receipt ?? paymentData?. order?.receipt  // "razor_receipt_2026-03-05 15:04:31";

        const payload = {
          name: "OneDinaar Trader",
          email: credentials.vId, // Mapping Virtual ID to the email field
          password: credentials.vPass,
          userSalt: credentials.salt,
          underlyingOrderId: orderId
        };
        console.log(`useVirtualAccountContext  payload ${JSON.stringify(payload)}`)
        try {
          const resultAction = await dispatch(activateVirtualAccount(payload) as any);
          if (activateVirtualAccount.fulfilled.match(resultAction)) {
            return { success: true, data: resultAction.payload };
          } else {
            return { success: false, error: resultAction.payload };
          }
        } catch (err) {
          return { success: false, error: err };
        }
    }
    else { 
      return { success: false, message: "No payment order found" };
    }  
  
  };

  return { confirmActivation };
};
