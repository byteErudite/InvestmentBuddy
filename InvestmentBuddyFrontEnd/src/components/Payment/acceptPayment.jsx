import axios from "axios";
import logo from "../../logo.svg";
import Button from '@material-ui/core/Button'
import PaymentIcon from '@material-ui/icons/Payment';

const AcceptPayment = () => {

    const loadScript = (src) => {
        console.log('calling loadscript method')
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }
    
      async function displayRazorpay() {
          console.log('calling displayrajorpay method')
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        console.log('After loadScript method')
    
        // creating a new order in backend save order id is pending
        const result = await axios.post("http://localhost:8080/order");
        console.log('After api call method')
        if (!result) {
          alert("Server error. Are you online?");
          return;
        }
    
        // Getting the order details back
        const { amount, id, currency } = result.data;
    
        console.log(amount, id, currency, 'values')
        const options = {
          key: "rzp_test_5BzocREST9Wvie", // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: "Saveeasy Corp.",
          description: "Test Transaction",
          image: { logo },
          order_id: id,
          handler: async function (response) {
            const data = {
              orderCreationId: id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
    
            console.log('data===',data.razorpayPaymentId, data.orderCreationId, data.razorpayOrderId)

            //send this data to frontend for storing payment info then using api we can get detil of payment
            // const result = await axios.post(
            //   "http://localhost:5000/payment/success",
            //   data
            // );
    
            
            //alert(result.data.msg);
          },
          prefill: {
            name: "Shubham Tiwari",
            email: "chakresh@example.com",
            contact: "8410533693",
          },
          notes: {
            address: "Kanpur",
          },
          theme: {
            color: "#61dafb",
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

    return(
        <div>
            <Button onClick = {displayRazorpay} startIcon = {<PaymentIcon/>} variant="outlined" color="primary">Pay now</Button>
        </div>
    )
}

export default AcceptPayment;