<?php

namespace App\Entity;

use App\Repository\PieceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PieceRepository::class)]
class Piece
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'pieces')]
    private ?Category $category = null;

    #[ORM\OneToMany(targetEntity: PieceDetail::class, mappedBy: 'piece')]
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

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
            $pieceDetail->setPiece($this);
        }

        return $this;
    }

    public function removePieceDetail(PieceDetail $pieceDetail): static
    {
        if ($this->pieceDetails->removeElement($pieceDetail)) {
            // set the owning side to null (unless already changed)
            if ($pieceDetail->getPiece() === $this) {
                $pieceDetail->setPiece(null);
            }
        }

        return $this;
    }
}
