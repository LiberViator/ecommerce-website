import "./SizeInp.scss";

export default function SizeInp({ onChange, isChecked, sizeName }) {
  return (
    <input
      className="size-input"
      type="radio"
      name="size"
      onChange={onChange}
      checked={isChecked}
    />
  );
}
