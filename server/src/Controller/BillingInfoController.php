<?php

namespace App\Controller;

use App\Entity\BillingInfo;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/billingInfo')]
class BillingInfoController extends AbstractController
{
    #[Route('/new', name: 'app_billing_info')]
    public function newBillingInfo(EntityManagerInterface $entityManager, Request $request, UserRepository $userRepository): JsonResponse
    {
        $userId = $request->request->get('user_id');
        $address = $request->request->get('address');
        $city = $request->request->get('city');
        $state = $request->request->get('state');
        $zip_code = $request->request->get('zip_code');
        $country = $request->request->get('country');

        // Buscar el usuario en la base de datos
        $user = $userRepository->find($userId);

        // Verificar si el usuario existe
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], JsonResponse::HTTP_NOT_FOUND);
        }

        // Crear un nuevo "reporte" para esta publicación y usuario
        $billingInfo = new BillingInfo();
        $billingInfo->setUser($user);
        $billingInfo->setAddress($address);
        $billingInfo->setCity($city);
        $billingInfo->setState($state);
        $billingInfo->setZipCode($zip_code);
        $billingInfo->setCountry($country);

        $entityManager->persist($billingInfo);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Información de facturación creada correctamente'], JsonResponse::HTTP_CREATED);
    }
}
