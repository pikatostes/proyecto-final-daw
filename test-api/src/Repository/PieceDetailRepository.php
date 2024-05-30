<?php

namespace App\Repository;

use App\Entity\PieceDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PieceDetail>
 *
 * @method PieceDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method PieceDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method PieceDetail[]    findAll()
 * @method PieceDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PieceDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PieceDetail::class);
    }

    //    /**
    //     * @return PieceDetail[] Returns an array of PieceDetail objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?PieceDetail
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
