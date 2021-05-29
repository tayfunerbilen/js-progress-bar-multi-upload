function fileIcon(name) {
    if (name.match(/\.jpe?g|png|gif|webp/)) {
        return 'png'
    }
    else if (name.match(/\.zip|rar/)) {
        return 'zip'
    }
    else if (name.match(/\.mp4/)) {
        return 'mp4'
    }
    else if (name.match(/\.mp3/)) {
        return 'mp3'
    }
    else if (name.match(/\.pdf/)) {
        return 'pdf'
    }
    else if (name.match(/\.txt/)) {
        return 'txt'
    }
    return 'doc'
}

function fileUpload(index) {
    const {file, el} = files[index]

    if (file.size > MAX_UPLOAD_SIZE) {
        el.classList.add('error');
        el.querySelector('.error-text').innerText = 'Yüklenen dosya büyüklüğü fazla geldi hacı!';

        if (index + 1 < files.length) {
            fileUpload(index + 1)
        } else {
            resultText.innerText = `Dosyalar başarıyla yüklendi`
            resultText.classList.add('success')
        }

    } else {

        const formData = new FormData()
        formData.append('file', file)

        el.classList.add('current')
        resultText.classList.remove('success')
        resultText.innerText = `Dosyalar yükleniyor.. (${index + 1}/${files.length})`

        const request = new XMLHttpRequest()

        request.addEventListener('error', function() {
            el.classList.add('error');
            el.querySelector('.error-text').innerText = 'Dosya yükleme işlemi iptal edildi.';
        });

        request.addEventListener('load', function() {
            const response = JSON.parse(this.response);
            if (response.error) {
                el.classList.add('error');
                el.querySelector('.error-text').innerText = response.msg;
            }

            if (response.success) {
                el.classList.remove('current')
                el.classList.add('success')
            }

            if (index + 1 < files.length) {
                fileUpload(index + 1)
            } else {
                // yükleme işlemi bitmiş
                resultText.innerText = `Dosyalar başarıyla yüklendi`
                resultText.classList.add('success')
            }
        })

        request.upload.addEventListener('progress', function(e) {
            let percent = (e.loaded / e.total) * 100;
            el.querySelector('.bar span').style.width = percent + '%';
        })

        request.open('POST', 'upload.php');
        request.send(formData)

    }

}

function abortUpload(btn) {
    const parent = btn.closest('.file')
    parent.classList.add('aborted');
    files = files.filter(({file, el}) => el !== parent)
}

const fileInput = document.querySelector('.dropzone-form input'),
    dropzoneForm = document.querySelector('.dropzone-form'),
    result = document.querySelector('.dropzone-result'),
    resultText = document.querySelector('.dropzone-result-text');

let files = [];

dropzoneForm.addEventListener('dragenter', () => dropzoneForm.classList.add('active'));
['dragleave', 'drop'].forEach(method => {
    dropzoneForm.addEventListener(method, () => dropzoneForm.classList.remove('active'))
})

fileInput.addEventListener('change', function() {
    files = [];
    [...this.files].map(file => {
        const item = document.createElement('div');
        item.className = 'file';
        item.innerHTML = `<div class="icon">
            <img src="icons/${fileIcon(file.name)}.png" alt="">
        </div>
        <div class="file-inner">
            <div class="title">${file.name}</div>
            <div class="bar">
                <span style="width: 0%"></span>
            </div>
            <div class="error-text"></div>
            <button onclick="abortUpload(this)" class="abort-btn">Yüklemeyi İptal Et</button>
        </div>`
        result.appendChild(item);
        files.push({
            file,
            el: item
        })
    })
    fileUpload(0)
})