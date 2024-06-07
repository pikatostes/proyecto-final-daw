<?php

namespace App\Controller;

use App\Entity\CommentReports;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CommentReportsController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/comments/reports', name: 'app_comment_reports')]
    public function index(): JsonResponse
    {
        $commentReports = $this->entityManager->getRepository(CommentReports::class)->findAll();

        $serializedCommentReports = [];
        foreach ($commentReports as $commentReport) {
            $serializedCommentReports[] = [
                'id' => $commentReport->getId(),
                'user_name' => $commentReport->getUser()->getUsername(),
                'user_avatar' => $commentReport->getUser()->getAvatar(),
                'description' => $commentReport->getDescription(),
                'comment_id' => $commentReport->getComment()->getId(),
                'comment_text' => $commentReport->getComment()->getText(),
                'comment_user' => $commentReport->getComment()->getUser()->getUsername(),
                'comment_userAvatar' => $commentReport->getComment()->getUser()->getAvatar(),
            ];
        }

        return new JsonResponse($serializedCommentReports);
    }

    #[Route('/comment/report/delete', name: 'delete_comment_report', methods: ['DELETE'])]
    public function deleteCommentReport(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener el contenido JSON de la solicitud
        $data = json_decode($request->getContent(), true);
        $commentReport = $entityManager->getRepository(CommentReports::class)->find($data['id']);
        $entityManager->remove($commentReport);
        $entityManager->flush();
        return new JsonResponse(['success' => true]);
    }

    #[Route('/comments/reports/{id}', name: 'app_comment_reports_update', methods: ['PUT'])]
    public function updateCommentReport(CommentReports $commentReport): JsonResponse
    {
        $this->entityManager->persist($commentReport);
        $this->entityManager->flush();
        return new JsonResponse(['success' => true]);
    }
}
