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

namespace PrestaShop\PrestaShop\Core\Domain\SqlManagement\Command;

use PrestaShop\PrestaShop\Core\Domain\SqlManagement\Exception\SqlRequestConstraintException;
use PrestaShop\PrestaShop\Core\Domain\SqlManagement\Exception\SqlRequestException;
use PrestaShop\PrestaShop\Core\Domain\SqlManagement\ValueObject\SqlRequestId;

/**
 * Class BulkDeleteSqlRequestCommand deletes provided SqlRequests.
 */
class BulkDeleteSqlRequestCommand
{
    /**
     * @var SqlRequestId[]
     */
    private $sqlRequestIds = [];

    /**
     * @param int[] $sqlRequestIds
     *
     * @throws SqlRequestException
     */
    public function __construct(array $sqlRequestIds)
    {
        $this->setSqlRequestIds($sqlRequestIds);
    }

    /**
     * @return SqlRequestId[]
     */
    public function getSqlRequestIds()
    {
        return $this->sqlRequestIds;
    }

    /**
     * @param array $sqlRequestIds
     *
     * @return self
     *
     * @throws SqlRequestException
     */
    private function setSqlRequestIds(array $sqlRequestIds)
    {
        if (empty($sqlRequestIds)) {
            throw new SqlRequestConstraintException('Missing SqlRequest data for bulk deleting', SqlRequestConstraintException::MISSING_BULK_DATA);
        }

        foreach ($sqlRequestIds as $sqlRequestId) {
            $this->sqlRequestIds[] = new SqlRequestId($sqlRequestId);
        }

        return $this;
    }
}
