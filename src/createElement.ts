interface createElementType {
    tag: string;
    content?: string;
    props: arrElType[];
    parent: HTMLElement | null;
}

interface arrElType {
    class: string;
}

function createElement({
                           tag,
                           content,
                           props,
                           parent,
                       }: createElementType): HTMLElement {
    const el: HTMLElement = document.createElement(tag);
    if (content) {
        el.textContent = content;
    }

    props.map((e: arrElType) => {
        el.setAttribute(String(Object.entries(e)[0]), String(Object.entries(e)[1]));
    });
    if (parent != null) {
        parent.appendChild(el);
    }

    return el;
}

export default createElement;
