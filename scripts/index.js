class Size {
    height = 0;
    width = 0;

    constructor(width, height) {
        this.height = height;
        this.width = width;
    }
}

class Point {
    exterior = [];
    interior = [];

    constructor(points) {
        this.exterior = points;
    }
}

class Tags {
    name = '';
    value = null;

    constructor(tag) {
        this.name = tag;
    }
}

class Personage {
    description = '';
    bitmap = null;
    tags = [];
    classTitle = '';
    points = {};

    constructor(points, name) {
        this.points = new Point(points);
        this.classTitle = name;
    }

    setTags(tags) {
        tags.forEach(function (tag, key) {
            if (tag !== '' && tag !== null) {
                this.tags[this.tags.length] = new Tags(tag);
            }
        }.bind(this));
    }

    setPoints(points) {
        this.points = new Point(points);
    }
}

class Multik {
    description = '';
    tags = [];
    size = {};
    objects = [];

    constructor(width, height) {
        this.size = new Size(width, height);
    }

    addObjects(objects) {
        objects.forEach(function (object, key) {
            this.objects[key] = object;
        }.bind(this));
    }
}


var reader = new FileReader();
var file;
var finalResult;
var mouseDown = false;
var xOffset = 0;
var yOffset = 0;
var deltaX = 0;
var deltaY = 0;
var drawStarted = false;
var startX = 0;
var startY = 0;
var polygonCount = 0;
var chMouseDown = false;
var chxOffset = 0;
var chyOffset = 0;
var chdeltaX = 0;
var chdeltaY = 0;
var polygonCountForShow = 0;
var coordinates = [];

/*$asd = new Personage([[62, 156], [358, 471]], 'Kermit');
$asc = new Personage([[729, 39], [1073, 442]], 'Piggy');
$asd.setPoints([[729, 39], [1073, 442]]);
$asc.setPoints([[62, 156], [358, 471]]);
$asd.setTags(['ocluded','transmuted']);
$as = new Multik(1280, 720, [$asd, $asc]);
console.log($as);*/

function removeRect(elem, e) {
    if (e.ctrlKey && e.shiftKey) {
        elem.remove();
        $('#inform').text(--polygonCountForShow);


    }
}

function finalAll() {

    let personages = document.getElementsByTagName('rect');
    let points = [];
    let tags = [];
    let name = '';
    let koef = finalResult.size.width / document.getElementById('mainFrame').width.baseVal.value;
    coordinates = [];

    for (let pesonage in personages) {
        if (personages[pesonage].x) {
            // console.log(personages[pesonage]);
            points[pesonage] = [];
            points[pesonage][0] = [];
            points[pesonage][0][0] = [];
            points[pesonage][0][0] = personages[pesonage].x.baseVal.value * koef;
            points[pesonage][0][1] = personages[pesonage].y.baseVal.value * koef;
            points[pesonage][1] = [];
            points[pesonage][1][0] = [];
            points[pesonage][1][0] = Number(personages[pesonage].x.baseVal.value * koef) + Number(personages[pesonage].width.baseVal.value * koef);
            points[pesonage][1][1] = Number(personages[pesonage].y.baseVal.value * koef) + Number(personages[pesonage].height.baseVal.value * koef);
            // console.log(personages[pesonage]);
            if (personages[pesonage].getAttribute('tags')) {
                tags = personages[pesonage].getAttribute('tags').split(' ');
            }
            coordinates[coordinates.length] = new Personage(points[pesonage], personages[pesonage].getAttribute('alt'));
            if (tags.length > 0) {
                coordinates[coordinates.length - 1].setTags(tags);
            }
        }
    }
    finalResult.objects = [];
    finalResult.addObjects(coordinates);
    console.log(finalResult);
    $.ajax({
        url: "save.php",
        type: "POST",
        async: false,
        data: {
            "json": `${JSON.stringify(finalResult)}`,
            'name': `${$('#image').val().split(/[\\\/]/)[$('#image').val().split(/[\\\/]/).length - 1]}`
        }
    }).then(function () {
        finalResult.objects = [];
        coordinates = [];
        $('.success').css('opacity', '1');
        $('.success').delay(3000).queue(function (next) {
            $(this).css('opacity', '0');
            next();
        });
    });
}

function moveRect(elem, e) {
    if (e.ctrlKey && e.which === 1 && chMouseDown) {
        chdeltaX = e.clientX - chxOffset;
        chdeltaY = e.clientY - chyOffset;
        elem.setAttribute('x', Number(elem.getAttribute('x').replace('px', '')) + Number(chdeltaX));
        elem.setAttribute('width', Number(elem.getAttribute('width').replace('px', '')) - Number(chdeltaX));
        elem.setAttribute('y', Number(elem.getAttribute('y').replace('px', '')) + Number(chdeltaY));
        elem.setAttribute('height', Number(elem.getAttribute('height').replace('px', '')) - Number(chdeltaY));
        // $(this).css('left', `+=${chdeltaX}px`);
        //$(this).css('top', `+=${chdeltaY}px`);
        chxOffset = e.clientX;
        chyOffset = e.clientY;
    }
    if (e.ctrlKey && e.which === 3 && chMouseDown) {
        chdeltaX = e.clientX - chxOffset;
        chdeltaY = e.clientY - chyOffset;

        elem.setAttribute('width', Number(elem.getAttribute('width').replace('px', '')) + Number(chdeltaX));

        elem.setAttribute('height', Number(elem.getAttribute('height').replace('px', '')) + Number(chdeltaY));
        // $(this).css('left', `+=${chdeltaX}px`);
        //$(this).css('top', `+=${chdeltaY}px`);
        chxOffset = e.clientX;
        chyOffset = e.clientY;
    }
}

function chmouseDown(e) {
    chMouseDown = true;
    chxOffset = e.clientX;
    chyOffset = e.clientY;
}

function chmouseUp(e) {
    chMouseDown = false;
    chxOffset = 0;
    chyOffset = 0;
}

$(function () {
    $('body').on('contextmenu', function () {
        return false;
    });
    $('body').on('selectstart', function () {
        return false;
    });
    $('.picto').click(function () {
        $('img').removeClass('pictoactive');
        $(this).addClass('pictoactive');
    });
    $('.upload').on('selectstart', function () {
        return false;
    });
    $('#image').on('change', function () {
        file = ($('#image'))[0].files[0];
        reader.readAsDataURL(file);
        reader.onload = function () {

            var image = new Image();
            image.src = reader.result;
            image.onload = function () {
                polygonCountForShow = 0;
                $('#mainFrame').css({
                    'width': `${this.width}`,
                    'height': `${this.height}`,
                    'background': `url(${image.src})`,
                    'background-size': 'cover',
                    'position': 'absolute',
                    'top': `calc(50% - ${this.height / 2}px - 31px)`,
                    'left': `calc(50% - ${this.width / 2}px)`,
                    'z-index': '-1'
                });
                let file = `${$('#image').val().split(/[\\\/]/)[$('#image').val().split(/[\\\/]/).length - 1]}`;
                let arr = file.split('.');
                arr.pop();
                arr[arr.length] = 'json';
                let filename = arr.join('.');
                let respoce = 0;
                let json = $.ajax({
                    url: 'jsons/' + filename,
                    type: "POST",
                    async: false,
                    complete: function (xhr, textStatus) {
                        respoce = xhr.status;
                    }
                }).responseText;

                if (respoce === 200) {
                    finalResult = Object.assign(new Multik, JSON.parse(json));
                    $('#mainFrame').html('');
                    let tages = '';
                    for (let pers in finalResult.objects) {
                        finalResult.objects[pers].tags.forEach(function (tag) {
                                tages += ' ' + tag.name + ' ';
                            }
                        );
                        polygonCount++;
                        $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="${finalResult.objects[pers].classTitle}" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${finalResult.objects[pers].points.exterior[0][0]}" y="${finalResult.objects[pers].points.exterior[0][1]}" width="${finalResult.objects[pers].points.exterior[1][0] - finalResult.objects[pers].points.exterior[0][0]}" height="${finalResult.objects[pers].points.exterior[1][1] - finalResult.objects[pers].points.exterior[0][1]}" class="${finalResult.objects[pers].classTitle.toLowerCase()}pol" tags="${tages}"><title>${tages}</title></rect>`);

                        $('#inform').text(++polygonCountForShow);
                        tages = '';
                    }
                    $('#mainFrame').html($('#mainFrame').html());
                } else {
                    finalResult = new Multik(this.width, this.height);
                    $('#inform').text('0');
                    $('#mainFrame').html('');
                }
            }
        }


    });

    $('#mainFrame').on('mousedown', function (e) {
        if (e.which === 3 && !e.ctrlKey) {
            mouseDown = true;
            xOffset = e.clientX;
            yOffset = e.clientY;
        }
        if (e.which === 1 && $('.pictoactive').length === 1 && !e.ctrlKey) {
            drawStarted = true;
            startX = e.offsetX;
            startY = e.offsetY;
            polygonCount++;
            let title = '';
            if ($('#ocl').prop("checked")) {
                title += ' Ocluded ';
            }
            if ($('#trans').prop("checked")) {
                title += ' Truncated ';
            }
            switch ($('.pictoactive').attr('id')) {
                case 'kermit':


                    $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="Kermit" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${startX}" y="${startY}" width="0" height="0" class="kermitpol" tags="${title}"><title>${title}</title></rect>`);
                    break;
                case 'animal':
                    $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="Animal" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${startX}" y="${startY}" width="0" height="0" class="animalpol" tags="${title}"><title>${title}</title></rect>`);
                    break;
                case 'piggy':
                    $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="Piggy" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${startX}" y="${startY}" width="0" height="0" class="piggypol" tags="${title}"><title>${title}</title></rect>`);
                    break;
                case 'fozzie':
                    $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="Fozzie" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${startX}" y="${startY}" width="0" height="0" class="fozziepol" tags="${title}"><title>${title}</title></rect>`);
                    break;
                case 'gonzo':
                    $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="Gonzo" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${startX}" y="${startY}" width="0" height="0" class="gonzopol" tags="${title}"><title>${title}</title></rect>`);
                    break;
                case 'summer':
                    $('#mainFrame').append(`<rect id="pers${polygonCount}" alt="Summer" onclick="removeRect(this, event)" onmousemove="moveRect(this, event)" onmousedown="chmouseDown(event)" onmouseup="chmouseUp(event)" x="${startX}" y="${startY}" width="0" height="0" class="summerpol" tags="${title}"><title>${title}</title></rect>`);
                    break;
            }
            $('#inform').text(++polygonCountForShow);
            $('#mainFrame').html($('#mainFrame').html());
        }
    });

    $(document).keydown(function (e) {
        if (e.which === 90 && e.ctrlKey && $('rect').length > 0) {
            $('rect').last().remove();
            $('#inform').text(--polygonCountForShow);
        }
        if (e.which === 49) {
            $('#ocl').prop("checked", !$('#ocl').prop("checked"));
        }
        if (e.which === 50) {
            $('#trans').prop("checked", !$('#trans').prop("checked"));
        }
    });
    $('#mainFrame').on('mouseup', function (e) {
        if (e.which === 3) {
            mouseDown = false;
            xOffset = 0;
            yOffset = 0;
        }
        if (e.which === 1) {
            if (!e.ctrlKey) {
                $('#ocl').prop("checked", false);
                $('#trans').prop("checked", false);
            }
            drawStarted = false;
            startX = 0;
            startY = 0;
        }
    });
    $('#mainFrame').on('mousemove', function (e) {
        if (mouseDown) {
            deltaX = e.clientX - xOffset;
            deltaY = e.clientY - yOffset;
            $(this).css('left', `+=${deltaX}px`);
            $(this).css('top', `+=${deltaY}px`);
            xOffset = e.clientX;
            yOffset = e.clientY;
        }
        if (drawStarted) {


            if (e.offsetX > startX) {
                $(`#pers${polygonCount}`).attr('width', e.offsetX - startX);
            } else if (e.offsetX < startX) {
                $(`#pers${polygonCount}`).attr('x', e.offsetX);
                $(`#pers${polygonCount}`).attr('width', startX - e.offsetX);
            } else {
                $(`#pers${polygonCount}`).attr('width', 0);
                $(`#pers${polygonCount}`).attr('x', startX);
            }

            if (e.offsetY > startY) {
                $(`#pers${polygonCount}`).attr('height', e.offsetY - startY);
            } else if (e.offsetY < startY) {
                $(`#pers${polygonCount}`).attr('y', e.offsetY);
                $(`#pers${polygonCount}`).attr('height', startY - e.offsetY);
            } else {
                $(`#pers${polygonCount}`).attr('height', 0);
                $(`#pers${polygonCount}`).attr('y', startY);
            }


        }
    });
    $('#mainFrame').on('wheel', function (e) {
        if (e.originalEvent.wheelDelta > 0) {
            $preWidth = $('#mainFrame').width();
            $koefX = $('#mainFrame').width() / (e.clientX - $('#mainFrame').css
            ("left").replace("px", ""));
            $koefY = $('#mainFrame').width() / (e.clientY - $('#mainFrame').css
            ("top").replace("px", ""));
            $('#mainFrame').width(($('#mainFrame').width()) *
                1 * (1.23) + "px");

            $('#mainFrame').height(($('#mainFrame').height()) *
                1 * (1.23) + "px");


            $deltaWidth = Math.abs($('#mainFrame').width() - $preWidth) / $koefX;
            $('#mainFrame').css("left", `-=${$deltaWidth}px`);

            $deltaHeight = Math.abs($('#mainFrame').width() - $preWidth) / $koefY;
            $('#mainFrame').css("top", `-=${$deltaHeight}px`);


            $('rect').each(function () {
                    $(this).attr('width', ($(this).attr('width')) * 1 * 1.23);
                    $(this).attr('height', ($(this).attr('height')) * 1 * 1.23);
                    $(this).attr('x', `${Number($(this).attr('x')) * 1.23}`);
                    $(this).attr('y', `${Number($(this).attr('y')) * 1 * 1.23}`);
                }
            );
        } else {
            $preWidth = $('#mainFrame').width();
            $koefX = $('#mainFrame').width() / (e.clientX - $('#mainFrame').css
            ("left").replace("px", ""));
            $koefY = $('#mainFrame').width() / (e.clientY - $('#mainFrame').css
            ("top").replace("px", ""));
            $('#mainFrame').width(($('#mainFrame').width()) *
                1 / (1.23) + "px");


            $('#mainFrame').height(($('#mainFrame').height()) *
                1 / (1.23) + "px");

            $deltaWidth = Math.abs($('#mainFrame').width() - $preWidth) / $koefX;
            $('#mainFrame').css("left", `+=${$deltaWidth}px`);

            $deltaHeight = Math.abs($('#mainFrame').width() - $preWidth) / $koefY;
            $('#mainFrame').css("top", `+=${$deltaHeight}px`);


            $('rect').each(function () {
                $(this).attr('width', ($(this).attr('width')) * 1 / 1.23);
                $(this).attr('height', ($(this).attr('height')) * 1 / 1.23);
                $(this).attr('x', `${Number($(this).attr('x')) / 1.23}`);
                $(this).attr('y', `${Number($(this).attr('y')) * 1 / 1.23}`);
            });
        }
    });
});