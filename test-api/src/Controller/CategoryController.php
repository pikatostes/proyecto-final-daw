<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    #[Route('/category', name: 'app_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): JsonResponse
    {
        $categories = $categoryRepository->findAll();

        $serializedcategories = [];
        foreach ($categories as $category) {
            $serializedcategories[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                // Agrega cualquier otro atributo que necesites
            ];
        }

        return $this->json($serializedcategories);
    }
}
