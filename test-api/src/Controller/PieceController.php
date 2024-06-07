<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Piece;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class PieceController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/piece', name: 'app_piece')]
    public function index(): JsonResponse
    {
        $pieces = $this->entityManager->getRepository(Piece::class)->createQueryBuilder('p')
            ->leftJoin('p.pieceDetails', 'pd')
            ->addSelect('pd')
            ->leftJoin('pd.color', 'c')
            ->addSelect('c')
            ->getQuery()
            ->getResult();

        $data = [];
        foreach ($pieces as $piece) {
            $colors = [];
            foreach ($piece->getPieceDetails() as $pieceDetail) {
                $colors[] = [
                    'name' => $pieceDetail->getColor()->getName(),
                    'price' => $pieceDetail->getPrice(),
                    'stock' => $pieceDetail->getStock(),
                    'image' => $pieceDetail->getImage(),
                ];
            }

            $data[] = [
                'id' => $piece->getId(),
                'name' => $piece->getName(),
                'category' => $piece->getCategory() ? $piece->getCategory()->getName() : null,
                'colors' => $colors,
            ];
        }

        return $this->json($data);
    }

    #[Route('/piece/new', name: 'new_piece')]
    public function newPiece(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        // Get data from request
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $categoryId = $request->request->get('category_id');

        // Validate the data
        if (!$name || !$description || !$categoryId) {
            return $this->json(['error' => 'Invalid input data'], 400);
        }

        // Find the category in the database
        $category = $entityManager->getRepository(Category::class)->find($categoryId);

        if (!$category) {
            return $this->json(['error' => 'Category not found'], 404);
        }

        // Create a new Piece entity
        $piece = new Piece();
        $piece->setName($name);
        $piece->setDescription($description);
        $piece->setCategory($category);

        // Persist and flush the new entity
        $entityManager->persist($piece);
        $entityManager->flush();

        // Return the newly created piece as a JSON response
        return $this->json($piece, 201);
    }

    #[Route('/piece/delete', name: 'delete_piece')]
    public function deletePiece(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Verificar si se proporcionó un ID de publicación válido en el JSON
        if (!isset($data['id'])) {
            return new JsonResponse(['error' => 'ID de la publicación no proporcionado en el JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Obtener el ID de la publicación del JSON
        $pieceId = $data['id'];

        $piece = $entityManager->getRepository(Piece::class)->find($pieceId);
        if (!$piece) {
            return $this->json(['error' => 'Pieza no encontrada'], 404);
        }

        // Eliminar los detalles asociados a la pieza
        $pieceDetails = $piece->getPieceDetails();
        foreach ($pieceDetails as $pieceDetail) {
            $entityManager->remove($pieceDetail);
        }

        $entityManager->remove($piece);
        $entityManager->flush();

        return $this->json(['message' => 'Pieza y sus detalles asociados eliminados con éxito']);
    }
}
