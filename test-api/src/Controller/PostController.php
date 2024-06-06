<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\CommentReports;
use App\Entity\Like;
use App\Entity\Post;
use App\Entity\PostCategory;
use App\Entity\PostReports;
use App\Entity\User;
use App\Form\PostType;
use App\Repository\PostRepository;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;

#[Route('/post')]
class PostController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'app_post_index', methods: ['GET'])]
    public function index(PostRepository $postRepository): JsonResponse
    {
        $posts = $postRepository->findAll();

        // Serializar los datos de los posts a JSON
        $postsData = [];
        foreach ($posts as $post) {
            $totalLikes = $post->getLikes()->count(); // Obtener el número total de likes

            $postsData[] = [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'category' => $post->getCategory()->getName(), // Obtener el nombre de la categoría
                'description' => $post->getDescription(),
                'createdAt' => $post->getCreatedAt()->format('Y-m-d H:i:s'),
                'updatedAt' => $post->getUpdatedAt()->format('Y-m-d H:i:s'),
                'totalLikes' => $totalLikes,
                'user' => $post->getUserId()->getUsername(),
                'avatar' => $post->getUserId()->getAvatar(),
                'image' => $post->getImage(),
            ];
        }

        // Devolver la respuesta JSON con los datos de los posts
        $response = new JsonResponse($postsData);
        return $response;
    }

    #[Route('/new', name: 'app_post_new', methods: ['POST'])]
    public function newPost(Request $request, EntityManagerInterface $entityManager): Response
    {
        $title = $request->request->get('title');
        $description = $request->request->get('description');
        $image = $request->files->get('image');
        $user_id = $request->request->get('username');
        $category_id = $request->request->get('category');

        // Verificar si se proporcionaron los campos de título, descripción e imagen
        if (!$title) {
            return new Response('Title is required', Response::HTTP_BAD_REQUEST);
        }

        if (!$description) {
            return new Response('Description is required', Response::HTTP_BAD_REQUEST);
        }

        if (!$image) {
            return new Response('Image is required', Response::HTTP_BAD_REQUEST);
        }

        if (!$user_id) {
            return new Response('User ID is required', Response::HTTP_BAD_REQUEST);
        }

        if (!$category_id) {
            return new Response('Category is required', Response::HTTP_BAD_REQUEST);
        }

        // Comprobación si el usuario existe en la base de datos
        $user = $entityManager->find(User::class, $user_id);

        // Verificar si el usuario existe
        if (!$user) {
            return new Response('User does not exist', Response::HTTP_BAD_REQUEST);
        }

        // Comprobación si la categoría existe en la base de datos
        $category = $entityManager->find(PostCategory::class, $category_id);

        // Verificar si la categoría existe
        if (!$category) {
            return new Response('Category does not exist', Response::HTTP_BAD_REQUEST);
        }

        // El usuario y la categoría existen, podemos proceder con la creación del post
        $newPost = new Post();
        $newPost->setTitle($title);
        $newPost->setDescription($description);
        $newPost->setUserId($user);
        $newPost->setCategory($category);

        // Convertir la imagen a base64
        $imageBase64 = base64_encode(file_get_contents($image->getPathname()));
        $imageCoded = 'data:' . $image->getClientMimeType() . ';base64,' . $imageBase64;
        $newPost->setImage($imageCoded);

        // Establecer la fecha y hora de creación y actualización
        $newPost->setCreatedAt(new DateTimeImmutable());
        $newPost->setUpdatedAt(new DateTime());

        // Guardar el nuevo post en la base de datos
        $entityManager->persist($newPost);
        $entityManager->flush();

        // Respondemos con un mensaje de éxito
        return new Response('Post created successfully', Response::HTTP_OK);
    }

    #[Route('/update/{id}', name: 'update_post', methods: ['PATCH'])]
public function updatePost(int $id, Request $request, EntityManagerInterface $entityManager, PostRepository $postRepository): JsonResponse
{
    // Encontrar el post correspondiente
    $post = $postRepository->find($id);

    if (!$post) {
        return new JsonResponse(['error' => 'Post not found'], Response::HTTP_NOT_FOUND);
    }

    // Obtener otros datos opcionales del formulario
    $title = $request->request->get('title');
    $description = $request->request->get('description');
    $category_id = $request->request->get('category');
    $image = $request->files->get('image');

    $isUpdated = false;

    if ($title !== null) {
        $post->setTitle($title);
        $isUpdated = true;
    }

    if ($description !== null) {
        $post->setDescription($description);
        $isUpdated = true;
    }

    if ($image !== null) {
        $imageBase64 = base64_encode(file_get_contents($image->getPathname()));
        $imageCoded = 'data:' . $image->getClientMimeType() . ';base64,' . $imageBase64;
        $post->setImage($imageCoded);
        $isUpdated = true;
    }

    if ($category_id !== null) {
        $category = $entityManager->find(PostCategory::class, $category_id);
        if ($category !== null) {
            $post->setCategory($category);
            $isUpdated = true;
        }
    }

    if ($isUpdated) {
        $post->setUpdatedAt(new \DateTime());
        $entityManager->persist($post);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Post updated successfully'], Response::HTTP_OK);
    } else {
        return new JsonResponse(['error' => "No data to update for post ID $id"], Response::HTTP_BAD_REQUEST);
    }
}


    #[Route('/{id}/like', name: 'post_like', methods: ['POST'])]
    public function likePost($id, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $userId = $data['user_id'];
        $postId = $data['post_id'];

        $existingLike = $entityManager->getRepository(Like::class)->findOneBy(['user' => $userId, 'post' => $postId]);

        if ($existingLike) {
            $entityManager->remove($existingLike);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Has eliminado tu me gusta a esta publicación', 'liked' => false], Response::HTTP_OK);
        }

        $post = $entityManager->getRepository(Post::class)->find($postId);

        if (!$post) {
            return new JsonResponse(['message' => 'Publicación no encontrada'], Response::HTTP_NOT_FOUND);
        }

        $user = $entityManager->find(User::class, $userId);

        $like = new Like();
        $like->setPost($post);
        $like->setUser($user);

        $entityManager->persist($like);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Me gusta registrado correctamente', 'liked' => true], Response::HTTP_OK);
    }

    #[Route('/delete', name: 'delete_post', methods: ['DELETE'])]
    public function deletePost(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener el contenido JSON de la solicitud
        $data = json_decode($request->getContent(), true);

        // Verificar si se proporcionó un ID de publicación válido en el JSON
        if (!isset($data['id'])) {
            return new JsonResponse(['error' => 'ID de la publicación no proporcionado en el JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Obtener el ID de la publicación del JSON
        $postIdToDelete = $data['id'];

        // Buscar la publicación en la base de datos
        $post = $entityManager->getRepository(Post::class)->find($postIdToDelete);

        // Verificar si se encontró la publicación
        if (!$post) {
            return new JsonResponse(['error' => 'Publicación no encontrada'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            // Buscar todos los comentarios y likes asociados a la publicación
            $comments = $entityManager->getRepository(Comment::class)->findBy(['post' => $post]);
            $likes = $entityManager->getRepository(Like::class)->findBy(['post' => $post]);
            $postReports = $entityManager->getRepository(PostReports::class)->findBy(['post' => $post]);
            $commentReports = $entityManager->getRepository(CommentReports::class)->findBy(['comment' => $comments]);

            // Unificar los resultados en un solo array
            $entitiesToRemove = array_merge($comments, $likes, $postReports, $commentReports);

            // Eliminar todos los comentarios y likes
            foreach ($entitiesToRemove as $entity) {
                $entityManager->remove($entity);
            }

            // Eliminar la publicación
            $entityManager->remove($post);
            $entityManager->flush();

            // Devolver un JSON de éxito
            return new JsonResponse(['message' => 'Publicación, sus comentarios y likes eliminados exitosamente']);
        } catch (\Exception $e) {
            // Si ocurre un error al eliminar la publicación, los comentarios o los likes, devolver un JSON de error
            return new JsonResponse(['error' => 'Error al eliminar la publicación, sus comentarios y likes: ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/report', name: 'report_post')]
    public function reportPost(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Obtener el ID del usuario y el ID de la publicación del JSON
        $userId = $data['user_id'];
        $postId = $data['post_id'];
        $description = $data['description'];

        // Obtener la publicación
        $post = $entityManager->getRepository(Post::class)->find($postId);

        // Verificar si la publicación existe
        if (!$post) {
            return new JsonResponse(['message' => 'Publicación no encontrada'], Response::HTTP_NOT_FOUND);
        }

        // Obtener el usuario actual
        $user = $entityManager->find(User::class, $userId);

        // Verificar si el usuario existe
        if (!$user) {
            return new JsonResponse(['message' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        // Crear un nuevo "reporte" para esta publicación y usuario
        $report = new PostReports();
        $report->setPost($post);
        $report->setUser($user);
        $report->setDescription($description);

        // Persistir el "reporte" en la base de datos
        $entityManager->persist($report);
        $entityManager->flush();

        // Devolver una respuesta JSON indicando que se ha registrado el reporte correctamente
        return new JsonResponse(['message' => 'Reporte registrado correctamente'], Response::HTTP_OK);
    }

    #[Route('/most-liked', name: 'app_posts_most_liked', methods: ['GET'])]
    public function getMostLikedPosts(): JsonResponse
    {
        $postRepository = $this->entityManager->getRepository(Post::class);

        // Obtener los posts con más likes
        $query = $postRepository->createQueryBuilder('p')
            ->select('p.id, p.title, p.description, COUNT(l.id) AS likes_count')
            ->leftJoin('p.likes', 'l')
            ->groupBy('p.id')
            ->orderBy('likes_count', 'DESC')
            ->setMaxResults(10) // Ajustar el número de posts que deseas obtener
            ->getQuery();

        $mostLikedPosts = $query->getResult();

        return new JsonResponse($mostLikedPosts);
    }
}
