<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$isGet = $method === 'GET';
$isPost = $method === 'POST';

if(!$isGet && !$isPost){
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

$githubBaseUrl = 'https://api.github.com/';

function redact_repo_name($repoName){
    if(!is_string($repoName) || $repoName === ''){
        return $repoName;
    }

    $parts = explode('/', $repoName, 2);
    if(count($parts) !== 2){
        $owner = '';
        $name = $repoName;
    }
    else {
        $owner = $parts[0];
        $name = $parts[1];
    }

    if(strlen($name) <= 4){
        $masked = substr($name, 0, 1) . str_repeat('*', max(0, strlen($name) - 1));
    }
    else {
        $masked = substr($name, 0, 4) . str_repeat('*', max(0, strlen($name) - 4));
    }

    return $owner !== '' ? ($owner . '/' . $masked) : $masked;
}

// GraphQL passthrough for contributions calendar, etc.
if($isPost){
    $endpoint = $_GET['endpoint'] ?? '';

    if($endpoint !== 'graphql'){
        http_response_code(403);
        echo json_encode(['error' => 'Invalid endpoint']);
        exit();
    }

    $rawBody = file_get_contents('php://input');
    if(empty($rawBody)){
        http_response_code(400);
        echo json_encode(['error' => 'Request body is required']);
        exit();
    }

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $githubBaseUrl . 'graphql',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $GITHUB_TOKEN,
            'User-Agent: GitHub-Proxy/1.0',
            'Accept: application/vnd.github+json',
            'Content-Type: application/json',
        ],
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $rawBody,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if($error){
        http_response_code(500);
        echo json_encode(['error' => 'cURL error: ' . $error]);
        exit();
    }

    http_response_code($httpCode);
    echo $response;
    exit();
}

$endpoint = $_GET['endpoint'] ?? '';

if(empty($endpoint)){
    http_response_code(400);
    echo json_encode(['error' => 'Endpoint parameter is required']);
    exit();
}

// Authenticated events feed (includes private). Sanitizes private repo names.
if(preg_match('/^users\/[a-zA-Z0-9_.-]+\/events$/', $endpoint)){
    $githubUrl = $githubBaseUrl . $endpoint . '?per_page=100';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $githubUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $GITHUB_TOKEN,
            'User-Agent: GitHub-Proxy/1.0',
            'Accept: application/vnd.github.v3+json, application/vnd.github.private-events+json',
        ],
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if($error){
        http_response_code(500);
        echo json_encode(['error' => 'cURL error: ' . $error]);
        exit();
    }

    http_response_code($httpCode);

    $json = json_decode($response, true);
    if(!is_array($json)){
        echo $response;
        exit();
    }

    foreach($json as &$event){
        if(!is_array($event)){
            continue;
        }

        // If GitHub marks event as non-public, redact repo name.
        if(isset($event['public']) && $event['public'] === false){
            $repoId = null;
            $repoName = null;

            if(isset($event['repo']) && is_array($event['repo'])){
                if(isset($event['repo']['id'])){
                    $repoId = $event['repo']['id'];
                }
                if(isset($event['repo']['name'])){
                    $repoName = $event['repo']['name'];
                }
            }

            // Preserve a consistent schema for the client, but strip sensitive fields.
            if(!isset($event['id'])){
                $event['id'] = 'private-' . ($repoId !== null ? $repoId : 'unknown') . '-' . ($event['created_at'] ?? time());
            }

            if(!isset($event['type'])){
                $event['type'] = 'PrivateEvent';
            }

            // Minimize payload
            $event['payload'] = [
                'repository_id' => $repoId,
            ];

            // Redact repo info
            $event['repo'] = [
                'name' => redact_repo_name($repoName !== null ? $repoName : 'private-repo'),
            ];

            // Remove actor details for private events
            if(isset($event['actor'])){
                unset($event['actor']);
            }
        }
    }
    unset($event);

    echo json_encode($json);
    exit();
}

$allowedPatterns = [
    '/^users\/[a-zA-Z0-9_.-]+$/',
    '/^users\/[a-zA-Z0-9_.-]+\/repos$/',
    '/^users\/[a-zA-Z0-9_.-]+\/events$/',
    '/^users\/[a-zA-Z0-9_.-]+\/events\/public$/',
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

$githubUrl = $githubBaseUrl . $endpoint;

if(preg_match('/^users\/[a-zA-Z0-9_.-]+\/repos$/', $endpoint)){
    $githubUrl .= '?sort=updated&per_page=100&type=owner';
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
$error = curl_error($ch);

curl_close($ch);

if($error){
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $error]);
    exit();
}

http_response_code($httpCode);

echo $response;
