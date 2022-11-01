import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function usePizza({ pizzas, inputs, values }) {
  // 1. create a state to hold order
  // removed use state, we moved use state to the provider context
  //   const [order, setOrder] = useState([]);
  // now we access staste and updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everthing before the item we want to remove
      ...order.slice(0, index),
      // everthing after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // this is the function that is run when you submit the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setMessage('Go Eat!');
    // gather all data that needs to be sent
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal()),
      email: values.email,
      name: values.name,
      mapleSyrup: values.mapleSyrup,
    };

    // 4. send this data to serverless function to check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeholder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // check if everthing worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! come on down for your pizza');
    }
  }

  return {
    order,
    pizzas,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
