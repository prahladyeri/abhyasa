/**
* services.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import {App} from './state.js';

export async function initData() 
{
	try {
		const REMOTE_INDEX = App.REMOTE_BASE + "index.json";
		console.log("fetching index json");
		// Fetch in background, update only if changed
		const res = await fetch(REMOTE_INDEX, {method: 'GET', cache: 'default'});
		const data = await res.json();
		App.data = data.subjects;
	}
	catch(err) {
	  console.error('Fetch error:', err);
	}
}
