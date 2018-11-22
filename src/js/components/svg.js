export default (function (window, document) {
    var file = '../images/svg/svg.svg';

    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
        return true;

    let request,
        data,
        insertIT = function () {
            document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = function () {
            if (document.body) insertIT();
            else document.addEventListener('DOMContentLoaded', insertIT);
        };
    try {
        request = new XMLHttpRequest();
        request.open('GET', file + '?v' + Date.now(), true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();
            }
        }
        request.send();
    }
    catch (e) { }
}(window, document));

