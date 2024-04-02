<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{
    #[Route('/image{filename}', name: 'app_image')]
    public function show(string $filename): Response
    {
        // Asumiendo que las imágenes están almacenadas en la carpeta public/images
        $filePath = $this->getParameter('kernel.project_dir') . '/public/images/' . $filename;

        // Verificar si el archivo existe
        if (!file_exists($filePath)) {
            throw $this->createNotFoundException('La imagen no se encontró');
        }

        // Servir la imagen como una respuesta binaria
        return new BinaryFileResponse($filePath);
    }
}
