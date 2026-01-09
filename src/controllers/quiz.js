/**
* quiz.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import quizHtml from '../views/quiz.html';
import { App } from '../state.js';
import {setTitle} from '../helpers.js';

export async function index(parsed) {
	setTitle(
		parsed.tname === parsed.stname
			? [parsed.tname]
			: [parsed.tname, parsed.stname]
		);
	
	$("#app").html(quizHtml);

	const currentTopic = App.data.find(tt => tt.slug === parsed.tslug);
	let modules;

	if (parsed.stslug === 'main') {
		modules = currentTopic.modules;
	} else {
		const currentSub = currentTopic.subtopics?.find(st => st.slug === parsed.stslug);
		modules = currentSub ? currentSub.modules : [];			
	}
	
	if (!modules.length) {
		return App.helpers.redirect("/not-found");
	}
	
	// Fill breadcrumb
	$('#bc-topic').text(parsed.tname);
	$('#bc-subtopic').text(parsed.stname);
	
	const list = document.getElementById('modules-list');
	const tpl = document.getElementById('module-item');	
	
	modules.forEach(mm => {
			const node = tpl.content.cloneNode(true);
			const link = node.querySelector('a');
			link.href = `/play/${parsed.tslug}/${parsed.stslug}/${mm.slug}`;
			node.querySelector('.module-name').textContent = mm.name;
			list.appendChild(node);
        });
  }