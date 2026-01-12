/**
* notFound.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import {App} from '../state.js';

export function index() 
{
	App.setTitle("Not Found");
	$("#app").html("<h1>404</h1>");
}
