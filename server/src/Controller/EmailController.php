<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

class EmailController extends AbstractController
{
    #[Route('/email', name: 'app_email')]
    public function sendEmail(MailerInterface $mailer): Response
    {
        $email = (new Email())
            ->from('brickpoint.daw@gmail.com')
            ->to('alejandro.rios.cyt@gmail.com')
            ->subject('Test Email from Symfony')
            ->text('This is a test email sent from Symfony Mailer using Gmail.')
            ->html($this->renderView('email/welcome.html.twig', [
                'title' => 'Welcome to BrickPoint!',
                'message' => 'This is a test email sent from Symfony Mailer using Gmail.',
                'username' => $username,
                'avatar' => $avatar
            ]));

        $mailer->send($email);

        return new Response('Email sent successfully!');
    }
}
