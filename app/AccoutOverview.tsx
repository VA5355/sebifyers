import { useSelector, useDispatch } from 'react-redux';
import { RazorPayReceiptView } from './RazorPayReceiptView';
import { changeTab } from '@/redux/slices/miscSlice';
import MarketWatch from './MarketWatch';
import PositionsTable from './PositionsTable';
import ProcessAccountModal from './ProcessAccountModal';
import VirtualAccountOverview from './virtual-account/logged/VirtualAccountOverview';
import { DocumentStyleChart } from './virtual-account/logged/components/DocumentStyleChart';

export default function AccountOverview() {
  const dispatch = useDispatch();
  
  // Read safely from the backup payload slice data you already have in Redux
  const modalPayload = useSelector((state: any) => state.modal?.payload || state.modalpayload?.payload);
  const isRazorpayType = modalPayload?.modalType === 'razorpayorder';

  const handleProceed = () => {
    dispatch(changeTab('Virtual Account'));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
       {/** max-w-md w-[1400px]*/}
      <div className="max-w-6xl ml-24 mx-2">
      
           {/* Your normal application UI layout goes here  */}
          <div className="text-center text-sm text-gray-400">
            
            <div className="
grid
grid-cols-1
lg:grid-cols-[1fr_330px]
gap-3
">


 

<VirtualAccountOverview  
 
>  {/** <DocumentStyleChart/> */}
 </VirtualAccountOverview>
 



<MarketWatch/>


</div>



<PositionsTable/>
            
           {/**Waiting for payment confirmation sync...  */} </div>
       
      </div>
    </div>
  );
}