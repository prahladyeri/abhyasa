/**
* about.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
//import { VERSION, BUILD } from '../build.js';
import { version as bsVersion } from 'bootstrap/package.json';
import aboutHtml from '../views/about.html';
import {setTitle} from '../helpers.js';

export function index() 
{
	setTitle(["About"]);
	const html = aboutHtml
		.replace('{{BUILD}}', `v${process.env.VERSION}-${process.env.BUILD}`)
		.replace('{{BS_VERSION}}', `v${bsVersion}`);
	$("#app").html(html);
}
