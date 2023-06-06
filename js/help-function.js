function getNumElement(el) {
    let i = 0;
    while (el = el.previousSibling) {
        el.nodeType == 1 && i++;
    }
    return i;
}

export { getNumElement }