import "./App.css";
import Stepper from "./Component/Stepper";

function App() {
  const checkout = [
    {
      name: "Customer Info",
      Component: () => <div>provide your contact details </div>,
    },
    {
      name: "Shipping info",
      Component: () => <div>Enter your shipping addresss</div>,
    },
    {
      name: "Payment",
      Component: () => <div>Complete payment for your order</div>,
    },
    {
      name: "Delivered",
      Component: () => <div>Your order has been Delivered</div>,
    },
  ];
  return (
    <>
      <div className="root">
        <h2>Checkout</h2>
        <Stepper stepsConfig={checkout} />
      </div>
    </>
  );
}

export default App;
