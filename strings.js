function getStrings(lang) {
  if (lang=='es') {
    return es;
  } else {
    return en;
  }
}

//returns defaults if not localized
var en = { menuMain:"Menu >",
           menuFile:"File >",
           menuLoad:"Open a file",
           menuSave:"Save current edits",
           menuNewFile:"Create a new file",
           menuNewRow:"Add a new row",
           itemLabelFind:"Find:",
           itemLabelReplace:"Replace:",
           itemLabelType:"Type:",
           itemLabelStatus:"Status:",
           optionTypePlaintext:"Plain text",
           optionTypeRegex:"Regular expression",
           optionStatusEnabled:"Enabled",
           optionStatusDisabled:"Disabled"
};

var es = { menuMain:"Menu >",
           menuFile:"Archivo >",
           menuLoad:"Abrir un archivo",
           menuSave:"Guardar modificaciones",
           menuNewFile:"Crear un archivo nuevo",
           menuNewRow:"Insertar una fila nueva",
           itemLabelFind:"Buscar:",
           itemLabelReplace:"Reemplazar:",
           itemLabelType:"Tipo:",
           itemLabelStatus:"Estado:",
           optionTypePlaintext:"Texto simple",
           optionTypeRegex:"Expresión regular",
           optionStatusEnabled:"Activado",
           optionStatusDisabled:"Desactivado"
};