function addCssFile(file, id) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = file;
    link.id   = id;
    link.media = 'all';
    head.appendChild(link);   
    console.log('nikos');
    console.log(link);
    console.log(head);
}
addCssFile('https://rawgit.com/nikosgpet/tampermonkey/master/tags.workflowy.css', 'tags_css');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(`
    #pageContainer {
        background-color: blue;
    }
`);
