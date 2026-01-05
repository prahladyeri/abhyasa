/**
* about.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import { VERSION, BUILD } from '../build.js';

export function index() 
{
	$("#app").html(`<div style='font-size: 15px;'>
	<pre >
	<strong>ABOUT ABHYASA</strong>
	
	<strong>Version:</strong> ${VERSION}
	<strong>Build:</strong> ${BUILD}
	
	<strong>Third party components used (Credits):<strong>
	- <a href="https://jquery.com/" target="_blank" rel="noopener">jQuery</a> · <a href="https://getbootstrap.com/" target="_blank" rel="noopener">Bootstrap</a> · <a href="https://fontawesome.com/icons/" target="_blank" rel="noopener">Font awesome</a>
	- <a href="https://www.cloudflare.com/" target="_blank" rel="noopener">Cloudflare Pages</a> (Hosting)
	
	<strong>Donate to help open source sustenance:<strong>
	- <a class='text-bold' href="https://paypal.me/prahladyeri">Donate with PayPal</a>	
	- <a href="upi://pay?pa=prahladyeri14-1@okaxis&cu=INR">Donate with UPI</a>
	- Donate with UPI (scan QR code):
	
	<img src="./upi-axis.png" style='max-width:100px'>
	</pre>
	</div>
	`);
}
