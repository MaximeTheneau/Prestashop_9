#!/usr/bin/env php
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

use PrestaShopBundle\Install\Database;
use PrestaShopBundle\Install\Install;
use Symfony\Component\Console\Output\ConsoleOutput;
use Tests\Resources\DatabaseDump;
use Tests\Resources\ResourceResetter;

define('_PS_ROOT_DIR_', dirname(__DIR__, 2));
const _PS_IN_TEST_ = true;
const __PS_BASE_URI__ = '/';
const _PS_MODULE_DIR_ = _PS_ROOT_DIR_ . '/tests/Resources/modules/';
const _PS_ALL_THEMES_DIR_ = _PS_ROOT_DIR_ . '/tests/Resources/themes/';
require_once _PS_ROOT_DIR_ . '/install-dev/init.php';

$output = new ConsoleOutput();
$logger = new SymfonyConsoleLogger($output, PrestaShopLoggerInterface::DEBUG);

$translator = Context::getContext()->getTranslatorFromLocale('en');
$install = new Install(null, null, $logger);
$install->setTranslator($translator);

$modelDatabase = new Database($logger);
$modelDatabase->setTranslator($translator);
$modelDatabase->testDatabaseSettings(_DB_SERVER_, _DB_NAME_, _DB_USER_, _DB_PASSWD_, _DB_PREFIX_);
$modelDatabase->createDatabase(_DB_SERVER_, _DB_NAME_, _DB_USER_, _DB_PASSWD_);

$install->clearDatabase(false);
if (!$install->installDatabase(true)) {
    exit(1);
}

$install->initializeTestContext();
$install->installDefaultData('test_shop', false, false, false);
$install->populateDatabase();
$install->configureShop([
    'admin_firstname' => 'puff',
    'admin_lastname' => 'daddy',
    'admin_password' => 'test',
    'admin_email' => 'test@prestashop.com',
    'configuration_agrement' => true,
]);

$logger->log('Installing language');
// Default language is forced as en, we need french translation package as well, we only need the catalog to
// be available for the Translator component but we do not want the Language in the DB
if (!Language::translationPackIsInCache('fr-FR')) {
    Language::downloadXLFLanguagePack('fr-FR');
}
Language::installSfLanguagePack('fr-FR');

$install->installFixtures();

Category::regenerateEntireNtree();
Tab::resetStaticCache();

$install->installTheme();
$install->installModules(array_keys($install->getModulesOnDisk()));

$logger->log('Configure SMTP server for maildev');
Configuration::updateGlobalValue('PS_MAIL_METHOD', Mail::METHOD_SMTP);
Configuration::updateGlobalValue('PS_MAIL_SERVER', 'localhost');
Configuration::updateGlobalValue('PS_MAIL_SMTP_PORT', '1025');

$logger->log('Creating database dump');
DatabaseDump::create();

$logger->log('Backup resources');
$resourceResetter = new ResourceResetter();
$resourceResetter->backupImages();
$resourceResetter->backupDownloads();
$resourceResetter->backupTestModules();

$logger->log('Test DB was successfully created');
