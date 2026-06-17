import { useSelector, useDispatch } from 'react-redux';
import { RazorPayReceiptView } from './RazorPayReceiptView';
import { changeTab } from '@/redux/slices/miscSlice';
import MarketWatch from './MarketWatch';
import PositionsTable from './PositionsTable';
import ProcessAccountModal from './ProcessAccountModal';

export default function PaymentStatusDashboard() {
  const dispatch = useDispatch();
  
  // Read safely from the backup payload slice data you already have in Redux
  const modalPayload = useSelector((state: any) => state.modal?.payload || state.modalpayload?.payload);
  const isRazorpayType = modalPayload?.modalType === 'razorpayorder';

  const handleProceed = () => {
    dispatch(changeTab('Virtual Account'));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
       {/** max-w-md */}
      <div className="max-w-6xl mx-auto">
        {isRazorpayType ? (
          <RazorPayReceiptView 
            orderData={modalPayload} 
            onProceed={handleProceed} onCancel={  () => {  dispatch(changeTab('Educate'))} }
          />
        ) : (
          /* Your normal application UI layout goes here */
          <div className="text-center text-sm text-gray-400">
            
            <div className="
grid
grid-cols-1
lg:grid-cols-[1fr_330px]
gap-3
">


 

<ProcessAccountModal
 open={true}
 close={()=>{}}
/>

 



<MarketWatch/>


</div>



<PositionsTable/>
            
           {/**Waiting for payment confirmation sync...  */} </div>
        )}
      </div>
    </div>
  );
}
