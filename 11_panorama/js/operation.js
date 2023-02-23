
function changebg(no) {
    console.log("alert")
    if (no == 1) {
        reload("./Panorama2.png");
    } else if(no == 2){
        reload("./Panorama3.png");
    }
}

bgbutton1 = document.getElementById("bg1");
bgbutton1.addEventListener('click', () => {
    changebg(1);
});
bgbutton2 = document.getElementById("bg2");
bgbutton2.addEventListener('click', () => {
    changebg(2);
});