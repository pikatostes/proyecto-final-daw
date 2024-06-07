<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240514233441 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comment_reports (id INT AUTO_INCREMENT NOT NULL, comment_id INT DEFAULT NULL, user_id INT DEFAULT NULL, description VARCHAR(255) NOT NULL, INDEX IDX_26CC555F8697D13 (comment_id), INDEX IDX_26CC555A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE post_reports (id INT AUTO_INCREMENT NOT NULL, post_id INT DEFAULT NULL, user_id INT DEFAULT NULL, description VARCHAR(255) NOT NULL, INDEX IDX_CCF710764B89032C (post_id), INDEX IDX_CCF71076A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comment_reports ADD CONSTRAINT FK_26CC555F8697D13 FOREIGN KEY (comment_id) REFERENCES comment (id)');
        $this->addSql('ALTER TABLE comment_reports ADD CONSTRAINT FK_26CC555A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE post_reports ADD CONSTRAINT FK_CCF710764B89032C FOREIGN KEY (post_id) REFERENCES post (id)');
        $this->addSql('ALTER TABLE post_reports ADD CONSTRAINT FK_CCF71076A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment_reports DROP FOREIGN KEY FK_26CC555F8697D13');
        $this->addSql('ALTER TABLE comment_reports DROP FOREIGN KEY FK_26CC555A76ED395');
        $this->addSql('ALTER TABLE post_reports DROP FOREIGN KEY FK_CCF710764B89032C');
        $this->addSql('ALTER TABLE post_reports DROP FOREIGN KEY FK_CCF71076A76ED395');
        $this->addSql('DROP TABLE comment_reports');
        $this->addSql('DROP TABLE post_reports');
    }
}
