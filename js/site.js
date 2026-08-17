// ====== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ======
let n = 1;
let N = 0;
var image = document.createElement('img0');
let click_on_circle = 1;
var x = 0;
var y = 0;
var direction = 1;

// ====== ПЕРЕМЕННЫЕ ДЛЯ УПРАВЛЕНИЯ МАСШТАБОМ фотографии объекта ======
let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;
let currentMedia = null;
let mediaContainer = null;

// ====== ПЕРЕМЕННЫЕ ДЛЯ МАСШТАБА КАРТЫ ======
let mapScale = 1;
let mapTranslateX = 0;
let mapTranslateY = 0;
let isMapDragging = false;
let mapStartX, mapStartY;

// Переменные для мультитач
let initialPinchDist = 0;
let initialScale = 1;
let initialTranslateX = 0;
let initialTranslateY = 0;
let lastTapTime = 0;
//alert("32");
function onclick_01() {
    image.setAttribute("src", " ");
    image.setAttribute("style", "display: none");
    click_on_circle = 0;
    x = 0;
    y = 0;
    n = n + 1;
    direction = 1;
    on_off_image0();
    show_image();
}

function onclick_02() {
    image.setAttribute("src", " ");
    image.setAttribute("style", "display: none");
    click_on_circle = 0;
    x = 0;
    y = 0;
    n = n - 1;
    direction = -1;
    on_off_image0();
    show_image();
}

function on_off_image0() {
    if (n == 0) {
        document.getElementById('img0').hidden = true;
    } else {
        document.getElementById('img0').hidden = false;
    }
}

function onclick_img() {
    n = 1;
}

function onclick_img0() {
    n = 1;
}

function show_image_old() {
    // Формируем имя файла: N_n.jpg (например, 01_01.jpg)
    let str = String(N).padStart(2, '0') + "_" + String(n).padStart(2, '0') + ".jpg";
    let fullPath = "images/" + str;

    console.log("Загружаем: " + fullPath); // Отладка

    // Создаем новый img или используем существующий
    let imgElement = document.createElement('img');
    imgElement.src = fullPath;
    imgElement.style.width = "100%";
    imgElement.style.height = "auto";
    imgElement.style.objectFit = "contain";
    imgElement.style.display = "block";

    imgElement.onload = function () {
        console.log("Фото загружено: " + fullPath);
        // Очищаем блок и добавляем картинку
        let block = document.getElementById('block');
        block.innerHTML = '';
        block.appendChild(imgElement);

        // Обновляем текст
        let td1Element = document.getElementById("td1");
        if (names_arr3[N] && names_arr3[N][n]) {
            td1Element.textContent = names_arr3[N][n];
        } else {
            td1Element.textContent = "Фото " + n;
        }
    };

    imgElement.onerror = function () {
        console.log("Ошибка загрузки: " + fullPath);
        // Если фото не найдено, пробуем следующее
        if (direction == 1) {
            n = n - 1;
        } else {
            n = n + 1;
        }
        if (n > 0) {
            show_image(); // Рекурсивно пробуем следующее
        } else {
            document.getElementById('block').innerHTML = '<p style="color:white;">Нет фото</p>';
        }
    };
}

function show_image_iki_10_08_2026_OK() {
    // Формируем базовое имя файла без расширения
    let baseName = String(N).padStart(2, '0') + "_" + String(n).padStart(2, '0');
    let photoPath = "images/" + baseName + ".jpg";
    let videoPath = "images/" + baseName + ".mp4"; // можно добавить другие форматы

    // Сначала пробуем загрузить видео
    let videoElement = document.createElement('video');
    videoElement.src = videoPath;
    videoElement.style.width = "100%";
    videoElement.style.height = "auto";
    videoElement.style.maxHeight = "100%";
    videoElement.style.objectFit = "contain";
    videoElement.style.display = "block";
    videoElement.controls = true; // показываем кнопки управления
    videoElement.autoplay = false; // можно включить автовоспроизведение (но осторожно)
    videoElement.muted = false;
    videoElement.playsInline = true; // для iPhone

    // Пытаемся загрузить видео
    videoElement.onloadedmetadata = function () {
        // Видео загрузилось – показываем его
        console.log("Видео загружено: " + videoPath);
        let block = document.getElementById('block');
        block.innerHTML = '';
        block.appendChild(videoElement);

        // Обновляем текст подписи (если нужно)
        let td1Element = document.getElementById("td1");
        if (names_arr3[N] && names_arr3[N][n]) {
            td1Element.textContent = names_arr3[N][n];
        } else {
            td1Element.textContent = "Видео " + n;
        }
    };

    // Если видео не загрузилось – пробуем картинку
    videoElement.onerror = function () {
        console.log("Видео не найдено, пробуем фото: " + photoPath);
        // Создаём img для фото
        let imgElement = document.createElement('img');
        imgElement.src = photoPath;
        imgElement.style.width = "100%";
        imgElement.style.height = "auto";
        imgElement.style.maxHeight = "100%";
        imgElement.style.objectFit = "contain";
        imgElement.style.display = "block";

        imgElement.onload = function () {
            console.log("Фото загружено: " + photoPath);
            let block = document.getElementById('block');
            block.innerHTML = '';
            block.appendChild(imgElement);

            let td1Element = document.getElementById("td1");
            if (names_arr3[N] && names_arr3[N][n]) {
                td1Element.textContent = names_arr3[N][n];
            } else {
                td1Element.textContent = "Фото " + n;
            }
        };

        imgElement.onerror = function () {
            console.log("Фото не найдено: " + photoPath);
            // Если и фото нет – показываем сообщение
            document.getElementById('block').innerHTML = '<p style="color:white;">Нет медиа</p>';
            // Если не найдено, пробуем следующее (как в вашей логике)
            if (direction == 1) {
                n = n - 1;
            } else {
                n = n + 1;
            }
            if (n > 0) {
                show_image(); // рекурсивно пробуем следующее
            } else {
                document.getElementById('block').innerHTML = '<p style="color:white;">Нет медиа</p>';
            }
        };

        // Вставляем фото (если загрузится)
        // (вызов imgElement.onload произойдёт асинхронно)
    };

    // Начинаем попытку загрузки видео
    // (сработает либо onloadedmetadata, либо onerror)
    // Но чтобы избежать двойной загрузки, нужно вызвать videoElement.load()
    videoElement.load();
}
//alert("208");
// ====== ДЛЯ ПК (МЫШЬ) ======
function setupMouseHandlers(container) {
    if (!container) return;
    mediaContainer = container; // <-- ЭТО ВАЖНО
    // Колесико для зума
    container.addEventListener('wheel', function (e) {
        e.preventDefault();
        let delta = e.deltaY > 0 ? -1.0 : 1.0;
        scale = Math.min(Math.max(1.0, scale + delta), 3);
        applyTransformToMedia();
    }, { passive: false });

    // Перетаскивание
    let isMouseDown = false;
    let mouseStartX, mouseStartY;

    container.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        mouseStartX = e.clientX - translateX;
        mouseStartY = e.clientY - translateY;
        container.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (!isMouseDown) return;
        translateX = e.clientX - mouseStartX;
        translateY = e.clientY - mouseStartY;
        applyTransformToMedia();
    });

    document.addEventListener('mouseup', function () {
        isMouseDown = false;
        if (container) container.style.cursor = 'grab';
    });

    // Двойной клик для сброса
    container.addEventListener('dblclick', function () {
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransformToMedia();
    });
}
//alert("252");
// ====== ПРИМЕНЕНИЕ ТРАНСФОРМАЦИЙ ======
function applyTransformToMedia() {
    console.log('applyTransformToMedia called, currentMedia:', currentMedia, 'mediaContainer:', mediaContainer);
    if (currentMedia && mediaContainer) {
        // Ограничиваем перемещение
        let containerWidth = mediaContainer.offsetWidth;
        let containerHeight = mediaContainer.offsetHeight;
        let mediaWidth = currentMedia.offsetWidth || 100;
        let mediaHeight = currentMedia.offsetHeight || 100;

        let maxTranslateX = Math.max(0, (mediaWidth * scale - containerWidth) / 2);
        let maxTranslateY = Math.max(0, (mediaHeight * scale - containerHeight) / 2);

        let clampedX = Math.min(Math.max(translateX, -maxTranslateX), maxTranslateX);
        let clampedY = Math.min(Math.max(translateY, -maxTranslateY), maxTranslateY);

        currentMedia.style.transform = `translate(${clampedX}px, ${clampedY}px) scale(${scale})`;
        currentMedia.style.transformOrigin = 'center center';
        currentMedia.style.transition = 'transform 0.05s ease';
        console.log('applyTransformToMedia: transform applied');
    } else {
        console.log('applyTransformToMedia: currentMedia or mediaContainer is null!');
    }
}
//alert("277");
// ====== ПРИМЕНЕНИЕ ТРАНСФОРМАЦИЙ К КАРТЕ ======
function applyMapTransform() {
    let img = document.getElementById('img0');
    if (!img) {
        console.log('applyMapTransform: img0 not found');
        return;
    }
    //if (!img) return;

    console.log('applyMapTransform: scale=' + mapScale + ', translateX=' + mapTranslateX + ', translateY=' + mapTranslateY);


    // ====== ПРОВЕРКА НА МОБИЛЬНОЕ УСТРОЙСТВО ======
    let isMobile = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

    // Получаем размеры контейнера
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;

    // Ограничиваем перемещение
    let imgWidth = img.offsetWidth || containerWidth;
    let imgHeight = img.offsetHeight || containerHeight;

    let maxTranslateX = Math.max(0, (imgWidth * mapScale - containerWidth) / 2);
    let maxTranslateY = Math.max(0, (imgHeight * mapScale - containerHeight) / 2);

    let clampedX = Math.min(Math.max(mapTranslateX, -maxTranslateX), maxTranslateX);
    let clampedY = Math.min(Math.max(mapTranslateY, -maxTranslateY), maxTranslateY);

    // ====== ФОРМИРУЕМ ТРАНСФОРМАЦИЮ ======
    let transformString = `translate(${clampedX}px, ${clampedY}px) scale(${mapScale})`;
    // Поворот будет применяться через CSS-медиазапросы
    // Если мобильное устройство, добавляем поворот
    /*
    if (isMobile) {
        // Для вертикальной ориентации добавляем поворот на 90 градусов
        // Также нужно увеличить масштаб для заполнения экрана
        let mobileScale = mapScale * 1.4; // Компенсируем масштаб из CSS 1.4
        transformString = `translate(${clampedX}px, ${clampedY}px) rotate(90deg) scale(${mobileScale})`;

        // Корректируем положение для повернутого изображения
        // При rotate(90deg) центр вращения находится в центре
        // Нужно сместить изображение, чтобы оно было по центру
        let offsetX = (containerWidth - containerHeight) / 2;
        let offsetY = (containerHeight - containerWidth) / 2;
        transformString = `translate(${clampedX + offsetX}px, ${clampedY + offsetY}px) rotate(90deg) scale(${mobileScale})`;
    }
    */
    if (isMobile) {
        alert("11:05");
        transformString = `translate(${clampedX}px, ${clampedY}px) rotate(90deg) scale(${mobileScale})`
    }


    img.style.transform = transformString;
    img.style.transformOrigin = 'center center';
    img.style.transition = 'transform 0.05s ease';

    // Обновляем индикатор масштаба
    let indicator = document.getElementById('map-zoom-level');
    if (indicator) {
        indicator.textContent = mapScale.toFixed(1);
    }
    let container = document.getElementById('map-zoom-indicator');
    if (container) {
        container.style.display = 'block';
    }


/*
    
    // Получаем размеры контейнера
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;
    // Ограничиваем перемещение
    let imgWidth = img.offsetWidth || containerWidth;
    let imgHeight = img.offsetHeight || containerHeight;

    let maxTranslateX = Math.max(0, (imgWidth * mapScale - containerWidth) / 2);
    let maxTranslateY = Math.max(0, (imgHeight * mapScale - containerHeight) / 2);

    let clampedX = Math.min(Math.max(mapTranslateX, -maxTranslateX), maxTranslateX);
    let clampedY = Math.min(Math.max(mapTranslateY, -maxTranslateY), maxTranslateY);

    img.style.transform = `translate(${clampedX}px, ${clampedY}px) scale(${mapScale})`;
    img.style.transformOrigin = 'center center';
    img.style.transition = 'transform 0.05s ease';

    // Обновляем индикатор масштаба
    let indicator = document.getElementById('map-zoom-level');
    if (indicator) {
        indicator.textContent = mapScale.toFixed(1);
    }
    let container = document.getElementById('map-zoom-indicator');
    container.style.display = 'block';
    */

    /*
    if (container && mapScale !== 1) {
        container.style.display = 'block';
    } else if (container) {
        container.style.display = 'none';
    }
    */
}
//alert("322");
// ====== ПЕРЕСЧЕТ КООРДИНАТ КЛИКА С УЧЕТОМ МАСШТАБА ======
function getMapCoordinates_(clientX, clientY) {
    let img = document.getElementById('img0');
    if (!img) return { x: -1, y: -1 };

    let rect = img.getBoundingClientRect();

    // Проверяем, что клик внутри изображения
    if (clientX < rect.left || clientX > rect.left + rect.width ||
        clientY < rect.top || clientY > rect.top + rect.height) {
        return { x: -1, y: -1 };
    }

    // Получаем матрицу трансформации
    let style = window.getComputedStyle(img);
    let transform = style.transform;

    let matrix;
    if (transform === 'none') {
        matrix = new DOMMatrix();
    } else {
        matrix = new DOMMatrix(transform);
    }

    // Получаем натуральные размеры
    let naturalWidth = img.naturalWidth;
    let naturalHeight = img.naturalHeight;

    // Координаты клика в системе координат изображения (до трансформации)
    // Инвертируем матрицу для преобразования координат
    let inverse = matrix.inverse();
    let point = new DOMPoint(clientX - rect.left, clientY - rect.top);
    let transformed = point.matrixTransform(inverse);

    // Переводим в проценты
    let x = (transformed.x / rect.width) * 100;
    let y = (transformed.y / rect.height) * 100;

    // Корректируем с учетом натуральных размеров
    // (если изображение имеет object-fit: contain, нужно учитывать пропорции)
    let containerAspect = rect.width / rect.height;
    let imageAspect = naturalWidth / naturalHeight;

    let offsetX = 0, offsetY = 0;
    let displayWidth = rect.width, displayHeight = rect.height;

    if (imageAspect > containerAspect) {
        displayHeight = rect.width / imageAspect;
        offsetY = (rect.height - displayHeight) / 2;
    } else {
        displayWidth = rect.height * imageAspect;
        offsetX = (rect.width - displayWidth) / 2;
    }

    // Корректируем координаты с учетом черных полос (object-fit: contain)
    let correctedX = (transformed.x - offsetX) / displayWidth * 100;
    let correctedY = (transformed.y - offsetY) / displayHeight * 100;

    return {
        x: Math.max(0, Math.min(100, correctedX)),
        y: Math.max(0, Math.min(100, correctedY))
    };
}

// ====== ПЕРЕСЧЕТ КООРДИНАТ КЛИКА С УЧЕТОМ МАСШТАБА ======

// ====== ЭКСПЕРИМЕНТАЛЬНЫЕ ДАННЫЕ ДЛЯ КОРРЕКЦИИ КООРДИНАТ ======
// Массив для коррекции X при разных масштабах
// Для каждого масштаба храним смещение относительно центра
let scaleCorrections = {
    1.0: { offset: 0, center: 49.0 },
    1.5: { offset: 0, center: 49.0 },
    2.0: { offset: 0, center: 49.0 },
    2.5: { offset: 0, center: 49.0 },
    3.0: { offset: 0, center: 49.0 }
};

// Функция для получения поправочного коэффициента
function getCorrection(scale, x) {
    // Вычисляем отклонение от центра
    let center = 49.0;
    let deviation = x - center;

    // При масштабе > 1 координаты стягиваются к центру
    // Но не полностью, поэтому вводим поправочный коэффициент
    let correction = 0;

    if (scale > 1) {
        // Эмпирический коэффициент, полученный из данных
        // Для точек слева от центра (x < 49) координаты смещаются вправо
        // Для точек справа от центра (x > 49) координаты смещаются влево
        let sign = deviation > 0 ? 1 : -1;
        let absDev = Math.abs(deviation);

        // Поправка растет с увеличением отклонения и масштаба
        correction = sign * absDev * 0.08 * (scale - 1);
    }

    return correction;
}
// ====== ПОЛУЧЕНИЕ КООРДИНАТ ТОЧКИ ПРИ ЗАДАННОМ МАСШТАБЕ ======
function getCoordsAtScale(pointIndex, scale) {
    // Если масштаб равен 1.0, возвращаем исходные координаты
    if (Math.abs(scale - 1.0) < 0.001) {
        return { x: mass[pointIndex][0], y: mass[pointIndex][1] };
    }

    // Для масштаба 1.5
    if (Math.abs(scale - 1.5) < 0.001) {
        return { x: mass1_5[pointIndex][0], y: mass1_5[pointIndex][1] };
    }

    // Для масштаба 2.0
    if (Math.abs(scale - 2.0) < 0.001) {
        return { x: mass2_0[pointIndex][0], y: mass2_0[pointIndex][1] };
    }

    // Для масштаба 2.5
    if (Math.abs(scale - 2.5) < 0.001) {
        return { x: mass2_5[pointIndex][0], y: mass2_5[pointIndex][1] };
    }

    // Для масштаба 3.0
    if (Math.abs(scale - 3.0) < 0.001) {
        return { x: mass3_0[pointIndex][0], y: mass3_0[pointIndex][1] };
    }

    // Для промежуточных масштабов — линейная интерполяция
    const fixedScales = [1.0, 1.5, 2.0, 2.5, 3.0];
    let s1 = 1.0, s2 = 3.0;
    for (let i = 0; i < fixedScales.length - 1; i++) {
        if (scale >= fixedScales[i] && scale <= fixedScales[i + 1]) {
            s1 = fixedScales[i];
            s2 = fixedScales[i + 1];
            break;
        }
    }

    // Получаем координаты для s1 и s2
    let coords1 = getCoordsAtScale(pointIndex, s1);
    let coords2 = getCoordsAtScale(pointIndex, s2);

    // Линейная интерполяция
    let t = (scale - s1) / (s2 - s1);
    let x = coords1.x + (coords2.x - coords1.x) * t;
    let y = coords1.y + (coords2.y - coords1.y) * t;

    return { x, y };
}
// ====== ПЕРЕСЧЕТ КООРДИНАТ КЛИКА С УЧЕТОМ МАСШТАБА ======
 //alert("473");
function getMapCoordinates(clientX, clientY) {
    //alert("in getMapCoordinates");
    let img = document.getElementById('img0');
    if (!img) return { x: -1, y: -1 };

    let rect = img.getBoundingClientRect();

    // Проверяем, что клик внутри изображения
    if (clientX < rect.left || clientX > rect.left + rect.width ||
        clientY < rect.top || clientY > rect.top + rect.height) {
        return { x: -1, y: -1 };
    }

    let x = 0.0;
    let y = 0.0;

   
    // ====== ПРОВЕРКА НА МОБИЛЬНОЕ УСТРОЙСТВО ======
    let isMobile = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
     /*
    // ====== ЕСЛИ МОБИЛЬНОЕ УСТРОЙСТВО (повернутое изображение) ======
    if (isMobile == true) {
        // При rotate(90deg) координаты меняются местами
        // x_original = y_click, y_original = 100 - x_click
        // Координаты клика в процентах от rect
        let clickX = (clientX - rect.left) / rect.width * 100;
        let clickY = (clientY - rect.top) / rect.height * 100;
        let tempX = clickX;
        let tempY = clickY;
        x = tempY;
        y = 100 - tempX;

       // let x = (clickY - dy) / H1 * 100;
       // let y = 100 - (clickX - dx) / W1 * 100;

        console.log(`Мобильная версия: скорректированные координаты (${clickX.toFixed(2)}, ${clickY.toFixed(2)})`);
    }

    if (isMobile == false) {
        // Координаты в процентах от всего элемента
        x = (clientX - rect.left) / rect.width * 100;
        y = (clientY - rect.top) / rect.height * 100;
    }
    */

    // ====== ПРОСТОЙ ПОДХОД ======
    // Координаты в процентах от всего элемента
    if (isMobile == false) {
        x = (clientX - rect.left) / rect.width * 100;
        y = (clientY - rect.top) / rect.height * 100;
    }

    if (isMobile == true) {
        let clickX = (clientX - rect.left) / rect.width * 100;
        let clickY = (clientY - rect.top) / rect.height * 100;
        let tempX = clickX;
        let tempY = clickY;
        x = tempY;
        y = 100 - tempX;
    }


    // Применяем масштаб (координаты "сжимаются" к центру)
    let scale = mapScale || 1;
    let xScaled = 50 + (x - 50) / scale;
    let yScaled = 50 + (y - 50) / scale;

    // Учитываем смещение (переводим пиксели в проценты)
    //let txPercent = (mapTranslateX || 0) / rect.width * 100;
    //let tyPercent = (mapTranslateY || 0) / rect.height * 100;

    //let tx = 50 + (txPercent - 50) / scale;
    //let ty = 50 + (tyPercent - 50) / scale;
    //tx = txPercent*0;
    //ty = tyPercent*0;


    let finalX = xScaled;
    let finalY = yScaled;

    

    // Корректируем с учетом object-fit: contain (черные полосы)
    // Но при масштабе > 1 черные полосы исчезают, поэтому корректировка нужна только при scale <= 1
    if ((scale <= 1.5)) {
        // Получаем натуральные размеры
        let naturalWidth = img.naturalWidth;
        let naturalHeight = img.naturalHeight;
        let containerAspect = rect.width / rect.height;
        let imageAspect = naturalWidth / naturalHeight;

        let offsetX = 0, offsetY = 0;
        let displayWidth = rect.width, displayHeight = rect.height;

        if (imageAspect > containerAspect) {
            displayHeight = rect.width / imageAspect;
            offsetY = (rect.height - displayHeight) / 2;
        } else {
            displayWidth = rect.height * imageAspect;
            offsetX = (rect.width - displayWidth) / 2;
        }

        // Корректируем координаты с учетом черных полос
        let xPx = (finalX / 100) * rect.width;
        let yPx = (finalY / 100) * rect.height;
        let correctedX = (xPx - offsetX) / displayWidth * 100;
        let correctedY = (yPx - offsetY) / displayHeight * 100;
        finalX = Math.max(0, Math.min(100, correctedX));
        finalY = Math.max(0, Math.min(100, correctedY));
    }
    //alert("scale=" + scale + " xScaled=" + xScaled + " yScaled=" + yScaled+" finalX=" + finalX + "%, finalY=" + finalY + "%");

    return { x: finalX, y: finalY };
}
 // ====== ПЕРЕСЧЕТ КООРДИНАТ КЛИКА С УЧЕТОМ МАСШТАБА И СМЕЩЕНИЯ ======

// ====== НАСТРОЙКА ОБРАБОТЧИКОВ ======
function setupTouchHandlers(container) {
    if (!container) return;
    mediaContainer = container;

    // Удаляем старые обработчики, чтобы избежать дублирования
    container.removeEventListener('touchstart', onTouchStart);
    container.removeEventListener('touchmove', onTouchMove);
    container.removeEventListener('touchend', onTouchEnd);

    // Добавляем новые
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
}

// ====== УНИВЕРСАЛЬНЫЕ ОБРАБОТЧИКИ ДЛЯ МАСШТАБИРОВАНИЯ ======
function setupMediaHandlers(container) {
    console.log('setupMediaHandlers called, container:', container);
    if (!container) return;
    mediaContainer = container;

    // Включаем обработку событий
    container.style.pointerEvents = 'auto';

    // --- Для ПК (мышь) ---
    console.log('setupMediaHandlers: adding wheel listener');
    container.addEventListener('wheel', function (e) {
        console.log('WHEEL EVENT! deltaY:', e.deltaY);
        e.preventDefault();
        e.stopPropagation();
        let delta = e.deltaY > 0 ? -1.0 : 1.0;
        scale = Math.min(Math.max(1.0, scale + delta), 3);
        applyTransformToMedia();
        console.log('wheel: scale=', scale);
    }, { passive: false });

    let isMouseDown = false;
    let mouseStartX, mouseStartY;

    console.log('setupMediaHandlers: adding mousedown listener');
    container.addEventListener('mousedown', function (e) {
        console.log('MOUSEDOWN EVENT!');
        isMouseDown = true;
        mouseStartX = e.clientX - translateX;
        mouseStartY = e.clientY - translateY;
        container.style.cursor = 'grabbing';
        console.log('mousedown');
    });

    document.addEventListener('mousemove', function (e) {
        if (!isMouseDown) return;
        console.log('MOUSEMOVE EVENT!');
        translateX = e.clientX - mouseStartX;
        translateY = e.clientY - mouseStartY;
        applyTransformToMedia();
        console.log('mousemove: translateX=', translateX, 'translateY=', translateY);
    });

    document.addEventListener('mouseup', function () {
        if (isMouseDown) {
            console.log('MOUSEUP EVENT!');
            isMouseDown = false;
            if (container) container.style.cursor = 'grab';
            console.log('mouseup');
        }
    });

    container.addEventListener('dblclick', function (e) {
        console.log('DBLCLICK EVENT!');
        e.preventDefault();
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransformToMedia();
        console.log('dblclick: reset');
    });
    console.log('setupMediaHandlers: all listeners added');
    // --- Для сенсорных экранов ---
    let lastTapTime = 0;
    let initialPinchDist = 0;
    let initialScale = 1;
    let initialTranslateX = 0;
    let initialTranslateY = 0;
    let isDraggingTouch = false;
    let startTouchX, startTouchY;

    container.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            isDraggingTouch = true;
            startTouchX = e.touches[0].clientX - translateX;
            startTouchY = e.touches[0].clientY - translateY;

            let currentTime = Date.now();
            if (currentTime - lastTapTime < 300) {
                scale = 1;
                translateX = 0;
                translateY = 0;
                applyTransformToMedia();
            }
            lastTapTime = currentTime;
        } else if (e.touches.length === 2) {
            isDraggingTouch = false;
            let touch1 = e.touches[0];
            let touch2 = e.touches[1];
            initialPinchDist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            initialScale = scale;
            initialTranslateX = translateX;
            initialTranslateY = translateY;
        }
    }, { passive: true });

    container.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1 && isDraggingTouch) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startTouchX;
            translateY = e.touches[0].clientY - startTouchY;
            applyTransformToMedia();
        } else if (e.touches.length === 2) {
            e.preventDefault();
            let touch1 = e.touches[0];
            let touch2 = e.touches[1];
            let currentDist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

            if (initialPinchDist > 0) {
                let scaleFactor = currentDist / initialPinchDist;
                scale = Math.min(Math.max(0.5, initialScale * scaleFactor), 3);

                let rect = mediaContainer.getBoundingClientRect();
                let centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left - rect.width / 2;
                let centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top - rect.height / 2;

                translateX = initialTranslateX - centerX * (scaleFactor - 1);
                translateY = initialTranslateY - centerY * (scaleFactor - 1);

                applyTransformToMedia();
            }
        }
    }, { passive: false });

    container.addEventListener('touchend', function () {
        isDraggingTouch = false;
    }, { passive: true });
}

// ====== ОБРАБОТЧИКИ ДЛЯ МАСШТАБИРОВАНИЯ КАРТЫ (ПК) ======
function setupMapHandlers() {
    let img = document.getElementById('img0');
    if (!img) {
        console.log('setupMapHandlers: img0 not found');
        return;
    }
    //if (!img) return;

    // ====== ПРОВЕРКА: принудительно делаем img0 кликабельным ======
   // img.style.pointerEvents = 'auto !important';
    img.style.zIndex = '9999';
    img.setAttribute('style', img.getAttribute('style') + '; pointer-events: auto !important;');
    //img.style.border = '5px solid red'; // Временная рамка для проверки

    //console.log('setupMapHandlers: img0 styles applied', img.style.pointerEvents);

    //console.log('setupMapHandlers: attaching handlers to img0');

    //let rect = img.getBoundingClientRect();
    //console.log('img0 rect:', rect);
    console.log('img0 z-index:', getComputedStyle(img).zIndex);
    console.log('img0 pointer-events:', getComputedStyle(img).pointerEvents);

    // Удаляем старые обработчики (если были)
    img.removeEventListener('wheel', onMapWheel);
    img.removeEventListener('mousedown', onMapMouseDown);
    img.removeEventListener('dblclick', onMapDblClick);

    // Добавляем новые
    img.addEventListener('wheel', onMapWheel, { passive: false });
    img.addEventListener('mousedown', onMapMouseDown);
    img.addEventListener('dblclick', onMapDblClick);

    console.log('setupMapHandlers: handlers attached');

    // Глобальные обработчики для перетаскивания (уже есть в коде, но проверьте)
    document.addEventListener('mousemove', function (e) {
        if (!isMapDragging) return;
        mapTranslateX = e.clientX - mapStartX;
        mapTranslateY = e.clientY - mapStartY;
        applyMapTransform();
    });

    document.addEventListener('mouseup', function () {
        if (isMapDragging) {
            isMapDragging = false;
            let img = document.getElementById('img0');
            if (img) img.style.cursor = 'grab';
            console.log('Map drag end');
        }
    });
    /*
    // Колесико для зума на карте
    img.addEventListener('wheel', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let delta = e.deltaY > 0 ? -0.1 : 0.1;
        mapScale = Math.min(Math.max(0.5, mapScale + delta), 3);
        applyMapTransform();
        console.log('Map zoom:', mapScale);
    }, { passive: false });

    // Перетаскивание карты
    let isDragging = false;
    let startX, startY;

    img.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX - mapTranslateX;
        startY = e.clientY - mapTranslateY;
        img.style.cursor = 'grabbing';
        console.log('Map drag start');
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        mapTranslateX = e.clientX - startX;
        mapTranslateY = e.clientY - startY;
        applyMapTransform();
        console.log('mousemove');
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            img.style.cursor = 'grab';
            console.log('Map drag end');
        }
    });

    // Двойной клик для сброса масштаба
    img.addEventListener('dblclick', function (e) {
        e.preventDefault();
        mapScale = 1;
        mapTranslateX = 0;
        mapTranslateY = 0;
        applyMapTransform();
        console.log('Map reset');
    });
    */  
}
// ====== ОБРАБОТЧИКИ ДЛЯ МОБИЛЬНОГО МАСШТАБИРОВАНИЯ ======
function setupMobileMapHandlers() {
    let img = document.getElementById('img0');
    if (!img) return;

    let lastTouchDist = 0;
    let initialTouchScale = 1;
    let initialTouchX = 0;
    let initialTouchY = 0;
    let isTouchDragging = false;
    let touchStartX, touchStartY;

    img.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            // Один палец - перетаскивание
            isTouchDragging = true;
            touchStartX = e.touches[0].clientX - mapTranslateX;
            touchStartY = e.touches[0].clientY - mapTranslateY;
            img.style.cursor = 'grabbing';
        } else if (e.touches.length === 2) {
            // Два пальца - зум
            isTouchDragging = false;
            let touch1 = e.touches[0];
            let touch2 = e.touches[1];
            lastTouchDist = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );
            initialTouchScale = mapScale;
            initialTouchX = mapTranslateX;
            initialTouchY = mapTranslateY;
        }
    }, { passive: true });

    img.addEventListener('touchmove', function (e) {
        e.preventDefault();

        if (e.touches.length === 1 && isTouchDragging) {
            // Перетаскивание одним пальцем
            mapTranslateX = e.touches[0].clientX - touchStartX;
            mapTranslateY = e.touches[0].clientY - touchStartY;
            applyMapTransform();
        } else if (e.touches.length === 2) {
            // Зум двумя пальцами
            let touch1 = e.touches[0];
            let touch2 = e.touches[1];
            let currentDist = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );

            if (lastTouchDist > 0) {
                let scaleFactor = currentDist / lastTouchDist;
                let newScale = Math.min(Math.max(1.0, initialTouchScale * scaleFactor), 3);
                mapScale = newScale;

                // Корректируем смещение для центрирования зума
                let rect = img.getBoundingClientRect();
                let centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left - rect.width / 2;
                let centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top - rect.height / 2;

                // Применяем трансформацию
                applyMapTransform();
            }
        }
    }, { passive: false });

    img.addEventListener('touchend', function (e) {
        isTouchDragging = false;
        img.style.cursor = 'grab';
    }, { passive: true });
}
function onMapWheel(e) {
    console.log('onMapWheel: deltaY=' + e.deltaY);
    e.preventDefault();
    e.stopPropagation();

    let delta = e.deltaY > 0 ? -1.0 : 1.0;
    mapScale = Math.min(Math.max(1.0, mapScale + delta), 3);
    applyMapTransform();
    // Обновляем индикатор масштаба
    //alert("mapScale="+mapScale);
    let indicator = document.getElementById('map-zoom-level');
    if (indicator) {
        indicator.textContent = mapScale.toFixed(1);
    }
    console.log('Map zoom: scale=' + mapScale.toFixed(2));
    //alert("mapScale=" + mapScale);
    if (mapScale == 1) {
        translateX = 0;
        translateY = 0;
        applyTransformToMedia();
    }
}

function onMapMouseDown(e) {
    console.log('onMapMouseDown');
    isMapDragging = true;
    mapStartX = e.clientX - mapTranslateX;
    mapStartY = e.clientY - mapTranslateY;
    document.getElementById('img0').style.cursor = 'grabbing';
}

function onMapDblClick(e) {
    console.log('onMapDblClick');
    e.preventDefault();
    mapScale = 1;
    mapTranslateX = 0;
    mapTranslateY = 0;
    applyMapTransform();
    console.log('Map reset');
}

function show_image_11_08_2026() {
    console.log('show_image called, N=' + N + ', n=' + n);
    let baseName = String(N).padStart(2, '0') + "_" + String(n).padStart(2, '0');
    let photoPath = "images/" + baseName + ".jpg";
    let videoPath = "images/" + baseName + ".mp4";

    let block = document.getElementById('block');
    if (!block) {
        console.log('show_image: block not found!');
        return;
    }
    //if (!block) return;

    // Сбрасываем масштаб
    scale = 1;
    translateX = 0;
    translateY = 0;

    // Получаем или создаем контейнер для медиа
    // Получаем или создаем контейнер для медиа
    let container = document.getElementById('media-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'media-container';
        container.style.cssText = 'width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative;pointer-events:auto;';
        block.innerHTML = '';
        block.appendChild(container);
    } else {
        console.log('show_image: media-container already exists');
        container.innerHTML = '';
        //container.style.pointerEvents = 'auto';
        container.style.pointerEvents = 'auto !important';
    }

    // Сначала пробуем видео
    let video = document.createElement('video');
    video.src = videoPath;
    video.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block;';
    video.controls = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
        console.log('show_image: video loaded');
        container.innerHTML = '';
        currentMedia = video;
        container.appendChild(video);
        //setupTouchHandlers(container);
        //setupMouseHandlers(container); // <-- ДОБАВИТЬ ЭТУ СТРОКУ
        // Включаем масштабирование
        setupMediaHandlers(container);
        applyTransformToMedia();
        updateCaption();
    };

    video.onerror = function () {
        console.log('show_image: video error, trying photo');
        // Пробуем фото
        let img = new Image();
        img.src = photoPath;
        img.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block;';
        img.style.pointerEvents = 'none';

        img.onload = function () {
            container.innerHTML = '';
            currentMedia = img;
            container.appendChild(img);
            //setupTouchHandlers(container);
            //setupMouseHandlers(container); // <-- ДОБАВИТЬ ЭТУ СТРОКУ
            console.log('show_image: calling setupMediaHandlers');
            // Включаем масштабирование
            setupMediaHandlers(container);
            applyTransformToMedia();
            updateCaption();
        };

        img.onerror = function () {
            console.log('show_image: no media found');
            container.innerHTML = '<p style="color:white;text-align:center;">Нет медиа</p>';
            if (direction == 1) {
                n = n - 1;
            } else {
                n = n + 1;
            }
            if (n > 0) {
                show_image();
            }
        };
    };

    video.load();
}

function show_image() {
    console.log('show_image called, N=' + N + ', n=' + n);
    let baseName = String(N).padStart(2, '0') + "_" + String(n).padStart(2, '0');
    let photoPath = "images/" + baseName + ".jpg";
    let videoPath = "images/" + baseName + ".mp4";

    let container = document.getElementById('media-container');
    if (!container) {
        console.log('show_image: media-container not found!');
        return;
    }

    // Сбрасываем масштаб
    scale = 1;
    translateX = 0;
    translateY = 0;

    // Очищаем контейнер
    container.innerHTML = '';
    container.style.pointerEvents = 'auto';

    // Сначала пробуем видео
    let video = document.createElement('video');
    video.src = videoPath;
    video.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block;';
    video.controls = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
        console.log('show_image: video loaded');
        container.innerHTML = '';
        currentMedia = video;
        container.appendChild(video);
        setupMediaHandlers(container);
        applyTransformToMedia();
        updateCaption();
    };

    video.onerror = function () {
        console.log('show_image: video error, trying photo');
        let img = new Image();
        img.src = photoPath;
        img.style.cssText = 'max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block;';
        img.style.pointerEvents = 'none';

        img.onload = function () {
            container.innerHTML = '';
            currentMedia = img;
            container.appendChild(img);
            console.log('show_image: photo loaded');
            setupMediaHandlers(container);
            applyTransformToMedia();
            updateCaption();
        };

        img.onerror = function () {
            console.log('show_image: no media found');
            container.innerHTML = '<p style="color:white;text-align:center;">Нет медиа</p>';
            if (direction == 1) {
                n = n - 1;
            } else {
                n = n + 1;
            }
            if (n > 0) {
                show_image();
            }
        };
    };

    video.load();
}

function updateCaption() {
    let td1Element = document.getElementById("td1");
    if (names_arr3[N] && names_arr3[N][n]) {
        td1Element.textContent = names_arr3[N][n];
    } else {
        td1Element.textContent = "Медиа " + n;
    }
}

function closePanel() {
    document.getElementById('div').style.display = 'none';
    document.getElementById('block').innerHTML = '';
    document.getElementById("td00").textContent = '';
    document.getElementById("td1").textContent = '';
    document.getElementById("td2").textContent = '';
    N = 0;
    // Дополнительно: показать карту, если она была скрыта
    document.getElementById('img0').hidden = false; // если скрывали
}

function onTouchStart(e) {
    if (e.touches.length === 1) {
        // Один палец - начало перетаскивания
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;

        // Двойное касание для сброса
        let currentTime = Date.now();
        if (currentTime - lastTapTime < 300) {
            scale = 1;
            translateX = 0;
            translateY = 0;
            applyTransformToMedia();
        }
        lastTapTime = currentTime;
    } else if (e.touches.length === 2) {
        // Два пальца - начало зума
        isDragging = false;
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];
        initialPinchDist = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
        );
        initialScale = scale;
        initialTranslateX = translateX;
        initialTranslateY = translateY;
    }
}

function onTouchMove(e) {
    if (e.touches.length === 1 && isDragging) {
        e.preventDefault();
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        applyTransformToMedia();
    } else if (e.touches.length === 2) {
        e.preventDefault();
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];
        let currentDist = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
        );

        if (initialPinchDist > 0) {
            let scaleFactor = currentDist / initialPinchDist;
            scale = Math.min(Math.max(0.5, initialScale * scaleFactor), 3);

            // Центрируем зум между пальцами
            let rect = mediaContainer.getBoundingClientRect();
            let centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left - rect.width / 2;
            let centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top - rect.height / 2;

            translateX = initialTranslateX - centerX * (scaleFactor - 1);
            translateY = initialTranslateY - centerY * (scaleFactor - 1);

            applyTransformToMedia();
        }
    }
}

function onTouchEnd(e) {
    isDragging = false;
}

// ====== ИНДИКАТОР МАСШТАБА ======
function updateZoomIndicator() {
    let indicator = document.getElementById('map-zoom-level');
    if (indicator) {
        indicator.textContent = mapScale.toFixed(1);
    }
    let container = document.getElementById('map-zoom-indicator');
    container.style.display = 'block';
    /*
    if (container) {
        if (mapScale !== 1) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }
    */
    
}

// ====== СОЗДАНИЕ ИНДИКАТОРА МАСШТАБА ======
function createZoomIndicator() {
    // Проверяем, существует ли уже индикатор
    if (document.getElementById('map-zoom-indicator')) return;

    let div = document.createElement('div');
    div.id = 'map-zoom-indicator';
    div.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:50;background:rgba(0,0,0,0.7);color:white;padding:5px 15px;border-radius:20px;font-size:14px;display:none;pointer-events:none;font-family:Arial,sans-serif;';
    div.innerHTML = 'Масштаб: <span id="map-zoom-level">1.0</span>x';
    document.body.appendChild(div);
}

function mobilePanel() {
    alert("in mobilePanel");
    // ====== ПРИНУДИТЕЛЬНО ПЕРЕОПРЕДЕЛЯЕМ ВСЕ СТИЛИ ЧЕРЕЗ cssText ======
    panel.style.cssText = `
        position: fixed !important;
        left: 0px !important;
        top: 0px !important;
        width: ${WB}px !important;
        height: ${HB}px !important;
        max-height: ${HB}px !important;
        min-height: ${HB}px !important;
        right: auto !important;
        bottom: auto !important;
        transform: none !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border: none !important;
        border-radius: 0 !important;
        padding: 10px 12px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        background: rgb(0, 0, 139) !important;
        z-index: 100 !important;
        visibility: visible !important;
        opacity: 1 !important;
    `;

    // Таблица
    let table = document.getElementById('table_id');
    if (table) {
        table.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
            max-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            flex: 1 1 auto !important;
            min-height: 0 !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
        `;
    }
    alert("1");
    // Строка с фотографией (3-я строка)
    let photoRow = document.querySelector('#div table tr:nth-child(3)');
    if (photoRow) {
        photoRow.style.cssText = `
            flex: 1 1 auto !important;
            min-height: 0 !important;
            max-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 0 !important;
            margin: 0 !important;
        `;
    }
    alert("2");
    // Блок с фотографией
    let block = document.getElementById('block');
    if (block) {
        block.style.cssText = `
            flex: 1 1 auto !important;
            min-height: 60px !important;
            max-height: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 4px !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
        `;
    }
    alert("3");
    // Строка с кнопками
    let tr0 = document.querySelector('.tr0');
    if (tr0) {
        tr0.style.cssText = `
            flex-shrink: 0 !important;
            margin-top: auto !important;
            border-top: 1px solid rgba(255,255,255,0.3) !important;
            padding-top: 8px !important;
            width: 100% !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            min-height: 60px !important;
        `;
    }
    alert("4");
    let tr0td = document.querySelector('.tr0 td');
    if (tr0td) {
        tr0td.style.cssText = `
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
            padding: 4px 0 !important;
            box-sizing: border-box !important;
            gap: 20px !important;
        `;
    }
    alert("5");
    console.log('=== МОБИЛЬНАЯ ВЕРСИЯ: панель на весь экран ===');
    console.log('Ширина окна:', WB, 'Высота окна:', HB);
    console.log('Панель: 100% x 100%');

    document.getElementById('div').style.display = 'none';

    //return; // ВАЖНО: выходим, чтобы не применять ПК-стили
    alert("out mobilePanel");
}
// ====== ПОЗИЦИОНИРОВАНИЕ ПАНЕЛИ ОТНОСИТЕЛЬНО ИЗОБРАЖЕНИЯ ======
// ====== ПОЗИЦИОНИРОВАНИЕ ПАНЕЛИ ПО ВАШЕМУ АЛГОРИТМУ ======
function positionPanel() {
   
    // ====== ПРОВЕРКА НА МОБИЛЬНОЕ УСТРОЙСТВО (ВЕРТИКАЛЬНАЯ ОРИЕНТАЦИЯ) ======
    let isMobile = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
  //alert("isRotated=" + isRotated);
    
        let img = document.getElementById('img0');
        let panel = document.getElementById('div');

        if (!img || !panel) return;

        // 1. Получаем размеры окна браузера
        let WB = window.innerWidth;
        let HB = window.innerHeight;
        let KB = WB / HB;

        // 2. Получаем реальный размер изображения из файла
        let W0 = img.naturalWidth;
        let H0 = img.naturalHeight;

        if (W0 === 0 || H0 === 0) {
            console.log('Изображение еще не загружено');
            return;
        }

        let K0 = W0 / H0;

        // 3. Вычисляем размер изображения в браузере (W1, H1) и черные полосы (dx, dy)
        let W1, H1, dx, dy;

        if (K0 < KB) {
            // 2.1: Черные полосы по бокам (слева и справа)
            H1 = HB;
            W1 = K0 * H1;
            dx = (WB - W1) / 2;
            dy = 0;
        } else {
            // 3.1: Черные полосы по вертикали (сверху и снизу)
            W1 = WB;
            H1 = W1 / K0;
            dx = 0;
            dy = (HB - H1) / 2;
        }

        // Горизонтальное позиционирование
        let WP = W1 * 0.28;   // ширина панели
        let panelWidth = WP;  // ширина панели
        let panelLeft = dx + W1 - WP; // левый край панели должен совпадать с границей между картой изображения и правой частью с текстом

        // Вертикальное позиционирование

        let panelHeight = H1;
        let panelTop = dy;

         // ====== РАЗМЕРЫ ПАНЕЛИ ======
         //let panelWidth, panelHeight, panelLeft, panelTop;

        if (isMobile == true) {
           
            //mobilePanel();
            
            // ====== ПРИНУДИТЕЛЬНО ПЕРЕОПРЕДЕЛЯЕМ ВСЕ СТИЛИ ЧЕРЕЗ cssText ======
            
            panel.style.cssText = `
        position: fixed !important;
        left: 0px !important;
        top: 0px !important;
        width: ${WB}px !important;
        height: ${HB}px !important;
        max-height: ${HB}px !important;
        min-height: ${HB}px !important;
        right: auto !important;
        bottom: auto !important;
        transform: none !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border: none !important;
        border-radius: 0 !important;
        padding: 10px 12px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        background: rgb(0, 0, 139) !important;
        z-index: 100 !important;
        visibility: visible !important;
        opacity: 1 !important;
    `;
            // ====== КНОПКА ЗАКРЫТИЯ ======
        let closeBtn = document.getElementById('closePanelBtn');
        if (closeBtn) {
           closeBtn.style.cssText = `
            position: absolute !important;
            top: 8px !important;
            right: 10px !important;
            width: 44px !important;
            height: 44px !important;
            background: rgba(255, 255, 255, 0.3) !important;
            border: 2px solid white !important;
            border-radius: 50% !important;
            color: white !important;
            font-size: 26px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            z-index: 999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 !important;
            margin: 0 !important;
            line-height: 1 !important;
            box-sizing: border-box !important;
        `;
            }
            // ====== КНОПКА ЗАКРЫТИЯ (ПРИНУДИТЕЛЬНОЕ ПОЗИЦИОНИРОВАНИЕ) ======
            //let closeBtn = document.getElementById('closePanelBtn');
            if (closeBtn) {
                let rect = panel.getBoundingClientRect();
                closeBtn.style.position = 'fixed';
                closeBtn.style.left = (rect.right - 50) + 'px';
                closeBtn.style.top = (rect.top + 10) + 'px';

                closeBtn.style.width = '40px';
                closeBtn.style.height = '40px';
                closeBtn.style.background = 'rgba(255,255,255,0.3)';
                closeBtn.style.border = '2px solid white';
                closeBtn.style.borderRadius = '50%';
                closeBtn.style.color = 'white';
                closeBtn.style.fontSize = '22px';
                closeBtn.style.fontWeight = 'bold';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.zIndex = '999';
                closeBtn.style.display = 'flex';
                closeBtn.style.alignItems = 'center';
                closeBtn.style.justifyContent = 'center';
                closeBtn.style.padding = '0';
                closeBtn.style.margin = '0';
                closeBtn.style.lineHeight = '1';
                closeBtn.style.boxSizing = 'border-box';
            }
            // Таблица
            let table = document.getElementById('table_id');
            if (table) {
                table.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
            max-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            flex: 1 1 auto !important;
            min-height: 0 !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
        `;
            }
            
            // Строка с фотографией (3-я строка)
            let photoRow = document.querySelector('#div table tr:nth-child(3)');
            if (photoRow) {
                photoRow.style.cssText = `
            flex: 1 1 auto !important;
            min-height: 0 !important;
            max-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 0 !important;
            margin: 0 !important;
        `;
            }
            
            // Блок с фотографией
            let block = document.getElementById('block');
            if (block) {
                block.style.cssText = `
            flex: 1 1 auto !important;
            min-height: 60px !important;
            max-height: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 4px !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
        `;
            }
            
            
            
            console.log('=== МОБИЛЬНАЯ ВЕРСИЯ: панель на весь экран ===');
            console.log('Ширина окна:', WB, 'Высота окна:', HB);
            console.log('Панель: 100% x 100%');

            document.getElementById('div').style.display = 'none';

            //return; // ВАЖНО: выходим, чтобы не применять ПК-стили
            
        } // isMobile == true
        if (isMobile == false) {
            // ====== ПРИМЕНЯЕМ СТИЛИ для ПК ======
            panel.style.position = 'fixed';
            panel.style.left = panelLeft + 'px';
            panel.style.top = panelTop + 'px';
            panel.style.width = panelWidth + 'px';
            panel.style.height = panelHeight + 'px';
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';
            panel.style.transform = 'none';

            // ====== ВРЕМЕННЫЙ ЯРКИЙ ФОН ДЛЯ БЛОКА КНОПОК (ДЛЯ ОТЛАДКИ) ======
            let tr0 = document.querySelector('.tr0');
            if (tr0) {
                //tr0.style.background = 'rgba(255, 0, 0, 0.9)'; /* Красный полупрозрачный */
                //tr0.style.border = '2px solid yellow';
            }
            //alert("Ширина окна:" + WB + "  Высота окна:" + HB);
            //alert("panel.style.width =" + panel.style.width + "  panel.style.height =" + panel.style.height);
            //alert("table.style.width =" + table.style.width + "  table.style.height =" + table.style.height);
        } // isMobile == false
    // КНОПКИ
    //alert("КНОПКИ")
        let buttonBack = document.getElementById('button_02');
            let buttonNext = document.getElementById('button_01');
            //let ww = tr0.style.width / 2;
            let buttonWidth = panelWidth * 0.45;

            if (buttonBack) {
                //buttonBack.style.background = 'rgba(255, 255, 0, 0.8)'; /* Желтый */
                //buttonBack.style.border = '3px solid red';
                buttonBack.style.left = 0;//tr0.td.style.left;
                buttonBack.style.width = buttonWidth + 'px';
            }

            if (buttonNext) {
                //buttonNext.style.background = 'rgba(255, 0, 255, 0.8)'; /* Розовый */
                //buttonNext.style.border = '3px solid orange';
                buttonNext.style.width = buttonWidth + 'px';
                //buttonNext.style.marginLeft = 'auto'; /* Прижимаем вправо */
            }

    //alert("13^30 panel.style.width =" + panel.style.width + "  panel.style.height =" + panel.style.height);
    //alert("table.style.width =" + table.style.width + "  table.style.height =" + table.style.height);
                 
}

// Вызываем при загрузке и при изменении размера окна
window.addEventListener('load', function () {
    setTimeout(positionPanel, 300);
    createZoomIndicator();
    setTimeout(setupMapHandlers, 500); // Инициализация обработчиков карты
    setTimeout(setupMobileMapHandlers, 500); // <-- Добавить
    console.log('Window loaded, map handlers scheduled');
});
window.addEventListener('resize', positionPanel);

// Также вызываем после загрузки изображения
//document.getElementById('img').addEventListener('load', positionPanel);
// Вызываем при загрузке и при изменении размера окна
//window.addEventListener('load', positionPanel);
//window.addEventListener('resize', positionPanel

// Также вызываем после загрузки изображения
document.getElementById('img0').addEventListener('load', function () {
    setTimeout(positionPanel, 300);
    setTimeout(setupMapHandlers, 500);
    console.log('img0 loaded, map handlers scheduled');
});


// Скрываем панель по умолчанию
document.getElementById('div').style.display = 'none';

// ====== ТАБЛИЦА КООРДИНАТ ДЛЯ ФИКСИРОВАННЫХ МАСШТАБОВ ======
// scaleCoords[масштаб][индекс_точки] = { x, y }
const scaleCoords = {};

// ====== МАССИВЫ ДАННЫХ ОБЪЕКТОВ для масштаба 1.0 ======
//alert("1661");
    let mass = new Array()
    mass[0] = new Array(0.0, 0.0);
    mass[1] = new Array(36.83, 29.36);
    mass[2] = new Array(39.32, 24.24);
    mass[3] = new Array(42.19, 20.38);
    mass[4] = new Array(43.13, 22.99);
    mass[5] = new Array(36.88, 73.15);
    mass[6] = new Array(35.68, 47.23);
    mass[7] = new Array(42.81, 82.13);
    mass[8] = new Array(41.82, 87.15);
    mass[9] = new Array(39.01, 81.30);
    mass[10] = new Array(37.19, 82.86);
    mass[11] = new Array(41.82, 60.29);
    mass[12] = new Array(40.36, 54.86);
    mass[13] = new Array(44.32, 71.26);
    mass[14] = new Array(39.69, 73.98);
    mass[15] = new Array(33.41, 71.68);
    mass[16] = new Array(40.55, 66.77);
    mass[17] = new Array(34.11, 59.77);
    mass[18] = new Array(30.00, 47.81);
    mass[19] = new Array(31.40, 44.41);
    mass[20] = new Array(37.45, 47.02);
    mass[21] = new Array(29.38, 39.50);
    mass[22] = new Array(60.10, 80.77);
    mass[23] = new Array(51.30, 49.95);
    mass[24] = new Array(56.09, 30.30);
    mass[25] = new Array(44.17, 52.66);
    mass[26] = new Array(40.00, 42.22);
    mass[27] = new Array(26.35, 62.17);
    mass[28] = new Array(29.32, 60.40);
    mass[29] = new Array(35.30, 55.59);
    mass[30] = new Array(44.17, 35.32);
    mass[31] = new Array(48.07, 40.12);
    mass[32] = new Array(51.98, 34.69);
    mass[33] = new Array(49.17, 29.78);
    mass[34] = new Array(59.43, 33.02);
    mass[35] = new Array(60.73, 44.51);
    mass[36] = new Array(60.94, 54.86);
    mass[37] = new Array(52.29, 58.10);
    mass[38] = new Array(15.88, 66.56);
    mass[39] = new Array(21.51, 46.71);
    mass[40] = new Array(16.25, 36.26);
    mass[41] = new Array(29.79, 68.55);
    mass[42] = new Array(8.02, 24.66);
    mass[43] = new Array(29.39, 51.62);
    mass[44] = new Array(34.62, 74.85);
    mass[45] = new Array(35.98, 36.60);
    mass[46] = new Array(39.11, 6.00);
    mass[47] = new Array(38.72, 69.28);
    mass[48] = new Array(30.87, 55.28);
    mass[49] = new Array(34.47, 63.64);
    mass[50] = new Array(47.50, 48.50);
    mass[51] = new Array(47.85, 26.60);
    mass[52] = new Array(47.16, 30.18);
    mass[53] = new Array(50.53, 30.18);
    mass[54] = new Array(36.95, 63.11);
    mass[55] = new Array(32.40, 67.71);
    mass[56] = new Array(31.34, 32.50);
    mass[57] = new Array(24.08, 37.93);
    mass[58] = new Array(25.97, 42.74);
    mass[59] = new Array(39.55, 62.90);
    mass[60] = new Array(38.90, 65.20);
    mass[61] = new Array(42.86, 91.43);
//alert("mass[25][0]=" + mass[25][0]);
// Для масштаба 1.0 - исходные координаты
/*
scaleCoords[1] = [];
for (let i = 0; i <= 61; i++) {
    scaleCoords[1][i] = { x: mass[i][0], y: mass[i][1] };
}
*/
//alert("36.83 scaleCoords[1.0][1].x =" + scaleCoords[1.0][1].x);

//alert("1.5");
// ====== МАССИВЫ ДАННЫХ ОБЪЕКТОВ для масштаба 1.5 ======
let mass1_5 = new Array()
mass1_5[0] = new Array(0.0, 0.0);
mass1_5[1] = new Array(42.33, 35.95);
mass1_5[2] = new Array(43.17, 31.88);
mass1_5[3] = new Array(44.93, 29.12);
mass1_5[4] = new Array(45.53, 30.81);
mass1_5[5] = new Array(41.68, 65.83);
mass1_5[6] = new Array(40.93, 47.67);
mass1_5[7] = new Array(45.31, 71.96);
mass1_5[8] = new Array(0.0, 0.0);
mass1_5[9] = new Array(43.00, 71.43);
mass1_5[10] = new Array(41.85, 72.54);
mass1_5[11] = new Array(44.69, 56.80);
mass1_5[12] = new Array(43.80, 52.98);
mass1_5[13] = new Array(46.20, 64.43);
mass1_5[14] = new Array(43.43, 66.31);
mass1_5[15] = new Array(39.56, 64.67);
mass1_5[16] = new Array(43.89, 61.39);
mass1_5[17] = new Array(40.02, 56.41);
mass1_5[18] = new Array(37.46, 47.48);
mass1_5[19] = new Array(38.31, 45.83);
mass1_5[20] = new Array(42.09, 47.52);
mass1_5[21] = new Array(37.08, 42.40);
mass1_5[22] = new Array(55.90, 70.95);
mass1_5[23] = new Array(50.49, 49.60);
mass1_5[24] = new Array(53.42, 35.93);
mass1_5[25] = new Array(46.20, 51.53);
mass1_5[26] = new Array(43.60, 44.43);
mass1_5[27] = new Array(35.27, 58.20);
mass1_5[28] = new Array(37.08, 57.09);
mass1_5[29] = new Array(40.74, 53.66);
mass1_5[30] = new Array(46.11, 39.41);
mass1_5[31] = new Array(48.54, 42.74);
mass1_5[32] = new Array(50.90, 39.12);
mass1_5[33] = new Array(49.16, 35.69);
mass1_5[34] = new Array(55.47, 37.86);
mass1_5[35] = new Array(56.27, 45.88);
mass1_5[36] = new Array(56.46, 52.98);
mass1_5[37] = new Array(51.09, 55.35);
mass1_5[38] = new Array(28.80, 61.34);
mass1_5[39] = new Array(32.22, 47.52);
mass1_5[40] = new Array(29.06, 40.13);
mass1_5[41] = new Array(37.34, 62.55);
mass1_5[42] = new Array(0.0, 0.0);
mass1_5[43] = new Array(37.08, 50.81);
mass1_5[44] = new Array(40.35, 67.13);
mass1_5[45] = new Array(41.12, 40.28);
mass1_5[46] = new Array(0.0, 0.0);
mass1_5[47] = new Array(42.74, 62.98);
mass1_5[48] = new Array(38.45, 56.99);
mass1_5[49] = new Array(40.23, 59.26);
mass1_5[50] = new Array(48.12, 48.58);
mass1_5[51] = new Array(48.20, 33.47);
mass1_5[52] = new Array(47.72, 35.93);
mass1_5[53] = new Array(50.10, 36.03);
mass1_5[54] = new Array(41.70, 58.83);
mass1_5[55] = new Array(38.93, 62.16);
mass1_5[56] = new Array(38.28, 37.67);
mass1_5[57] = new Array(33.80, 41.29);
mass1_5[58] = new Array(34.91, 44.72);
mass1_5[59] = new Array(43.29, 58.73);
mass1_5[60] = new Array(42.90, 60.32);
mass1_5[61] = new Array(0.0, 0.0);

//alert("1.5 - in recalc");
// Для масштаба 1.5 - исходные координаты
/*
scaleCoords[2] = [];
for (let i = 0; i <= 61; i++) {
    scaleCoords[2][i] = { x: mass1_5[i][0], y: mass1_5[i][1] };
}
*/
//alert("scaleCoords[2][1].x =" + scaleCoords[2][1].x);
//alert("scaleCoords[2][1].y =" + scaleCoords[2][1].y);
//alert("*");
// Для остальных точек (не попавших в поле зрения браузера) - вычисляем по формуле приближения к центру
/*
const centerX = 49.0;
const centerY = 49.5;
for (let i = 1; i <= 61; i++) {
   // if (!scaleCoords[1.5][i]) {
    if ((mass1_5[i][0] == 0.0) && (mass1_5[i][1]==0.0)) {
        let dx = mass1_5[i][0] - centerX;
        let dy = mass1_5[i][1] - centerY;
        mass1_5[i][0] = centerX + dx / 1.5;
        mass1_5[i][1] = centerY + dy / 1.5;
        scaleCoords[2][i] = {
            x: mass1_5[i][0],
            y: mass1_5[i][1]
        };
    }
}
*/
//alert("2.0");
// ====== МАССИВЫ ДАННЫХ ОБЪЕКТОВ для масштаба 2.0 ======
let mass2_0 = new Array()
mass2_0[0] = new Array(0.0, 0.0);
mass2_0[1] = new Array(44.23, 39.51);
mass2_0[2] = new Array(43.75, 32.79);
mass2_0[3] = new Array(45.39, 30.10);
mass2_0[4] = new Array(45.97, 31.86);
mass2_0[5] = new Array(44.21, 61.48);
mass2_0[6] = new Array(43.70, 48.44);
mass2_0[7] = new Array(45.31, 71.96);
mass2_0[8] = new Array(46.35, 68.44);
mass2_0[9] = new Array(43.00, 71.43);
mass2_0[10] = new Array(41.85, 72.54);
mass2_0[11] = new Array(46.42, 54.92);
mass2_0[12] = new Array(45.76, 52.26);
mass2_0[13] = new Array(47.51, 60.44);
mass2_0[14] = new Array(45.49, 61.85);
mass2_0[15] = new Array(42.72, 60.62);
mass2_0[16] = new Array(45.83, 58.32);
mass2_0[17] = new Array(43.04, 54.77);
mass2_0[18] = new Array(41.21, 48.26);
mass2_0[19] = new Array(41.82, 47.01);
mass2_0[20] = new Array(44.52, 48.37);
mass2_0[21] = new Array(40.92, 44.58);
mass2_0[22] = new Array(55.90, 70.95);
mass2_0[23] = new Array(50.58, 49.83);
mass2_0[24] = new Array(52.75, 39.90);
mass2_0[25] = new Array(47.49, 51.19);
mass2_0[26] = new Array(45.61, 46.02);
mass2_0[27] = new Array(39.61, 55.92);
mass2_0[28] = new Array(40.92, 55.05);
mass2_0[29] = new Array(43.55, 52.62);
mass2_0[30] = new Array(47.45, 42.52);
mass2_0[31] = new Array(49.19, 44.79);
mass2_0[32] = new Array(50.89, 42.20);
mass2_0[33] = new Array(49.63, 39.69);
mass2_0[34] = new Array(54.19, 41.42);
mass2_0[35] = new Array(54.77, 47.06);
mass2_0[36] = new Array(54.90, 52.23);
mass2_0[37] = new Array(51.04, 53.90);
mass2_0[38] = new Array(28.80, 61.34);
mass2_0[39] = new Array(37.53, 48.37);
mass2_0[40] = new Array(29.06, 40.13);
mass2_0[41] = new Array(41.09, 59.13);
mass2_0[42] = new Array(31.51, 37.28);
mass2_0[43] = new Array(40.96, 50.67);
mass2_0[44] = new Array(43.27, 62.18);
mass2_0[45] = new Array(43.88, 43.14);
mass2_0[46] = new Array(45.20, 27.95);
mass2_0[47] = new Array(45.02, 59.42);
mass2_0[48] = new Array(41.91, 55.11);
mass2_0[49] = new Array(43.18, 56.65);
mass2_0[50] = new Array(48.89, 49.12);
mass2_0[51] = new Array(48.93, 38.10);
mass2_0[52] = new Array(48.61, 39.93);
mass2_0[53] = new Array(50.27, 39.96);
mass2_0[54] = new Array(44.27, 56.38);
mass2_0[55] = new Array(42.27, 58.69);
mass2_0[56] = new Array(41.84, 41.15);
mass2_0[57] = new Array(38.57, 43.64);
mass2_0[58] = new Array(39.36, 46.23);
mass2_0[59] = new Array(45.36, 56.33);
mass2_0[60] = new Array(45.10, 57.51);
mass2_0[61] = new Array(46.85, 70.59);

// Для масштаба 2.0 - исходные координаты
/*
scaleCoords[3] = [];
for (let i = 0; i <= 61; i++) {
    scaleCoords[3][i] = { x: mass2_0[i][0], y: mass2_0[i][1] };
}
//alert("scaleCoords[2][1].x =" + scaleCoords[2][1].x);
//alert("scaleCoords[2][1].y =" + scaleCoords[2][1].y);
//alert("*");
// Для остальных точек (не попавших в поле зрения браузера) - вычисляем по формуле приближения к центру
/*
for (let i = 1; i <= 61; i++) {
    // if (!scaleCoords[1.5][i]) {
    if ((mass2_0[i][0] == 0.0) && (mass2_0[i][1] == 0.0)) {
        let dx = mass2_0[i][0] - centerX;
        let dy = mass2_0[i][1] - centerY;
        mass2_0[i][0] = centerX + dx / 1.5;
        mass2_0[i][1] = centerY + dy / 1.5;
        scaleCoords[3][i] = {
            x: mass2_0[i][0],
            y: mass2_0[i][1]
        };
    }
}
*/
 //alert("2_5");
// ====== МАССИВЫ ДАННЫХ ОБЪЕКТОВ для масштаба 2.5 ======
let mass2_5 = new Array()
mass2_5[0] = new Array(0.0, 0.0);
mass2_5[1] = new Array(36.83, 29.36);
mass2_5[2] = new Array(39.32, 24.24);
mass2_5[3] = new Array(42.19, 20.38);
mass2_5[4] = new Array(43.13, 22.99);
mass2_5[5] = new Array(36.88, 73.15);
mass2_5[6] = new Array(35.68, 47.23);
mass2_5[7] = new Array(42.81, 82.13);
mass2_5[8] = new Array(41.82, 87.15);
mass2_5[9] = new Array(39.01, 81.30);
mass2_5[10] = new Array(37.19, 82.86);
mass2_5[11] = new Array(41.82, 60.29);
mass2_5[12] = new Array(40.36, 54.86);
mass2_5[13] = new Array(44.32, 71.26);
mass2_5[14] = new Array(39.69, 73.98);
mass2_5[15] = new Array(33.41, 71.68);
mass2_5[16] = new Array(40.55, 66.77);
mass2_5[17] = new Array(34.11, 59.77);
mass2_5[18] = new Array(30.00, 47.81);
mass2_5[19] = new Array(31.40, 44.41);
mass2_5[20] = new Array(37.45, 47.02);
mass2_5[21] = new Array(29.38, 39.50);
mass2_5[22] = new Array(60.10, 80.77);
mass2_5[23] = new Array(51.30, 49.95);
mass2_5[24] = new Array(56.09, 30.30);
mass2_5[25] = new Array(44.17, 52.66);
mass2_5[26] = new Array(40.00, 42.22);
mass2_5[27] = new Array(26.35, 62.17);
mass2_5[28] = new Array(29.32, 60.40);
mass2_5[29] = new Array(35.30, 55.59);
mass2_5[30] = new Array(44.17, 35.32);
mass2_5[31] = new Array(48.07, 40.12);
mass2_5[32] = new Array(51.98, 34.69);
mass2_5[33] = new Array(49.17, 29.78);
mass2_5[34] = new Array(59.43, 33.02);
mass2_5[35] = new Array(60.73, 44.51);
mass2_5[36] = new Array(60.94, 54.86);
mass2_5[37] = new Array(52.29, 58.10);
mass2_5[38] = new Array(15.88, 66.56);
mass2_5[39] = new Array(21.51, 46.71);
mass2_5[40] = new Array(16.25, 36.26);
mass2_5[41] = new Array(29.79, 68.55);
mass2_5[42] = new Array(8.02, 24.66);
mass2_5[43] = new Array(29.39, 51.62);
mass2_5[44] = new Array(34.62, 74.85);
mass2_5[45] = new Array(35.98, 36.60);
mass2_5[46] = new Array(39.11, 6.00);
mass2_5[47] = new Array(38.72, 69.28);
mass2_5[48] = new Array(30.87, 55.28);
mass2_5[49] = new Array(34.47, 63.64);
mass2_5[50] = new Array(47.50, 48.50);
mass2_5[51] = new Array(47.85, 26.60);
mass2_5[52] = new Array(47.16, 30.18);
mass2_5[53] = new Array(50.53, 30.18);
mass2_5[54] = new Array(36.95, 63.11);
mass2_5[55] = new Array(32.40, 67.71);
mass2_5[56] = new Array(31.34, 32.50);
mass2_5[57] = new Array(24.08, 37.93);
mass2_5[58] = new Array(25.97, 42.74);
mass2_5[59] = new Array(39.55, 62.90);
mass2_5[60] = new Array(38.90, 65.20);
mass2_5[61] = new Array(42.86, 91.43);

 //alert("3_0");
// ====== МАССИВЫ ДАННЫХ ОБЪЕКТОВ для масштаба 2.5 ======
let mass3_0 = new Array()
mass3_0[0] = new Array(0.0, 0.0);
mass3_0[1] = new Array(46.15, 43.09);
mass3_0[2] = new Array(46.88, 41.41);
mass3_0[3] = new Array(47.71, 40.18);
mass3_0[4] = new Array(48.00, 40.96);
mass3_0[5] = new Array(46.15, 57.72);
mass3_0[6] = new Array(45.79, 49.07);
mass3_0[7] = new Array(47.91, 60.69);
mass3_0[8] = new Array(47.58, 62.34);
mass3_0[9] = new Array(46.79, 60.44);
mass3_0[10] = new Array(46.23, 60.95);
mass3_0[11] = new Array(47.59, 53.37);
mass3_0[12] = new Array(47.19, 51.58);
mass3_0[13] = new Array(48.34, 57.06);
mass3_0[14] = new Array(46.98, 57.99);
mass3_0[15] = new Array(45.12, 57.19);
mass3_0[16] = new Array(47.23, 55.64);
mass3_0[17] = new Array(45.34, 53.25);
mass3_0[18] = new Array(44.13, 48.95);
mass3_0[19] = new Array(44.54, 48.06);
mass3_0[20] = new Array(46.32, 48.96);
mass3_0[21] = new Array(43.94, 46.52);
mass3_0[22] = new Array(52.97, 60.20);
mass3_0[23] = new Array(50.38, 49.96);
mass3_0[24] = new Array(51.81, 43.35);
mass3_0[25] = new Array(48.31, 50.82);
mass3_0[26] = new Array(47.09, 47.43);
mass3_0[27] = new Array(43.06, 54.00);
mass3_0[28] = new Array(43.95, 53.49);
mass3_0[29] = new Array(45.68, 51.84);
mass3_0[30] = new Array(48.28, 45.05);
mass3_0[31] = new Array(49.45, 46.64);
mass3_0[32] = new Array(50.57, 44.89);
mass3_0[33] = new Array(49.76, 43.21);
mass3_0[34] = new Array(52.77, 44.47);
mass3_0[35] = new Array(53.16, 48.12);
mass3_0[36] = new Array(53.24, 51.62);
mass3_0[37] = new Array(50.70, 52.73);
mass3_0[38] = new Array(39.95, 55.55);
mass3_0[39] = new Array(41.61, 48.91);
mass3_0[40] = new Array(40.08, 45.37);
mass3_0[41] = new Array(44.07, 56.16);
mass3_0[42] = new Array(37.67, 41.52);
mass3_0[43] = new Array(43.94, 50.49);
mass3_0[44] = new Array(45.51, 58.40);
mass3_0[45] = new Array(45.87, 45.48);
mass3_0[46] = new Array(46.79, 35.34);
mass3_0[47] = new Array(46.66, 56.42);
mass3_0[48] = new Array(44.63, 53.58);
mass3_0[49] = new Array(45.44, 54.56);
mass3_0[50] = new Array(49.25, 49.44);
mass3_0[51] = new Array(49.28, 42.18);
mass3_0[52] = new Array(49.06, 43.39);
mass3_0[53] = new Array(50.20, 43.42);
mass3_0[54] = new Array(46.16, 54.38);
mass3_0[55] = new Array(44.84, 55.93);
mass3_0[56] = new Array(44.51, 44.15);
mass3_0[57] = new Array(42.36, 45.92);
mass3_0[58] = new Array(42.90, 47.59);
mass3_0[59] = new Array(46.91, 54.34);
mass3_0[60] = new Array(46.74, 55.13);
mass3_0[61] = new Array(47.91, 63.82);


// Для масштаба 3.0 - исходные координаты
/*
scaleCoords[5] = [];
for (let i = 0; i <= 61; i++) {
    scaleCoords[5][i] = { x: mass3_0[i][0], y: mass3_0[i][1] };
}
*/
// Для остальных точек (не попавших в поле зрения браузера) - вычисляем по формуле приближения к центру
/*
for (let i = 1; i <= 61; i++) {    
    if ((mass3_0[i][0] == 0.0) && (mass3_0[i][1] == 0.0)) {
        let dx = mass3_0[i][0] - centerX;
        let dy = mass3_0[i][1] - centerY;
        mass2_0[i][0] = centerX + dx / 1.5;
        mass2_0[i][1] = centerY + dy / 1.5;
        scaleCoords[5][i] = {
            x: mass3_0[i][0],
            y: mass3_0[i][1]
        };
    }
}
*/


// Инициализируем для каждого масштаба
const fixedScales = [1.0, 1.5, 2.0, 2.5, 3.0];


// Для масштаба 2.5 - исходные координаты
/*
scaleCoords[4] = [];
for (let i = 0; i <= 61; i++) {
    scaleCoords[4][i] = { x: mass2_5[i][0], y: mass2_5[i][1] };
}
*/


// Название объекта

names_arr = new Array("",
    "1. Вход в санаторий. КПП.",
    "2. Почта и Сберкасса",
    "3. Регистратура. Администрация санатория.",
    "4. Новый корпус",
    "5. 1 - е медотделение(”Титаник”)",
    "6. 2 - е медотделение",
    "7. Лечебный корпус",
    "8. Фонтан",
    "9. Грязевые ванны",
    "10. Смотровые прибрежные балконы",
    "11. Столовая и Зимний клуб",
    "12. Летний кинотеатр",
    "13. Бассейный комплекс",
    "14. Теннистный корт",
    "15. Нижняя (у моря) Бадминтонная площадка",
    "16. Площадка для настольного тенниса",
    "17. Танцплощадка",
    "18. Верхняя Бадминтонная площадка ",
    "19. Верхняя Волейбольная площадка",
    "20. Центральная аллея",
    "21. Генеральский домик",
    "22. Военный пансионат",
    "23. Река Дзиета",
    "24. Эшерское шоссе (Улица Братьев Эзугбая)",
    "25. Железная дорога",
    "26. Вход в тоннель",
    "27. Лодочная станция и причал",
    "28. Прибрежное кафе",
    "29. Смотровая беседка крытая",
    "30. Гаражи",
    "31. Мастерские",
    "32. Бойлерная и насосная станция",
    "33. Хозяйственные строения",
    "34. Военторг.Продовольственный магазин.Квартиры обслуживающего персонала",
    "35. Столовая Пансионата.Квартиры обслуживающего персонала",
    "36. Квартиры обслуживающего персонала",
    "37. Дорога к Санаторию (после войны)",
    "38. Море",
    "39. Пляж Санатория (Мужской)",
    "40. Пляж Санатория (Женский)",
    "41. Общий семейный пляж",
    "42. Дикий дальний пляж",
    "43. Смотровая беседка открытая с минибассейном",
    "44. Прибрежная аллея",
    "45. ",
    "46. Детский сад",
    "47. Верхний декоративный бассейн с золотыми рыбками",
    "48. Открытая беседка-клумба",
    "49. Уголок отдыха со столиками",
    "50. Первые постройки",
    "51. Бельевая",
    "52. Продовольственный склад и холодильник",
    "53. Прачечная",
    "54. Нижний декоративный бассейн с золотыми рыбками",
    "55. Нижняя волейбольная площадка",
    "56. Аллея к Генеральскому домику",
    "57. Тропинка от Генеральского домика к пляжу",
    "58. Зона отдыха обитателей Генеральского домика",
    "59. Телефонная станция для Санатория",
    "60. Пункт выдачи спортинвентаря для тенниса",
    "61. Насосная станция морской воды для бассейного комплекса"
);

// Подробное описание объекта

    names_arr2 = new Array("",
        "Вход в санаторий. КПП.",
        "Почта и Сберкасса размещались у главного входа в санаторий с внешней стороны",
        "После постройки Нового корпуса административные службы переехали в этот корпус. Тут же теперь (поближе к главному входу) разместилась и Регистрация посетителей.",
        "Новый корпус - так стали называть этот корпус с 1985 года. Другое название этого корпуса - Штабной. Здесь теперь располагалась регистратура и основные управленческие структуры. Ранее они размещались в 'Титанике' ",
        "Спально-лечебный корпус 1-го медотделения (После выхода в свет фильма Титаник этот корпус стали называть 'Титаник' за сходство верхней смотровой площадки на крыше корпуса с палубой Титаника). Введен в строй в 1963 году. Здесь размещался высший офицерский состав Министерства Обороны СССР. Как и в лечебном корпусе, здесь проводились медицинские процедуры.",
        "Спальный корпус 2-го медотделения. Введен в строй в 1963 году. Здесь размещался средний офицерский состав Министерства Обороны СССР",
        "Лечебный корпус построен к 1957 году. В лечебном корпусе были: водолечебница, кабинеты ингаляции, токов низкой и высокой частоты, ручного массажа, рентгеновский, стоматологический; функциональной диагностики и другие. Кроме этого, здесь имеются клинико-биохимическая лаборатория, зал лечебной физкультуры.",
        "Фонтан располагается перед центральным входом в Лечебный корпус. К фонтану с восьми сторон проведены дорожки, две из которых ведут к боковым входам Лечебного корпуса.",
        "Грязевые ванны располагались около Лечебного корпуса. Грязь привозили из Грузии. Теперь здесь обитают лягушки.",
        "Смотровые прибрежные балконы расположены на высоком берегу вдоль прибрежной аллеи.",
        "1-й этаж - Столовая. Этажом ниже располагалась кухня.На 2-м этаже бы Зимний клуб, где имелся свой кинотеатр и библиотека. В зимний клуб был отдельный вход с улицы по мосту с центральной аллеи",
        "Летний кинотеатр на 400 мест. Сдан в строй до 1975 г. Кроме киносеансов здесь выступали и цирк лилипутов. Местные мальчишки пробирались всеми правдами и неправдами, особенно на вечерние сеансы для взрослых.",
        "Спорткомплекс и Бассейн. В бассейне была морская вода, которая закачивалась насосной станцией из моря.",
        "Теннистный корт состоял из двух частей - для тренировок с бетонной стенкой и для игры. После войны здесь местные мальчишки устроили себе футбольное поле.",
        "Нижняя Бадминтонная площадка до войны была расположена вместе с волейбольной площадкой вдоль набережной аллеи под Титаником. Теперь от нее остался только фундамент.",
        "Площадка для настольного тенниса располагалась рядом (восточнее) с кортом для большого тенниса. От этой площадки также после войны не осталось следов.",
        "Танцевальная площадка располагалась на спуске от Центральной аллеи (в районе Летнего кинотеатра) к набережной (в районе Прибрежного кафе). К ней снизу и сверху шла лестница. По окружности танцплощадки были расположены скамейки. Девочки тайком здесь собирали цветки красивейших камелий и под одеждой прятали, чтобы вынести их с территории санатория.",
        "Верхняя бадминтонная площадка была расположена у корпуса 2-го медотделения. К ней также можно было подняться с Набережной аллеи по лестнице.",
        "Волейбольная площадка была расположена у корпуса 2-го медотделения. К ней также можно было подняться с Набережной аллеи по лестнице.",
        "Центральная аллея шла от Главного входа мимо корпуса 2-го медотделения к пересечению других аллей и Летнему кинотеатру, Столовой и Зимнему клубу. С противоположной стороны к этому перекрестку шла аллея от корпуса 1-го медотделения (Титаника).",
        "Двухэтажный Генеральский домик располагался в отдалении от большинства корпусов в западной части Санатория. С нему шла аллея от Центрального входа. Со второго этажа Генеральского домика открывался прекрасный вид на море. В домике было 4 номера: с южной стороны два больших с террасой и видом на море и с восточной стороны два малых с балкончиками. В центре домика располагался открытый бассейн с морской водой. В северной стороне домика размещались деловая комната, зона отдыха, открытая терраса, кухня. Обсдуживала этот домик специальная команда поваров, медиков, массажистов. Семья генерала занимала весь домик. Иногда генералы приезжали со своими адьютантами, поварами, медиками, которые размещались в пансионате. Ниже основного этажа располагался цокольный этаж, где находился гараж для нескольких автомобилей, складские помещения (белье, продукты), система обеспечения работы бассейна",
        "Военный пансионат при санатории на 100 коек для членов семей военнослужащих и служащих Советской Армии. Введен в строй в 1969 году. Расположен за основной территорией Санатория (через шоссе).  ",
        "Речка Дзиета протекала по восточной границе Санатория и впадала у южной оконечности его в Черное море.",
        "До войны (1992-1993 гг.) эта трасса носила название Эшерское шоссе. После войны это шоссе получило название Улица Братьев Эзугбая в честь героев, защищавших свое Отечество. С одной стороны это шоссе ведет в Сухум, а с другой - проходя через всю Нижнюю Эшеру, идет на северо-запад. ",
        "Прямо через территорию Санатория с северо-запада из тоннеля выходила одна коллея железной дороги, ведущей на Сухум. ",
        "Вход в тоннель охранялся от коров (после войны) и случайных (или неслучайных) людей специальной военнизированной службой.",
        "Лодочная станция и причал были введены в строй в 1975 году. Лодки размещались в гараже под прибрежным кафе. Лодки краном ставили на жд тележку, везли метров 30 до крана под навесом, который уже опускал в воду. ",
        "Прибрежное кафе на набережной. Здесь сверху стояли скамейки, столики и большие шахматы. Ниже располагались лодочная станция и общий пляж, где выдавали лежаки. В кафе у тёти Ани можно было выпить чудесное ароматное кофе, а еще поили газировкой и кормили Сухумским мороженым.",
        "Подобные Смотровые беседки были расположены на склоне горы и находились вблизи спусков от корпусов Санатория к морю.",
        "Гаражи для легкового, грузового и коллективного (автобусы) транспорта размещались в северо-восточной части, вдали от основных лечебных корпусов и социальных объектов Санатория. К гаражам вел отдельный от Центрального въезд в Санаторий с Эшерского шоссе.",
        "Мастерские, как и гаражи, были дистанцированы от отдыхающих Санатория.",
        "Бойлерная и насосная станция, располагаясь на северо-востоке Санатория, обеспечивали водой весь Санаторий.",
        "Хозяйственные строения",
        "На первом этаже этого 5-этажного дома размещался Военторг - магазин для военнослужащих и магазин продовольственных товаров. На остальных этажах проживали семьи обслуживающего персонала Санатория",
        "На первом этаже этого 5-этажного дома находилась Столовая для отдыхающих в Пансионате. На остальных этажах проживали семьи обслуживающего персонала Санатория",
        "В этом 5-этажном доме проживали семьи обслуживающего персонала Санатория",
        "Эта дорога сформировалась уже в послевоенные годы. Она ведет от улицы Братьев Эзугбая к морю мимо железноддорожного моста (под ним), пересекает реку Дзиету (проходя над ней, а потом вдоль нею), мимо Бассейна Санатория, Лечебного корпуса.Дорога к Санаторию(после войны)",
        "К морю было несколько спусков от Санатория. Вдоль моря шла Прибрежная аллея, Прибрежное кафе. А ниже были оборудованы несколько пляжей и лодочная станция. Для ослабления деструктивного воздействия волн во время штормов у берега моря была сооружена целая система волонорезов, как перпендикулярных линии берега (они возвышались над уровнем моря)), так и расположенных параллельно берегу (эти волнорезы были примерно на полметра-метр ниже уровня моря). Периодически специальная служба проверяла и корректировала положение этих волнорезов. После войны эта служба прекратила свое существование и на одном из участков подводные волнорезы сместились со своих мест и открыли доступ штормовым волнам к высокому берегу. В результате с каждым годом эта часть берега стала разрушаться, обваливаться и сначала в этом месте Прибрежная аллея стала недоступной для движения автотранспорта, а затем (в 2020-е годы) уже обвалилась и пешеходная тропинка, из-за чего пришлось ее расширять за счет части высокого берега (под Титаником).",
        "Пляж Санатория. Изначально этот пляж был мужским. Но потом, когда за посетительницами соседнего женского пляжа сторонние <наблюдатели> стали оказывать слишком тщательное внимание, мужской пляж перешел на место бывшего женского, а этот пляж стал ЖЕНСКИМ.",
        "Пляж Санатория. Изначально этот пляж был женским. Но потом, когда за посетительницами соседнего женского пляжа сторонние <наблюдатели> стали оказывать слишком тщательное внимание, женский пляж перешел на место бывшего мужского (подальше от края пляжной зоны), а этот пляж стал МУЖСКИМ.",
        "Общий семейный пляж",
        "Дикий дальний пляж",
        "Подобные Смотровые беседки были расположены на склоне горы и находились вблизи спусков от корпусов Санатория к морю.",
        "Прибрежная аллея идет вдоль всех пляжей, начиная от впадания реки Дзиесты в море до дикого пляжа. В 2010-20-ее годы часть аллеи повреждена из-за разрушения части берега под Титаником. ",
        "Боковая аллея шла по правую сторону от Главной центральной аллеи, мимо 2-го корпуса ",
        "Детский сад для детей обслуживающего санаторий персонала.",
        "Верхний бассейн с фонтаном располагался слева от входа к главному входу в Титаник. После войны утерян, остался только остов и фундамент.",
        "Декоративная клумба на склоне чуть выше прибрежной аллеи",
        "Уголок отдыха с четырьмя столиками располагался чуть ниже нижнего декоративного бассейна с золотыми рыбками. С него открывался сквозб деревья вид на набережную аллею и спортивные площадки рядом с ней и на море.",
        "Фотографии санатория или мест до его основания. В начале 1949 года на базе 75-коечного санатория ЗакВО был организован военный санаторий ЭШЕРИ Мин.ВС на 100 коек. Жилым фондом санатория было единственное здание - особняк бывшего князя Ковалевского. В 1950-51 гг. территория санатория была значительно расширена, были построены деревянные коттеджи для спальных помещений, приемного отделения, управления. В 1957 году были построены: здание лечебного корпуса, клуб-столовая, прачечная, гараж, склады ОВС, запчастей, продсклад с холодильником. С 1963 года проводилась генеральная реконструкция санатория и большие работы по  благоустройству, введены в строй спальные корпуса 1 и 2 медотделений, санаторий стал на 200 коек. В 1969 году был открыт пансионат на 100 коек для членов семей военнослужащих. До 1975 года был сдан в эксплуатацию летний кинотеатр на 400 мест, домик с отделением связи, лодочная станция с причалом, лечебные пляжи с аэрариями, набережная. В санатории отдыхали и лечились военнослужащие ГРУ Министерства Обороны СССР.",
        "Здесь хранилось белье для посетителей санатория",
        "На первом этаже хранились овощи и фрукты, а также бакалейные продукты. На втором этаже располагались холодильники для мясных продуктов.",
        "В прачечной производилась стирка белья и одежды.",
        "Нижний Бассейн с золотыми рыбками располагался чуть ниже центральной аллеи, ведущей к Титанику. Ниже и чуть далее бассейна размещался уголок отдыха с 4 столиками.",
        "Волейбольная площадка у набережной аллеи",
        "Эта аллея шла от центрального входа (КПП) вдоль забора к генеральскому домику",
        "Эта аллея спускалась от Генеральского домика к пляжу и выходила, пересекая прогулочную набережную аллею, к пляжу между мужским и женским пляжами",
        "Чуть ниже Генеральского домика располагалась небельшая зона отдыха для посетителей Генеральского домика",
        "Телефонная станция обслуживала все корпуса Санатория и располагалась напротивСтоловой-Зимнего клуба, имела два входа со стороны аллеи. Телефонные номера были трехзначными.",
        "В этом небольшом помещении находился и выдавался инвентарь для большого и настольного тенниса",
        "Насосная станция закачивала морскую воду и подавала ее в бассейный комплекс." 
    
);

// Комментарии к конкретным фотографиям объектов

    // Комментарии к конкретным фотографиям объектов
    names_arr3 = new Array()
    names_arr3[0] = new Array("")
    names_arr3[1] = new Array("", "Главный вход в санаторий (до войны, ок. 1976). ", "Главный вход в санаторий (до войны, 1949 г.).", "Главный вход в 1957 году")
    names_arr3[2] = new Array("", "Почта и сберкасса до войны", "Почта и Сберкасса (после войны). Вид на КПП.", "Почта и Сберкасса (после войны). Вид вдали на Новый корпус.")
    names_arr3[3] = new Array("", "Вид со стороны шоссе (после войны)", "Вид со стороны аллеи (паралельно шоссе)")
    names_arr3[4] = new Array("", "Новый корпус (после войны)")
    names_arr3[5] = new Array("", "Вид на корпус 1-го медотделения с высоты птичьего полета", "Корпус 1-го медотделения в 80-е годы", "Главный вход в корпус 1-го медотделения", "Отдыхающий на фоне корпуса 1-го медотделения", "1-е медотделение со стороны Центральной аллеи", "Вид на корпус 1-го медотделения со стороны пляжа", "Титаник после войны со стороны бадминтонной площадки", "Титаник после войны", "Титаник после войны", "Титаник после войны", "Титаник после войны", "Титаник после войны со стороны Столовой", "Вид с крыши Титаника на Лечебный корпус.", "Вид на Титаник со стороны моря", "Вид на море и пляж с верхних этажей Титаника", "Вид на море с верхних этажей Титаника", "Смотровая площадка Титаника", "Внутри смотровой площадки Титаника", "Внутри смотровой площадки Титаника", "Вековая липа перед корпусом Титаника", "Вековая липа перед корпусом Титаника", "Заросшие косоуры от лестницы центрального входа в середине 20-х годов", "Лестница от 1-го корпуса к Лечебному корпусу", "Лестница от 1-го корпуса к Лечебному корпусу", "Лестница от 1-го корпуса к Лечебному корпусу", "Особняк князя Ковалевского (1949 г.), на месте которого был построен 1-й корпус Санатория", "Спальная палата", "Спальная палата", "Сотрудники Санатория у входа в 1-й корпус", "На крыше Титаника", "Вид с Титаника на село", "Вид с Титаника на закат", "Внутренняя лестница после войны", "Внутри номера после войны", "Частный снимок на лестнице от Титаника к прибрежной аллее 1980 г.", "Частный снимок у входа до войны")
    names_arr3[6] = new Array("", "Корпус 2-го медотделения до войны", "Корпус 2-го медотделения после войны со стороны Центральной аллеи", "Корпус 2-го медотделения после войны со стороны Центральной аллеи", "Главный вход в корпус 2-го медотделения после войны со стороны Центральной аллеи", "Внутри корпуса 2-го медотделения после войны", "Вид на корпус 2-го медотделения с Центральной аллеи со стороны Летнего кинотеатра", "Строительство новых корпусов (1-го и 2-го) в 1963 году")
    names_arr3[7] = new Array("", "Лечебный корпус до войны", "Прием у врача", "Прием у врача Неборского", "В кабинете функциональной диагностики", "Гидромассаж", "Принятие лечебных ванн", "В массажном кабинете", "Душ Шарко", "Циркулярный душ", "В рентгеновском кабинете", "Анализ рентгеновских снимков", "В кабинете токов низкой частоты", "В кабинете токов УВЧ", "В ингаляторном кабинете", "В кабинете грязелебницы", "На приеме у зубного врача В.М.Петрова", "В лаборатории", "В лаборатории", "В аптеке", "Лечебный корпус после войны", "Лечебный корпус и фонтан после войны", "Лечебный корпус с восточной стороны", "Лечебный корпус после войны и коровы", "Разруха в Лечебном корпусе после войны", "Лечебный корпус  до войны  1950-55г")
    names_arr3[8] = new Array("", "Фонтан у Лечебного корпуса до войны", "Фонтан у Лечебного корпуса после войны", "Фонтан в середине 20-х годов")
    names_arr3[9] = new Array("", "Грязевые ванны у Лечебного корпуса после войны.", "Декор бортика грязевых ванн в 2026 году", "В 2026 году")
    names_arr3[10] = new Array("", "Смотровая беседка на набережной после войны", "Смотровая беседка на набережной после войны", "Смотровая беседка в 1961 году", "Бортик смотровой прибрежной беседки сбоку в 2026 году")
    names_arr3[11] = new Array("", "Столовая и Зимний клуб в 1959 году", "Столовая и Зимний клуб до войны", "Библиотека в Зимнем клубе", "Столовая в 1957 году", "Столовая внутри в 1957 году", "Столовая внутри в 1957 году", "Коллектив столовой санатория", "Столовая и клуб после войны", "Мостик с Центральной аллеи к клубу", "Мостик с Центральной аллеи к клубу", "Мостик с Центральной аллеи к клубу", "Мостик с Центральной аллеи к клубу", "Мостик с Центральной аллеи к клубу", "Столовая после войны", "Столовая после войны", "Столовая после войны", "Столовая после войны", "Столовая, Зимний клуб и вход в радиорубку (справа)", "Столовая, Зимний клуб и вход в радиорубку", "Столовая и над ней Зимний клуб", "Столовая внутри после войны", "Столовая внутри после войны", "Лестница в Зимний клуб в 1954 году")
    names_arr3[12] = new Array("", "Летний кинотеатр до войны", "Внутри летнего кинотеатра до войны", "Отдыхающие у Летнего кинотеатра до войны", "Летний кинотеатр после войны", "Летний кинотеатр после войны", "Внутри летнего кинотеара после войны", "Внутри летнего кинотеара после войны")
    names_arr3[13] = new Array("", "Бассейный комплекс со стороны аллеи у теннистной площадки", "Бассейный комплекс со стороны аллеи от столовой", "Центральный вход в бассейный комплекс", "Вид с высоты птичьего полета на Бассейный комплекс", "Тыльная сторона Бассейного комлпекса", "Внутри после войны", "Бассейн после войны", "Бассейн после войны", "Вид со стороны ж/д моста")
    names_arr3[14] = new Array("", "Теннисный корт до войны. На заднем плане виден корпус столовой-клуба.", "До войны", "Теннисный корт в начале 2000-х годов. Заметны футбольные ворота.", "После войны в конце 2010-х годов. Футбольных ворот уже не видно.", "В середине 20-х годов", "Вход на теннисный корт в середине 20-х годов")
    names_arr3[15] = new Array("", "До войны Бадминтонная площадка у моря (нижняя) видна на заднем плане за Волейбольной площадкой", "Место бадминтонной площадки в 2026 году", "Фундамент под бадминтонную площадку в 2026 году")
    names_arr3[16] = new Array("")
    names_arr3[17] = new Array("", "Танцевальная площадка до войны", "После войны...", "После войны...", "Лестница на танцплощадку со стороны пляжа", "Лестница на танцплощадку со стороны пляжа", "Вход на танцплощадку со стороны моря", "Лестница от танцплощадки вверх к площади у кинотеатра", "Лестница на танплощадку со стороны прибрежной аллеи")
    names_arr3[18] = new Array("")
    names_arr3[19] = new Array("", "Волейбольная площадка у 2-го корпуса", "Волейбольная площадка у 2-го корпуса", "Возможно волейбольная площадка у 2-го корпуса")
    names_arr3[20] = new Array("", "Центральная аллея до войны", "Центральная аллея после войны", "Ноги Ленина?", "Ограда вдоль Центральной аллеи", "Ограда вдоль Центральной аллеи", "Частный снимок до войны. На аллее 1980 г", "Частный снимок до войны. В парке 1980 г", "Частный снимок до войны 1980 г", "Частный снимок до войны. В парке на скамейке 1980 г", "После войны", "После войны", "Дерево упавшее на баллюстраду вдоль главной аллеи в 2026 году")
    names_arr3[21] = new Array("", "Видеоанимация", "Видеоанимация основного этажа", "Вид на домик со стороны ведущей от КПП к нему аллеи в 2026 году", "Вид на домик со стороны ведущей от КПП к нему аллеи в 2026 году", "Вход в генеральский домик", "Вход в генеральский домик", "Правый большой номер", "Вид из правого большого номера в сторону моря", "Вид из левого большого номера в сторону моря", " Балкон при правом входе", "Вид на бассейн со стороны входа", " Вход от бассейна в две большие комнаты", "Справа дверь в правую большую комнату а слева далее в вторую большую комнату", " Дверь в правую большую комнату", "Спальняя часть правой большой комнаты а правее выход на большой балкон-террасу", "Туалет и ванная команты правой большой комнаты", "Вид на террасу из спальной части правой большой комнаты", "Балкон правой большой комнаты", "Единственная сохранившаяся розетка", "Вид вниз с балкона правой большой комнаты", "Навес-козырек над балконом правой большой комнаты", "Туалет и ванная комната в левой большой комнате", "Левая большая комната а левее выход на террасу", "Вид на террасу из левой большой комнаты", "Вид на балкон из террасы левой большой комнаты", "Вид на стену с балкона левой большой комнаты", "Зона отдыха напротив открытого бассейна", "Возможно столовая комната", "Зона отдыха и слева выход на большой общий балкон", "Общий большой балкон", "Общий большой балкон", "Вид на бассейн из зоны отдыха", "Вход в коридор к маленьким комнатам", "Кухня", "Левый вход в домик для обслуживающего персонала", "Левая лестница для входа обслуживающего персонала", "Коридор к двум маленьким комнатам", "1-я маленькая комната", "2-я маленькая комната", "Вход в общий туалет и ванную из коридора", "Общий туалет обслуги", "Ванная комнаты обслуги", "Ванная комната обслуги", "Черный кафель бассейна", "Вход в цокольный этаж - гараж и складские помещения", "Въезд в цокольный этаж", "Слева вход в закрытые складские помещения", "Гаражное помещение", "План 1-го этажа", "3D", "3D", "3D", "3D", "3D", "Планировка 1-го этажа", "Планировка 1-го этажа", "Цокольный этаж", "Среди зарослей со стороны парка в 2024 году", "Вид на домик со стороны ведущей от КПП к нему аллеи в 2026 году")
    names_arr3[22] = new Array("", "Военный пансионат до войны", "Сотрудники Пансионата", "Вид на Пансионат со стороны ж/д моста", "Пансионат после войны", "Пансионат после войны", "Вид на пансионат со стороны Санатория(ж/д моста", "2026 год", "2026 год", "2026 год", "2026 год", "2026 год", "2026 год")
    names_arr3[23] = new Array("", "Река Дзиета в северной части Санатория с моста на шоссе", "Река Дзиета у подножия Бассейного комплекса", "Река Дзиета после дождей", "Река Дзиета после дождей")
    names_arr3[24] = new Array("", "Шоссе ночью", "Шоссе днем. Автобусная остановка в направлении на Сухум", "Мост через Дзиету по шоссе с видом на дом Военторга")
    names_arr3[25] = new Array("", "Ж-Д Мост рекой Дзиета и над дорогой от жилых зданий персонала к санаторию со стороны Бассейного комплекса", "На ж-д мосту с видом на Пансионат до войны", "Поезд Сухум-Санкт-Петербург", "Поезд Санкт-Петербург - Сухум, 9:36", "Поезд Санкт-Петербург - Сухум, 9:36", "Ж/д Мост", "С видом на бассейный комплекс", "В сторону Сухума", "В сторону России тоннель", "Поезд Санкт-Петербург - Сухум выезжает из тоннеля", "Поезд Санкт-Петербург - Сухум выезжает из тоннеля", "Поезд Санкт-Петербург - Сухум выезжает из тоннеля", "Поезд Санкт-Петербург - Сухум выезжает из тоннеля")
    names_arr3[26] = new Array("", "Место выхода (со северо-западной стороны) ж/д тоннеля на территории Санатория.")
    names_arr3[27] = new Array("", "Причал со стороны пляжа до войны", "Причал со стороны пляжа до войны", "Причал со стороны пляжа после войны", "Причал со стороны Лодочной станции после войны", "Причал после войны", "Причал после войны", "Лодочная станция после войны", "Лодочная станция после войны", "Рельсы от Лодочной станции к Причалу после войны", "Причал со стороны пляжа", "Вид на причал со стороны моря")
    names_arr3[28] = new Array("", "Кафе Шахматка после войны. Вид с моря.", "Кафе Шахматка после войны. Вид со стороны кафе.", "Кафе Шахматка после войны. Вид со стороны открытой части.", "Кафе Шахматка. Вид снизу со стороны пляжа.", "Кафе Шахматка после войны. Внутри.", "Кафе Шахматка после войны. Вид со стороны аллеи.", "Кафе Шахматка до войны.", "Кафе внутри.", "Тетя Аня. У нее был изумительный кофе. А за кафе была комната медсестры пляжа", "Тётя Аня в прибрежном кафе", "Частный снимок у кафе до войны", "У кафе Шахматка до войны", "У Прибрежного кафе до войны", "Площадка у кафе после попадания бомбы во время войны 1993 г.", "До войны", "До войны", "Вид на кафе и причал со стороны моря", "Вид на море из кафе", "Кафе со стороны прибрежной аллеи")
    names_arr3[29] = new Array("", "Беседка после войны.", "Потолок беседки", "Кафель пола в беседке", "Беседка до войны с лестницы на танцплощадку")
    names_arr3[30] = new Array("", "Хозблоки по дороге к гаражам", "Хозяйственная постройка по дороге к гаражам", "Гаражи после войны", "Гаражи после войны")
    names_arr3[31] = new Array("", "Мастерские")
    names_arr3[32] = new Array("", "Помещение бойлерной", "Помещение бойлерной", "Резервуары воды", "Резервуары воды", "Кран")
    names_arr3[33] = new Array("", "Хозяйственные помещения")
    names_arr3[34] = new Array("", "Магазин Военторг на 1-м этаже и квартиры работников санатория", "Магазин после войны в 21 веке", "Частный снимок на фоне магазина до войны", "2026 год")
    names_arr3[35] = new Array("", "Столовая Пансионата", "Столовая Пансионата. Фирменное блюдо - рыба с макаронами. Главная повариха - тетя Ася", "После войны", "После войны", "После войны", "2026 год")
    names_arr3[36] = new Array("", "2026 год ")
    names_arr3[37] = new Array("", "Дорога начинается от шоссе", "Мимо заброшенных усадеб", "Очередная корова на пути", "Вдали виден бассейный корпус Санатория", "К тропинке у речки", "Ж-Д Мост рядом с рекой Дзиета и над дорогой от жилых зданий персонала к санаторию со стороны Бассейного комплекса", "Тропинка от ж/д моста", "С тыльной стороны бассейного корпуса", "Мимо тыльной стороны бассейного корпуса", "На старой границе Санатория у стены бассейного корпуса", "Тропинка вверх к аллее Санатория", "По аллее к прибрежной аллее")
    names_arr3[38] = new Array("", "Море со стороны прибрежной аллеи", "Чистое море", "Чистое море", "Частный снимок в море в 1982 году", "Штормит", "Штормит", "Штормит", "Закат", "Закат", "Закат", "Ночью")
    names_arr3[39] = new Array("", "В 1950-е годы", "В 1982 году", "До войны", "После войны")
    names_arr3[40] = new Array("", "Вид с моря")
    names_arr3[41] = new Array("", "До войны", "Частный снимок до войны", "Вид издали")
    names_arr3[42] = new Array("", "После войны", "Частный снимок до войны в 1980 г.")
    names_arr3[43] = new Array("", "Открытая беседка чуть выше прибрежной аллеи в 2024 году.", "Открытая беседка чуть выше прибрежной аллеи в 2026 году.", "Открытая беседка чуть выше прибрежной аллеи в 2024 году.", "Открытая беседка чуть выше прибрежной аллеи в 2026 году. Правее видно каменное сооружение. Скорее всего - бассейн.", "Возможно, декоративный бассейн у беседки", "Возможно, декоративный бассейн у беседки")
    names_arr3[44] = new Array("", "В 1950-е годы", "Поворот к прибрежной аллее", "Начало аллеи", "В месте разрушения берега", "По дороге к пляжам", "По дороге к пляжам")
    names_arr3[45] = new Array("", "Фотографии пока нет")
    names_arr3[46] = new Array("", "Вид на детский сад снизу в 2009 году", "Вид на детский сад снизу в 2026 году", "Лестница к детскому саду в 2026 году", "Вид снизу с лестницы", "Вид снизу с лестницы", "Вид в 2026 году")
    names_arr3[47] = new Array("", "Верхний декоративный бассейн с золотыми рыбками в 2026 году")
    names_arr3[48] = new Array("", "Декоративная клумба на склоне у прибрежной аллеи в 2026 году")
    names_arr3[49] = new Array("", "До войны.", " Треугольная площадка сверху в 2026 году.", "Столик 1", "Столик 2", "Столик 3", "Столик 4", "Вид с Треугольной площадки на аллею и шахматку и море", " Вид с треугольной площадки на аллею выше", "Правая-нижняя стена треугольной площадки в сторону Титаника", " Аллея слева вдоль треугольной площадки в сторону Титаника", "Лестница вверх от треугольной площадки к Титанику", "Лестница вверх от треугольной площадки к Титанику")
    names_arr3[50] = new Array("", "1949 г. Вход в главный санаторий", "1951 г. Деревянные коттеджи", "1951 г. Домик", "1954 г. У столовой", "1956 г. У скульптурной группы.", "1957 г.Финский домик", "1959 г. Зимний клуб", "Особняк князя Ковалевского в 1949 году, с которого начинался Санаторий", "Коллектив персонала Санатория до войны")
    names_arr3[51] = new Array("", "Бельевая")
    names_arr3[52] = new Array("", "Продовольственный склад и холодильники")
    names_arr3[53] = new Array("", "Прачечная")
    names_arr3[54] = new Array("", "Нижний декоративный бассейн с золотыми рыбками до войны", "Бассейн с золотыми рыбками до войны", "Верхний бассейн с золотыми рыбками - вид от Титаника. 2026 г.", "Верхний бассейн с золотыми рыбками в 2026 г.", "Верхний бассейн с золотыми рыбками - элемент декора в 2026 г.", "Верхний бассейн с золотыми рыбками - элемент 2 в 2026 г.", "Верхний бассейн с золотыми рыбками - скамейка около бассейна в 2026 г.")
    names_arr3[55] = new Array("", "Нижняя Волейбольная площадка у моря")
    names_arr3[56] = new Array("", "Аллея от КПП к Генеральскому домику до войны", "Аллея от КПП к Генеральскому домику в 2026 году")
    names_arr3[57] = new Array("", "Эвкалипт у аллеи от генеральского домика вниз к пляжу", "Эвкалипт у аллеи от генеральского домика вниз к пляжу", "Эвкалипт у аллеи от генеральского домика вниз к пляжу")
    names_arr3[58] = new Array("", "Бойлерная и насосная в 2026 году")
    names_arr3[59] = new Array("", "Телефонный узел в 2026 году")
    names_arr3[60] = new Array("", "Пункт выдачи спортинвентаря в 2026 году", "Пункт выдачи спортинвентаря в 2026 году")
    names_arr3[61] = new Array("", "Насосная станция для подачи морской воды в бассейный комплекс в 2026 году", "Насосная станция для подачи морской воды в бассейный комплекс в 2026 году", "Насосная станция для подачи морской воды в бассейный комплекс в 2026 году", "Насосная станция для подачи морской воды в бассейный комплекс в 2026 году")
    names_arr3[62] = new Array("", "Перед гаражами")
    names_arr3[63] = new Array("", "Площадь перед кинотеатром с отметкой 1976 года в 2026 году")

// ====== ОБРАБОТЧИК КЛИКОВ ======
alert("00:05");
// ====== ОБРАБОТЧИК КЛИКОВ (с учетом масштаба карты) ======
document.addEventListener('click', function (event) { // Работает хорошо только для ПК, а для мобильных нет попаданий и масштабирования
   //alert("in addEventListener: CLICK");
    let img = document.getElementById('img0');
    if (!img) return;

    img.style.zIndex = '2'; // Принудительно как фон

    let target = event.target;

    // Если клик по панели или её элементам - игнорируем
    if (target.closest('#div')) { return; }

    // Если клик по кнопкам навигации - игнорируем
    if (target.closest('.button1') || target.closest('.button2')) { return; }

    // Если клик по медиа-контейнеру - игнорируем
    if (target.closest('#media-container') || target.closest('#block')) { return; }


    //  Проверяем, повернуто ли изображение (мобильная версия)
    let isRotated = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

    
    if (isRotated == false) { // Версия для ПК
        // Получаем координаты клика с учетом масштаба карты
        let coords = getMapCoordinates(event.clientX, event.clientY);
        let x = coords.x;
        let y = coords.y;
        alert("x0_PC="+x+" y0_PC="+y);

        // Проверяем, что клик внутри изображения
        let rect = img.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.left + rect.width ||
            event.clientY < rect.top || event.clientY > rect.top + rect.height) {
            console.log('Клик вне изображения');
            return;
        }

        console.log(`=== КЛИК (с учетом масштаба) ===`);
        console.log(`Координаты в процентах: x=${x.toFixed(2)}%, y=${y.toFixed(2)}%`);
        console.log(`Масштаб карты: ${mapScale.toFixed(2)}`);

        let nscale = 0;
        if ((mapScale > 0.95) && (mapScale < 1.05)) { nscale = 1; }
        if ((mapScale > 1.45) && (mapScale < 1.55)) { nscale = 2; }
        if ((mapScale > 1.95) && (mapScale < 2.05)) { nscale = 3; }
        if ((mapScale > 2.45) && (mapScale < 2.55)) { nscale = 4; }
        if ((mapScale > 2.95) && (mapScale < 3.05)) { nscale = 5; }

        // Проверяем попадание в кружок
        //alert("in addEventListener 36.83 scaleCoords[1.0][1].x =" + scaleCoords[1.0][1].x);
        //alert("mapScale=" + mapScale + " nscale=" + nscale);
        let found = false;
        //alert("in mass[25][0]=" + mass[25][0]);
        for (let ii = 1; ii <= 61; ii++) {
            let x0 = 0.0;
            let y0 = 0.0;
            // alert("mapScale=" + mapScale + " nscale=" + nscale);
            if (nscale == 1) {
                x0 = mass[ii][0];
                y0 = mass[ii][1];
            }
            if (nscale == 3) {
                x0 = mass2_0[ii][0];
                y0 = mass2_0[ii][1];
            }
            if (nscale == 5) {
                x0 = mass3_0[ii][0];
                y0 = mass3_0[ii][1];
            }

            //alert("in scaleCoords[mapScale][ii].x =" + scaleCoords[nscale][ii].x);
            //alert("in scaleCoords[mapScale][ii].y =" + scaleCoords[nscale][ii].y);
            // alert("x0="+x0+" y0="+y0);
            let dx = Math.abs(x - x0);
            let dy = Math.abs(y - y0);

            // alert("x=" + x + " x0=" + x0 + " dx=" + dx + "y=" + y + " y0=" + y0 + " dy=" + dy);
            //alert(" dx=" + dx + " dy=" + dy);
            // Увеличиваем радиус захвата при большем масштабе
            let captureRadius = mapScale > 1 ? 2.0 / mapScale : 1.0;
            if (dx < captureRadius && dy < captureRadius) {
                N = ii;
                found = true;
                console.log(`Попали в кружок №${N}!`);
                break;
            }
        }

        if (found && N > 0) {
            document.getElementById("td00").textContent = names_arr[N] || "Объект " + N;
            document.getElementById("td2").textContent = names_arr2[N] || "Нет описания";
            document.getElementById('div').style.display = 'block';

            let panel = document.getElementById('div');

            // ====== ПРИНУДИТЕЛЬНОЕ ОТОБРАЖЕНИЕ ПАНЕЛИ ======
            panel.style.display = 'block';
            panel.style.zIndex = '9999'; // Принудительно поверх всего
            panel.style.position = 'fixed';
            // panel.style.left = '10px';
            //panel.style.top = '100px';
            //panel.style.width = '400px';
            // panel.style.height = '500px';
            panel.style.background = 'rgb(0, 0, 139)';
            panel.style.border = '3px solid white';
            panel.style.borderRadius = '8px';
            panel.style.padding = '10px';
            panel.style.boxSizing = 'border-box';
            panel.style.visibility = 'visible';
            panel.style.opacity = '1';

            console.log('Панель принудительно показана');
            console.log('panel.style.display:', panel.style.display);
            console.log('panel.style.zIndex:', panel.style.zIndex);
            console.log('img.style.zIndex:', img.style.zIndex);

            // Для мобильной версии
            if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
                panel.style.width = '100%';
                panel.style.height = '100%';
                panel.style.left = '0px';
                panel.style.top = '0px';
                panel.style.border = 'none';
                panel.style.borderRadius = '0';
                panel.style.zIndex = '9999';
            }

            n = 1;
            direction = 1;
            show_image();
        } else {
            // Клик мимо кружка
            if (x < 70) {
                document.getElementById('div').style.display = 'none';
                document.getElementById('block').innerHTML = '';
                document.getElementById("td00").textContent = '';
                document.getElementById("td1").textContent = '';
                document.getElementById("td2").textContent = '';
                N = 0;
            }
        }
        return;
    }

    if (isRotated) { // Версия для мобильных устройств
        //alert("18:40");
        // 1. Получаем размеры окна браузера
        let WB = window.innerWidth;
        let HB = window.innerHeight;
        let KB = WB / HB;

        // 2. Получаем реальный размер изображения из файла
        let W0 = img.naturalWidth;
        let H0 = img.naturalHeight;

        if (W0 === 0 || H0 === 0) {
            console.log('Изображение еще не загружено');
            return;
        }

        let K0 = W0 / H0;

        let W1, H1, dx, dy; // ширина и высота изображения в браузере и размеры черных полос по горизонтали и вертикали
        // Для повернутого изображения меняем местами ширину и высоту
        // Так как изображение повернуто на 90 градусов
        let tempK = K0;
        K0 = 1 / K0; // Меняем соотношение сторон
        //4. Вычисляем размер изображения в браузере(W1, H1) и черные полосы(dx, dy)
        if (K0 < KB) {
            H1 = HB;
            W1 = K0 * H1;
            dx = (WB - W1) / 2;
            dy = 0;
        } else {
            W1 = WB;
            H1 = W1 / K0;
            dx = 0;
            dy = (HB - H1) / 2;
        }

        // Для повернутого изображения координаты клика нужно пересчитать
        // Получаем координаты клика относительно изображения
        let rect = img.getBoundingClientRect();

        // Для повернутого изображения используем другой подход
        // Вычисляем положение изображения на экране с учетом трансформации
        let clickX = event.clientX;
        let clickY = event.clientY;

        // При повороте на 90 градусов:
        // x = (clickY - top) / height * 100
        // y = (clickX - left) / width * 100
        // Но с учетом того, что изображение центрировано

        let x = (clickY - dy) / H1 * 100;
        let y = 100 - (clickX - dx) / W1 * 100;

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        alert("x00=" + x + " y00=" + y);

        let coordsm = getMapCoordinates(event.clientX, event.clientY);
        let xm = coordsm.x;
        let ym = coordsm.y;
        alert("getMapCoordinates xm=" + xm + " ym=" + ym);

        let nscale = 0;
        if ((mapScale > 0.95) && (mapScale < 1.05)) { nscale = 1; }
        if ((mapScale > 1.45) && (mapScale < 1.55)) { nscale = 2; }
        if ((mapScale > 1.95) && (mapScale < 2.05)) { nscale = 3; }
        if ((mapScale > 2.45) && (mapScale < 2.55)) { nscale = 4; }
        if ((mapScale > 2.95) && (mapScale < 3.05)) { nscale = 5; }

       // alert("scale=" + scale + " xScaled=" + xScaled + " yScaled=" + yScaled + " finalX=" + finalX + "%, finalY=" + finalY + "%");
        //alert("x=" + x + " y=" + y);

        // Применяем масштаб (координаты "сжимаются" к центру)
        let scale = mapScale || 1;
        let xScaled = 50 + (x - 50) / scale;
        let yScaled = 50 + (y - 50) / scale;

        alert("scale=" + scale + " xScaled=" + xScaled + " yScaled=" + yScaled);



        // Проверяем попадание в кружок
        let found = false;
        for (let ii = 1; ii <= 61; ii++) {
            let dxCircle = Math.abs(x - mass[ii][0]);
            let dyCircle = Math.abs(y - mass[ii][1]);
            if (dxCircle < 2.0 && dyCircle < 2.0) {
                N = ii;
                found = true;
                console.log(`Попали в кружок №${N}!`);
                break;
            }
        }
        //alert("x="+x+" y="+y)
        if (found && N > 0) {
            document.getElementById("td00").textContent = names_arr[N] || "Объект " + N;
            document.getElementById("td2").textContent = names_arr2[N] || "Нет описания";
            document.getElementById('div').style.display = 'block';
            n = 1;
            direction = 1;
            show_image();
        } else {
            if (x < 70) {
                document.getElementById('div').style.display = 'none';
                document.getElementById('block').innerHTML = '';
                document.getElementById("td00").textContent = '';
                document.getElementById("td1").textContent = '';
                document.getElementById("td2").textContent = '';
                N = 0;
            }
        }
        return;
    }
});

document.addEventListener__('click', function (event) {
    alert("in addEventListener('click', function (event)");
    let img = document.getElementById('img0');
    if (!img) return;

    let target = event.target;

    // Если клик по панели или её элементам - игнорируем
    if (target.closest('#div')) {
        return;
    }

    // Если клик по кнопкам навигации - игнорируем
    if (target.closest('.button1') || target.closest('.button2')) {
        return;
    }

    // Если клик по медиа-контейнеру - игнорируем
    if (target.closest('#media-container') || target.closest('#block')) {
        return;
    }

    // 1. Получаем размеры окна браузера
    let WB = window.innerWidth;
    let HB = window.innerHeight;
    let KB = WB / HB;

    // 2. Получаем реальный размер изображения из файла
    let W0 = img.naturalWidth;
    let H0 = img.naturalHeight;

    if (W0 === 0 || H0 === 0) {
        console.log('Изображение еще не загружено');
        return;
    }

    let K0 = W0 / H0;

    let W1, H1, dx, dy; // ширина и высота изображения в браузере и размеры черных полос по горизонтали и вертикали

    //alert("");

    // 3. Проверяем, повернуто ли изображение (мобильная версия)
    let isRotated = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
    //alert("isRotated=" + isRotated);
    if (isRotated) {
        // Для повернутого изображения меняем местами ширину и высоту
        // Так как изображение повернуто на 90 градусов
        let tempK = K0;
        K0 = 1 / K0; // Меняем соотношение сторон
        //4. Вычисляем размер изображения в браузере(W1, H1) и черные полосы(dx, dy)
        if (K0 < KB) {
            H1 = HB;
            W1 = K0 * H1;
            dx = (WB - W1) / 2;
            dy = 0;
        } else {
            W1 = WB;
            H1 = W1 / K0;
            dx = 0;
            dy = (HB - H1) / 2;
        }

        // Для повернутого изображения координаты клика нужно пересчитать
        // Получаем координаты клика относительно изображения
        let rect = img.getBoundingClientRect();

        // Для повернутого изображения используем другой подход
        // Вычисляем положение изображения на экране с учетом трансформации
        let clickX = event.clientX;
        let clickY = event.clientY;

        // При повороте на 90 градусов:
        // x = (clickY - top) / height * 100
        // y = (clickX - left) / width * 100
        // Но с учетом того, что изображение центрировано

        let x = (clickY - dy) / H1 * 100;
        let y = 100 - (clickX - dx) / W1 * 100;

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        // Проверяем попадание в кружок
        let found = false;
        for (let ii = 1; ii <= 61; ii++) {
            let dxCircle = Math.abs(x - mass[ii][0]);
            let dyCircle = Math.abs(y - mass[ii][1]);
            if (dxCircle < 2.0 && dyCircle < 2.0) {
                N = ii;
                found = true;
                console.log(`Попали в кружок №${N}!`);
                break;
            }
        }
        //alert("x="+x+" y="+y)
        if (found && N > 0) {
            document.getElementById("td00").textContent = names_arr[N] || "Объект " + N;
            document.getElementById("td2").textContent = names_arr2[N] || "Нет описания";
            document.getElementById('div').style.display = 'block';
            n = 1;
            direction = 1;
            show_image();
        } else {
            if (x < 70) {
                document.getElementById('div').style.display = 'none';
                document.getElementById('block').innerHTML = '';
                document.getElementById("td00").textContent = '';
                document.getElementById("td1").textContent = '';
                document.getElementById("td2").textContent = '';
                N = 0;
            }
        }
        return;
    }

    
    //let W1, H1, dx, dy;
    // Стандартный расчет для ПК и планшетов (без поворота)
    if (isRotated == false) {
        // 4. Вычисляем размер изображения в браузере (W1, H1) и черные полосы (dx, dy)
        if (K0 < KB) {
            // 2.1: Черные полосы по бокам (слева и справа)
            H1 = HB;
            W1 = K0 * H1;
            dx = (WB - W1) / 2;
            dy = 0;
        } else {
            // 3.1: Черные полосы по вертикали (сверху и снизу)
            W1 = WB;
            H1 = W1 / K0;
            dx = 0;
            dy = (HB - H1) / 2;
        }

        // 5. Получаем координаты клика в пикселях относительно окна
        let clickX = event.clientX;
        let clickY = event.clientY;

        // 6. Проверяем, что клик внутри изображения (не на черной полосе)
        if (clickX < dx || clickX > dx + W1 || clickY < dy || clickY > dy + H1) {
            console.log('Клик вне изображения (на черной полосе)');
            return;
        }

        // 7. Вычисляем координаты в процентах относительно изображения
        let x = ((clickX - dx) / W1) * 100;
        let y = ((clickY - dy) / H1) * 100;

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        //alert("x=" + x + " y=" + y);

        console.log(`=== КЛИК ===`);
        console.log(`Окно: ${WB}x${HB}, соотношение: ${KB.toFixed(3)}`);
        console.log(`Изображение: ${W0}x${H0}, соотношение: ${K0.toFixed(3)}`);
        console.log(`Изображение в браузере: ${W1.toFixed(0)}x${H1.toFixed(0)}`);
        console.log(`Черные полосы: dx=${dx.toFixed(0)}px, dy=${dy.toFixed(0)}px`);
        console.log(`Координаты в процентах: x=${x.toFixed(2)}%, y=${y.toFixed(2)}%`);
        console.log(`Кружок 1: ${mass[1][0]}%, ${mass[1][1]}%`);
        console.log(`Разница с кружком 1: dx=${Math.abs(x - mass[1][0]).toFixed(2)}, dy=${Math.abs(y - mass[1][1]).toFixed(2)}`);
        // alert("x=" + x + " y=" + y);


        let found = false;
        for (let ii = 1; ii <= 61; ii++) {
            let dx = Math.abs(x - mass[ii][0]);
            let dy = Math.abs(y - mass[ii][1]);
            //alert("x=" + x + " y=" + y);
            if (dx < 1.0 && dy < 1.0) {
                N = ii;
                found = true;
                console.log(`Попали в кружок №${N}!`);
                break;
            }
        }

        if (found && N > 0) {
            document.getElementById("td00").textContent = names_arr[N] || "Объект " + N;
            document.getElementById("td2").textContent = names_arr2[N] || "Нет описания";
            document.getElementById('div').style.display = 'block';
            n = 1;
            direction = 1;
            show_image();
        } else {
            // Клик мимо кружка
            if (x < 70) { // Чтобы случайно не скрыть при клике на панель
                document.getElementById('div').style.display = 'none';
                document.getElementById('block').innerHTML = '';
                document.getElementById("td00").textContent = '';
                document.getElementById("td1").textContent = '';
                document.getElementById("td2").textContent = '';
                N = 0;
            }
        }
    }//if isrotate==false
});