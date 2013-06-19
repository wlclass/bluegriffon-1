Components.utils.import("resource://app/modules/urlHelper.jsm");
Components.utils.import("resource://app/modules/l10nHelper.jsm");

const kFONT_FEATURES = [
  "aalt",
  "calt",
  "salt",
  "liga",
  "clig",
  "dlig",
  "hist",
  "hlig",
  "unic",
  "smcp",
  "c2sc",
  "c2pc",
  "pcap",
  "case",
  "cpsp",
  "titl",
  "swsh",
  "cswh",
  "frac",
  "afrc",
  "ordn",
  "numr",
  "dnom",
  "sinf",
  "sups",
  "subs",
  "onum",
  "lnum",
  "pnum",
  "tnum",
  "zero",
  "mgrk",
  "nalt",
  "ornm",
  "locl",
  "size",
  "isol",
  "init",
  "medi",
  "fina",
  "rlig",
  "ccmp",
  "mark",
  "mkmk",
  "hwid"
];

RegisterIniter(FontsSectionIniter);

function FontsSectionIniter(aElt, aRuleset)
{
}

function FontsInit()
{
  window.removeEventListener('load',
		                          FontsInit,
		                          false);

  var rows = document.getElementById("ffRows");
  for (var i = 0; i < kFONT_FEATURES.length; i+=2) {
    var row = document.createElement("row");
    row.setAttribute("align", "center");

    var id1 = kFONT_FEATURES[i];

    var c1 = document.createElement("checkbox");
    c1.setAttribute("id", "ff" + id1.toUpperCase());
    row.appendChild(c1);

    var t1 = document.createElement("textbox");
    t1.setAttribute("size", "2");
    t1.setAttribute("id", "ff" + id1.toUpperCase() + 'val');
    row.appendChild(t1);

    var h1 = document.createElement("hbox");
    h1.setAttribute("align", "center");
    row.appendChild(h1);

    var i1 = document.createElement("image");
    i1.setAttribute("src", "chrome://cssproperties/skin/fontFeatures/" + id1 + ".png");
    i1.setAttribute("tooltiptext",
                    L10NUtils.getStringFromURL("FF" + id1,
                                               "chrome://cssproperties/locale/fontFeatures.properties"));
    h1.appendChild(i1);

    if (i+1 < kFONT_FEATURES.length) {
	    var id2 = kFONT_FEATURES[i+1];
	    var sp = document.createElement("spacer");
	    row.appendChild(sp);
	    
	    var c2 = document.createElement("checkbox");
	    c2.setAttribute("id", "ff" + id2.toUpperCase());
	    row.appendChild(c2);
	
	    var t2 = document.createElement("textbox");
	    t2.setAttribute("size", "2");
	    t2.setAttribute("id", "ff" + id2.toUpperCase() + 'val');
	    row.appendChild(t2);
	
	    var h2 = document.createElement("hbox");
	    h2.setAttribute("align", "center");
	    row.appendChild(h2);
	
	    var i2 = document.createElement("image");
	    i2.setAttribute("src", "chrome://cssproperties/skin/fontFeatures/" + id2 + ".png");
	    i2.setAttribute("tooltiptext",
	                    L10NUtils.getStringFromURL("FF" + id2,
	                                               "chrome://cssproperties/locale/fontFeatures.properties"));
	    h2.appendChild(i2);
    }
    rows.appendChild(row);
  }
}

function ReserializeFontFeatures(aElt)
{
  var checkboxes = aElt.querySelectorAll("checkbox");
  var rv = [];
  for (var i = 0; i < checkboxes.length; i++) {
    var c = checkboxes[i];
    if (c.checked) {

      var id = c.getAttribute("id").substr(2, 4).toLowerCase();
      var str = '"' + id + '"';
      var t = c.nextElementSibling;
      if (t.value)
        str += " " + t.value;
      rv.push(str);
    }
  }
  if (rv.length)
    ApplyStyles([
                  {
                    property: "-moz-font-feature-settings",
                    value: rv.join(", ")
                  }
                ]);
  else
    ApplyStyles([
                  {
                    property: "-moz-font-feature-settings",
                    value: ""
                  }
                ]);
}
