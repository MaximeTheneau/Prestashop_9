{if $new_stock_notification}
    <li id="module-stock-notification" class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="icon-bell"></i>
            <span class="notification-counter">1</span>
        </a>
        <ul class="dropdown-menu">
            <li>
                <a href="">
                    {$notification_text|escape:'html':'UTF-8'}
                </a>
            </li>
        </ul>
    </li>
{/if}
