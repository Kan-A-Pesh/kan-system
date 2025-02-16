import _clsx from "clsx";

export default function clsx(...args: any[]) {
  return _clsx(args.filter((arg) => typeof arg === "string" && !!arg));
}
