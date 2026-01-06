/**
* quiz.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import { App } from '../state.js';

export async function index({ topic, subtopic }) {
	$("#app").html('<div class="text-center mt-5"><div class="spinner-border text-primary" role="status"></div><p>Loading modules...</p></div>');
	let modules;
	let tname = `${topic} / ${subtopic}`;
	//if (subtopic) tname += ` / ${subtopic}`;
	let html = ""; //`<label class='bold muted'>${tname}</label><br><br>`;
	// fetch quiz data
	const currentTopic = App.topics.find(tt => tt.slug === topic);
	if (subtopic == 'main') {
		modules = currentTopic.modules || [];
	} else {
		const currentSub = currentTopic.subtopics?.find(st => st.slug === subtopic);
		modules = currentSub ? currentSub.modules : [];			
	}
	
	//BUILD THE UI
	html += `
        <div class="container py-4">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active text-capitalize">${topic}</li>
                    <li class="breadcrumb-item active text-capitalize">${subtopic}</li>
                </ol>
            </nav>
            
            <h2 class="h4 mb-4 text-secondary border-bottom pb-2">Select a Module</h2>
            
            <div class="list-group shadow-sm">`;	
	
	//TODO: generate a list/cards block
	modules.forEach(mm => {
            // Construct the path for the 'play' route
            const path = `/play/${topic}/${subtopic}/${mm.slug}`;

            html += `
                <a href="${path}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold text-primary">${mm.name}</div>
                        <small class="text-muted">Tap to start the challenge</small>
                    </div>
                    <i class="fas fa-chevron-right text-muted"></i>
                </a>`;
        });
		
	html += `</div></div>`;
		
    $("#app").html(html);
  }