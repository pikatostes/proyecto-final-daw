<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Color;
use Doctrine\ORM\EntityManagerInterface; // Importar el EntityManagerInterface

class ColorController extends AbstractController
{
    private $entityManager; // Declarar el EntityManager

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/color', name: 'app_color')]
    public function index(): JsonResponse
    {
        // Obtener el repositorio de la entidad Color
        $colorRepository = $this->entityManager->getRepository(Color::class);

        // Obtener todos los colores
        $colors = $colorRepository->findAll();
        
        // Crear un array para almacenar los datos de los colores
        $colorsData = [];
        
        // Recorrer los colores y obtener sus propiedades
        foreach ($colors as $color) {
            $colorData = [
                'id' => $color->getId(),
                'name' => $color->getName(),
                // Agrega otras propiedades de ser necesario
            ];
            
            // Agregar los datos del color al array
            $colorsData[] = $colorData;
        }
        
        // Convertir el array a formato JSON
        $jsonData = json_encode($colorsData);
        
        // Crear una respuesta JSON y devolverla
        return new JsonResponse($jsonData, 200, [], true);
    }
}

