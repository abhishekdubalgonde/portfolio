function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}



async function loadPortfolio() {
    const container = document.getElementById('project-grid_featured');
    const container2 = document.getElementById('project-grid_more');

    try {
        const response = await fetch('Pro_data.json');
        const projects = await response.json();

        container.innerHTML = '';
        container2.innerHTML = '';

        projects.forEach(project => {
            const maxTags = 4;
            const visibleTags = project.techStack.slice(0, maxTags);
            const extraTags = project.techStack.length - maxTags;

            const projectHTML = `
                <div class="project-card">
                    <div class="card-banner">
                        ${project.isFeatured ? '<span class="badge-featured">Featured</span>' : ''}
                        <img src="${project.image}" alt="${project.title}">
                        <div class="hover-controls">
                            <a href="${project.liveLink}" class="control-btn">Live</a>
                            <a href="${project.repoLink}" class="control-btn">Code</a>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="tag-row">
                            ${visibleTags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                            ${extraTags > 0 ? `<span class="tech-tag highlight">+${extraTags}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;

            // ✅ IF–ELSE CONDITION FOR ADDING TO IDs
            if (project.isFeatured === true) {
                container.innerHTML += projectHTML;
            } else {
                container2.innerHTML += projectHTML;
            }
        });

    } catch (err) {
        console.error("Error updating feed:", err);
    }
}
loadPortfolio();

async function SkillsLoader() {
    const container = document.getElementById('skills-grid');
    try {
        const response = await fetch('skills_data.json');
        const skills = await response.json();
        container.innerHTML = '';
        skills.forEach(skill => {
            const skillHTML = `
                <div class="skill-card">
                    <div class="card">
                        <div class="header">
                        <img src="${skill.icon}">
                        <span class="skill-name">${skill.name}</span>
                        </div>
                        <p>${skill.description}</p>
                        <div class="m_skills">
                            ${skill.skills.map(s =>
                                `<span class="skill">${s}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += skillHTML;
        });
    } catch (err) {
        console.error("Error loading skills:", err);
    }
}

SkillsLoader();