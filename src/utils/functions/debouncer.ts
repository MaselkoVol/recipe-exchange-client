export type DebouncerType = {
  debounce: (...args: any[]) => void; // Accept any parameters for debounce
  instantCallback?: (...args: any[]) => void; // Accept any parameters for instantCallback
  delay: number; // Delay for the debounce function
};

export function debounder({ debounce, instantCallback, delay }: DebouncerType) {
  let timeout: NodeJS.Timeout | null = null;

  // Change the return function to accept separate arguments instead of an object
  return function (debounceArgs: any[] = [], instantArgs: any[] = []) {
    if (timeout) clearTimeout(timeout);
    // Call the instant callback immediately with the array of args
    if (instantCallback) {
      instantCallback(...(instantArgs instanceof Array ? instantArgs : [instantArgs]));
    }

    timeout = setTimeout(() => {
      debounce(...(debounceArgs instanceof Array ? debounceArgs : [debounceArgs]));
    }, delay);
  };
}
