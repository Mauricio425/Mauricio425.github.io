// Function to fetch the number of commits for a specific repo
async function getCommits(url) {
  console.log("Current URL: " + url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    let commits = data.length;
    console.log("func log: " + commits);
    return commits;
  } catch (error) {
    console.error("Error fetching commits:", error);
    return 0; // Return 0 if there is an error
  }
}

// Main function to load repositories and generate cards

async function loadRepos(username) {
  console.log("Loading repositories for " + username);
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear previous results safely

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=20`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    for (const repo of data) {
      //Switched to await from .then (async/await)
      const commitCount = await getCommits(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`);

      const card = document.createElement('div');
      card.classList.add("repo");
      card.innerHTML = `
        <h2>
          <i class="fa-brands fa-github"></i> 
          <a class="repo-name" href="${repo.html_url}">${repo.name}</a>
        </h2>
        <table class="repo-table">
          <tr><th>Name</th><td>${repo.name}</td></tr>
          <tr><th>Description</th><td>${repo.description || 'No description'}</td></tr>
          <tr><th>Created on</th><td>${new Date(repo.created_at).toLocaleDateString()}</td></tr>
          <tr><th>Last updated</th><td>${new Date(repo.updated_at).toLocaleDateString()}</td></tr>
          <tr><th>Number of Commits</th><td>${commitCount}</td></tr>
          <tr><th>List of Languages</th><td>${repo.language || 'N/A'}</td></tr>
          <tr><th>Number of Watchers</th><td>${repo.watchers_count}</td></tr>
        </table>
      `;
      container.appendChild(card);
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    container.innerHTML = "<p>Error loading repositories.</p>";
  }
}


function searchUser() {
  const userName = document.querySelector("#search-input").value.trim();
  console.log("Search User: " + userName);
  if (userName) {
    loadRepos(userName);
  } else {
    alert("Please enter a GitHub username");
  }
}


// Run the function when the script loads
loadRepos("Mauricio425");
document.getElementById("search-button").addEventListener("click", searchUser);
