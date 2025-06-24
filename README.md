# view-route

A vanilla `<view-route>` custom element to provide client-side routing in vanilla JS single-page applications.

## Using

### Basic routing

Drop `public/view-route.js` somewhere in your project. 

Load it into the webpage as an ES module.

```html
<script src="view-route.js" type="module"></script>
```

Define routes using `<view-route>`:

```html
<view-route path="/(?:index.html)?" exact>
    A home page. <a href="/details">Go to details</a>.
</view-route>
<view-route path="/details">
    <p>A details page. Show <a href="/details/1">item 1</a> or <a href="/details/2">item 2</a>.</p>
    <view-route id="nested" path="/details/([\\w]+)">
        A nested route with a parameter.
        <span>value goes here</span>
    </view-route>
</view-route>
<view-route path="*">
    404 not found.
</view-route>
<script>
    const route = document.getElementById('nested');
    const span = route.querySelector('span');
    route.addEventListener('routechange', (e) => {
        if (e.detail) {
            span.textContent = 'showing item ' + e.detail[2];
        } else {
            span.textContent = 'no value';
        }
    });
</script>
```

The `<view-route>` custom element API:

- `path` attribute: a regex to match against the current location. Interpreted relative to the document's URL.
  When the path matches `style.display` is set to `contents`, otherwise it is set to `none`.
- `exact` attribute: whether an exact match should be done (regex ends on `$`)
- `matches` property: the current matched regex. Index 0 has the full URL, index 1 has the path relative to the document's URL, 
  captured subgroups from `path` are after that.
- `isActive` property: whether the `<view-route>` element matches the current location and is visible.
- `routechange` event: triggered every time the route is updated, `e.detail` contains the new value of `matches`.

A special value for `path` is `"*"`, which matches everything but only if none of the sibling `<view-route>` elements match.
It must be the last `<view-route>` in its parent element.

### Intercepting navigation

In order for route updates to be seen by `<view-route>` they must be pushed using `history.pushState()`.

In-page navigation can be intercepted and transformed automatically into `pushState` calls:

```js
import { interceptNavigation } from "./view-route.js";

interceptNavigation(document.body);
```

This will intercept clicks on anchor tags and turn them into single-page navigation.

### Publishing on GitHub

To allow bookmarking routes or refreshing the page a `404.html` handler is provided in the example.

This will trap 404 errors and redirect them to `index.html` after which the trapped route will be loaded 
in the single-page application.

The basic layout of this repository can be used to publish on GitHub, by following these steps:

1. Upload the project as a repository on GitHub
2. Go to Settings, Pages
3. Source: GitHub Actions
4. Static Website, Configure
5. Scroll down to path, and change it to ./public
6. Commit changes...
7. Go to the Actions page for the repository, wait for the site to deploy

## Example

See the `public` folder.

Run it as a static server locally:

`npx serve public`

The `serve` static server supports the `404.html` handler.

For a more advanced example including view transitions, see https://github.com/jsebrech/view-transition-element
