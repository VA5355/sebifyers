import React from 'react';
import GooglePayButton from '@google-pay/button-react';

function PaymentComponent({amount = "2499.00", currency="INR " , onToken}) {
    let merchantVPA = '7588230462@okbizaxis';
   let merchantName = 'Store%20Notify';



  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [/* ...config... */],
        merchantInfo: {
          merchantId: merchantVPA , //'BCR2DN6T...' From Google Pay Business Console
          merchantName: merchantName,
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: amount,
          currencyCode: currency,
          countryCode: 'IN',
        },
      }}
      onLoadPaymentData={paymentRequest => {
        console.log(' PaymentComponent Load payment data', JSON.stringify(paymentRequest));
        // CALL YOUR BACKEND HERE to send SMS
        // fetch('/api/send-sms', { method: 'POST', body: ... })
      }}
    />
  );
}
export default PaymentComponent;