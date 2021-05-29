<?php

if ($_FILES['file']['type'] === 'application/zip') {
    echo json_encode([
        'error' => true,
        'msg' => 'Zip dosyası yükleyemezsiniz!'
    ]);
    return;
}

$tmp = $_FILES['file']['tmp_name'];
$path = basename($_FILES['file']['name']);
move_uploaded_file($tmp, "upload/{$path}");

echo json_encode([
    'success' => true,
    'msg' => 'Dosya başarıyla yüklendi',
    'path' => "upload/{$path}",
    'file' => $_FILES['file']['name']
]);