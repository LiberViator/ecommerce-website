export default function useFormatPrice(ammount) {
  if (ammount)
    return ammount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
}
