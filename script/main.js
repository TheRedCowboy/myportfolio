window.addEventListener('load', () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.remove('opacity-0');
    } else {
        console.error("Errore: Elemento con id 'main-content' non trovato!");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    loadAllData();

});


function typeWriter(element, text, speed = 15) {
    element.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function renderText(description){
    const content = document.getElementById('content-panel');
    const bioText = description.toString();

    content.innerHTML = `<p id="bio-text" class="text-slate-300 text-sm leading-relaxed after:content-['|'] after:ml-0.5 after:animate-pulse after:text-purple-400"></p>`;

    const bioElement = document.getElementById('bio-text');
    if (bioElement) {
        typeWriter(bioElement, bioText, 5);
    }
}

async function switchtab(targetTab) {
    const biobtn = document.getElementById('bio-tab');
    const contactbtn = document.getElementById('contact-tab');
    const content = document.getElementById('content-panel');

    const activeClasses = ['border-purple-400', 'text-purple-300', 'hover:text-white'];
    const inactiveClasses = ['border-transparent', 'text-purple-300/60', 'hover:text-purple-200'];

    const response = await fetch('../data/data.json');
    if (!response.ok) throw new Error("Error fetching data");

    const data = await response.json();

    if (targetTab === 'contacts' && contactbtn.getAttribute('aria-selected') !== 'true') {
        biobtn.setAttribute('aria-selected', 'false');
        biobtn.classList.remove(...activeClasses);
        biobtn.classList.add(...inactiveClasses);

        contactbtn.setAttribute('aria-selected', 'true');
        contactbtn.classList.remove(...inactiveClasses);
        contactbtn.classList.add(...activeClasses);

        content.innerHTML = `
            <p class="text-xs text-slate-300/80 mb-4 leading-relaxed">
                Feel free to connect with me professionally or reach out for research collaborations.
            </p>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-purple-900/50">
                <thead>
                  <tr class="text-left">
                    <th class="px-3 py-2 whitespace-nowrap">
                        <a href="${data.descriptors.find(item => item.name === 'linkedin').text.toString()}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-purple-200 hover:text-purple-300 transition-colors">
                            <svg class="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                            </svg>
                            <span>LinkedIn</span>
                        </a>
                    </th>
                    <th class="px-3 py-2 whitespace-nowrap">
                        <a href="${data.descriptors.find(item => item.name === 'github').text.toString()}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-purple-200 hover:text-purple-300 transition-colors">
                            <svg class="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
        `;
    }
    else if (targetTab === 'bio' && biobtn.getAttribute('aria-selected') !== 'true') {
        contactbtn.setAttribute('aria-selected', 'false');
        contactbtn.classList.remove(...activeClasses);
        contactbtn.classList.add(...inactiveClasses);

        biobtn.setAttribute('aria-selected', 'true');
        biobtn.classList.remove(...inactiveClasses);
        biobtn.classList.add(...activeClasses);

        renderText(data.descriptors.find(item => item.name === 'bio')?.text || 'Nothing New Here!!');
    }
}

async function loadAllData() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error("Error fetching data");

        const data = await response.json();

        renderSkills(data.skills);
        renderText(data.descriptors.find(item => item.name === 'bio')?.text || 'Nothing New Here!!');
        renderProjects(data.projects);

    } catch (error) {
        console.error("Error:", error);
    }
}

function renderSkills(skills) {
    const container = document.getElementById("skill-tag");
    if (!container) return;

    container.innerHTML = skills.map(skill => `
        <span class="inline-flex items-center justify-center gap-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 px-3 py-1 text-purple-200">
          <img src="${skill.icon}" alt="${skill.name}" class="size-4" />
          <span class="text-xs font-medium whitespace-nowrap">${skill.name}</span>
        </span>
    `).join('');
}

function renderProjects(projects) {
    const container = document.getElementById("projects");

    if (!container) return;

    var colors=["text-emerald-700","text-green-400","text-orange-500","text-yellow-400","text-red-500"]

    container.innerHTML = projects.map(project => `
         <a href="${project.link}" target="_blank" class="block w-full p-5 bg-black/90 rounded-xl border border-purple-900/40 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/60 hover:shadow-purple-900/20 group">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="size-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
                        <h3 class="text-base font-semibold text-slate-100 group-hover:text-purple-300 transition-colors">
                            ${project.name}
                        </h3>
                    </div>

                    <div class="mb-4">
                        <span class="text-xs font-semibold text-purple-300/80 uppercase tracking-wider block mb-0.5">Briefing:</span>
                        <p class="text-xs text-slate-300/80 leading-relaxed">
                            ${project.description}
                        </p>
                    </div>

                    <div class="flex items-center gap-2 pt-3 border-t border-purple-950">
                        <span class="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">Status:</span>
                        <div class="relative size-4 flex items-center justify-center">
                            <svg class="size-full -rotate-90" viewBox="0 0 36 36">
                                <path class="text-slate-800" stroke-width="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path class="text-emerald-700" stroke-width="4" stroke-dasharray="${project.state}, 100" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                        </div>

                        <span class="text-xs text-slate-300 font-mono">${project.state}% completed</span>
                    </div>
                    <div class="relative size-4 flex items-right justify-right mt-2">
                        <span style="color: #6366f1;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                            <line x1="4" y1="22" x2="4" y2="15"></line>
                          </svg>
                        </span>
                        <p class="text-sm font-medium text-gray-500">${project.tag}</p>
                    </div>
                </a>
    `).join('');
}