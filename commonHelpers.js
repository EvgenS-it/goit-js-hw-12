import{S as p,i as l}from"./assets/vendor-0fc460d7.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const m={PIXABAY:{PATH:"https://pixabay.com/api/",KEY:"44444020-42ceddb875011e5970bd122af"}},f=async(r,i)=>{const o=new URLSearchParams({key:m.PIXABAY.KEY,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(m.PIXABAY.PATH+"?"+o.toString()).then(t=>{if(!t.ok)throw new Error("Failed to fetch images");return t.json()}).catch(t=>{throw console.error("Error fetching images:",t),t})},u=r=>`
    <a href="${r.largeImageURL}" class="item">
      <img src="${r.webformatURL}" alt="" alt="${r.tags}"/>
      <div class="data">
        <p><b>Likes</b> <span>${r.likes}</span></p>
        <p><b>Views</b> <span>${r.views}</span></p>
        <p><b>Comments</b> <span>${r.comments}</span></p>
        <p><b>Downloads</b> <span>${r.downloads}</span></p>
      </div>
    </a>
  `,a=document.querySelector("form.form-search"),n=document.querySelector(".gallery"),h=new p(".gallery a",{});a&&a.addEventListener("submit",r=>{r.preventDefault();const i=a.elements.search.value;i?(n.innerHTML="",n.classList.add("is-load"),f(i).then(o=>{n.classList.remove("is-load");const t=[];o.total===0?l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",class:"error",color:"red"}):(o.hits.forEach(e=>{t.push(u(e))}),n.innerHTML=t.join(""),h.refresh())}).catch(o=>{n.classList.remove("is-load"),l.error({message:`Sorry, something went wrong! ${o.message}`,position:"topRight",class:"error",color:"red"})}),a.reset()):l.error({message:"Please enter a search term",position:"topRight",class:"error",color:"red"})});
//# sourceMappingURL=commonHelpers.js.map
