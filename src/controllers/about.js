import { VERSION, BUILD } from '../build.js';

export function index() 
{
	$("#app").html(`<div style='font-family: "cascadia code";'>
	<h1>About Abhyasa</h1>
	<pre>
	Version: ${VERSION}
	Build: ${BUILD}
	</pre>
	</div>
	`);
}
