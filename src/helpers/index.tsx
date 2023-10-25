export function getFieldsFromHTMLElement({
  ref,
  names,
}: {
  ref: HTMLElement;
  names: string[];
}) {
  const fields = {};
  for (const key of names) {
    Object.assign(fields, {
      [key]: (ref.querySelector(`textarea[name=${key}]`) as HTMLTextAreaElement)
        .value,
    });
  }
  return fields;
}
export function toggleReadOnlyTextarea({
  ref,
  names,
}: {
  ref: HTMLElement;
  names: string[];
}) {
  for (const key of names) {
    (
      ref.querySelector(`textarea[name=${key}]`) as HTMLTextAreaElement
    ).toggleAttribute("readoonly");
  }
}
