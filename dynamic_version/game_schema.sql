CREATE DATABASE IF NOT EXISTS text_adventure_game;
USE text_adventure_game;

CREATE TABLE scenes (
    scene_id INT AUTO_INCREMENT PRIMARY KEY,
    scene_name VARCHAR(50) UNIQUE NOT NULL,
    html_content LONGTEXT NOT NULL,
    css_content LONGTEXT NOT NULL,
    js_content LONGTEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scene_actions (
    action_id INT AUTO_INCREMENT PRIMARY KEY,
    scene_id INT NOT NULL,
    command VARCHAR(50) NOT NULL,
    target_scene VARCHAR(50) NOT NULL,
    FOREIGN KEY (scene_id) REFERENCES scenes(scene_id) ON DELETE CASCADE
);

CREATE TABLE cipher_solutions (
    solution_id INT AUTO_INCREMENT PRIMARY KEY,
    scene_id INT NOT NULL,
    encrypted_text VARCHAR(50) NOT NULL,
    shift_value INT NOT NULL,
    decrypted_text VARCHAR(50) NOT NULL,
    FOREIGN KEY (scene_id) REFERENCES scenes(scene_id) ON DELETE CASCADE
);

CREATE TABLE game_state (
    state_id INT AUTO_INCREMENT PRIMARY KEY,
    current_scene VARCHAR(50) NOT NULL,
    inventory JSON,
    settings JSON,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert your scenes (example for one scene)
INSERT INTO scenes (scene_name, html_content, css_content) 
VALUES (
    'system_failure', 
    '<div class="container">...your HTML...</div>', 
    'body { display: flex; ... }'
);

-- Insert actions
INSERT INTO scene_actions (scene_id, command, target_scene)
VALUES (1, 'fix cipher', 'cipher_entry');

-- Insert cipher solutions
INSERT INTO cipher_solutions (scene_id, encrypted_text, shift_value, decrypted_text)
VALUES (3, 'HZBUZ', 7, 'LIGHT'), (3, 'HZBUZ', 14, 'SPACE');

-- Initial game state
INSERT INTO game_state (current_scene, inventory, settings)
VALUES ('system_failure', '[]', '{"theme":"dark","font_size":16}');