<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Hero;
use AppBundle\Heroes;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class HeroController extends Controller
{

    /**
     * @Route("/hero/select/{heroId}", name="heroSelect")
     */
    public function select($heroId)
    {
        $kernel    = $this->get('kernel');
        $heroesYml = $kernel->locateResource('@AppBundle/Resources/heroes.yml');

        try {
            $repository = $this->getDoctrine()->getRepository('AppBundle:Hero');
            $manager    = $this->getDoctrine()->getManager();
            $heroes     = (new Heroes($heroesYml))->getHeroes();

            // Check if the hero exists
            if ( ! array_key_exists($heroId, $heroes)) {
                return new JsonResponse(
                    [
                        'status'  => 'error',
                        'message' => 'Hero does not exist',
                    ]
                );
            }

            $hero = $repository->findOneByHeroId($heroId);

            // Create hero entry in the DB if one doesn't exist yet
            if ( ! $hero) {
                $hero = new Hero();
                $hero->setHeroId($heroId);
            }

            // Select/deselect hero...
            $hero->toggle();

            // ...and save the changes in the DB
            $manager->persist($hero);
            $manager->flush();

            return new JsonResponse(
                [
                    'status'   => 'ok',
                    'selected' => $hero->isSelected(),
                ]
            );
        } catch (\Exception $e) {
            return new  JsonResponse(
                [
                    'status'  => 'error',
                    'message' => 'Loading heroes data failed',
                ]
            );
        }
    }
}