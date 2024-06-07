<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class LoginController extends AbstractController
{
    private $entityManager;
    private $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/login', name: 'app_login', methods: ['GET'])]
    public function index(Request $request): Response
    {
        // Verificar si la solicitud es GET
        if (!$request->isMethod('GET')) {
            return new JsonResponse(['error' => 'Method not allowed'], Response::HTTP_METHOD_NOT_ALLOWED);
        }

        // Obtener los datos del cuerpo de la solicitud
        $username = $request->query->get('username');
        $password = $request->query->get('password');
        
        // Verificar si se proporcionaron los campos de usuario y contraseña
        if (!$username || !$password) {
            return new JsonResponse(['error' => 'Username and password are required'], Response::HTTP_BAD_REQUEST);
        }

        // Buscar el usuario en la base de datos por nombre de usuario
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['username' => $username]);

        // Verificar si el usuario existe y si la contraseña es correcta
        if ($user && $this->passwordHasher->isPasswordValid($user, $password)) {
            // El usuario está autenticado correctamente
            // Puedes devolver datos adicionales del usuario si es necesario
            
            // Crear la respuesta JSON
            $response = new JsonResponse(['message' => 'Login successful'], Response::HTTP_OK);
            // Agregar el encabezado de control de acceso
            $response->headers->set('Access-Control-Allow-Origin', '*');
            // Devolver la respuesta
            return $response;
        } else {
            // Usuario o contraseña incorrectos
            return new JsonResponse(['error' => 'Invalid username or password'], Response::HTTP_UNAUTHORIZED);
        }
    }
}