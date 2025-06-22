export function focusElement(selector: () => Element | null): void {
  (selector() as HTMLElement)?.focus();
}
