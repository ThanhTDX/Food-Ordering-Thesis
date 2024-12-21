const loadPayPalScript = (clientId, orderDetails, onOrderApproved) => {
  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons,funding-eligibility,marks`;
  // script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons`; // Ensure you include the components=buttons, as it's required for using the PayPal API directly
  //  https://www.paypal.com/sdk/js?client-id=test&components=buttons,funding-eligibility
  script.async = true;

  script.onload = () => {
    // Once PayPal SDK is loaded, you can use the createOrder and onApprove APIs directly
    if (window.paypal && window.paypal.Buttons) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            // This is the "createOrder" function for the PayPal API
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: orderDetails.totalAmount, // The total order amount
                  },
                },
              ],
            });
          },

          onApprove: (data, actions) => {
            // This is the "onApprove" function that will be called after approval
            return actions.order.capture().then((details) => {
              console.log("Order approved", details);
              // Call your custom function to handle the order details
              if (onOrderApproved) {
                onOrderApproved(details);
              }
            });
          },

          onError: (err) => {
            console.error("Error with PayPal payment:", err);
          },
        })
        .render("#paypal-button-container"); // We don't need to render the button, just initializing for API use
    }
    console.log("PayPal script loaded successfully!");
  };

  script.onerror = (error) => {
    console.error("Error loading PayPal script:", error);
  };

  // Append the script to the document body
  document.body.appendChild(script);
};

// This is the function that you can call to initialize PayPal's createOrder and onApprove functionality
const initializePayPalOrder = (clientId, orderDetails, onOrderApproved) => {
  loadPayPalScript(clientId, orderDetails, onOrderApproved);
};

export { initializePayPalOrder };
