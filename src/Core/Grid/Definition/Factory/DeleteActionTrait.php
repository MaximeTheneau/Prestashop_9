<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
declare(strict_types=1);

namespace PrestaShop\PrestaShop\Core\Grid\Definition\Factory;

use PrestaShop\PrestaShop\Core\Grid\Action\ModalOptions;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\RowActionInterface;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\SubmitRowAction;

/**
 * Trait to help build the grid single line delete action
 */
trait DeleteActionTrait
{
    protected function buildDeleteAction(
        string $deleteRouteName,
        string $deleteRouteParamName,
        string $deleteRouteParamField,
        string $method = 'POST',
        array $extraRouteParams = [],
        array $options = [],
        ?string $actionLabel = null
    ): RowActionInterface {
        $options = array_merge(
            [
                'route' => $deleteRouteName,
                'route_param_name' => $deleteRouteParamName,
                'route_param_field' => $deleteRouteParamField,
                'extra_route_params' => $extraRouteParams,
                'confirm_message' => $this->trans('Are you sure you want to delete the selected item(s)?', [], 'Admin.Global'),
                'method' => $method,
                'modal_options' => [],
            ],
            $options
        );
        $options['modal_options'] = new ModalOptions(array_merge(
            [
                'title' => $this->trans('Delete selection', [], 'Admin.Actions'),
                'confirm_button_label' => $this->trans('Delete', [], 'Admin.Actions'),
                'close_button_label' => $this->trans('Cancel', [], 'Admin.Actions'),
                'confirm_button_class' => 'btn-danger',
            ],
            $options['modal_options']
        ));

        return (new SubmitRowAction('delete'))
            ->setName($actionLabel ?? $this->trans('Delete', [], 'Admin.Actions'))
            ->setIcon('delete')
            ->setOptions($options)
        ;
    }

    /**
     * Shortcut method to translate text.
     */
    abstract protected function trans($id, array $options, $domain);
}
