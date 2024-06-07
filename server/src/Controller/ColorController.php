<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Color;
use Doctrine\ORM\EntityManagerInterface; // Importar el EntityManagerInterface
use Symfony\Component\HttpFoundation\Request;

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

    #[Route('/color/new', name: 'new_color')]
    public function newColor(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        // Get data from request
        $name = $request->request->get('name');

        // Validate the data
        if (!$name) {
            return $this->json(['error' => 'Invalid input data'], 400);
        }

        // Create a new Color entity
        $color = new Color();
        $color->setName($name);

        // Persist and flush the new entity
        $entityManager->persist($color);
        $entityManager->flush();

        // Return the newly created color as a JSON response
        return $this->json($color, 201);
    }
}

