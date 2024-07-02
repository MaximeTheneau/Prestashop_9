<?php
if (!defined('_PS_VERSION_')) {
    exit;
}

class Navbar extends Module
{
    public $js_path;
    public $css_path;

    public function __construct()
    {
        $this->name = 'navbar';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Theneau Maxime';
        $this->need_instance = 0;

        parent::__construct();

        $this->displayName = $this->l('Navbar Custom');
        $this->description = $this->l('A custom navbar module.');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);

        // Settings paths
        $this->js_path = $this->_path . 'views/js/';
        $this->css_path = $this->_path . 'views/css/';
    }

    public function install()
    {
        return parent::install() && $this->registerHook('displayNavbarCustom') && $this->registerHook('actionFrontControllerSetMedia');
    }

    public function hookActionFrontControllerSetMedia($params)
    {
        $this->context->controller->addJS($this->js_path . 'navbar.js');
        $this->context->controller->addCSS($this->css_path . 'navbar.css');
    }

    public function hookDisplayNavbarCustom($params)
    {
        $this->context->smarty->assign(array(
            // Assign any variables you need for the template
        ));

        return $this->display(__FILE__, 'views/templates/hook/navbar.tpl');
    }
}
