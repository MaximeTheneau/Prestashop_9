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

namespace PrestaShop\PrestaShop\Core\Shop;

function move_uploaded_file($from, $to)
{
    return true;
}

function unlink($filename, $context = null)
{
    return true;
}

function tempnam($directory, $prefix)
{
    global $shopFeatureLogoPath;

    return $shopFeatureLogoPath;
}

namespace Tests\Integration\Behaviour\Features\Context\Domain;

use Configuration;
use PrestaShop\PrestaShop\Core\Context\ShopContext;
use PrestaShop\PrestaShop\Core\Context\ShopContextBuilder;
use PrestaShop\PrestaShop\Core\Domain\Shop\Command\UploadLogosCommand;
use PrestaShop\PrestaShop\Core\Domain\Shop\Exception\ShopAssociationNotFound;
use PrestaShop\PrestaShop\Core\Domain\Shop\Exception\ShopNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Shop\ValueObject\ShopConstraint;
use RuntimeException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Tests\Integration\Behaviour\Features\Context\CommonFeatureContext;

class ShopFeatureContext extends AbstractDomainFeatureContext
{
    /**
     * Random integer that represents shop id which should never exist in test database
     */
    private const NON_EXISTING_SHOP_ID = 77701;

    /**
     * @When I upload :path as new Header Logo
     */
    public function uploadHeaderLogo(string $path): void
    {
        global $shopFeatureLogoPath;
        $shopFeatureLogoPath = __DIR__ . '/../../../../../../' . $path;
        $uploadCommand = new UploadLogosCommand();
        $uploadCommand->setUploadedHeaderLogo(new UploadedFile($shopFeatureLogoPath, 'logo.jpg', null, null, true));
        $this->getCommandBus()->handle($uploadCommand);
    }

    /**
     * @Then the logo size configuration should be :width x :height
     *
     * @param int $width
     * @param int $height
     */
    public function logoSizeConfigurationShouldbe(int $width, int $height): void
    {
        $confWidth = (int) Configuration::get('SHOP_LOGO_WIDTH');
        $confHeight = (int) Configuration::get('SHOP_LOGO_HEIGHT');

        if ($confWidth !== $width) {
            throw new RuntimeException('Width does not match');
        }
        if ($confHeight !== $height) {
            throw new RuntimeException('Height does not match');
        }
    }

    /**
     * @Given shop :reference does not exist
     *
     * @param string $reference
     */
    public function setNonExistingShopReference(string $reference): void
    {
        if ($this->getSharedStorage()->exists($reference) && $this->getSharedStorage()->get($reference)) {
            throw new RuntimeException(sprintf('Expected that shop "%s" should not exist', $reference));
        }

        $this->getSharedStorage()->set($reference, self::NON_EXISTING_SHOP_ID);
    }

    /**
     * @Then I should get error that shop was not found
     */
    public function assertShopNotFound(): void
    {
        $this->assertLastErrorIs(ShopNotFoundException::class);
    }

    /**
     * @Then I should get error that shop association was not found
     */
    public function assertLastErrorIsShopAssociationNotFound(): void
    {
        $this->assertLastErrorIs(ShopAssociationNotFound::class);
    }

    /**
     * @Given I set up shop context to single shop :shopReference
     */
    public function setupShopContext(string $shopReference)
    {
        // We only need to update the builder settings, ShopContext service was defined as NOT shared
        // so each time it is accessed a new instance is created and the builder is called again
        /** @var ShopContextBuilder $shopContextBuilder */
        $shopContextBuilder = CommonFeatureContext::getContainer()->get('test_shop_context_builder');
        $shopContextBuilder->setShopConstraint(ShopConstraint::shop($this->referenceToId($shopReference)));
        $shopContextBuilder->setShopId($this->referenceToId($shopReference));
    }
}
