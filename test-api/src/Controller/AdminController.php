<?php

namespace App\Controller;

use App\Repository\PostRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin')]
class AdminController extends AbstractController
{
    #[Route('/user/list', name: 'user_list')]
    public function userList(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        $serializedUsers = [];
        foreach ($users as $user) {
            $serializedUsers[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
                'password' => $user->getPassword(),
                'avatar' => $user->getAvatar()
            ];
        }

        return new JsonResponse($serializedUsers);
    }

    #[Route('/post/list', name: 'post_list')]
    public function postList(PostRepository $postRepository): JsonResponse
    {
        $posts = $postRepository->findAll();
        //count post likes   

        $serializedPosts = [];
        foreach ($posts as $post) {
            $totalLikes = $post->getLikes()->count();
            $serializedPosts[] = [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'description' => $post->getDescription(),
                'created_at' => $post->getCreatedAt()->format('Y-m-d H:i:s'),
                'updated_at' => $post->getUpdatedAt()->format('Y-m-d H:i:s'),
                'totalLikes' => $totalLikes,
                'user_id_id' => $post->getUserId()->getUsername(),
                'user_id' => $post->getUserId()->getId(),
                'user' => $post->getUserId()->getUsername(),
                'avatar' => $post->getUserId()->getAvatar(),
                'category_id' => $post->getCategory()->getName(),
                'image' => $post->getImage()
            ];
        }

        return new JsonResponse($serializedPosts);
    }

    #[Route('/user/edit', name: 'user_edit')]
    public function userEdit(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener el JSON de la solicitud POST
        $jsonData = json_decode($request->getContent(), true);

        // Verificar si se proporcionaron datos válidos
        if (!$jsonData || !isset($jsonData['id']) || empty($jsonData['id'])) {
            return new JsonResponse(['error' => 'Datos no válidos'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Obtener el ID del usuario a editar
        $userId = $jsonData['id'];

        // Buscar el usuario en la base de datos
        $user = $userRepository->find($userId);

        // Verificar si el usuario existe
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Actualizar los datos del usuario con los valores proporcionados en el JSON
        if (isset($jsonData['username'])) {
            $user->setUsername($jsonData['username']);
        }
        if (isset($jsonData['roles'])) {
            $user->setRoles($jsonData['roles']);
        }
        if (isset($jsonData['password'])) {
            $user->setPassword($jsonData['password']);
        }
        if (isset($jsonData['avatar'])) {
            $user->setAvatar($jsonData['avatar']);
        }

        // Guardar los cambios en la base de datos
        $entityManager->flush();

        // Devolver una respuesta JSON de éxito
        return new JsonResponse(['success' => 'Usuario actualizado correctamente']);
    }
}
