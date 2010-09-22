      <hbox align="center" class="csspropertiesHeader" context="sectionHeaderContext"
            id="listsSectionHeader">
        <image src="chrome://cssproperties/skin/filter.png" onclick="ToggleSection(this.parentNode)"/>
        <label value="&listsSectionHeader.label;"/>
      </hbox>

      <vbox class="section" id="listsSection">
        <grid>
          <columns><column/><column/></columns>
          <rows>
            <row align="center">
	            <label value="&listStyleType.label;"/>
	            <menulist editable="true" id="listStyleTypeMenulist"
                        sizetopopup="always"
                        property="list-style-type"
                        oncommand="this.value = event.originalTarget.value;ToggleProperty(this)"
	                      oninput="ToggleProperty(this)">
	              <menupopup>
                  <menuitem label="&none.label;" value="none"/>
                  <menuseparator/>
	                <menuitem label="&disc.label;" value="disc"/>
	                <menuitem label="&circle.label;" value="circle"/>
	                <menuitem label="&square.label;" value="square"/>
	                <menuitem label="&decimal.label;" value="decimal"/>
	                <menuitem label="&decimalLeadingZero.label;" value="decimal-leading-zero"/>
	                <menuitem label="&lowerRoman.label;" value="lower-roman"/>
	                <menuitem label="&upperRoman.label;" value="upper-roman"/>
	                <menuitem label="&lowerGreek.label;" value="lower-greek"/>
	                <menuitem label="&lowerAlpha.label;" value="lower-alpha"/>
	                <menuitem label="&upperAlpha.label;" value="upper-alpha"/>
	                <menuseparator/>
	                <menuitem label="&armenian.label;" value="armenian"/>
	                <menuitem label="&georgian.label;" value="georgian"/>
                  <menuseparator/>
	                <menuitem label="&hebrew.label;" value="hebrew"/>
	                <menuitem label="&arabicIndic.label;" value="-moz-arabic-indic"/>
                  <menuitem label="&persian.label;" value="-moz-persian"/>
                  <menuitem label="&urdu.label;" value="-moz-urdu"/>
                  <menuseparator/>
	                <menuitem label="&bengali.label;" value="-mozbengali"/>
	                <menuitem label="&devanagari.label;" value="-moz-devanagari"/>
	                <menuitem label="&gujarati.label;" value="-moz-gujarati"/>
	                <menuitem label="&gurmukhi.label;" value="-moz-gurmukhi"/>
	                <menuitem label="&kannada.label;" value="-moz-kannada"/>
	                <menuitem label="&malayalam.label;" value="-moz-malayalam"/>
	                <menuitem label="&oriya.label;" value="-moz-oriya"/>
	                <menuitem label="&tamil.label;" value="-moz-tamil"/>
	                <menuitem label="&telugu.label;" value="-moz-telugu"/>
                  <menuseparator/>
                  <menuitem label="&ethiopicNumeric.label;" value="-moz-ethiopic-numeric"/>
                  <menuitem label="&ethiopicHalehameAmEt.label;" value="-moz-ethiopic-halehame-am"/>
                  <menuitem label="&ethiopicHalehameTiEr.label;" value="-moz-ethiopic-halehame-ti-er"/>
                  <menuitem label="&ethiopicHalehameTiEt.label;" value="-moz-ethiopic-halehame-ti-et"/>
                  <menuseparator/>
                  <menuitem label="&khmer.label;" value="-moz-khmer"/>
                  <menuitem label="&lao.label;" value="-moz-lao"/>
                  <menuitem label="&thai.label;" value="-moz-thai"/>
                  <menuitem label="&myanmar.label;" value="-moz-myanmar"/>
                  <menuseparator/>
                  <menuitem label="&hangul.label;" value="-moz-hangul"/>
                  <menuitem label="&hangulConsonant.label;" value="-moz-hangul-consonant"/>
                  <menuseparator/>
                  <menuitem label="&hiragana.label;" value="hiragana"/>
                  <menuitem label="&katakana.label;" value="katakana"/>
                  <menuitem label="&hiraganaIroha.label;" value="hiragana-iroha"/>
                  <menuitem label="&katakanaIroha.label;" value="katakana-iroha"/>
                  <menuitem label="&japaneseFormal.label;" value="-moz-japanese-formal"/>
                  <menuseparator/>
                  <menuitem label="&cjkIdeographic.label;" value="cjk-ideographic"/>
                  <menuitem label="&cjkIdeographicEarlyBranch.label;" value="-moz-cjk-earthly-branch"/>
                  <menuitem label="&cjkHeavenlyStem.label;" value="-moz-cjk-heavenly-stem"/>
                  <menuitem label="&simpChineseFormal.label;" value="-moz-simp-chinese-formal"/>
                  <menuitem label="&simpChineseInformal.label;" value="-moz-simp-chinese-informal"/>
                  <menuitem label="&tradChineseFormal.label;" value="-moz-trad-chinese-formal"/>
                  <menuitem label="&tradChineseInormal.label;" value="-moz-trad-chinese-informal"/>
	              </menupopup>
	            </menulist>
            </row>

            <row align="center">
              <label value="&listStylePosition.label;"/>
              <hbox align="center">
                <toolbarbutton class="multibutton" label="&insideListStylePosition.label;" value="inside" property="list-style-position" type="checkbox"
                               id="insideListStylePositionButton" group="list-style-position"
                               oncommand="ToggleProperty(this)"/>
                <toolbarbutton class="multibutton" label="&outsideListStylePosition.label;" value="outside" property="list-style-position" type="checkbox"
                               id="outsideListStylePositionButton" group="list-style-position"
                               oncommand="ToggleProperty(this)"/>
              </hbox>
            </row>

            <row align="center">
              <label value="&listStyleImage.label;"/>
			        <hbox align="center">
			          <textbox flex="1" id="listStyleImageURLTextbox"
			                   oninput="LoadListStyleImage()"/>
			          <filepickerbutton id="listStyleImageURLFilepickerbutton"
			                            control="listStyleImageURLTextbox"
			                            mode="0"
			                            filters="filterImages"
			                            oncommand="LoadListStyleImage();"
			                            title="&selectImageButton.label;"/>
			        </hbox>
            </row>
          </rows>
        </grid>
      </vbox>