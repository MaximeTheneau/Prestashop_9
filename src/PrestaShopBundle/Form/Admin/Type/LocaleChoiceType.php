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

namespace PrestaShopBundle\Form\Admin\Type;

use PrestaShop\PrestaShop\Adapter\LegacyContext;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LocaleChoiceType extends AbstractType
{
    /**
     * @var LegacyContext
     */
    private $legacyContext;

    public function __construct(LegacyContext $legacyContext)
    {
        $this->legacyContext = $legacyContext;
    }

    public function getParent(): string
    {
        return ChoiceType::class;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'placeholder' => 'Language',
            'translation_domain' => 'Admin.Global',
            'choice_translation_domain' => false,
            'choices' => $this->getLocaleChoices(),
        ]);
    }

    /**
     * Get locales to be used in form type.
     *
     * @return array
     */
    protected function getLocaleChoices(): array
    {
        $locales = [];

        foreach ($this->legacyContext->getLanguages() as $locale) {
            $locales[$locale['name']] = $locale['iso_code'];
        }

        return $locales;
    }
}
