<?php

namespace App\Controller;

use App\Repository\PieceDetailRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
            'price'=> $pieceDetail->getPrice(),
            'stock'=> $pieceDetail->getStock(),
            // Agregar más propiedades según sea necesario
        ];

        // Devolver los datos como JSON
        return $this->json($responseData);
    }
}
