const loadingDots = document.getElementById('loading-dots');
const projectsContainer = document.getElementById('projects');
const sorts = {
    'stars': (a, b) => b.stargazers_count - a.stargazers_count,
    'forks': (a, b) => b.forks_count - a.forks_count,
    'recent': (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
    'oldest': (a, b) => new Date(a.created_at) - new Date(b.created_at),
    // 'best': (a, b) => {
        
    // })
}
// Loading dots
const loadingInterval = setInterval(() => {
    if (loadingDots.innerText.length >= 3) {
        loadingDots.innerText = '';
    } else {
        loadingDots.innerText += '.';
    }
}, 500);

let projectsCached = [];

const makeProjectCard = (project) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    const projectLink = document.createElement('a');
    projectLink.href = project.html_url;
    projectLink.target = '_blank';
    projectLink.className = 'project-title';
    projectLink.innerText = project.name;

    const projectTitle = document.createElement('h3');
    projectTitle.appendChild(projectLink);
    projectCard.appendChild(projectTitle);
    

    const projectDescription = document.createElement('p');
    projectDescription.innerText = project.description;
    projectCard.appendChild(projectDescription);

    const projectInfo = document.createElement('p');
    projectInfo.innerHTML = `${project.language} | <svg class="icon"><use xlink:href="#star" /></svg> ${project.stargazers_count} | <svg class="icon"><use xlink:href="#fork" /></svg> ${project.forks_count}`;
    projectCard.appendChild(projectInfo);

    const projectTime = document.createElement('p');
    projectTime.innerHTML = `<svg class="icon"><use xlink:href="#clock" /></svg> ${new Date(project.pushed_at).toLocaleDateString()}`;
    projectCard.appendChild(projectTime);
    
    return projectCard;
};

const renderProjects = () => {
    const projects = projectsCached.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));;

    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        projectsContainer.appendChild(makeProjectCard(project));
    });
};

// Load projects
(async () => {
    let request = await fetch('https://api.github.com/users/WilsontheWolf/repos?per_page=1000');
    if (request.status !== 200) {
        alert('Error loading projects');
        return;
    }
    let projects = await request.json();

    projectsCached = projects.filter(r => !r.archived && !r.fork && r.language);

    clearInterval(loadingInterval);

    renderProjects();
})();