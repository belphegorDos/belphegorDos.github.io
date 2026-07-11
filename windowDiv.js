function makeWindow(div, title = div.id  || "Window", height, width, left, top, minWidth, minHeight) {
    let lastHeight = 0;

    const windowDiv = document.createElement("div");
    windowDiv.className = "floating-window";

    const titleBar = document.createElement("div");
    titleBar.className = "window-title";

    const collapse = document.createElement("button");
    collapse.textContent = "v";

    const titleText = document.createElement("span");
    titleText.textContent = title;

    titleBar.append(collapse, titleText);

    const content = document.createElement("div");
    content.className = "window-content";

    div.parentNode.insertBefore(windowDiv, div);
    content.appendChild(div);

    windowDiv.append(titleBar, content);

    const resize = document.createElement("div");
    resize.className = "resize-handle";
    windowDiv.appendChild(resize);

    // Collapse

    let collapsed = false;

    collapse.onclick = () => {
        collapsed = !collapsed;

        if (collapsed) {
            lastHeight = windowDiv.offsetHeight;
            content.style.display = "none";
            resize.style.display = "none";
            collapse.textContent = ">";
            windowDiv.style.height = "28px";
        } else {
            content.style.display = "";
            resize.style.display = "";
            collapse.textContent = "v";
            windowDiv.style.height = String(lastHeight) + "px";
        }
    };

    // Dragging

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.onmousedown = e => {

        if (e.target === collapse) return;

        dragging = true;

        offsetX = e.clientX - windowDiv.offsetLeft;
        offsetY = e.clientY - windowDiv.offsetTop;

        document.onmousemove = e => {
            if (!dragging) return;

            windowDiv.style.left = (e.clientX - offsetX) + "px";
            windowDiv.style.top = (e.clientY - offsetY) + "px";
        };

        document.onmouseup = () => {
            dragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    // Resizing

    resize.onmousedown = e => {

        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;

        const startW = windowDiv.offsetWidth;
        const startH = windowDiv.offsetHeight;

        document.onmousemove = e => {

            windowDiv.style.width =
                Math.max(minWidth, startW + e.clientX - startX) + "px";

            windowDiv.style.height =
                Math.max(minHeight, startH + e.clientY - startY) + "px";
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    // Default position
    windowDiv.style.left = left + "px";
    windowDiv.style.top = top + "px";
    windowDiv.style.height = height + "px";
    windowDiv.style.width = width + "px";
}