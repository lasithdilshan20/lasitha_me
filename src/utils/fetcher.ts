export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    // try to parse json but ignore if fails
    try {
      const j = await res.json();
      return j;
    } catch {
      throw new Error(`Request failed: ${res.status}`);
    }
  }
  return res.json();
};

export const swrConfig = {
  dedupingInterval: 30 * 60 * 1000, // 30 minutes
  revalidateOnFocus: false,
  fetcher,
};
