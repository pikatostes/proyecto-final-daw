<?php

namespace App\Controller;

use App\Repository\BillingInfoRepository;
use App\Repository\CommentRepository;
use App\Repository\LikeRepository;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    private $entityManager;
    private $passwordHasher;
    private $mailerInterface;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, MailerInterface $mailerInterface)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->mailerInterface = $mailerInterface;
    }

    #[Route('/user/{id}', name: 'app_user')]
    public function getUserData(UserRepository $userRepository, int $id): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el ID dado');
        }

        // Serializar los datos del usuario a JSON
        $userData = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'avatar' => $user->getAvatar(),
        ];

        // Devolver la respuesta JSON con los datos del usuario
        $response = new JsonResponse($userData);
        return $response;
    }

    #[Route('/user-data/{username}', name: 'app_username')]
    public function getUserDataUsingUsername(UserRepository $userRepository, string $username): JsonResponse
    {
        $user = $userRepository->findOneBy(['username' => $username]);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el username dado');
        }

        // Serializar los datos del usuario a JSON
        $userData = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'avatar' => $user->getAvatar(),
        ];

        // Devolver la respuesta JSON con los datos del usuario
        $response = new JsonResponse($userData);
        return $response;
    }

    #[Route('/user/{id}/update', name: 'update_user')]
    public function updateUserData(Request $request, UserRepository $userRepository, int $id): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el ID dado');
        }

        // Obtener los datos del cuerpo de la solicitud
        $username = $request->request->get('username');
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $avatar = $request->files->get('avatar');

        // Verificar si se proporcionaron los campos de usuario y contraseña
        if (!$username && !$email && !$password && !$avatar) {
            return new JsonResponse(['error' => 'At least one field is required'], Response::HTTP_BAD_REQUEST);
        }

        // Actualizar los campos del usuario si no están vacíos
        $isUpdated = false;
        if ($username) {
            $user->setUsername($username);
            $isUpdated = true;
        }

        if ($email) {
            $user->setEmail($email);
            $isUpdated = true;
        }

        if ($password) {
            // Hashear la contraseña utilizando UserPasswordHasherInterface
            $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);
            $isUpdated = true;
        }

        if ($avatar) {
            // Convertir la imagen a base64
            $avatarBase64 = base64_encode(file_get_contents($avatar->getPathname()));
            $avatarImage = 'data:' . $avatar->getClientMimeType() . ';base64,' . $avatarBase64;
            $user->setAvatar($avatarImage);
            $isUpdated = true;
        }

        if ($isUpdated) {
            // Persistir los cambios en la base de datos
            $this->entityManager->flush();

            // Enviar correo electrónico
            $this->sendEmail($user->getEmail());

            // Devolver una respuesta JSON indicando que los datos se han actualizado
            return new JsonResponse(['message' => 'User data updated successfully'], Response::HTTP_OK);
        }

        return new JsonResponse(['error' => 'No data was updated'], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/user/{id}/posts', name: 'user_posts')]
    public function getUserPosts(UserRepository $userRepository, PostRepository $postRepository, int $id): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el ID dado');
        }

        // Obtener los posts del usuario
        $userPosts = $postRepository->findBy(['user_id' => $user]);

        // Serializar los datos de los posts a JSON
        $serializedPosts = [];
        foreach ($userPosts as $post) {
            $totalLikes = $post->getLikes()->count(); // Obtener el número total de likes

            $serializedPosts[] = [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'description' => $post->getDescription(),
                'user_id' => $post->getUserId()->getId(), // Obtener el ID del usuario del post
                'category' => $post->getCategory()->getName(),
                'totalLikes' => $totalLikes,
                'user' => $post->getUserId()->getUsername(),
                'image' => $post->getImage(),
                'avatar' => $post->getUserId()->getAvatar()
            ];
        }

        // Devolver la respuesta JSON con los datos del usuario
        $response = new JsonResponse($serializedPosts);
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        return $response;
    }

    #[Route('/user/{id}/comments', name: 'user_comments')]
    public function getUserComments(UserRepository $userRepository, CommentRepository $commentRepository, int $id): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el ID dado');
        }

        // Obtener los comentarios del usuario
        $userComments = $commentRepository->findBy(['user' => $user]);

        // Serializar los datos de los comentarios a JSON
        $serializedComments = [];
        foreach ($userComments as $comment) {
            $serializedComments[] = [
                'id' => $comment->getId(),
                'text' => $comment->getText(),
                'user' => $comment->getUser()->getUsername(),
                'user_avatar' => $comment->getUser()->getAvatar(),
                'post_title' => $comment->getPost()->getTitle(),
                'post_image' => $comment->getPost()->getImage(),
                'post_user' => $comment->getPost()->getUserId()->getUsername(),
                'post_userAvatar' => $comment->getPost()->getUserId()->getAvatar(),
            ];
        }

        // Devolver la respuesta JSON con los datos del usuario
        $response = new JsonResponse($serializedComments);
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        return $response;
    }

    #[Route('/user/{id}/likes', name: 'user_likes')]
    public function getUserLikes(UserRepository $userRepository, LikeRepository $likeRepository, int $id): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el ID dado');
        }

        // Obtener los likes del usuario
        $userLikes = $likeRepository->findBy(['user' => $user]);

        // Serializar los datos de los likes a JSON
        $serializedLikes = [];
        foreach ($userLikes as $like) {
            $serializedLikes[] = [
                'id_like' => $like->getId(),
                'id' => $like->getPost()->getId(),
                'user' => $like->getPost()->getUserId()->getUsername(),
                'title' => $like->getPost()->getTitle(),
                'category' => $like->getPost()->getCategory()->getName(),
                'totalLikes' => $like->getPost()->getLikes()->count(),
                'avatar' => $like->getPost()->getUserId()->getAvatar(),
                'image' => $like->getPost()->getImage(),
            ];
        }

        // Devolver la respuesta JSON con los datos del usuario
        $response = new JsonResponse($serializedLikes);
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        return $response;
    }

    #[Route('/user/{id}/billingInfo', name: 'user_billingInfo')]
    public function getUserBillingInfo(UserRepository $userRepository, BillingInfoRepository $billingInfoRepository, int $id): JsonResponse
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No se encontró un usuario para el ID dado');
        }

        $userBillingInfos = $billingInfoRepository->findBy(['user' => $user]);

        // Serializar los datos de los posts a JSON
        $serializedBillingInfos = [];
        foreach ($userBillingInfos as $billingInfo) {
            $serializedBillingInfos[] = [
                'id' => $billingInfo->getId(),
                'address' => $billingInfo->getAddress(),
                'city' => $billingInfo->getCity(),
                'state' => $billingInfo->getState(),
                'zip_code' => $billingInfo->getZipCode(),
                'country' => $billingInfo->getCountry(),
            ];
        }

        // Devolver la respuesta JSON con los datos del usuario
        $response = new JsonResponse($serializedBillingInfos);
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        return $response;
    }

    #[Route('/user/posts/categories', name: 'user_posts_categories')]
    public function getUserPostsCategories(Request $request, PostRepository $postRepository): JsonResponse
    {
        // Obtener el contenido JSON de la solicitud
        $data = json_decode($request->getContent(), true);

        // Verificar si se proporcionó el ID de usuario en el JSON
        if (!isset($data['user_id'])) {
            return new JsonResponse(['message' => 'ID de usuario no proporcionado'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Obtener el ID de usuario del JSON
        $userId = $data['user_id'];

        // Obtener las categorías de los posts del usuario
        $qb = $postRepository->createQueryBuilder('p');
        $qb->select('c.id, c.name')
            ->join('p.category', 'c')
            ->where('p.user_id = :userId')
            ->setParameter('userId', $userId)
            ->distinct();

        $categories = $qb->getQuery()->getResult();

        // Formatear el resultado para que coincida con el formato JSON especificado
        $formattedCategories = array_map(function ($category) {
            return [
                'id' => $category['id'],
                'name' => $category['name'],
            ];
        }, $categories);

        return new JsonResponse($formattedCategories, JsonResponse::HTTP_OK);
    }

    private function sendEmail(string $emailAddress): void
    {
        $email = (new Email())
            ->from('brickpoint.daw@gmail.com')
            ->to($emailAddress)
            ->subject('User Info updated successfully!')
            ->text('Your data has been successfully updated');
        $this->mailerInterface->send($email);
    }
}
