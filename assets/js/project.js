"use strict";

/*=========================================
        CONFIG
=========================================*/

const CONFIG = {

    ROOT: "assets/projects/"

};

/*=========================================
        DOM
=========================================*/

const DOM = {

    hero:
        document.getElementById("projectHero"),

    overview:
        document.getElementById("projectOverview"),

    gallery:
        document.getElementById("projectGallery"),

    videos:
        document.getElementById("projectVideos"),

    features:
        document.getElementById("projectFeatures"),

    technologies:
        document.getElementById("projectTechnologies"),

    specifications:
        document.getElementById("projectSpecifications"),

    challenges:
        document.getElementById("projectChallenges"),

    future:
        document.getElementById("projectFuture"),

    downloads:
        document.getElementById("projectDownloads"),

    related:
        document.getElementById("relatedProjects")

};


/*=========================================
        URL
=========================================*/

const params = new URLSearchParams(

    window.location.search

);

const projectID = params.get("id");


/*=========================================
        LOAD PROJECT
=========================================*/

async function loadProject(){

    if(!projectID){

        location.href="projects.html";

        return;

    }

    const response = await fetch(

        `${CONFIG.ROOT}${projectID}/data.json`

    );

    const project = await response.json();

    project.folder = projectID;

    buildProject(project);

}

loadProject();


/*=========================================
        BUILD
=========================================*/

function buildProject(project){

    buildHero(project);

    buildOverview(project);

    buildGallery(project);

    buildVideos(project);

    buildFeatures(project);

    buildTechnologies(project);

    buildSpecifications(project);

    buildChallenges(project);

    buildFuture(project);

    buildDownloads(project);

}


/*=========================================
        HERO
=========================================*/

function buildHero(project){

DOM.hero.innerHTML=

`

<div class="container">

<div class="project-hero">

<div class="project-content">

<span class="badge">

${project.category.join(" • ")}

</span>

<h1>

${project.title}

</h1>

<h3>

${project.subtitle}

</h3>

<p>

${project.description}

</p>

<div class="tech-list">

${project.technologies.map(

tech=>

`<span>${tech}</span>`

).join("")}

</div>

<a

class="btn-primary"

href="${project.links.github}"

target="_blank"

>

Github

</a>

<a

class="btn-secondary"

href="${project.links.demo}"

target="_blank"

>

Live Demo

</a>

</div>

<div class="project-cover">

<img

src="assets/projects/${project.folder}/${project.hero}"

>

</div>

</div>

</div>

`;

}


function buildOverview(project){

DOM.overview.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Project Overview

</h2>

</div>

<p>

${project.overview}

</p>

</div>

`;

}

function buildGallery(project){

    DOM.gallery.innerHTML = `

    <div class="container">

        <div class="section-title">

            <h2>Gallery</h2>

        </div>

        <div class="gallery-grid">

            ${project.gallery.map((image, index) => `

                <img

                    class="gallery-image"

                    data-index="${index}"

                    loading="lazy"

                    decoding="async"

                    src="assets/projects/${project.folder}/${image}"

                    alt="${project.title}"

                >

            `).join("")}

        </div>

    </div>

    `;

    // Get all gallery images
    const images = [
        ...document.querySelectorAll(".gallery-image")
    ];

    // Add click event to each image
    images.forEach(image => {

        image.addEventListener("click", () => {

            gallery.open(

                images.map(img => img.src),

                Number(image.dataset.index)

            );

        });

    });

}


function buildVideos(project){

if(project.videos.length===0)

return;

DOM.videos.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Videos

</h2>

</div>

<div class="video-grid">

${project.videos.map(

video=>

`

<video

controls

>

<source

src="assets/projects/${project.folder}/${video}"

type="video/mp4"

>

</video>

`

).join("")}

</div>

</div>

`;

}



function buildFeatures(project){

DOM.features.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Features

</h2>

</div>

<div class="feature-grid">

${project.features.map(

feature=>

`

<div class="glass-card">

✔

${feature}

</div>

`

).join("")}

</div>

</div>

`;

}


function buildTechnologies(project){

DOM.technologies.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Technologies

</h2>

</div>

<div class="tech-list">

${project.technologies.map(

tech=>

`<span>${tech}</span>`

).join("")}

</div>

</div>

`;

}

function buildSpecifications(project){

let html="";

for(const key in project.specifications){

html+=`

<tr>

<td>

${key}

</td>

<td>

${project.specifications[key]}

</td>

</tr>

`;

}

DOM.specifications.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Specifications

</h2>

</div>

<table class="spec-table">

${html}

</table>

</div>

`;

}


function buildChallenges(project){

DOM.challenges.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Challenges

</h2>

</div>

<ul>

${project.challenges.map(

challenge=>

`<li>${challenge}</li>`

).join("")}

</ul>

</div>

`;

}


function buildFuture(project){

DOM.future.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Future Improvements

</h2>

</div>

<ul>

${project.future.map(

item=>

`<li>${item}</li>`

).join("")}

</ul>

</div>

`;

}


function buildDownloads(project){

DOM.downloads.innerHTML=

`

<div class="container">

<div class="section-title">

<h2>

Downloads

</h2>

</div>

<div class="download-grid">

${project.documents.map(

file=>

`

<a

href="assets/projects/${project.folder}/${file.file}"

class="download-card"

target="_blank"

>

${file.title}

</a>

`

).join("")}

</div>

</div>

`;

}