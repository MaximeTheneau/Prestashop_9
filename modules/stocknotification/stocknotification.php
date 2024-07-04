<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

class stocknotification extends Module
{
    public function __construct()
    {
        $this->name = 'stocknotification';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Theneau Maxime';
        $this->need_instance = 0;

        parent::__construct();

        $this->displayName = $this->l('Notification de stock');
        $this->description = $this->l('Permet aux clients de recevoir une notification par e-mail lorsque le produit est de nouveau disponible.');
    }

    public function install()
    {
        return parent::install() &&
            $this->registerHook('displayStockNotification') &&
            Configuration::updateValue('STOCKNOTIFICATION_BUTTON_TEXT', 'Me notifier') &&
            $this->registerHook('displayStockNotification');
    }

    public function uninstall()
    {
        return parent::uninstall() &&
            Configuration::deleteByName('STOCKNOTIFICATION_BUTTON_TEXT') &&
            $this->unregisterHook('displayStockNotification');
    }

    public function hookdisplayStockNotification($params)
    {
        $productId = (int)$params['product']['id_product'];
        $product = new Product($productId, false, $this->context->language->id);
        if ($product->id) {
            $product_stock = StockAvailable::getQuantityAvailableByProduct($product->id);

            $this->context->smarty->assign(array(
                'product_name' => $product->name,
                'product_id' => $product->id,
                'product_stock' => $product_stock,
                'button_text' => Configuration::get('STOCKNOTIFICATION_BUTTON_TEXT'),
            ));

            if (Tools::isSubmit('email')) {
                $product_id = (int) Tools::getValue('id_product');
                $email = pSQL(Tools::getValue('email'));

                // Validation du product_id et de l'email ici si nécessaire

                // Insertion en base de données
                $sql = 'INSERT INTO `' . _DB_PREFIX_ . 'stock_notification` (`id_product`, `email`, `date_add`)
                        VALUES (' . (int) $product_id . ', \'' . $email . '\', NOW())';

                if (!Db::getInstance()->execute($sql)) {
                    die('Erreur lors de l\'enregistrement de l\'email.');
                }

                $this->context->smarty->assign('confirmation_message', 'Vous serez notifié par e-mail lorsque le produit sera de nouveau en stock.');
            }
            return $this->display(__FILE__, 'views/templates/hook/product_out_of_stock.tpl');
        }

        return '';
    }
    public function renderWidget($hookName, array $configuration)
    {
        if (!$this->active) {
            return;
        }
        $this->smarty->assign($this->getWidgetVariables($hookName, $configuration));

        return $this->display(__FILE__, 'views/templates/front/notification.tpl');
    }
    public function hookActionFrontControllerSetMedia()
{
    $this->context->controller->addJS($this->_path . 'views/js/front.js');
}

public function hookDisplayProductAdditionalInfo($params)
{
    $productId = (int)Tools::getValue('id_product');
    $this->context->smarty->assign(array(
        'product_id' => $productId,
        'action' => $this->context->link->getModuleLink($this->name, 'submitemail', array(), true),
    ));

    return $this->display(__FILE__, 'views/templates/hook/product_additional_info.tpl');
}

public function hookActionSubmitEmail($params)
{
    if (Tools::isSubmit('submitEmail')) {
        $email = trim(Tools::getValue('email'));
        $productId = (int)Tools::getValue('product_id');

        if (!Validate::isEmail($email)) {
            $this->context->smarty->assign('error_message', $this->l('Invalid email address.'));
            return $this->display(__FILE__, 'views/templates/hook/error.tpl');
        }

        // Check if email already exists for this product
        $sql = 'SELECT COUNT(*) FROM ' . _DB_PREFIX_ . 'stock_notification
                WHERE email = \'' . pSQL($email) . '\' AND id_product = ' . (int)$productId;
        $exists = Db::getInstance()->getValue($sql);

        if (!$exists) {
            // Insert email into database
            $data = array(
                'email' => pSQL($email),
                'id_product' => (int)$productId,
                'date_add' => date('Y-m-d H:i:s'),
            );
            Db::getInstance()->insert('stock_notification', $data);
        }

        $this->context->smarty->assign('confirmation_message', $this->l('You will be notified when the product is back in stock.'));
        return $this->display(__FILE__, 'views/templates/hook/success.tpl');
    }
}

public function getContent()
{
    $output = null;

    if (Tools::isSubmit('submit'.$this->name)) {
        $buttonText = strval(Tools::getValue('STOCKNOTIFICATION_BUTTON_TEXT'));
        if (!$buttonText || empty($buttonText) || !Validate::isGenericName($buttonText)) {
            $output .= $this->displayError($this->l('Invalid Configuration value'));
        } else {
            Configuration::updateValue('STOCKNOTIFICATION_BUTTON_TEXT', $buttonText);
            $output .= $this->displayConfirmation($this->l('Settings updated'));
        }
    }

    return $output.$this->displayForm();
}

public function displayForm()
{
    // Get default language
    $defaultLang = (int)Configuration::get('PS_LANG_DEFAULT');

    // Init Fields form array
    $fieldsForm[0]['form'] = [
        'legend' => [
            'title' => $this->l('Settings'),
        ],
        'input' => [
            [
                'type' => 'text',
                'label' => $this->l('Button Text'),
                'name' => 'STOCKNOTIFICATION_BUTTON_TEXT',
                'size' => 20,
                'required' => true
            ]
        ],
        'submit' => [
            'title' => $this->l('Save'),
            'class' => 'btn btn-default pull-right'
        ]
    ];

    $helper = new HelperForm();
    $helper->show_toolbar = false;
    $helper->table = $this->table;
    $helper->module = $this;
    $helper->default_form_language = $defaultLang;
    $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
    $helper->identifier = $this->identifier;
    $helper->submit_action = 'submit'.$this->name;
    $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
        .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
    $helper->token = Tools::getAdminTokenLite('AdminModules');

    // Load current value
    $helper->fields_value['STOCKNOTIFICATION_BUTTON_TEXT'] = Configuration::get('STOCKNOTIFICATION_BUTTON_TEXT');

    return $helper->generateForm($fieldsForm);
}


}
