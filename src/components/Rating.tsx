import "./Rating.scss";

export default function Rating({ rate }) {
  const calcRate = (n) => `${(100 / 5) * n}%`;

  return (
    <div className="rating">
      <span style={{ width: calcRate(rate) }} />
    </div>
  );
}
