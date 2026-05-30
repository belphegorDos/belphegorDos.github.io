let count = 1;
let queries = []

function addQuery() {
    const input = document.getElementById("searchInput").value;
    queries.push(input)

    const params = new URLSearchParams(window.location.search);

    params.append("q" + count, input);
    count++;

    history.pushState({}, "", "?" + params.toString());
}

function showQueries() {
    const div = document.getElementById("queryList");

    const existingP = div.querySelectorAll("p");
    existingP.forEach(p => p.remove());

    for (const query of queries) {
        const p = document.createElement("p");
        p.textContent = query;
        div.appendChild(p);
    }

}

function showUrl() {
    alert(window.location.href);
}