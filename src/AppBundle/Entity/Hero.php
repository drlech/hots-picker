<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="heroes")
 */
class Hero
{

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $heroId;

    /**
     * @ORM\Column(type="boolean")
     */
    private $selected = false;

    public function setHeroId($heroId)
    {
        $this->heroId = $heroId;
    }

    public function getHeroId() {
        return $this->heroId;
    }

    public function toggle()
    {
        $this->selected = ! $this->selected;
    }

    public function isSelected()
    {
        return $this->selected;
    }
}