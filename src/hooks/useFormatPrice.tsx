export default function useFormatPrice(ammount) {
  return ammount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
