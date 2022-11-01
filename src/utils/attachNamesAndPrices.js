import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const matchedPizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item,
      name: matchedPizza.name,
      thumbnail: matchedPizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(matchedPizza.price, item.size)),
    };
  });
}
