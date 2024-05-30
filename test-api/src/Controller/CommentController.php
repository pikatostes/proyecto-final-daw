<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\CommentReports;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommentController extends AbstractController
{
    #[Route('/comment', name: 'app_comment')]
    public function createComment(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Decodificar los datos JSON recibidos desde el frontend
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return new Response('Invalid JSON data', Response::HTTP_BAD_REQUEST);
        }

        // Verificar si se proporcionaron los campos de usuario y contraseña
        if (!isset($data['postId']) || !isset($data['userId']) || !isset($data['text'])) {
            return new Response('PostId, UserId and Text are required', Response::HTTP_BAD_REQUEST);
        }

        $post = $entityManager->find(Post::class, $data['postId']);
        $user = $entityManager->find(User::class, $data['userId']);

        // Crear una nueva instancia de Comment con los datos recibidos
        $comment = new Comment();
        $comment->setPost($post); // Asumiendo que existe un campo postId en la entidad Comment
        $comment->setUser($user); // Asumiendo que existe un campo userId en la entidad Comment
        $comment->setText($data['text']); // Asumiendo que existe un campo text en la entidad Comment

        // Obtener el Entity Manager para persistir el comentario en la base de datos
        $entityManager->persist($comment);
        $entityManager->flush();

        // Devolver una respuesta exitosa
        return new Response('Comentario insertado correctamente', Response::HTTP_CREATED);
    }

    #[Route('/comment/{postId}', name: 'app_get_comments', methods: ['GET'])]
    public function getCommentsByPostId($postId, EntityManagerInterface $entityManager): Response
    {
        // Obtener los comentarios asociados al post con el ID proporcionado
        $comments = $entityManager->getRepository(Comment::class)->findBy(['post' => $postId]);

        // Construir un array asociativo con los datos relevantes de cada comentario
        $commentData = [];
        foreach ($comments as $comment) {
            $commentData[] = [
                'id' => $comment->getId(),
                'user' => $comment->getUser()->getUsername(),
                'avatar' => $comment->getUser()->getAvatar(),
                'text' => $comment->getText(),
            ];
        }

        // Convertir el array asociativo a formato JSON
        $jsonData = json_encode($commentData);

        // Devolver la respuesta con el JSON de los comentarios
        return new Response($jsonData, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }

    #[Route('/comment/delete', name: 'delete_comment', methods: ['DELETE'])]
    public function deleteComment(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener el contenido JSON de la solicitud
        $data = json_decode($request->getContent(), true);

        // Verificar si se proporcionó un ID de comentario válido
        if (!isset($data['id'])) {
            return new JsonResponse(['error' => 'ID del comentario no proporcionado en el JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Obtener el ID del comentario del JSON
        $commentIdToDelete = $data['id'];

        // Buscar el comentario en la base de datos
        $comment = $entityManager->getRepository(Comment::class)->find($commentIdToDelete);

        // Verificar si se encontró el comentario
        if (!$comment) {
            return new JsonResponse(['error' => 'Comentario no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            // Eliminar el comentario
            $entityManager->remove($comment);
            $entityManager->flush();

            // Devolver un JSON de éxito
            return new JsonResponse(['message' => 'Comentario eliminado exitosamente']);
        } catch (\Exception $e) {
            // Si ocurre un error al eliminar el comentario, devolver un JSON de error
            return new JsonResponse(['error' => 'Error al eliminar el comentario: ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/report/comment', name: 'report_comment')]
    public function reportComment(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener el contenido JSON de la solicitud
        $data = json_decode($request->getContent(), true);

        // Verificar si se proporcionaron los campos necesarios
        if (!isset($data['id']) || !isset($data['userId']) || !isset($data['description'])) {
            return new JsonResponse(['error' => 'ID del comentario, userId y descripción son requeridos'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Obtener el comentario a reportar
        $comment = $entityManager->getRepository(Comment::class)->find($data['id']);

        // Verificar si se encontró el comentario
        if (!$comment) {
            return new JsonResponse(['error' => 'Comentario no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Crear una nueva instancia de Report con los datos recibidos
        $report = new CommentReports();
        $report->setComment($comment); // Asumiendo que existe un campo comment en la entidad Report
        $report->setUser($entityManager->find(User::class, $data['userId'])); // Asumiendo que existe un campo user en la entidad Report
        $report->setDescription($data['description']); // Asumiendo que existe un campo description en la entidad Report

        // Persistir el reporte en la base de datos
        try {
            $entityManager->persist($report);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Comentario reportado exitosamente'], JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error al reportar el comentario: ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
