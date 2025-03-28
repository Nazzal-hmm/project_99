<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$jsonPath = __DIR__ . '/../json/tasks.json';

try {
    if (!file_exists($jsonPath)) {
        throw new Exception('Tasks file not found');
    }

    $jsonContent = file_get_contents($jsonPath);
    if ($jsonContent === false) {
        throw new Exception('Error reading tasks file');
    }

    $tasksData = json_decode($jsonContent, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error parsing JSON: ' . json_last_error_msg());
    }

    // Extract just the tasks array from the data
    $tasks = isset($tasksData['tasks']) ? $tasksData['tasks'] : [];

    // Return the tasks array
    echo json_encode([
        'success' => true,
        'data' => $tasks
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>