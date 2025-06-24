import { interceptNavigation } from "./view-route.js";

interceptNavigation(document.body);

const item = document.getElementById('item');
const itemRoute = item.closest('view-route');
const update = () => item.textContent = itemRoute.matches ? 'Item ' + itemRoute.matches.groups.id : '';
itemRoute.addEventListener('routechange', update);
update();
