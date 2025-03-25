<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$action = $_GET['action'] ?? '';

try {
    $pdo = getPDO();
    
    switch ($action) {
        case 'load_scene':
            $sceneName = $_GET['scene'] ?? '';
            $stmt = $pdo->prepare("SELECT * FROM scenes WHERE scene_name = ?");
            $stmt->execute([$sceneName]);
            $scene = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($scene) {
                // Get actions for this scene
                $stmt = $pdo->prepare("SELECT * FROM scene_actions WHERE scene_id = ?");
                $stmt->execute([$scene['scene_id']]);
                $actions = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Get cipher solutions if this is the cipher puzzle
                $solutions = [];
                if ($sceneName === 'cipher_puzzle') {
                    $stmt = $pdo->prepare("SELECT * FROM cipher_solutions WHERE scene_id = ?");
                    $stmt->execute([$scene['scene_id']]);
                    $solutions = $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
                
                echo json_encode([
                    'status' => 'success',
                    'scene' => [
                        'html' => $scene['html_content'],
                        'css' => $scene['css_content'],
                        'js' => $scene['js_content'],
                        'actions' => $actions,
                        'solutions' => $solutions
                    ]
                ]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Scene not found']);
            }
            break;
            
        case 'update_state':
            $sceneName = $_POST['scene'] ?? '';
            $inventory = $_POST['inventory'] ?? '[]';
            $settings = $_POST['settings'] ?? '{}';
            
            $stmt = $pdo->prepare("UPDATE game_state SET current_scene = ?, inventory = ?, settings = ?");
            $stmt->execute([$sceneName, $inventory, $settings]);
            
            echo json_encode(['status' => 'success']);
            break;
            
        case 'get_state':
            $stmt = $pdo->query("SELECT * FROM game_state LIMIT 1");
            $state = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'status' => 'success',
                'state' => $state
            ]);
            break;
            
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

function getPDO() {
    static $pdo;
    if (!$pdo) {
        $pdo = new PDO(
            'mysql:host=localhost;dbname=text_adventure_game;charset=utf8mb4',
            'your_username',
            'your_password',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
    return $pdo;
}