<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ImageController extends AbstractController
{
    #[Route('/images', name: 'app_images')]
    public function index(): Response
    {
        // Ruta al directorio de imágenes
        $imageDirectory = $this->getParameter('kernel.project_dir') . '/public/images/';

        // Escanear el directorio de imágenes y obtener los nombres de archivo
        $images = array_diff(scandir($imageDirectory), array('..', '.'));

        // Devolver la lista de nombres de imágenes (sin filtrar por extensión)
        return $this->json($images);
    }
}
