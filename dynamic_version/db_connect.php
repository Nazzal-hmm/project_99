<?php
function getPDO() {
    static $pdo;
    if (!$pdo) {
        try {
            $pdo = new PDO(
                'mysql:host=localhost;dbname=text_adventure_game;charset=utf8mb4',
                'your_username',
                'your_password',
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
    return $pdo;
}