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
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $category = $request->request->get('category_id');

        // find category on table category
        $category = $entityManager->getRepository(Category::class)->find($category);

        if (!$category) {
            return $this->json(['error' => 'Categoría no encontrada'], 404);
        }

        $piece = new Piece();
        $piece->setName($name);
        $piece->setDescription($description);
        $piece->setCategory($category);
        $entityManager->persist($piece);
        $entityManager->flush();

        return $this->json($piece);
    }

    #[Route('/piece/delete', name: 'delete_piece')]
    public function deletePiece(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $id = $request->request->get('id');

        if (!$id) {
            return $this->json(['error' => 'Se requiere el parámetro "id" para eliminar la pieza'], 400);
        }

        $piece = $entityManager->getRepository(Piece::class)->find($id);
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
