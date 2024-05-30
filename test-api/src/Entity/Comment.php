<?php

namespace App\Entity;

use App\Repository\CommentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    private ?Post $post = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    private ?User $user = null;

    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'comments')]
    private Collection $answer;

    #[ORM\ManyToMany(targetEntity: self::class, mappedBy: 'answer')]
    private Collection $comments;

    #[ORM\Column(length: 280)]
    private ?string $text = null;

    #[ORM\OneToMany(targetEntity: CommentReports::class, mappedBy: 'comment')]
    private Collection $commentReports;

    public function __construct()
    {
        $this->answer = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->commentReports = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): static
    {
        $this->post = $post;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getAnswer(): Collection
    {
        return $this->answer;
    }

    public function addAnswer(self $answer): static
    {
        if (!$this->answer->contains($answer)) {
            $this->answer->add($answer);
        }

        return $this;
    }

    public function removeAnswer(self $answer): static
    {
        $this->answer->removeElement($answer);

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(self $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->addAnswer($this);
        }

        return $this;
    }

    public function removeComment(self $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            $comment->removeAnswer($this);
        }

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    /**
     * @return Collection<int, CommentReports>
     */
    public function getCommentReports(): Collection
    {
        return $this->commentReports;
    }

    public function addCommentReport(CommentReports $commentReport): static
    {
        if (!$this->commentReports->contains($commentReport)) {
            $this->commentReports->add($commentReport);
            $commentReport->setComment($this);
        }

        return $this;
    }

    public function removeCommentReport(CommentReports $commentReport): static
    {
        if ($this->commentReports->removeElement($commentReport)) {
            // set the owning side to null (unless already changed)
            if ($commentReport->getComment() === $this) {
                $commentReport->setComment(null);
            }
        }

        return $this;
    }
}
