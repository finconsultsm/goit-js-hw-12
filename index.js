import{a as h,S as q,i as g}from"./assets/vendor-C4-ZuMk8.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const P="30127977-afd00810882476e7ef9a8a757";h.defaults.baseURL=`https://pixabay.com/api/?key=${P}&image_type=photo&orientation=horizontal&safesearch=true`;const b=async(s,a=15,e=1)=>{const{data:o}=await h(`&q=${s}&per_page=${a}&page=${e}`);return o},L=document.querySelector(".gallery"),S=new q(".gallery a",{captionsData:"alt",captionDelay:250}),$=s=>{const a=s.map(({webformatURL:e,largeImageURL:o,tags:t,views:r,likes:c,comments:w,downloads:v})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${e}"
              alt="${t}"
            />
            <ul class="gallery-info">
              <li class="gallery-item-info">
                <p class="info-item-title">
                Likes
                </p>
                <p class="info-item-value">
                  ${c}
                </p>
              </li>
              <li class="gallery-item-info">
                <p class="info-item-title">
                  Views
                </p>
                <p class="info-item-value">
                  ${r}
                </p>
              </li>
              <li class="gallery-item-info">
                <p class="info-item-title">
                  Comments
                </p>
                <p class="info-item-value">
                  ${w}
                </p>
              </li>
              <li class="gallery-item-info">
                <p class="info-item-title">
                  Downloads
                </p>
                <p class="info-item-value">
                  ${v}
                </p>
              </li>
            </ul>
          </a>
        </li>
      `).join("");L.insertAdjacentHTML("beforeend",a),S.refresh()},M=()=>{L.innerHTML=""},m=document.querySelector(".search-form"),u=document.querySelector(".loader-wrapper"),d=document.querySelector(".load-more"),y=document.querySelector(".end-content"),i=new URL(window.location),n=i.searchParams;let l=n.get("q");const p=n.get("per_page")?n.get("per_page"):15,D=n.get("page")?n.get("page"):1;l?(m.query.value=l,f(l,p,D)):m.query.value="";m.addEventListener("submit",s=>{s.preventDefault(),d.classList.add("hidden");const e=new FormData(m).get("query").trim();if(e!==l){if(e.length<1){g.error({title:"Error",position:"topRight",message:"Query field cannot be empty!"});return}e!==l&&(M(),i.searchParams.delete("page")),i.searchParams.set("q",e),i.searchParams.set("per_page",p),window.history.pushState({},"",i),l=e,f(e,p)}});d.addEventListener("click",E);async function E(){const s=document.querySelector(".gallery-item"),{height:a}=s.getBoundingClientRect(),e=n.get("page")?Number(n.get("page"))+1:2;i.searchParams.set("page",e),window.history.pushState({},"",i),await f(l,p,e),window.scrollBy({top:a*2,behavior:"smooth"})}async function f(s,a,e=1){u.classList.add("show");try{const o=await b(s,a,e);u.classList.remove("show"),o.hits.length<1?(d.classList.add("hidden"),g.error({title:"Error",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})):d.classList.remove("hidden"),o.hits.length>0&&e>=O(o.totalHits,a)?(d.classList.add("hidden"),y.classList.remove("hidden")):y.classList.add("hidden"),$(o.hits)}catch{u.classList.remove("show"),g.error({title:"Error",position:"topRight",message:"Failed to load images. Please try again!"})}}function O(s,a){return Math.ceil(s/a)}
//# sourceMappingURL=index.js.map
