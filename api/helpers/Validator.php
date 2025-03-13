<?php
use Illuminate\Container\Container;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Translation\FileLoader;
use Illuminate\Translation\Translator;
use Illuminate\Validation\Factory;


class Validator
{
    private $validation;

    public $validation_rules = [];

    public function __construct()
    {
        $loader = new FileLoader(new Filesystem(), 'lang');
        $translator = new Translator($loader, 'en');
        $this->validation = new Factory($translator, new Container());
    }

    public function to_array($data)
    {
        $this->validate_data($data);
        return (object) ($data);
    }

    protected function validate_data($data)
    {
        if (!empty($data) && empty($this->validation_rules)) {
            throw new Exception('Params has data but no validation rules.', 400);
        }

        $validator = $this->validation->make($data, $this->validation_rules);

        if ($validator->fails()) {
            throw new Exception('Params has an incorrect data format.', 400);
        }
    }
}