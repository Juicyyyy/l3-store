import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";
import { favoritesComp } from "./modules/favorites/favorites"

new Router();
cartService.init();
userService.init();
favoritesComp.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
