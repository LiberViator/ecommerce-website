import { useSearchParams } from "react-router-dom";

export default function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const formatedParams = Object.fromEntries([...searchParams]);
  //   if (ammount === null || undefined) return undefined;

  return [formatedParams, setSearchParams];
}
