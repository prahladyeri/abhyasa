/**
* quiz.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import quizHtml from '../views/quiz.html';
import { App } from '../state.js';
import {setTitle} from '../helpers.js';

export async function index({ topic, subtopic }) {
	setTitle([topic, subtopic]);
	
	$("#app").html(quizHtml);

	const currentTopic = App.data.find(tt => tt.slug === topic);
	let modules;

	if (subtopic === 'main') {
		modules = currentTopic.modules;
	} else {
		const currentSub = currentTopic.subtopics?.find(st => st.slug === subtopic);
		modules = currentSub ? currentSub.modules : [];			
	}
	
	if (!modules.length) {
		return App.helpers.redirect("/not-found", { replace: true });		
	}
	
	// Fill breadcrumb
	$('#bc-topic').text(topic);
	$('#bc-subtopic').text(subtopic);
	
	const list = document.getElementById('modules-list');
	const tpl = document.getElementById('module-item');	
	
	modules.forEach(mm => {
			const node = tpl.content.cloneNode(true);
			const link = node.querySelector('a');
			link.href = `/play/${topic}/${subtopic}/${mm.slug}`;
			node.querySelector('.module-name').textContent = mm.name;
			list.appendChild(node);
        });
  }