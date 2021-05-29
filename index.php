<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Javascript ile Progress Barlı Upload İşlemi</title>
    <link rel="stylesheet" href="index.css">
    <script>
        const MAX_UPLOAD_SIZE = <?=str_replace('M', null, ini_get('upload_max_filesize')) * 1024 * 1024?>
    </script>
</head>
<body>

    <div class="dropzone">
        <div class="dropzone-form">
            <input type="file" multiple>
            <p>Dosyalarınızı buraya sürükleyin ya da seçmek için tıklayın!</p>
        </div>
        <div class="dropzone-result-text"></div>
        <div class="dropzone-result"></div>
    </div>

    <script src="index.js"></script>
    
</body>
</html>