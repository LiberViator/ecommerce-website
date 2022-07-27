import "./ColorInp.scss";

export default function ColorInp({ onClick, isChecked, colorName, colorCode }) {
  return (
    <button
      className={isChecked ? "color-input color-input_checked" : "color-input"}
      onClick={onClick}
    >
      <span style={{ backgroundColor: colorCode }} />
      <div>{colorName}</div>
    </button>
  );
}
