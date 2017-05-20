<?php

namespace AppBundle;

use Symfony\Component\Yaml\Yaml;

class Heroes {

    /**
     * @var array
     */
    private $heroes = [];

    /**
     * @var array
     */
    private $roles = [];

    /**
     * @var array
     */
    private $franchises = [];

    public function __construct($file)
    {
        $this->heroes = Yaml::parse(file_get_contents($file));

        foreach ($this->heroes as $hero) {
            $heroRoles = [$hero['role']];
            if (is_array($hero['role'])) {
                $heroRoles = $hero['role'];
            }

            foreach ($heroRoles as $role) {
                if ( ! in_array($role, $this->roles)) {
                    $this->roles[] = $role;
                }
            }

            if ( ! in_array($hero['franchise'], $this->franchises)) {
                $this->franchises[] = $hero['franchise'];
            }
        }
    }

    public function getHeroes() {
        return $this->heroes;
    }

    public function getRoles() {
        return $this->roles;
    }

    public function getFranchises() {
        return $this->franchises;
    }
}