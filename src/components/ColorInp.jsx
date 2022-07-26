import "./ColorInp.scss";

export default function ColorInp({
  onChange,
  isChecked,
  colorName,
  colorCode,
}) {
  return (
    <div className="color-input">
      <input
        type="radio"
        name="color"
        onChange={onChange}
        checked={isChecked}
        style={{ backgroundColor: colorCode }}
      />
      <span>{colorName}</span>
    </div>
  );
}
