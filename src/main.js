/**
* main.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
//import './css/theme.css';
import './css/app.css';

import $ from "jquery";
window.$ = $;
window.jQuery = $;

import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
window.bootstrap = bootstrap;

// import 'bootstrap/dist/js/dropdown';
// import 'bootstrap/dist/js/collapse';
// import 'bootstrap/dist/js/modal';
// import 'bootstrap/dist/js/tooltip';


import { route } from "./router.js";
import { initData } from './services';
import { App } from './state.js';

function renderNavbar() {
	document.querySelector("#navbar-menu").innerHTML = "";

	let html = ``;

	App.data.forEach(topic => {
	let iconClass = (topic.icon ? topic.icon : "fas fa-book");
	html += `
	  <li class="nav-item dropdown">
		<a class="nav-link dropdown-toggle"
		   href="#"
		   role="button"
		   data-bs-toggle="dropdown"
		   aria-expanded="false"><i class="${iconClass}  fa-lg me-2"></i>${topic.name}</a>
		<ul class="dropdown-menu">
		  <!-- Core topic -->
		  <li>
			<a class="dropdown-item"
			   href="/quiz/${topic.slug}/main"
			   data-link><i class="fas fa-book me-2"></i>${topic.name}</a>
		  </li>
	`;
	// Non-core subtopics
	(topic.subtopics || [])
	  .forEach(st => {
		if (st.modules.length == 0 || st.hidden) return;
		  
		html += `
		  <li>
			<a class="dropdown-item"
			   href="/quiz/${topic.slug}/${st.slug}"
			   data-link><i class="fas fa-book me-2"></i>${topic.name} › ${st.name}</a>
		  </li>
		`;
	  });

	html += `
		</ul>
	  </li>
	`;
	});

	html += `<li class="nav-item ms-lg-auto">
	<a class="nav-link" href="/about" data-link><i class="fas fa-info-circle fa-lg me-1"></i> About</a></li>`;
	document.querySelector("#navbar-menu").innerHTML = html;
}



// dom events
$("#themeToggle").on("click", function() {
  const currentTheme = $("html").attr("data-bs-theme");
  $("html").attr("data-bs-theme", currentTheme === "dark" ? "light" : "dark");
});


/* -----------------------------
   Navigation handling
------------------------------ */
$(document).on("click", "a[data-link]", function (e) {
	e.preventDefault();
	const href = $(this).attr("href");
	history.pushState({}, "", href);
	route(location.pathname);
});

window.addEventListener("popstate", () => {
	route(location.pathname);
});

/* -----------------------------
   App bootstrap
------------------------------ */
$(async function () {
	console.log("initializing..");
	
	await initData();
	console.log("rendering navbar..");
	renderNavbar();
	// document.querySelectorAll('.nav-link.dropdown-toggle')
		// .forEach(el => el.addEventListener('click', e => e.preventDefault()));
	route(location.pathname);
});