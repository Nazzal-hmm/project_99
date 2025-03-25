<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Adventure Game</title>
    <style id="dynamic-style"></style>
</head>
<body>
    <div id="game-container"></div>
    
    <script>
        // Global game state
        const gameState = {
            currentScene: '',
            inventory: [],
            settings: {}
        };
        
        // Load initial game state
        async function initGame() {
            try {
                // Load game state
                const stateResponse = await fetch('game_api.php?action=get_state');
                const stateData = await stateResponse.json();
                
                if (stateData.status === 'success') {
                    Object.assign(gameState, stateData.state);
                    loadScene(gameState.currentScene);
                }
            } catch (error) {
                console.error('Error initializing game:', error);
            }
        }
        
        // Load a scene
        async function loadScene(sceneName) {
            try {
                const response = await fetch(`game_api.php?action=load_scene&scene=${sceneName}`);
                const data = await response.json();
                
                if (data.status === 'success') {
                    // Update game container
                    document.getElementById('game-container').innerHTML = data.scene.html;
                    
                    // Apply CSS
                    document.getElementById('dynamic-style').textContent = data.scene.css;
                    
                    // Execute JS if exists
                    if (data.scene.js) {
                        const script = document.createElement('script');
                        script.textContent = data.scene.js;
                        document.body.appendChild(script);
                    }
                    
                    // Update game state
                    gameState.currentScene = sceneName;
                    await updateGameState();
                }
            } catch (error) {
                console.error('Error loading scene:', error);
            }
        }
        
        // Update game state on server
        async function updateGameState() {
            try {
                await fetch('game_api.php?action=update_state', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `scene=${gameState.currentScene}&inventory=${JSON.stringify(gameState.inventory)}&settings=${JSON.stringify(gameState.settings)}`
                });
            } catch (error) {
                console.error('Error updating game state:', error);
            }
        }
        
        // Initialize the game
        initGame();
    </script>
</body>
</html>