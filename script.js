let queries = [];
let names = [];

window.onload = function() {
    fixParam();
    showQueries();
};

function removeQueryByValue(valueToRemove) {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const keysToDelete = [];

    for (const [key, value] of params.entries()) {
        if (value === valueToRemove) {
            keysToDelete.push(key);
        }
    }

    keysToDelete.forEach(key => params.delete(key));

    window.history.replaceState({}, "", url);
}

function removeFromArray(arr, value) {
    const index = arr.indexOf(value);

    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function addQuery(input) {
    const params = new URLSearchParams(window.location.search);

    if (queries.includes(input)) {
        alert("Duplicate entry.");
        return;
    } else if (input.trim() == "" || input[0] == " ") {
        alert("invalid entry.");
        return;
    }else if (names.length > 0) {
        params.append("q" + String(Number(names[names.length - 1].at(-1))+1), input);
    } else {
        params.append("q1", input);
    }

    queries.push(input);
    addName();

    history.pushState({}, "", "?" + params.toString());
	showQueries();
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
            nameIndex = queries.indexOf(query);
            removeFromArray(names, names[nameIndex]);
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
    const url = new URL(window.location);
    url.search = "";
    history.replaceState({}, "", url);
    window.location.reload();
}

function addName() {
    if (names.length != 0) {
        names.push("q" + String(Number(names[names.length - 1].at(-1))+1));
    } else {
        names.push('q1');
    }
}

function fixParam() {
    const params = new URLSearchParams(window.location.search);
    for (const [name, value] of params) {
        if (queries.includes(value)) {
            reload();
        }
        queries.push(value);
		names.push(name);
    }

    let length = names.length;
    let param = "?";
    names = [];

    for (let i = 1; i < length+1; i++) {
        names.push('q' + i);
    }

    for (let i = 0; i < length; i++) {
        param += `${names[i]}=${queries[i]}&`;
    }

    history.pushState(null, "", param.slice(0, -1));
}
async function copy(string) {
    try {
        await navigator.clipboard.writeText(string);
    } catch (error) {
        alert('failed to copy URL');
    }
}