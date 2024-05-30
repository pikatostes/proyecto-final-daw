<?php

namespace App\Controller;

use App\Entity\Piece;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

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
            ->leftJoin('pd.color', 'c') // Join con la entidad Color
            ->addSelect('c') // Selecciona la entidad Color
            ->getQuery()
            ->getResult();

        $data = [];
        foreach ($pieces as $piece) {
            $colors = [];
            foreach ($piece->getPieceDetails() as $pieceDetail) {
                $colorName = $pieceDetail->getColor()->getName();
                $image = $pieceDetail->getImage();
                // Si hay más imágenes asociadas al color, agregalas
                if (!empty($image)) {
                    $colors[$colorName] = $image;
                }
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

    #[Route('/piece/{id}', name: 'app_piece_by_id')]
    public function findPieceById(int $id): JsonResponse
    {
        $piece = $this->entityManager->getRepository(Piece::class)->find($id);

        if (!$piece) {
            return $this->json(['error' => 'Pieza no encontrada'], 404);
        }

        $colors = [];
        foreach ($piece->getPieceDetails() as $pieceDetail) {
            $colors[] = [
                'name' => $pieceDetail->getColor()->getName(),
                'price' => $pieceDetail->getPrice(),
                'stock' => $pieceDetail->getStock(),
                'image' => $pieceDetail->getImage(),
            ];
        }

        $data = [
            'id' => $piece->getId(),
            'name' => $piece->getName(),
            'category' => $piece->getCategory() ? $piece->getCategory()->getName() : null,
            'colors' => $colors,
        ];

        return $this->json($data);
    }
}
