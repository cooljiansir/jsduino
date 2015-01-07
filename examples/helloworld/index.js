$(function () {
    pinMode(13, OUTPUT);
    $("#buton").click(function () {
        digitalWrite(13, HIGH);
    });
    $("#butoff").click(function () {
        digitalWrite(13, LOW);
    });
});