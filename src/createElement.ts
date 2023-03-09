interface createElementType {
  tag: string;
  content?: string;
  proops: arrElType[];
  parent: HTMLElement | null;
}
interface arrElType {
  class: string;
}
function createElement({
  tag,
  content,
  proops,
  parent,
}: createElementType): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  if (content) {
    el.textContent = content;
  }
  proops.map((e: arrElType) => {
    el.setAttribute(Object.keys(e)[0], Object.values(e)[0]);
  });
  if (parent != null) {
    parent.appendChild(el);
  }

  return el;
}

export default createElement;
