<?php
if (!defined('_PS_VERSION_')) {
    exit;
}

class Cookiesrgpd extends Module
{
    public $js_path;
    public $css_path;

    public function __construct()
    {
        $this->name = 'cookiesrgpd';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Theneau Maxime';
        $this->need_instance = 0;

        parent::__construct();

        $this->displayName = $this->l('Cookie Consent Module');
        $this->description = $this->l('Module for managing cookie consent as per GDPR.');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);

        // Settings paths
        $this->js_path = $this->_path . 'views/js/';
        $this->css_path = $this->_path . 'views/css/';
    }

    public function install()
    {
        return parent::install() &&
            $this->registerHook('displayFooter') &&
            $this->registerHook('actionFrontControllerSetMedia') &&
            Configuration::updateValue('GOOGLE_ANALYTICS_ID', '');

    }

    public function uninstall()
    {
        return parent::uninstall() &&
            Configuration::deleteByName('GOOGLE_ANALYTICS_ID');
    }

    public function hookActionFrontControllerSetMedia($params)
    {
        $this->context->controller->addJS($this->js_path . 'cookiesrgpd.js');
        $this->context->controller->addCSS($this->css_path . 'cookiesrgpd.css');

        if (Tools::getValue('cookiesGoogle') === 'true') {
            $consentSettings = [
                "ad_storage" => "granted",
                "ad_user_data" => "granted",
                "ad_personalization" => "granted",
                "analytics_storage" => "granted"
            ];
            echo $this->getGoogleAnalyticsScript($consentSettings);
        }


        Media::addJsDef(array(
            'googleAnalyticsID' => Configuration::get('GOOGLE_ANALYTICS_ID'),
        ));
    }

    public function hookDisplayFooter()
    {
        return $this->display(__FILE__, 'views/templates/hook/displayFooter.tpl');
    }

    public function getContent()
{
    $output = null;

    if (Tools::isSubmit('submit'.$this->name)) {
        $googleAnalyticsID = strval(Tools::getValue('GOOGLE_ANALYTICS_ID'));
        if (!$googleAnalyticsID || empty($googleAnalyticsID)) {
            $output .= $this->displayError($this->l('Invalid Configuration value'));
        } else {
            Configuration::updateValue('GOOGLE_ANALYTICS_ID', $googleAnalyticsID);
            $output .= $this->displayConfirmation($this->l('Settings updated'));
        }
    }

    return $output.$this->displayForm();
}

public function displayForm()
{
    // Get default language
    $default_lang = (int)Configuration::get('PS_LANG_DEFAULT');

    // Init Fields form array
    $fields_form[0]['form'] = array(
        'legend' => array(
            'title' => $this->l('Settings'),
        ),
        'input' => array(
            array(
                'type' => 'text',
                'label' => $this->l('Google Analytics ID'),
                'name' => 'GOOGLE_ANALYTICS_ID',
                'size' => 20,
                'required' => true
            )
        ),
        'submit' => array(
            'title' => $this->l('Save'),
            'class' => 'btn btn-default pull-right'
        )
    );

    $helper = new HelperForm();

    // Module, token and currentIndex
    $helper->module = $this;
    $helper->name_controller = $this->name;
    $helper->token = Tools::getAdminTokenLite('AdminModules');
    $helper->currentIndex = AdminController::$currentIndex.'&configure='.$this->name;

    // Language
    $helper->default_form_language = $default_lang;
    $helper->allow_employee_form_lang = $default_lang;

    // Title and toolbar
    $helper->title = $this->displayName;
    $helper->show_toolbar = true;
    $helper->toolbar_scroll = true;
    $helper->submit_action = 'submit'.$this->name;
    $helper->toolbar_btn = array(
        'save' =>
        array(
            'desc' => $this->l('Save'),
            'href' => AdminController::$currentIndex.'&configure='.$this->name.'&save'.$this->name.
            '&token='.Tools::getAdminTokenLite('AdminModules'),
        ),
        'back' => array(
            'href' => AdminController::$currentIndex.'&token='.Tools::getAdminTokenLite('AdminModules'),
            'desc' => $this->l('Back to list')
        )
    );

    // Load current value
    $helper->fields_value['GOOGLE_ANALYTICS_ID'] = Configuration::get('GOOGLE_ANALYTICS_ID');

    return $helper->generateForm($fields_form);
}

private function getGoogleAnalyticsScript($consentSettings)
{
    $googleAnalyticsID = Configuration::get('GOOGLE_ANALYTICS_ID');
    if (!$googleAnalyticsID) {
        return '';
    }

    $consentSettingsJson = json_encode($consentSettings);
    $date = new Date();
    return "
        <script async src='https://www.googletagmanager.com/gtag/js?id=$googleAnalyticsID'></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'update', $consentSettingsJson);
            gtag('config', '$googleAnalyticsID', {
              page_path: window.location.pathname
            });
            gtag('js', $date->getTimestamp());
        </script>
    ";
}

private function getCookieChoiceTable()
{
    return '
    <table class="card cookies__choice__table">
        <thead>
            <tr>
                <th>Services</th>
                <th>Activer</th>
            </tr>
        </thead>
        <tbody>
            <tr class="card cookies__choice__table__row">
                <td>Google Analytics</td>
                <td>
                    <i
                        aria-labelledby="button-label"
                        class="icon-' . (Tools::getValue('cookiesGoogle') === 'true' ? 'confirmation' : 'error') . '"
                        onclick="toggleCookieChoice(\'cookiesGoogle\')"
                        role="presentation"
                    ></i>
                </td>
            </tr>
        </tbody>
    </table>';
}


}
