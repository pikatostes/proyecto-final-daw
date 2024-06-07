<?php

namespace App\Repository;

use App\Entity\PostReports;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PostReports>
 *
 * @method PostReports|null find($id, $lockMode = null, $lockVersion = null)
 * @method PostReports|null findOneBy(array $criteria, array $orderBy = null)
 * @method PostReports[]    findAll()
 * @method PostReports[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostReportsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PostReports::class);
    }

    //    /**
    //     * @return PostReports[] Returns an array of PostReports objects
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

    //    public function findOneBySomeField($value): ?PostReports
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
