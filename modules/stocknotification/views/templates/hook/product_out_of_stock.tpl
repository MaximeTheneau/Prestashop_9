{if isset($product_name) && isset($product_id) }
  {if $product_stock == 0}
    <div class="stock">
      <p>{l s='Le produit'} <strong>{$product_name}</strong> {l s='est actuellement en rupture de stock.'}</p>
      <form id="stockNotificationForm" method="post" >
          <input type="hidden" name="product_id" value="{$product_id}">
          <input  type="email" class="w-100	p-1 " name="email" id="stockNotificationEmail" placeholder="{l s='Votre adresse e-mail'}" required>
          <button class="btn btn-primary m-1 float-r" type="submit" id="submitStockNotification">{$button_text}</button>
      </form>
      <div id="emailFormResponse"></div>
  </div>
  {/if}
{/if}
{if isset($confirmation_message)}
    <div class="alert alert-success">
        {$confirmation_message}
    </div>
{/if}
