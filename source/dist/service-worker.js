"use strict";var precacheConfig=[["/4.b1a3b3cd9ff2d2ee8e95.js","8e3a3ac8b9694674174f801388399a5c"],["/5.89ac5314235c752ac0ae.js","c30d7a18421815340696c8687d8980f1"],["/assets/iconfont/MaterialIcons-Regular.eot","e79bfd88537def476913f3ed52f4f4b3"],["/assets/iconfont/MaterialIcons-Regular.ijmap","ed6a98d002bc0b535dd8618f3ae05fe7"],["/assets/iconfont/MaterialIcons-Regular.svg","a1adea65594c502f9d9428f13ae210e1"],["/assets/iconfont/MaterialIcons-Regular.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["/assets/iconfont/MaterialIcons-Regular.woff","3c3d0242794b4682460a3f7c7a2126ee"],["/assets/iconfont/MaterialIcons-Regular.woff2","c58629e330eaf128316a142320407d74"],["/assets/iconfont/material-icons.css","eb1fa348034b042e91c3b79f5c01beb6"],["/assets/logo/128.png","fe524b45bbd1eff268009060520d6984"],["/assets/logo/192.png","ebaa293c45b11d687f6f57ad2f8b0a95"],["/assets/logo/384.png","fad610ba021e61185934a14efa6a8a83"],["/assets/logo/72.png","0618164be4b2f4fc0e67d7c63c845cd0"],["/assets/logo/orig.png","ac60146e64b4ec2ea67c8c69827c945a"],["/assets/nav.jpg","998bd3427cfc3b940ca65a5954600171"],["/favicon.ico","c6f1b43e06c5e65f2fe0575f35863d47"],["/index.html","c98a07675e30c3f64c6f54e26ce894f4"],["/main.4dcfecc9da7f0956cbe4.js","823fe219ba5fedab1b68c29331844321"],["/manifest.json","a8daec92e63d3d8072c67b5b43517b28"],["/nav.998bd3427cfc3b940ca6.jpg","998bd3427cfc3b940ca65a5954600171"],["/polyfills.66329502b133f6f13afb.js","94ebecc405212046832217c67cfe7acb"],["/runtime.9bfe8c7b1608778dbe34.js","205bfaa1e331b8e4c11c215dd485cb35"],["/scripts.03e042f1f102bf0e2ed8.js","9607765abd69b1434d838e4750ad29b6"]],cacheName="sw-precache-v3-sw-precache-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,!1);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__)"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});