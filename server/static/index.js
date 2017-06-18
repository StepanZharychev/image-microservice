let target = document.getElementById('imgInput');
target.addEventListener('change', () => {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            let interval;
            let files = JSON.parse(xmlHttp.response);

            if (document.getElementById('name')) {
                document.getElementById('name').remove();
                document.getElementById('preview').remove();
            }

            let nameEl = new Image();
            nameEl.setAttribute('id', 'name');
            nameEl.setAttribute('data-src', files.name);
            nameEl.onload = function () {
                nameEl.removeAttribute('data-src');
            };

            let previewEl = new Image();
            previewEl.setAttribute('id', 'preview');
            previewEl.setAttribute('data-src', files.preview);
            previewEl.onload = function () {
                previewEl.removeAttribute('data-src');
            };

            setTimeout(() => {
                nameEl.src = files.name;
                previewEl.src = files.preview;

                document.getElementsByTagName('body')[0].appendChild(nameEl);
                document.getElementsByTagName('body')[0].appendChild(previewEl);
            }, 500);
        }
    };

    xmlHttp.open('POST', '/api/images/upload');

    let formData = new FormData();
    formData.append('file', target.files[0], target.files[0].name);
    formData.append('upload_file', true);

    xmlHttp.send(formData);
});