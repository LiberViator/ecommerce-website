export default function useFormatPrice(ammount) {
  if (!ammount) return undefined;

  const formatPrice = ammount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatPrice;
}
