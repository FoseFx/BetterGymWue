"use strict";var precacheConfig=[["/3rdpartylicenses.txt","e7a36df360296b509f5e400247da4924"],["/assets/iconfont/MaterialIcons-Regular.eot","e79bfd88537def476913f3ed52f4f4b3"],["/assets/iconfont/MaterialIcons-Regular.ijmap","ed6a98d002bc0b535dd8618f3ae05fe7"],["/assets/iconfont/MaterialIcons-Regular.svg","a1adea65594c502f9d9428f13ae210e1"],["/assets/iconfont/MaterialIcons-Regular.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["/assets/iconfont/MaterialIcons-Regular.woff","3c3d0242794b4682460a3f7c7a2126ee"],["/assets/iconfont/MaterialIcons-Regular.woff2","c58629e330eaf128316a142320407d74"],["/assets/iconfont/material-icons.css","eb1fa348034b042e91c3b79f5c01beb6"],["/assets/logo/128.png","fe524b45bbd1eff268009060520d6984"],["/assets/logo/192.png","ebaa293c45b11d687f6f57ad2f8b0a95"],["/assets/logo/384.png","fad610ba021e61185934a14efa6a8a83"],["/assets/logo/72.png","0618164be4b2f4fc0e67d7c63c845cd0"],["/assets/logo/orig.png","ac60146e64b4ec2ea67c8c69827c945a"],["/assets/nav.jpg","998bd3427cfc3b940ca65a5954600171"],["/favicon.ico","c6f1b43e06c5e65f2fe0575f35863d47"],["/index.html","96117ef0a387c9954e743a226a2eb129"],["/main.4e94f6ce4db5dcd667e4.js","41d8fcffd211149b6627cc2b3d6047dc"],["/manifest.json","1c3656d665b0e12a16875ab0f76f1974"],["/polyfills.63367aac1003b669380e.js","f90eae84313f153ded59ce49e8f3546a"],["/runtime.6afe30102d8fe7337431.js","f2c1a0d5e113c332e6bbe7887eb378b2"],["/scripts.066192c91b4a4ce86592.js","6216e73cef7fda3fa449633dbdd2b970"],["/styles.f558d7e74a93ca93cfa2.css","413250b7398e00790d76cce2ff05e79d"]],cacheName="sw-precache-v3-sw-precache-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,!1);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__)"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});