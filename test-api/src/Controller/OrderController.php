<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\PieceDetail;
use App\Repository\BillingInfoRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/order')]
class OrderController extends AbstractController
{
    #[Route('/get', name: 'get_orders')]
    public function getOrdersUsingUserId(UserRepository $userRepository, Request $request): JsonResponse
    {
        $userId = $request->request->get('user_id');

        if (!$userId) {
            return new JsonResponse(['message' => 'No se proporcionó el ID del usuario'], Response::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['message' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        try {
            $orders = $user->getOrders();
            $serializedOrders = [];
            foreach ($orders as $order) {
                $pieces = [];
                foreach ($order->getPieceDetail() as $pieceDetail) {
                    $pieces[] = [
                        'id' => $pieceDetail->getId(),
                        'name' => $pieceDetail->getPiece()->getName(),
                        'quantity' => $pieceDetail->getStock(), // Asumiendo que stock es la cantidad comprada
                    ];
                }
                $serializedOrders[] = [
                    'id' => $order->getId(),
                    'total' => $order->getTotal(),
                    'status' => $order->getStatus(),
                    'created_at' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
                    'piece_details' => $pieces,
                ];
            }
            return new JsonResponse($serializedOrders);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Error al recuperar las órdenes'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    #[Route('/create', name: 'create_order', methods: ['POST'])]
    public function createOrder(EntityManagerInterface $entityManager, UserRepository $userRepository, BillingInfoRepository $billingInfoRepository, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true); // Decodificar el JSON de la solicitud
        $pieceDetails = $data['piece_details'] ?? [];
        $total = $data['total'] ?? 0;
        $userId = $data['user_id'] ?? null;
        $billingAddress = $data['billing_address'] ?? null;

        if (!$userId) {
            return new JsonResponse(['message' => 'No se proporcionó el ID del usuario'], Response::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->find($userId);
        if (!$user) {
            return new JsonResponse(['message' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        if (!$billingAddress) {
            return new JsonResponse(['message' => 'No se proporcionó la dirección de facturación'], Response::HTTP_BAD_REQUEST);
        }

        if (empty($pieceDetails)) {
            return new JsonResponse(['message' => 'No se proporcionó detalles de piezas'], Response::HTTP_BAD_REQUEST);
        }

        $billingInfo = $billingInfoRepository->findOneBy(['id' => $billingAddress]);

        $order = new Order();
        $order->setUser($user);
        $order->setTotal($total);
        $order->setCreatedAt(new \DateTimeImmutable());
        $order->setBillingInfo($billingInfo);
        // Se puede configurar el estado inicial aquí
        $order->setStatus('Pendiente');

        // Agregar detalles de piezas existentes a la orden y actualizar el stock
        foreach ($pieceDetails as $pieceDetailData) {
            $pieceDetailId = $pieceDetailData['id'] ?? null;
            $quantity = $pieceDetailData['quantity'] ?? 0;

            $pieceDetail = $entityManager->getRepository(PieceDetail::class)->find($pieceDetailId);
            if ($pieceDetail && $quantity > 0) {
                $order->addPieceDetail($pieceDetail);
                $pieceDetail->setStock($pieceDetail->getStock() - $quantity); // Actualiza el stock restando la cantidad
                $entityManager->persist($pieceDetail);
            }
        }

        $entityManager->persist($order);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Orden creada correctamente', 'order_id' => $order->getId()]);
    }
}
