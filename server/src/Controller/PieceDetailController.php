<?php

namespace App\Controller;

use App\Entity\Color;
use App\Entity\Piece;
use App\Entity\PieceDetail;
use App\Repository\PieceDetailRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PieceDetailController extends AbstractController
{
    #[Route('/piece_detail/{id}', name: 'app_piece_detail')]
    public function index(int $id, PieceDetailRepository $pieceDetailRepository): JsonResponse
    {
        // Obtener los datos del detalle de la pieza utilizando el repositorio personalizado
        $pieceDetail = $pieceDetailRepository->find($id);

        // Verificar si se encontró el detalle de la pieza
        if (!$pieceDetail) {
            throw $this->createNotFoundException('Piece detail not found');
        }

        // Crear un arreglo para almacenar los datos que se devolverán como JSON
        $responseData = [
            'id' => $pieceDetail->getId(),
            'piece' => $pieceDetail->getPiece()->getId(),
            'color' => $pieceDetail->getColor()->getName(),
            'price' => $pieceDetail->getPrice(),
            'stock' => $pieceDetail->getStock(),
            // Agregar más propiedades según sea necesario
        ];

        // Devolver los datos como JSON
        return $this->json($responseData);
    }

    #[Route('/piece/detail/new', name: 'new_piece_detail')]
    public function newPieceDetail(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        // Get data from request
        $piece = $request->request->get('piece_id');
        $color = $request->request->get('color_id');
        $price = $request->request->get('price');
        $stock = $request->request->get('stock');
        $image = $request->files->get('image');

        // Validate the data
        if (!$piece || !$color || !$price || !$stock) {
            return $this->json(['error' => 'Invalid input data'], 400);
        }

        // Create a new PieceDetail entity
        $pieceDetail = new PieceDetail();

        // find piece
        $pieceEntity = $entityManager->getRepository(Piece::class)->find($piece);
        if (!$pieceEntity) {
            return $this->json(['error' => 'Piece not found'], 404);
        }

        $pieceDetail->setPiece($pieceEntity);

        // find color
        $colorEntity = $entityManager->getRepository(Color::class)->find($color);
        if (!$colorEntity) {
            return $this->json(['error' => 'Color not found'], 404);
        }

        $pieceDetail->setColor($colorEntity);
        $pieceDetail->setPrice($price);
        $pieceDetail->setStock($stock);

        $imageBase64 = base64_encode(file_get_contents($image->getPathname()));
        $imageConverted = 'data:' . $image->getClientMimeType() . ';base64,' . $imageBase64;

        $pieceDetail->setImage($imageConverted);

        // Save the entity
        $entityManager->persist($pieceDetail);
        $entityManager->flush();

        // Return the newly created piece detail as a JSON response
        return $this->json($pieceDetail, 201);
    }
}
