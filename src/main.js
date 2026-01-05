import './app.css';

const App = {db: null, topics: []};

import * as home from "./controllers/home.js";
import * as about from "./controllers/about.js";
import * as quiz from "./controllers/quiz.js";
import * as notFound from "./controllers/notFound.js";
const controllers = {home, about, quiz, notFound};

async function openDB() {
  //TODO: you can replace this later with idb library if needed
}

async function saveCachedIndex(index) {
	//TODO:
}

async function initData() {
  const REMOTE_INDEX =
    "https://prahladyeri.github.io/open-quiz-commons/index.json";
	console.log("fetching index json");
	// Fetch in background, update only if changed
	fetch(REMOTE_INDEX, {method: 'GET', cache: 'default'})
	.then(r => r.json())
	.then(data => {
		console.log("data received:", data);
		App.topics = data.subjects;
		console.log("App.topics:", App.topics);
		saveCachedIndex(data.subjects);
		renderNavbar(); // re-render menus
	})
	.catch(error => {
	  console.error('Fetch error:', error);
	});
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

	App.topics.forEach(topic => {
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
			   href="/quiz/${topic.slug}"
			   data-link><i class="fas fa-book"></i> 
			  ${topic.name} (Core)
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
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) return controllers.home.index();
  switch(parts[0]) {
	  case "about":
		return controllers.about.index();
		break;
	  case "quiz":
		return controllers.quiz.index({topic: parts[1], subtopic: parts[2]});
		break;
  }
  controllers.notFound.index();
}

// const controllers = {
  // home() {
    // $("#app").html("<h1>Welcome to Abhyasa</h1>");
  // },

  // about() {
    // $("#app").html("<h1>About Abhyasa</h1>");
  // },

  // async quiz({ topic, subtopic }) {
    // $("#app").html("<p>Loading quiz…</p>");

    // let data = await getTopic(topic, subtopic);

    // if (!data) {
      // data = await fetchQuizData(topic, subtopic);
      // saveTopic(topic, subtopic, data);
    // }

    // renderQuiz(data);
  // },

  // notFound() {
    // $("#app").html("<h1>404</h1>");
  // },
// };


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
  await openDB();
  await initData();
  route(location.pathname);
});



// document.getElementById('app').innerHTML = `
  // <h1>Abhyasa</h1>
  // <p>Build successful.</p>
// `;
