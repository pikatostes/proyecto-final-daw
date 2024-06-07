<?php

namespace App\Controller;

use App\Repository\PostCategoryRepository;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SearchController extends AbstractController
{
    private $userRepository;
    private $postRepository;
    private $postCategoryRepository;

    public function __construct(UserRepository $userRepository, PostRepository $postRepository, PostCategoryRepository $postCategoryRepository)
    {
        $this->userRepository = $userRepository;
        $this->postRepository = $postRepository;
        $this->postCategoryRepository = $postCategoryRepository;
    }

    #[Route('/api/search', name: 'app_search')]
    public function search(Request $request): JsonResponse
    {
        $query = $request->query->get('query', '');

        $users = $this->userRepository->findByQuery($query);
        $posts = $this->postRepository->findByQuery($query);

        return new JsonResponse([
            'users' => $users,
            'posts' => $posts,
        ]);
    }
}
