/**
* helpers.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/

// export * from "./slugify.js";
// export * from "./debounce.js";
// export * from "./formatDate.js";

// services/titleService.js
export function setTitle(parts = []) {
  const suffix = "Abhyasa";
  document.title = [...parts, suffix].join(" / ");
}

export function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// export const qs = (root, selector) => root.querySelector(selector);
// export const qsa = (root, selector) => [...root.querySelectorAll(selector)];

/**
template string extrapolation helper:

console.log(fillTemplate("Hello ${this.name}!", { name: "world"}));
*/

export function tmpl(tstr, tvars){
    return new Function("return `"+ tstr +"`;").call(tvars);
}


