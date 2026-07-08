let count = 1;
let queries = [];
let names = [];

const url = new URL(window.location);
const params = new URLSearchParams(window.location.search);

window.onload = function() {
    for (const [name, value] of params) {
		const query = `${name}=${value}`;
        if (queries.includes(query)) {
            url.search = "";
            history.replaceState({}, "", url);
            queries = [];
            return;
        } 
        queries.push(value);
		names.push(name);
    }
    showQueries()
};

function removeQueryByValue(valueToRemove) {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    // collect keys to remove (because multiple params can share same value)
    const keysToDelete = [];

    for (const [key, value] of params.entries()) {
        if (value === valueToRemove) {
            keysToDelete.push(key);
        }
    }

    // remove them
    keysToDelete.forEach(key => params.delete(key));

    // update the URL without reloading the page
    window.history.replaceState({}, "", url);
}

function removeFromArray(arr, value) {
    const index = arr.indexOf(value);

    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function addQuery() {
    const input = document.getElementById("searchInput").value;
    if (queries.includes(input)) {
        alert("Duplicate entry.");
        return;
    } else {
        queries.push(input);
    }
    const params = new URLSearchParams(window.location.search);
    params.append("q" + count, input);

    count++;

    history.pushState({}, "", "?" + params.toString());
	showQueries()
}

function showQueries() {
    const div = document.getElementById("queryList");

    const existingButton = div.querySelectorAll("button");
    existingButton.forEach(button => button.remove());
    
    const existingHr = div.querySelectorAll("hr");
    existingHr.forEach(hr => hr.remove());

    queries.forEach((query, index) => {
        const button = document.createElement("button");
        button.textContent = query;

        button.addEventListener("mouseenter", () => {
            button.textContent = "remove";
        });

        button.addEventListener("mouseleave", () => {
            button.textContent = query;
        });

        div.append(button);

        button.onclick = function() {
            const hr = button.nextElementSibling;

            if (hr) {
                hr.remove();
            } 
            
            this.remove();
            removeFromArray(queries, query);

            if (div.children.length == 0) {
                div.style.border = "none";
            }

            removeQueryByValue(query);

        }

        if (index < queries.length - 1) {
            const hr = document.createElement("hr");
            div.appendChild(hr);
        }
    });

    if (div.children.length > 0) {
        div.style.border = "2px solid white";
    }
}

async function showUrl() {
    try {
        await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
        alert('failed to copy URL');
    }
}

function toggleVisible() {
	const menu = document.getElementById("queryToggle");
	const targetDiv = document.getElementById("queryList");
	
	if (menu.value === "Show") {
    targetDiv.style.display = "block";
  } else {
    targetDiv.style.display = "none";
  }
}

function reload() {
    url.search = "";
    history.replaceState({}, "", url);
    window.location.reload();
}
