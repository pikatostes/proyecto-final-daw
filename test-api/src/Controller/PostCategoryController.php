<?php

namespace App\Controller;

use App\Repository\PostCategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PostCategoryController extends AbstractController
{
    #[Route('/post/category', name: 'app_post_category')]
    public function index(PostCategoryRepository $postCategoryRepository): JsonResponse
    {
        $postCategories = $postCategoryRepository->findAll();

        $serializedPostCategories = [];
        foreach ($postCategories as $postCategory) {
            $serializedPostCategories[] = [
                'id' => $postCategory->getId(),
                'name' => $postCategory->getName(),
                'image' => $postCategory->getImage(),
            ];
        }

        return $this->json($serializedPostCategories);
    }
}
