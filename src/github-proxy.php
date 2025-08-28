<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$tokenFile = __DIR__ . '/github_token.txt';

if(!file_exists($tokenFile)){
    http_response_code(500);
    echo json_encode(['error' => 'GitHub token file not found']);
    exit();
}

$GITHUB_TOKEN = trim(file_get_contents($tokenFile));

if(empty($GITHUB_TOKEN)){
    http_response_code(500);
    echo json_encode(['error' => 'GitHub token is empty']);
    exit();
}

$endpoint = $_GET['endpoint'] ?? '';

if(empty($endpoint)){
    http_response_code(400);
    echo json_encode(['error' => 'Endpoint parameter is required']);
    exit();
}

$allowedPatterns = [
    '/^users\/[a-zA-Z0-9_.-]+$/',
    '/^users\/[a-zA-Z0-9_.-]+\/repos$/',
    '/^repos\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/',
    '/^repos\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/languages$/',
];

$isValidEndpoint = false;
foreach($allowedPatterns as $pattern){
    if(preg_match($pattern, $endpoint)){
        $isValidEndpoint = true;
        break;
    }
}

if(!$isValidEndpoint){
    http_response_code(403);
    echo json_encode(['error' => 'Invalid endpoint']);
    exit();
}

$githubUrl = 'https://api.github.com/' . $endpoint;

if(strpos($endpoint, '/repos') && !strpos($endpoint, '/languages')){
    $githubUrl .= '?sort=updated&per_page=100';
}

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL            => $githubUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $GITHUB_TOKEN,
        'User-Agent: GitHub-Proxy/1.0',
        'Accept: application/vnd.github.v3+json',
    ],
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);

curl_close($ch);

if($error){
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $error]);
    exit();
}

http_response_code($httpCode);

echo $response;
