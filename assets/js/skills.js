"use strict";

const skillsContainer = document.getElementById("skillsContainer");

async function loadSkills(){

    if(!skillsContainer) return;

    const response = await fetch("assets/data/skills.json");

    const data = await response.json();

    renderSkills(data.categories);

}

function renderSkills(categories){

    skillsContainer.innerHTML = "";

    categories.forEach(category=>{

        const card=document.createElement("div");

        card.className="skill-category glass-card fade-up";

        card.innerHTML=`

            <div class="skill-header">

                <i class="${category.icon}"></i>

                <h3>${category.title}</h3>

            </div>

            ${category.skills.map(skill=>`

                <div class="skill">

                    <div class="skill-info">

                        <span>${skill.name}</span>

                        <span>${skill.level}%</span>

                    </div>

                    <div class="skill-bar">

                        <div
                            class="skill-progress"
                            style="width:${skill.level}%">
                        </div>

                    </div>

                </div>

            `).join("")}

        `;

        skillsContainer.appendChild(card);

    });

}

loadSkills();