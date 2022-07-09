export default function QuantityInput(
  value,
  increase,
  decrease,
  custom,
  min,
  max
) {
  return (
    <div>
      <div onClick={() => decrease}>-</div>
      <input
        type="number"
        name="quantity"
        min={min}
        max={max}
        value={value}
        onChange={custom}
      />
      <div onClick={() => increase}>+</div>
    </div>
  );
}
