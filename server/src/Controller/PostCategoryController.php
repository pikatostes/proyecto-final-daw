<?php

namespace App\Controller;

use App\Entity\PostCategory;
use App\Repository\PostCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PostCategoryController extends AbstractController
{
    #[Route('/post/category/new', name: 'app_post_category_new')]
    public function newPostCategory(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener los datos del formulario
        $name = $request->request->get('name');
        $imageFile = $request->files->get('image');

        // Verificar que los datos necesarios estén presentes
        if (!$name || !$imageFile) {
            return new JsonResponse(['error' => 'Name or image file is missing'], 400);
        }

        // Leer el contenido del archivo y convertirlo a base64
        $imageBase64 = base64_encode(file_get_contents($imageFile->getPathname()));
        $imageConverted = 'data:' . $imageFile->getClientMimeType() . ';base64,' . $imageBase64;

        // Crear la nueva categoría de post
        $postCategory = new PostCategory();
        $postCategory->setName($name);
        $postCategory->setImage($imageConverted);

        // Guardar en la base de datos
        $entityManager->persist($postCategory);
        $entityManager->flush();

        return new JsonResponse(['success' => 'Post category created successfully'], 201);
    }

    #[Route('post/category/update', name: 'update_post_category')]
    public function updatePostCategory(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener los datos del formulario
        $id = $request->request->get('id');
        $name = $request->request->get('name');
        $imageFile = $request->files->get('image');

        // Verificar que los datos necesarios estén presentes
        if (!$id) {
            return new JsonResponse(['error' => 'ID is missing'], 400);
        }

        // Buscar la categoría de post en la base de datos
        $postCategory = $entityManager->getRepository(PostCategory::class)->find($id);
        if (!$postCategory) {
            return new JsonResponse(['error' => 'Post category not found'], 404);
        }

        // Actualizar los datos de la categoría de post
        if ($name) {
            $postCategory->setName($name);
        }
        if ($imageFile !== $postCategory->getImage()) {
            // Leer el contenido del archivo y convertirlo a base64
            $imageBase64 = base64_encode(file_get_contents($imageFile->getPathname()));
            $imageConverted = 'data:' . $imageFile->getClientMimeType() . ';base64,' . $imageBase64;
            $postCategory->setImage($imageConverted);
        }

        // Guardar los cambios en la base de datos
        $entityManager->flush();

        return new JsonResponse(['success' => true]);
    }

    #[Route('post/category/{id}/delete')]
    public function deletePostCategory(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $postCategory = $entityManager->getRepository(PostCategory::class)->find($id);
        if (!$postCategory) {
            return new JsonResponse(['error' => 'Post category not found'], 404);
        }

        $entityManager->remove($postCategory);
        $entityManager->flush();

        return new JsonResponse(['success' => true]);
    }

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
