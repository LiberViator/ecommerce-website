import "./QuantityInp.scss";

export default function QuantityInp({
  variant,
  value,
  onIncrease,
  onDecrease,
  onSet,
}) {
  switch (variant) {
    case "PRODUCT": {
      return (
        <div className="quantity">
          <button onClick={onDecrease}>
            <img src="assets/decrease.svg" alt="" />
          </button>
          <input type="number" value={value} onChange={onSet} min={1} />
          <button onClick={onIncrease}>
            <img src="assets/increase.svg" alt="" />
          </button>
        </div>
      );
    }

    case "CART": {
      return (
        <div className="quantity">
          <button onClick={onDecrease}>
            <img
              src={value <= 1 ? "assets/trash.svg" : "assets/decrease.svg"}
              alt=""
            />
          </button>
          <input type="number" value={value} onChange={onSet} min={1} />
          <button onClick={onIncrease}>
            <img src="assets/increase.svg" alt="" />
          </button>
        </div>
      );
    }

    default:
      break;
  }
}
