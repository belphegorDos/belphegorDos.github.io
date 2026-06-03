let count = 1;
let queries = []

function addQuery() {
    const input = document.getElementById("searchInput").value;
    queries.push(input)

    const params = new URLSearchParams(window.location.search);

    params.append("q" + count, input);
    count++;

    history.pushState({}, "", "?" + params.toString());
		showQueries()
}

function showQueries() {
  const div = document.getElementById("queryList");

    // Remove existing paragraphs AND existing horizontal rules
    const existingP = div.querySelectorAll("p");
    existingP.forEach(p => p.remove());
    
    const existingHr = div.querySelectorAll("hr");
    existingHr.forEach(hr => hr.remove());

    // Loop through queries and create elements
    queries.forEach((query, index) => {
        // 1. Create and add the paragraph
        const p = document.createElement("p");
        p.textContent = query;
        div.appendChild(p);

        // 2. Only add an <hr> if it is NOT the last item in the array
        if (index < queries.length - 1) {
            const hr = document.createElement("hr");
            div.appendChild(hr);
        }
    });
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