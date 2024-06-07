<?php

namespace App\Entity;

use App\Repository\ColorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ColorRepository::class)]
class Color
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(targetEntity: PieceDetail::class, mappedBy: 'color')]
    private Collection $pieceDetails;

    public function __construct()
    {
        $this->pieceDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, PieceDetail>
     */
    public function getPieceDetails(): Collection
    {
        return $this->pieceDetails;
    }

    public function addPieceDetail(PieceDetail $pieceDetail): static
    {
        if (!$this->pieceDetails->contains($pieceDetail)) {
            $this->pieceDetails->add($pieceDetail);
            $pieceDetail->setColor($this);
        }

        return $this;
    }

    public function removePieceDetail(PieceDetail $pieceDetail): static
    {
        if ($this->pieceDetails->removeElement($pieceDetail)) {
            // set the owning side to null (unless already changed)
            if ($pieceDetail->getColor() === $this) {
                $pieceDetail->setColor(null);
            }
        }

        return $this;
    }
}
