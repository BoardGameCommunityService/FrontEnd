export function getSessionValue(key: string) {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(key) || "";
}
