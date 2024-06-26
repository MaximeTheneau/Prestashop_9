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

namespace PrestaShop\PrestaShop\Core\Addon;

class AddonListFilter
{
    /**
     * @var int AddonListFilterType Specify the addon type like theme only or module only or all
     */
    public $type = AddonListFilterType::ALL;

    /**
     * @var int AddonListFilterStatus Specify if you want enabled only, disabled only or all addons
     */
    public $status = AddonListFilterStatus::ALL;

    /**
     * @var int AddonListFilterOrigin Specify if you want an addon from a specific source
     */
    public $origin = AddonListFilterOrigin::ALL;

    /**
     * @var array Names of all the addons to exclude from result
     */
    public $exclude = [];

    /**
     * @param int $origin
     *
     * @return AddonListFilter
     */
    public function addOrigin($origin)
    {
        $this->origin &= $origin;

        return $this;
    }

    /**
     * @param int $status
     *
     * @return AddonListFilter
     */
    public function addStatus($status)
    {
        $this->status &= $status;

        return $this;
    }

    /**
     * @param int $type
     *
     * @return AddonListFilter
     */
    public function addType($type)
    {
        $this->type &= $type;

        return $this;
    }

    /**
     * @param int $origin
     *
     * @return bool
     */
    public function hasOrigin($origin)
    {
        return (bool) ($this->origin & $origin);
    }

    /**
     * @param int $status
     *
     * @return bool
     */
    public function hasStatus($status)
    {
        return (bool) ($this->status & $status);
    }

    /**
     * @param int $type
     *
     * @return bool
     */
    public function hasType($type)
    {
        return (bool) ($this->type & $type);
    }

    /**
     * @param int $origin
     *
     * @return AddonListFilter
     */
    public function removeOrigin($origin)
    {
        return $this->addOrigin(~$origin);
    }

    /**
     * @param int $status
     *
     * @return AddonListFilter
     */
    public function removeStatus($status)
    {
        return $this->addStatus(~$status);
    }

    /**
     * @param int $type
     *
     * @return AddonListFilter
     */
    public function removeType($type)
    {
        return $this->addType(~$type);
    }

    /**
     * @param int $origin
     *
     * @return AddonListFilter
     */
    public function setOrigin($origin)
    {
        $this->origin = $origin;

        return $this;
    }

    /**
     * @param int $type
     *
     * @return AddonListFilter
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @param int $status
     *
     * @return AddonListFilter
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    public function setExclude(array $exclude)
    {
        $this->exclude = $exclude;

        return $this;
    }
}
