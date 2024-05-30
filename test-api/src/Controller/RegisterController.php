<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController
{
    private $passwordHasher;
    private $mailerInterface;

    public function __construct(UserPasswordHasherInterface $passwordHasher, MailerInterface $mailerInterface)
    {
        $this->passwordHasher = $passwordHasher;
        $this->mailerInterface = $mailerInterface;
    }

    #[Route('/register', name: 'app_register')]
    public function register(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Obtener los datos de la solicitud, incluido el archivo de la imagen
        $email = $request->request->get('email');
        $username = $request->request->get('username');
        $password = $request->request->get('password');
        $avatar = $request->files->get('avatar');

        // Verificar si se proporcionaron los campos de usuario y contraseña
        if (!$username || !$password || !$avatar || !$email) { // Añadir verificación de avatar
            return new Response('Email, username, password, and avatar are required', Response::HTTP_BAD_REQUEST);
        }

        // Comprobación si el usuario ya existe en la base de datos
        $userRepository = $entityManager->getRepository(User::class);
        $existingUser = $userRepository->findOneBy(['username' => $username]);

        if ($existingUser) {
            // El usuario ya existe
            // Puedes devolver alguna respuesta apropiada, por ejemplo, un error
            return new Response('User already exists', Response::HTTP_CONFLICT);
        }

        // El usuario no existe, podemos proceder con el registro
        $newUser = new User();
        $newUser->setEmail($email);
        $newUser->setUsername($username);

        // Hashear la contraseña utilizando UserPasswordHasherInterface
        $hashedPassword = $this->passwordHasher->hashPassword($newUser, $password);
        $newUser->setPassword($hashedPassword);

        // Convertir la imagen a base64
        $avatarBase64 = base64_encode(file_get_contents($avatar->getPathname())); // Obtener la ruta del archivo de avatar
        $avatarImage = 'data:' . $avatar->getClientMimeType() . ';base64,' . $avatarBase64; // Obtener el tipo MIME del avatar
        $newUser->setAvatar($avatarImage);

        // Asignar el rol ROLE_ADMIN
        $newUser->setRoles(['ROLE_USER']); // Aquí asignamos el rol

        // Guardar el nuevo usuario en la base de datos
        $entityManager->persist($newUser);
        $entityManager->flush();

        $this->sendEmail($email, $username, $avatarImage);

        // Respondemos con un mensaje de éxito
        return new Response('User registration successful', Response::HTTP_OK);
    }

    private function sendEmail(string $emailAddress, string $username, string $avatar): void
    {
        $email = (new Email())
            ->from('brickpoint.daw@gmail.com')
            ->to($emailAddress)
            ->subject('Bienvenido a BrickPoint')
            ->html($this->renderView('email/welcome.html.twig', [
                'title' => 'Welcome to BrickPoint!',
                'message' => 'This is a test email sent from Symfony Mailer using Gmail.',
                'username' => $username,
                'userAvatar' => $avatar
            ]));

        $this->mailerInterface->send($email);
    }
}
