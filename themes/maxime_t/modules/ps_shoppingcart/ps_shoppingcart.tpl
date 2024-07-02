<div id="_desktop_cart">
  <div class="blockcart cart-preview {if $cart.products_count > 0}active{else}inactive{/if}" data-refresh-url="{$refresh_url}">
    <div class="header">
      {if $cart.products_count > 0}
        <a rel="nofollow" aria-label="{l s='Shopping cart link containing %nbProducts% product(s)' sprintf=['%nbProducts%' => $cart.products_count] d='Shop.Theme.Checkout'}" href="{$cart_url}">
      {/if}
      <a href="{$cart_url}" class="cart-title">
        <i class="material-icons shopping-cart" aria-hidden="true">shopping_cart</i>
       </a>
      {if $cart.products_count > 0}
        </a>
      {/if}
    </div>
  </div>
</div>
