export default function useFormatPrice(ammount) {
  if (ammount === null || undefined) return undefined;

  const formatPrice = ammount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatPrice;
}
