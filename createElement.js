function createElement({ tag, content, proops, parent }) {
  const el = document.createElement(tag);
  el.textContent = content;
  proops.map((e) => {
    el.setAttribute(Object.keys(e)[0], Object.values(e)[0]);
  });
  parent.appendChild(el);

  return el;
}

export default createElement;
