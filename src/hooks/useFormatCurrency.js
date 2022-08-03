export default function useFormatCurrency(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
