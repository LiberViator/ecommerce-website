import "./SizeInp.scss";

export default function SizeInp({ onChange, isChecked, sizeName }) {
  return (
    <li className="size-input">
      <input type="radio" name="size" onChange={onChange} checked={isChecked} />
      <span>{sizeName}</span>
    </li>
  );
}
