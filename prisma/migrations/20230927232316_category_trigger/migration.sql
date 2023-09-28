CREATE TRIGGER `tgr_insert_category` AFTER INSERT ON `User`
FOR EACH ROW
BEGIN
    INSERT INTO `Category` (`title`, `color`, `createdAt`, `updatedAt`, `userId`)
    SELECT 'Lazer', '#ff006e', NOW(), NOW(), NEW.id UNION ALL
    SELECT 'Saúde', '#8338ec', NOW(), NOW(), NEW.id UNION ALL
    SELECT 'Alimentação', '#3a86ff', NOW(), NOW(), NEW.id UNION ALL
    SELECT 'Transporte', '#fb5607', NOW(), NOW(), NEW.id UNION ALL
    SELECT 'Educação', '#ffbe0b', NOW(), NOW(), NEW.id UNION ALL
    SELECT 'Outros', '#ff006e', NOW(), NOW(), NEW.id;
END;