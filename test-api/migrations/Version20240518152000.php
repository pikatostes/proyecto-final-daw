<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240518152000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE billing_info (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, state VARCHAR(255) NOT NULL, zip_code VARCHAR(10) NOT NULL, country VARCHAR(255) NOT NULL, INDEX IDX_B4FB0F90A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, billing_info_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_F5299398A76ED395 (user_id), INDEX IDX_F529939836A54A2F (billing_info_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE order_piece_detail (order_id INT NOT NULL, piece_detail_id INT NOT NULL, INDEX IDX_F0B4E0A88D9F6D38 (order_id), INDEX IDX_F0B4E0A8E8518E3D (piece_detail_id), PRIMARY KEY(order_id, piece_detail_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE billing_info ADD CONSTRAINT FK_B4FB0F90A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F5299398A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F529939836A54A2F FOREIGN KEY (billing_info_id) REFERENCES billing_info (id)');
        $this->addSql('ALTER TABLE order_piece_detail ADD CONSTRAINT FK_F0B4E0A88D9F6D38 FOREIGN KEY (order_id) REFERENCES `order` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE order_piece_detail ADD CONSTRAINT FK_F0B4E0A8E8518E3D FOREIGN KEY (piece_detail_id) REFERENCES piece_detail (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE billing_info DROP FOREIGN KEY FK_B4FB0F90A76ED395');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F5299398A76ED395');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F529939836A54A2F');
        $this->addSql('ALTER TABLE order_piece_detail DROP FOREIGN KEY FK_F0B4E0A88D9F6D38');
        $this->addSql('ALTER TABLE order_piece_detail DROP FOREIGN KEY FK_F0B4E0A8E8518E3D');
        $this->addSql('DROP TABLE billing_info');
        $this->addSql('DROP TABLE `order`');
        $this->addSql('DROP TABLE order_piece_detail');
    }
}
