<?php

namespace App\Repository;

use App\Entity\BillingInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BillingInfo>
 *
 * @method BillingInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method BillingInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method BillingInfo[]    findAll()
 * @method BillingInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BillingInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BillingInfo::class);
    }

    //    /**
    //     * @return BillingInfo[] Returns an array of BillingInfo objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('b.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?BillingInfo
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
