<nav role="navigation">
  <div class="navbar">
    <a href="{$link->getPageLink('index')}" class="navbar__logo">
      Une Taupe Chez Vous
    </a>
    <div class="navbar__toogle" id="navbar-toggle" >
      {hook h='displayTop'}
      <i class="icon-navbar" id="navbar-toggle--button"  tabindex="0" aria-expanded="false" aria-controls="navbar-menu"></i>
    </div>
  </div>
  <div id="navbar-menu" class="navbar__menu navbar__menu--hidden" aria-hidden="true">
    <ul class="navbar__list ">
      <li class="navbar__menu__list-item">
        <div class="search_block_top">
          {block name='Search_Top'}
            {hook h='displaySearch'}
        {/block}
        </div>
      </li>
      {hook h='displayNav1'}
    </ul>
  </div>
</nav>
