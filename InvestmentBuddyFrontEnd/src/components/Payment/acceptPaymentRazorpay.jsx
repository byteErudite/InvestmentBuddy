import logo from "../../assets/images/logos/logoPurple.png";
import axios from "axios";
import { SERVER_URL } from "../../constants/NetworkData";
import { COLORS } from "../../constants/NewColorScheme";

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

export async function displayRazorpay(dueAmount, onSuccessCallback, cardNumber, amountPaid, pointsEarned, paymentType, cardCompany) {
    console.log('calling displayrajorpay method')
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    const orderRequestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderAmmount: dueAmount
        })
    }



    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
    console.log('After loadScript method')

    // creating a new order in backend save order id is pending
    const result = await axios.post(SERVER_URL + "/order", {
        orderAmmount: dueAmount
    });
    console.log('After api call method')
    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { id, currency } = result.data;


    console.log(id, currency, 'values')
    const options = {
        key: "rzp_test_5BzocREST9Wvie", // Enter the Key ID generated from the Dashboard
        amount: dueAmount.toString(),
        currency: currency,
        name: "SaveEasy Corp.",
        description: "Credit Card Bill Payment",
        image: { logo },
        order_id: id,
        handler: async function (response) {
            const data = {
                orderCreationId: id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            console.log('data===', data.razorpayPaymentId, data.orderCreationId, data.razorpayOrderId, response, data)

            //send this data to frontend for storing payment info then using api we can get detil of payment
            // const result = await axios.post(
            //   "http://localhost:5000/payment/success",
            //   data
            // );

            onSuccessCallback(cardNumber, amountPaid, pointsEarned, paymentType, cardCompany)

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
            color: '#1e0d67',//COLORS.textPrimary,
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}