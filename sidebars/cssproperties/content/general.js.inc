RegisterIniter(GeneralSectionIniter);

function GeneralSectionIniter(aElt, aRuleset)
{
  deleteAllChildren(gDialog.fontFamilyListbox);

  var fontFamily = CssInspector.getCascadedValue(aRuleset, "font-family");
  if (fontFamily) {
	  var fonts = fontFamily.split(",");
	  fonts.forEach(function(aElt, aIndex, aArray) {
	      gDialog.fontFamilyListbox.appendItem(aElt, aElt);
	    });
	  //SetEnabledElement(gDialog.removeFontButton, gDialog.fontFamilyListbox.itemCount);
  }

  var fw = CssInspector.getCascadedValue(aRuleset, "font-weight");
  CheckToggle(gDialog.fontWeightBoldButton,    fw == "bold" || fw == "700");
  CheckToggle(gDialog.fontWeightLighterButton, fw == "lighter");
  CheckToggle(gDialog.fontWeightBolderButton,  fw == "bolder");

  var fs = CssInspector.getCascadedValue(aRuleset, "font-style");
  CheckToggle(gDialog.fontStyleItalicButton,   fs == "italic");
  CheckToggle(gDialog.fontStyleObliqueButton,  fs == "oblique");

  var td = CssInspector.getCascadedValue(aRuleset, "text-decoration");
  var tdArray = td.split(" ");
  CheckToggle(gDialog.textDecorationUnderlineButton,    tdArray.indexOf("underline") != -1);
  CheckToggle(gDialog.textDecorationOverlineButton,     tdArray.indexOf("overline") != -1);
  CheckToggle(gDialog.textDecorationLinethroughButton,  tdArray.indexOf("line-through") != -1);

  var tt = CssInspector.getCascadedValue(aRuleset, "text-transform");
  CheckToggle(gDialog.textTransformLowercaseButton,   tt == "lowercase");
  CheckToggle(gDialog.textTransformUppercaseButton,   tt == "uppercase");
  CheckToggle(gDialog.textTransformLinethroughButton, tt == "capitalize");

  var ta = CssInspector.getCascadedValue(aRuleset, "text-align");
  CheckToggle(gDialog.textAlignLeftButton,    ta == "left");
  CheckToggle(gDialog.textAlignCenterButton,  ta == "center");
  CheckToggle(gDialog.textAlignRightButton,   ta == "right");
  CheckToggle(gDialog.textAlignJustifyButton, ta == "justify");

  CheckToggle(gDialog.textAlignStartButton,   ta == "start");
  CheckToggle(gDialog.textAlignEndButton,     ta == "end");

  //var fs = CssUtils.getComputedValue(aElt, "font-size");
  var fs = CssInspector.getCascadedValue(aRuleset, "font-size");
  gDialog.fontSizeMenulist.value = fs;

  var lh = CssInspector.getCascadedValue(aRuleset, "line-height");
  gDialog.lineHeightMenulist.value = lh;
}

function AddFont(aEvent)
{
  var elt = aEvent.originalTarget;
  if (elt.nodeName.toLowerCase() != "menuitem")
    return;
  var value = elt.getAttribute("label");
  if (elt.hasAttribute("global")) {
    deleteAllChildren(gDialog.fontFamilyListbox);
    var fontsArray = value.split(",");
    for (var i = 0; i < fontsArray.length; i++) {
      var v = fontsArray[i].trim();
      gDialog.fontFamilyListbox.appendItem(v, v);
    }
  }
  else {
    gDialog.fontFamilyListbox.appendItem(value, value);
  }
  ApplyFontFamily();
}

function OnFontFamilySelect(aElt)
{
  var item = aElt.selectedItem;
  SetEnabledElement(gDialog.removeFontButton, (item != null));    
}

function DeleteFont()
{
  var item = gDialog.fontFamilyListbox.selectedItem;
  if (!item) return; // sanity check
  item.parentNode.removeChild(item);
  ApplyFontFamily();
}

function ApplyFontFamily()
{
  var child = gDialog.fontFamilyListbox.firstChild;
  var ff = "";
  while (child) {
    ff += (ff ? ", " : "") + child.value;
    child = child.nextSibling;
  }
  ApplyStyles([
                {
                  property: "font-family",
                  value: ff
                }
              ]);
}
