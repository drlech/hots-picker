<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Hero;
use AppBundle\Heroes;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $kernel = $this->get('kernel');
        $heroesYml = $kernel->locateResource('@AppBundle/Resources/heroes.yml');

        try {
            $heroesData = new Heroes($heroesYml);
            $heroes = $heroesData->getHeroes();

            $repository = $this->getDoctrine()->getManager()->getRepository('AppBundle:Hero');
            $storedHeroes = $repository->findAll();

            /**
             * @var Hero $hero
             */
            foreach ($storedHeroes as $hero) {
                $heroes[ $hero->getHeroId() ]['selected'] = $hero->isSelected();
            }

            return $this->render('default/index.html.twig', [
                'heroes' => $heroes,
                'roles' => $heroesData->getRoles(),
                'franchises' => $heroesData->getFranchises()
            ]);
        } catch (\Exception $e) {
            return $this->render('default/error.html.twig');
        }
    }
}
