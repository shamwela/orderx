// This function is created to avoid using unnecessary state
export function getValueFromEvent(event: Event, name: string) {
  const { elements } = event.currentTarget as any
  return elements.namedItem(name).value as string
}
