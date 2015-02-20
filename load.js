//TODO: prompt when loading or creating new to save any unsaved changes
//TODO: style the menu for desktop and mobile
//TODO: style the row buttons for mobile
//TODO: put an initial text on the page

var filename;
var strings;

function encodeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function changeEnabledStatus(sender) {
	var li = sender.parentNode.parentNode.parentNode; /*the li is the great-grandparent*/
	if (li.classList.contains('enabled-true')) {
	  li.className=li.className.replace('true', 'false');
	} else if (li.classList.contains('enabled-false')) {
	  li.className=li.className.replace('false', 'true');
	}
	
}

function menuToggle(sender) {
  var siblingMenuNodes = sender.parentNode.children;
  for(i=0; i<siblingMenuNodes.length; i++) {
	if(siblingMenuNodes[i].classList.contains('menu-closed')) {
	  siblingMenuNodes[i].className=siblingMenuNodes[i].className.replace('closed', 'open');
	} else if(siblingMenuNodes[i].classList.contains('menu-open')) {
	  siblingMenuNodes[i].className=siblingMenuNodes[i].className.replace('open', 'closed');
	}
  }
}

function menuClose() {
  var mainNode = document.getElementsByClassName('menu-level-0')[0];
	var childElements = mainNode.children;
	for(i=0; i<childElements.length; i++) {
	  if(childElements[i].classList.contains('menu-node')) {
	    childElements[i].className=childElements[i].className.replace('open', 'closed');
	  }
	}
}

window.onload = function(){
  var userLang = navigator.language || navigator.userLanguage; 
    var lang = userLang.substring(0,2);
    strings = getStrings(lang);
    localizeMenuStrings();
  
}

function localizeMenuStrings () {
  
  document.getElementById('menu-label-main').innerText = strings.menuMain;
  document.getElementById('menu-label-file').innerText = strings.menuFile;
  document.getElementById('menu-label-load').innerText = strings.menuLoad;
  document.getElementById('menu-label-save').innerText = strings.menuSave;
  document.getElementById('menu-label-newfile').innerText = strings.menuNewFile;
  document.getElementById('menu-label-newrow').innerText = strings.menuNewRow;
}

function toggleMenuButton() {
  var menuDiv = document.getElementsByClassName('dropdown')[0];
  var className = menuDiv.className;
  if (className=='dropdown') {
    menuDiv.className = 'dropdown open';
  } else {
    menuDiv.className = 'dropdown';
  }
}


function doDelete(sender) {
  var li = sender.parentNode.parentNode.parentNode;
  li.parentNode.removeChild(li); /*delete the li element from the list*/
}

function doMoveUp(sender) {
  var li = sender.parentNode.parentNode.parentNode;
  var ol = li.parentNode;
  var prevSib = li.previousElementSibling;
  if(prevSib) {
    ol.insertBefore(li, prevSib);
  }
}


function doMoveDown(sender) {
  var li = sender.parentNode.parentNode.parentNode;
  var ol = li.parentNode;
  var nextSib = li.nextElementSibling;
  if(nextSib) {
    ol.insertBefore(nextSib, li);
  }
}

function createNewFile() {
  var listElement = document.getElementById("main-listview");
  listElement.innerHTML = '';/*clear first to load new*/
  document.getElementById("list-file-name").innerHTML = ''; /*what to do here???*/
  addNewRow();
}

function addNewRow() {
  var header='<?xml version="1.0" encoding="utf-8"?>\r\n<EditCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n  <Items>\r\n    ';
  var content = '<EditItem Enabled="true" EditItemType="regular_expression">\r\n  ' +
  '<FindText></FindText>\r\n  <ReplaceText></ReplaceText>\r\n</EditItem>';
  var footer = '\r\n  </Items>\r\n</EditCollection>';
  var result = getResult(header+content+footer);
  document.getElementById("main-listview").appendChild(result);
  
}


function saveEditedFile() {
  /*error handling to check for empty values in find and replace text...MB allow it in replace???...or mb allow altogether???*/
  /*mb something like open/load/download a blank template???*/
  
  var filename = document.getElementById("list-file-name").innerHTML; 

  var header = '<?xml version="1.0" encoding="utf-8"?>\r\n<EditCollection>\r\n  <Items>\r\n    ';
  var footer = '\r\n  </Items>\r\n</EditCollection>';
  var records = document.getElementsByClassName('record');
  var content = '';
  for (i = 0; i < records.length; i++) {
    var listindex = i+1;
	var findElement = records[i].querySelectorAll('.find-text-input')[0];
	var findText = findElement.value;
	findText = encodeHtml(findText);
    var replaceElement = records[i].querySelectorAll('.replace-text-input')[0];
    var replaceText = replaceElement.value;
    replaceText = encodeHtml(replaceText);
	var typeElement = records[i].querySelectorAll('.replace-type-combo')[0];
	var typeText = typeElement.options[typeElement.selectedIndex].value;
    var enabledElement = records[i].querySelectorAll('.replace-enabled-combo')[0];
	var enabledText = enabledElement.options[enabledElement.selectedIndex].value;
	content += '<EditItem Enabled="'+ enabledText +'" EditItemType="'+ typeText +'">\r\n      ';
    content += '<FindText>'+ findText +'</FindText>\r\n      ';
    content += '<ReplaceText>'+ replaceText +'</ReplaceText>\r\n    </EditItem>';
	if(i < records.length-1) content += '\r\n    '; /*only add the ending if not on the last one*/
  }
  
  var filetext = header + content + footer;
  var data = new Blob([filetext]);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.href = URL.createObjectURL(data);
  a.style = "display: none";
  a.download = filename;
  a.click();
  
}

function loadSingleXmlFile() {
  var fileInputElement = document.getElementById('file-to-upload');
  var file = fileInputElement.files[0];
  filename = file.name;
  
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    var result = getResult(contents);
    var listElement = document.getElementById("main-listview");
    listElement.innerHTML = '';/*clear first to load new*/
    listElement.appendChild(result);
    document.getElementById("list-file-name").innerHTML = filename;
    fileInputElement.value = null; /*have to clear the value of the file input or the onchange never fires again*/
  };
  reader.readAsText(file);
  
}


/*works in Chrome, not IE, not sure about FF*/
function getResult(xml)
{

  var xsl = getXsl();
  parser=new DOMParser();
  xslDoc=parser.parseFromString(xsl,"text/xml");
  xmlDoc=parser.parseFromString(xml,"text/xml");
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xslDoc);
  resultDocument = xsltProcessor.transformToFragment(xmlDoc, document); 
  
  /*localize result here..*/
  var findLabels = resultDocument.querySelectorAll('.label-find');
  var replaceLabels = resultDocument.querySelectorAll('.label-replace');
  var typeLabels = resultDocument.querySelectorAll('.label-type');
  var statusLabels = resultDocument.querySelectorAll('.label-status');
  var typeOptionsRegex = resultDocument.querySelectorAll('.option-regex');
  var typeOptionsPlaintext = resultDocument.querySelectorAll('.option-plaintext');
  var statusOptionsEnabled = resultDocument.querySelectorAll('.option-enabled');
  var statusOptionsDisabled = resultDocument.querySelectorAll('.option-disabled');
  for (i=0; i<findLabels.length; i++) {
    findLabels[i].innerText = strings.itemLabelFind;
    replaceLabels[i].innerText = strings.itemLabelReplace;
    typeLabels[i].innerText = strings.itemLabelType;
    statusLabels[i].innerText = strings.itemLabelStatus;
    typeOptionsRegex[i].innerText = strings.optionTypeRegex;
    typeOptionsPlaintext[i].innerText = strings.optionTypePlaintext;
    statusOptionsEnabled[i].innerText = strings.optionStatusEnabled;
    statusOptionsDisabled[i].innerText = strings.optionStatusDisabled;
  }
  return resultDocument;
  
}

