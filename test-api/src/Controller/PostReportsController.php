<?php

namespace App\Controller;

use App\Entity\PostReports;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class PostReportsController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/post/reports', name: 'app_post_reports')]
    public function index(): JsonResponse
    {
        $postReports = $this->entityManager->getRepository(PostReports::class)->findAll();
        
        $serializedPostReports = [];
        foreach ($postReports as $postReport) {
            $serializedPostReports[] = [
                'id' => $postReport->getId(),
                'post_title' => $postReport->getPost()->getTitle(),
                'post_image' => $postReport->getPost()->getImage(),
                'post_user' => $postReport->getPost()->getUserId()->getUsername(),
                'post_userAvatar' => $postReport->getPost()->getUserId()->getAvatar(),
                'post_category' => $postReport->getPost()->getCategory()->getName(),
                'user_name' => $postReport->getUser()->getUsername(),
                'user_avatar' => $postReport->getUser()->getAvatar(),
                'description' => $postReport->getDescription(),
            ];
        }

        return $this->json($serializedPostReports);
    }
}
