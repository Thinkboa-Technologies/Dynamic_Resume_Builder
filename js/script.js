// Function to add new education entry
function addEducation() {
    const container = document.getElementById('educationContainer');
    const div = document.createElement('div');
    div.className = 'education-entry mb-3';
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
        <input type="text" class="form-control mb-2" placeholder="Degree">
        <input type="text" class="form-control mb-2" placeholder="Institution">
        <input type="text" class="form-control mb-2" placeholder="Year">
    `;
    container.appendChild(div);
}

// Function to add new experience entry
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const div = document.createElement('div');
    div.className = 'experience-entry mb-3';
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
        <input type="text" class="form-control mb-2" placeholder="Company">
        <input type="text" class="form-control mb-2" placeholder="Position">
        <input type="text" class="form-control mb-2" placeholder="Duration">
        <textarea class="form-control mb-2" placeholder="Description"></textarea>
    `;
    container.appendChild(div);
}

// Function to add new skill entry
function addSkill() {
    const container = document.getElementById('skillsContainer');
    const div = document.createElement('div');
    div.className = 'skills-entry mb-3';
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeEntry(this)">×</button>
        <input type="text" class="form-control mb-2" placeholder="Skill">
    `;
    container.appendChild(div);
}

// Function to remove an entry
function removeEntry(button) {
    button.parentElement.remove();
}

// Function to generate resume preview
function generateResume() {
    // Update personal information
    document.getElementById('previewName').textContent = document.getElementById('fullName').value;
    const contactInfo = [
        document.getElementById('email').value,
        document.getElementById('phone').value,
        document.getElementById('location').value
    ].filter(Boolean).join(' | ');
    document.getElementById('previewContact').textContent = contactInfo;

    // Update education section
    const educationEntries = document.querySelectorAll('.education-entry');
    const previewEducation = document.getElementById('previewEducation');
    previewEducation.innerHTML = '';
    educationEntries.forEach(entry => {
        const [degree, institution, year] = entry.querySelectorAll('input');
        if (degree.value || institution.value || year.value) {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <h4>${degree.value}</h4>
                <p>${institution.value}</p>
                <p>${year.value}</p>
            `;
            previewEducation.appendChild(div);
        }
    });

    // Update experience section
    const experienceEntries = document.querySelectorAll('.experience-entry');
    const previewExperience = document.getElementById('previewExperience');
    previewExperience.innerHTML = '';
    experienceEntries.forEach(entry => {
        const [company, position, duration] = entry.querySelectorAll('input');
        const description = entry.querySelector('textarea');
        if (company.value || position.value || duration.value) {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <h4>${company.value}</h4>
                <p><strong>${position.value}</strong> - ${duration.value}</p>
                <p>${description.value}</p>
            `;
            previewExperience.appendChild(div);
        }
    });

    // Update skills section
    const skillEntries = document.querySelectorAll('.skills-entry input');
    const previewSkills = document.getElementById('previewSkills');
    previewSkills.innerHTML = '<div class="skills-list"></div>';
    const skillsList = previewSkills.querySelector('.skills-list');
    skillEntries.forEach(entry => {
        if (entry.value) {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = entry.value;
            skillsList.appendChild(span);
        }
    });
}

// Add initial entries
document.addEventListener('DOMContentLoaded', () => {
    // Auto-generate preview when any input changes
    document.body.addEventListener('input', generateResume);
});
