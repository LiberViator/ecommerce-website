import "./ColorInp.scss";

export default function ColorInp({ onChange, isChecked, colorCode }) {
  return (
    <li className="color-input">
      <input
        type="radio"
        name="color"
        onChange={onChange}
        checked={isChecked}
      />
      <span style={{ backgroundColor: colorCode }} />
    </li>
  );
}
