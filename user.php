<?php
header('Content-Type: application/json');
echo json_encode([
    'name' => 'John Doe',
    'email' => 'john@example.com'
]);
?>