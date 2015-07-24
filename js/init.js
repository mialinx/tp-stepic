(function() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        var s = scripts[i];
        if (s.getAttribute("type") != "snippet") {
            continue
        }
        var lines = s.textContent.replace(/^\s*\r?\n/,'').split(/\r?\n/);
        var text = '';
        var offset = 0;
        for (var j = 0; j < lines[0].length; j++) {
            if (lines[0][j] == ' ') {
                offset += 1;
            } else if (lines[0][j] == '\t') {
                offset += 4;
            } else {
                break;
            }
        }
        for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            var loffset = 0;
            for (var k = 0; k < line.length; k++) {
                if (line[k] == ' ') {
                    loffset += 1;
                } else if (line[k] == '\t') {
                    loffset += 4;
                } else {
                    break;
                }
                if (loffset == offset) {
                    break;
                }
            }
            text += line.substring(loffset) + "\n";
        }
        text = text.replace(/['"<>]/g, function(x) { return { '"': '&quot;', "'": '&apos;', '<': '&lt;', '>': '&gt;' }[x] });
        var c = document.createElement('code');
        c.innerHTML = text;
        if (s.getAttribute("lang")) {
            c.className += " lang-"  + s.getAttribute("lang");
        }
        var p = document.createElement('pre');
        p.appendChild(c);
        s.parentNode.replaceChild(p, s);
        hljs.highlightBlock(c);
    }
})();
