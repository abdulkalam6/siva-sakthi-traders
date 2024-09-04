(function() {
    var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
    var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.d0e4879b963e0e978ad2.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/3449.latest.en.20be78c1a45b33a5672f.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/358.latest.en.260aa393b480d8eed634.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/5816.latest.en.62966691cce79d1ce69d.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.b3e5316682e88c0a3a6c.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/4100.latest.en.8e7cc044415897fd13ea.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/9174.latest.en.c49e25b53c238344c3da.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/2980.latest.en.1303281e75a349fc9c67.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/794.latest.en.f8a7f2bbf7aef3e0f8bf.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/2976.latest.en.4bc0354b7faf13c65062.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/7683.latest.en.1c5abab11805b9d4c9ed.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/8024.latest.en.24b8bc0ed949025e8965.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/8217.latest.en.b1c1da41ebb3271d6808.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/6137.latest.en.5a37917b374881db5eb3.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.26de53b75461a47b4cda.js"];
    var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/3449.latest.en.57ba89ab7b427311c039.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.8bb004feb2aa35e02d5d.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.f39ddd9f2fb7597dd7bf.css"];
    var fontPreconnectUrls = [];
    var fontPrefetchUrls = [];
    var imgPrefetchUrls = [];

    function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
    }

    function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
            var res = resources[index++];
            if (res) preconnect(res, next);
        })();
    }

    function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
            link.rel = 'prefetch';
            link.fetchPriority = 'low';
            link.as = as;
            if (as === 'font') link.type = 'font/woff2';
            link.href = url;
            link.crossOrigin = '';
            link.onload = link.onerror = callback;
            document.head.appendChild(link);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onloadend = callback;
            xhr.send();
        }
    }

    function prefetchAssets() {
        var resources = [].concat(
            scripts.map(function(url) {
                return [url, 'script'];
            }),
            styles.map(function(url) {
                return [url, 'style'];
            }),
            fontPrefetchUrls.map(function(url) {
                return [url, 'font'];
            }),
            imgPrefetchUrls.map(function(url) {
                return [url, 'image'];
            })
        );
        var index = 0;
        (function next() {
            var res = resources[index++];
            if (res) prefetch(res[0], res[1], next);
        })();
    }

    function onLoaded() {
        preconnectAssets();
        prefetchAssets();
    }

    if (document.readyState === 'complete') {
        onLoaded();
    } else {
        addEventListener('load', onLoaded);
    }
})();