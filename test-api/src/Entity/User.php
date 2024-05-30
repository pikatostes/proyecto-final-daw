<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_USERNAME', fields: ['username'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $username = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\OneToMany(targetEntity: Like::class, mappedBy: 'user')]
    private Collection $likes;

    #[ORM\OneToMany(targetEntity: Comment::class, mappedBy: 'user')]
    private Collection $comments;

    #[ORM\Column(length: 1000000)]
    private ?string $avatar = null;

    #[ORM\OneToMany(targetEntity: PostReports::class, mappedBy: 'user')]
    private Collection $postReports;

    #[ORM\OneToMany(targetEntity: CommentReports::class, mappedBy: 'user')]
    private Collection $commentReports;

    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $orders;

    #[ORM\OneToMany(targetEntity: BillingInfo::class, mappedBy: 'user')]
    private Collection $billingInfos;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column]
    private ?bool $authenticated = null;

    public function __construct()
    {
        $this->likes = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->postReports = new ArrayCollection();
        $this->commentReports = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->billingInfos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): static
    {
        if (!$this->likes->contains($like)) {
            $this->likes->add($like);
            $like->setUser($this);
        }

        return $this;
    }

    public function removeLike(Like $like): static
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getUser() === $this) {
                $like->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return Collection<int, PostReports>
     */
    public function getPostReports(): Collection
    {
        return $this->postReports;
    }

    public function addPostReport(PostReports $postReport): static
    {
        if (!$this->postReports->contains($postReport)) {
            $this->postReports->add($postReport);
            $postReport->setUser($this);
        }

        return $this;
    }

    public function removePostReport(PostReports $postReport): static
    {
        if ($this->postReports->removeElement($postReport)) {
            // set the owning side to null (unless already changed)
            if ($postReport->getUser() === $this) {
                $postReport->setUser(null);
            }
        }

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
            $commentReport->setUser($this);
        }

        return $this;
    }

    public function removeCommentReport(CommentReports $commentReport): static
    {
        if ($this->commentReports->removeElement($commentReport)) {
            // set the owning side to null (unless already changed)
            if ($commentReport->getUser() === $this) {
                $commentReport->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, BillingInfo>
     */
    public function getBillingInfos(): Collection
    {
        return $this->billingInfos;
    }

    public function addBillingInfo(BillingInfo $billingInfo): static
    {
        if (!$this->billingInfos->contains($billingInfo)) {
            $this->billingInfos->add($billingInfo);
            $billingInfo->setUser($this);
        }

        return $this;
    }

    public function removeBillingInfo(BillingInfo $billingInfo): static
    {
        if ($this->billingInfos->removeElement($billingInfo)) {
            // set the owning side to null (unless already changed)
            if ($billingInfo->getUser() === $this) {
                $billingInfo->setUser(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function isAuthenticated(): ?bool
    {
        return $this->authenticated;
    }

    public function setAuthenticated(bool $authenticated): static
    {
        $this->authenticated = $authenticated;

        return $this;
    }
}
