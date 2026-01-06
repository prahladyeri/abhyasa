/**
* main.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import './css/app.css';

import { App } from './state.js';
import * as home from "./controllers/home.js";
import * as about from "./controllers/about.js";
import * as quiz from "./controllers/quiz.js";
import * as play from "./controllers/play.js";
import * as notFound from "./controllers/notFound.js";
const controllers = {home, about, quiz, play, notFound};

async function initData() 
{
	try {
		const REMOTE_INDEX = App.REMOTE_BASE + "index.json";
		console.log("fetching index json");
		// Fetch in background, update only if changed
		const res = await fetch(REMOTE_INDEX, {method: 'GET', cache: 'default'});
		const data = await res.json();
		App.data = data.subjects;
		renderNavbar();
	}
	catch(err) {
	  console.error('Fetch error:', err);
	}
}

function renderNavbar() {
	const $nav = $("#navbar-menu");
	$nav.empty();

	let html = `
	<ul class="navbar-nav">
	  <!--li class="nav-item">
		<a class="nav-link" href="/" data-link><i class="fas fa-home"></i> Home</a>
	  </li-->
	`;

	App.data.forEach(topic => {
	html += `
	  <li class="nav-item dropdown">
		<a class="nav-link dropdown-toggle"
		   href="#"
		   role="button"
		   data-bs-toggle="dropdown"
		   aria-expanded="false"><i class="fas fa-book"></i> 
		  ${topic.name}
		</a>
		<ul class="dropdown-menu">
		  <!-- Core topic -->
		  <li>
			<a class="dropdown-item"
			   href="/quiz/${topic.slug}/main"
			   data-link><i class="fas fa-book"></i> 
			  ${topic.name}
			</a>
		  </li>
	`;
	// Non-core subtopics
	(topic.subtopics || [])
	  .forEach(st => {
		html += `
		  <li>
			<a class="dropdown-item"
			   href="/quiz/${topic.slug}/${st.slug}"
			   data-link><i class="fas fa-book"></i> 
			  ${topic.name} / ${st.name}
			</a>
		  </li>
		`;
	  });

	html += `
		</ul>
	  </li>
	`;
	});

	html += `</ul>`;
	$nav.html(html);
}


function route(path) {
	console.log("routing... path: ", path);
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) return controllers.home.index();
  switch(parts[0]) {
	  case "about":
		return controllers.about.index();
		break;
	  case "quiz":
		return controllers.quiz.index({topic: parts[1], subtopic: parts[2]});
		break;
	  case "play":
		return controllers.play.index({topicSlug: parts[1], subtopicSlug: parts[2], moduleSlug: parts[3]});
		break;
  }
  controllers.notFound.index();
}

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
  //TODO: await openDB();
  await initData();
  route(location.pathname);
});