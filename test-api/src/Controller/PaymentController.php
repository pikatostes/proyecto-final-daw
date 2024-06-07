<?php

namespace App\Controller;

use Stripe\PaymentIntent;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PaymentController extends AbstractController
{
    #[Route('/payment', name: 'app_payment')]
    public function createPaymentIntent(): JsonResponse
    {
        Stripe::setApiKey($this->getParameter('stripe.api_key'));

        // Aquí crea un PaymentIntent con los detalles del pago
        $paymentIntent = PaymentIntent::create([
            'amount' => 2000,
            'currency' => 'usd',
        ]);

        // Devuelve el client secret en la respuesta
        return new JsonResponse(['client_secret' => $paymentIntent->client_secret]);
    }
}
