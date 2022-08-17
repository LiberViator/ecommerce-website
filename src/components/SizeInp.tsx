import "./SizeInp.scss";

export default function SizeInp({ onClick, isChecked, sizeName }) {
  return (
    <button
      className={isChecked ? "size-input size-input_checked" : "size-input"}
      onClick={onClick}
    >
      {sizeName}
    </button>
  );
}
