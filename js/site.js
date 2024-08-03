function onclick_01() {
    //document.body.innerHTML = "<h1 style='color:blue'>Сегодня " + d + "</h1 >"
    //info.textContent = "ТЕКСТ";
}

function onclick_body() {
    //info.textContent = "BODY";
}

function onclick_img() {
    info.textContent = "IMG";

    //alert("НАЖАТО");
}

let d = new Date();
//alert('Нажми на меня!');
let width  = document.body.clientWidth;
let height = document.body.clientHeight;

let body = document.getElementById("body_id");
body.addEventListener("click", function () {
    //info.textContent = "BODY 2";
});



//let but01 = document.getElementById("button_01");
//but01.addEventListener("click", function () {
//    info.textContent = "ТЕКСТ 2";
//});
//but01.textContent = "OK 1";


//let info = document.getElementById("inform");

//info.textContent = "ТЕКСТ"; 




let img = document.getElementById("img");
let W = img.width;
//let text = document.getElementById("id_text");
//let left = 71.6 / 100 * W;

let text1 = document.getElementById("id_text1");

let div = document.getElementById("div");
let H = img.height;
let edge = 55; //%
let top_div = edge / 100 * H; // px

let tab = document.getElementById("table_id");
//tab.setAttribute("height","444px");


//div.style.top = top_div;
//div.setAttribute("top", "555px");
//div.style.top = "${top_div}"+"px";
//document.body.appendChild(div);

/*
var tab2 = document.createElement("table");
tab2.setAttribute("style", "position: absolute;");
let destination = "top:+ ${top_div}+px;";
tab2.setAttribute("style", destination)
box.innerText = location;
document.body.appendChild(tab2);
*/


//text.style.left = left + "px";
//text.style.top = 0 + "px";
//text.style.width = (28.4/100*W) + "px"


//text.style.left = '${left}px';
//let x = left;
//let y = 0;

//text.style.transform = 'translate(${x}px, ${y}px)';



document.addEventListener('click', function (event) {
   // let coordDisplay = document.getElementById("coordDisplay");
    //coordDisplay.textContent = `X = ${event.clientX}, Y = ${event.clientY}`;
    let img = document.getElementById("img");
    let W = img.width;
    let H = img.height;
    let N = 0;
    let x = event.clientX / W * 100;
    let y = event.clientY / H * 100;

    

    mass = new Array()
    mass[0] = new Array(0.0, 0.0);
    mass[1] = new Array(36.85, 29.33);
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
    mass[15] = new Array(36.51, 77.01);
    mass[16] = new Array(43.07, 79.62);
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
    mass[29] = new Array(29.48, 51.62);
    mass[30] = new Array(35.36, 55.70);
    mass[31] = new Array(44.17, 35.32);
    mass[32] = new Array(48.07, 40.12);
    mass[33] = new Array(51.98, 34.69);
    mass[34] = new Array(49.17, 29.78);
    mass[35] = new Array(59.43, 33.02);
    mass[36] = new Array(60.73, 44.51);
    mass[37] = new Array(60.94, 54.86);
    mass[38] = new Array(52.29, 58.10);
    mass[39] = new Array(15.88, 66.56);
    mass[40] = new Array(21.51, 46.71);
    mass[41] = new Array(16.25, 36.26);
    mass[42] = new Array(29.79, 68.55);
    mass[43] = new Array( 8.02, 24.66);
    //mass[1] = new Array()
    names_arr = new Array("",
        "Вход в санаторий. КПП.",
        "Почта и Сберкасса",
        "Регистрация. Администрация санатория.",
        "Новый корпус",
        "1 - е медотделение(”Титаник”)",
        "2 - е медотделение",
        "Лечебный корпус",
        "Фонтан",
        "Грязевые ванны",
        "Смотровые прибрежные балконы",
        "Столовая и Зимний клуб",
        "Летний кинотеатр",
        "Бассейн",
        "Теннистный корт",
        "Бадмингтонная площадка 1",
        "Площадка для настольного тенниса",
        "Танцплощадка",
        "Бадмингтонная площадка 2",
        "Волейбольная площадка",
        "Центральная аллея",
        "Генеральский домик",
        "Военный пансионат",
        "Речка Дзиета",
        "Эшерское шоссе(Улица Братьев Эзугбая)",
        "Железная дорога",
        "Вход в тоннель",
        "Лодочная станция и причал",
        "Прибрежное кафе",
        "Смотровая беседка",
        "Смотровая беседка",
        "Гаражи",
        "Мастерские",
        "Бойлерная и насосная станция",
        "Хозяйственные строения",
        "Военторг.Продмаг.Квартиры обслуж.персонала",
        "Столовая.Квартиры обслуж.персонала",
        "Квартиры обслуж.персонала",
        "Дорога к Санаторию(после войны)",
        "Море",
        "Пляж Санатория(Мужской)",
        "Пляж Санатория(Женский)",
        "Общий пляж",
        "Дикий пляж"
    );

    names_arr2 = new Array("",
        "Вход в санаторий. КПП.",
        "Почта и Сберкасса",
        "Регистрация. Администрация санатория.",
        "Новый корпус",
        "1 - е медотделение (”Титаник”)",
        "2 - е медотделение",
        "Лечебный корпус",
        "Фонтан",
        "Грязевые ванны",
        "Смотровые прибрежные балконы",
        "1-й этаж - Столовая. Этажом ниже располагалась кухня.<br>2-й этаж - Зимний клуб. В зимнем клубе был свой кинотеатр, библиотека. В зимний клуб был отдельный вход с улицы по мосту с центральной аллеи",
        "Летний кинотеатр",
        "Бассейн",
        "Теннистный корт",
        "Бадмингтонная площадка 1",
        "Площадка для настольного тенниса",
        "Танцплощадка",
        "Бадмингтонная площадка 2",
        "Волейбольная площадка",
        "Центральная аллея",
        "Генеральский домик",
        "Военный пансионат",
        "Речка Дзиета",
        "Эшерское шоссе(Улица Братьев Эзугбая)",
        "Железная дорога",
        "Вход в тоннель",
        "Лодочная станция и причал",
        "Прибрежное кафе",
        "Смотровая беседка",
        "Смотровая беседка",
        "Гаражи",
        "Мастерские",
        "Бойлерная и насосная станция",
        "Хозяйственные строения",
        "Военторг.Продмаг.Квартиры обслуж.персонала",
        "Столовая.Квартиры обслуж.персонала",
        "Квартиры обслуж.персонала",
        "Дорога к Санаторию(после войны)",
        "Море",
        "Пляж Санатория(Мужской)",
        "Пляж Санатория(Женский)",
        "Общий пляж",
        "Дикий пляж"
    );

    //alert(`X = ${event.clientX}, Y = ${event.clientY}, W = ${W}, x = ${x}, m1 = ${mass[1][0]}, m2=${mass[1][1]}, y = ${y}`);

    for (ii = 1; ii <= 43; ii++) {
        let i = ii;
        
        if (((x > (mass[i][0] - 1)) && (x < (mass[i][0] + 1))) && ((y > (mass[i][1] - 1)) && (y < (mass[i][1] + 1)))) {
            N = i;
            break;
        }
    }

   // alert(`X = ${event.clientX}, Y = ${event.clientY}, W = ${W}, x = ${x}, m1 = ${mass[1][0]}, m2=${mass[1][1]}, y = ${y}, N = ${N}, ${names_arr[N]}`);
    if (N>0) {
        //alert(` ${names_arr[N]}`);
        //text.textContent = names_arr[N];
        //text1.textContent = names_arr[N];
        document.getElementById("td1").innerHTML = names_arr[N];
        document.getElementById("td2").innerHTML = names_arr2[N];
        //document.getElementById("td3").innerHTML = '<img src="../images/11_03.jpg" style="max - height: 100 %; max - width: 100 %">';
         
        document.getElementById("td3").innerHTML = '<img src="../images/11_03.jpg"  style="width: 100%; height: auto; object-fit: contain;">';
       // document.getElementById("td3").innerHTML = '<img src="../images/11_03.jpg"  style="width: 100%; height: auto;">';
    }
});




//document.body.innerHTML = "<p> <img src='../images/eshera.png' width='1000' height = '1000' alt = 'Иллюстрация' > </p>";
//document.body.innerHTML = "<h1 style='color:blue'>Сегодня " + d + "</h1 >";
