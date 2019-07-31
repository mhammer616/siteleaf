"use strict";var aria=aria||{};aria.Utils=aria.Utils||{},aria.KeyCode={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46},aria.Utils=aria.Utils||{},aria.Utils.matches=function(e,t){return Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var a=e.parentNode.querySelectorAll(t),i=a.length;--i>=0&&a.item(i)!==this;);return i>-1}),e.matches(t)},aria.Utils.remove=function(e){return e.remove&&"function"==typeof e.remove?e.remove():!(!e.parentNode||!e.parentNode.removeChild||"function"!=typeof e.parentNode.removeChild)&&e.parentNode.removeChild(e)},aria.Utils.isFocusable=function(e){if(e.tabIndex>0||0===e.tabIndex&&null!==e.getAttribute("tabIndex"))return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&"ignore"!=e.rel;case"INPUT":return"hidden"!=e.type&&"file"!=e.type;case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},aria.Utils.getAncestorBySelector=function(e,t){if(!aria.Utils.matches(e,t+" "+e.tagName))return null;for(var a=e,i=null;null===i;)aria.Utils.matches(a.parentNode,t)?i=a.parentNode:a=a.parentNode;return i},aria.Utils.hasClass=function(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)},aria.Utils.addClass=function(e,t){aria.Utils.hasClass(e,t)||(e.className+=" "+t)},aria.Utils.removeClass=function(e,t){var a=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(a," ").trim()},aria.Utils.IgnoreUtilFocusChanges=!1,aria.Utils.dialogOpenClass="has-dialog",aria.Utils.focusFirstDescendant=function(e){for(var t=0;t<e.childNodes.length;t++){var a=e.childNodes[t];if(aria.Utils.attemptFocus(a)||aria.Utils.focusFirstDescendant(a))return!0}return!1},aria.Utils.focusLastDescendant=function(e){for(var t=e.childNodes.length-1;t>=0;t--){var a=e.childNodes[t];if(aria.Utils.attemptFocus(a)||aria.Utils.focusLastDescendant(a))return!0}return!1},aria.Utils.attemptFocus=function(e){if(!aria.Utils.isFocusable(e))return!1;aria.Utils.IgnoreUtilFocusChanges=!0;try{e.focus()}catch(e){}return aria.Utils.IgnoreUtilFocusChanges=!1,document.activeElement===e},aria.OpenDialogList=aria.OpenDialogList||new Array(0),aria.getCurrentDialog=function(){if(aria.OpenDialogList&&aria.OpenDialogList.length)return aria.OpenDialogList[aria.OpenDialogList.length-1]},aria.closeCurrentDialog=function(){var e=aria.getCurrentDialog();return!!e&&(e.close(),!0)},aria.handleEscape=function(e){(e.which||e.keyCode)===aria.KeyCode.ESC&&aria.closeCurrentDialog()&&e.stopPropagation()},document.addEventListener("keyup",aria.handleEscape),aria.Dialog=function(e,t,a){this.dialogNode=document.getElementById(e);var i=this.dialogNode.getAttribute("role");if(null===this.dialogNode||!["dialog","alertdialog"].includes(i))throw new Error("Dialog() requires a DOM element with ARIA role of dialog or alertdialog.");var o="dialog-backdrop";if(this.dialogNode.parentNode.classList.contains(o)?this.backdropNode=this.dialogNode.parentNode:(this.backdropNode=document.createElement("div"),this.backdropNode.className=o,this.dialogNode.parentNode.insertBefore(this.backdropNode,this.dialogNode),this.backdropNode.appendChild(this.dialogNode)),this.backdropNode.classList.add("active"),document.body.classList.add(aria.Utils.dialogOpenClass),"string"==typeof t)this.focusAfterClosed=document.getElementById(t);else{if("object"!=typeof t)throw new Error("the focusAfterClosed parameter is required for the aria.Dialog constructor.");this.focusAfterClosed=t}this.focusFirst="string"==typeof a?document.getElementById(a):"object"==typeof a?a:null;var r=document.createElement("div");this.preNode=this.dialogNode.parentNode.insertBefore(r,this.dialogNode),this.preNode.tabIndex=0;var s=document.createElement("div");this.postNode=this.dialogNode.parentNode.insertBefore(s,this.dialogNode.nextSibling),this.postNode.tabIndex=0,aria.OpenDialogList.length>0&&aria.getCurrentDialog().removeListeners(),this.addListeners(),aria.OpenDialogList.push(this),this.clearDialog(),this.dialogNode.classList.remove("hidden"),this.focusFirst?this.focusFirst.focus():aria.Utils.focusFirstDescendant(this.dialogNode),this.lastFocus=document.activeElement},aria.Dialog.prototype.clearDialog=function(){Array.prototype.map.call(this.dialogNode.querySelectorAll("input"),function(e){e.value=""})},aria.Dialog.prototype.close=function(){aria.OpenDialogList.pop(),this.removeListeners(),aria.Utils.remove(this.preNode),aria.Utils.remove(this.postNode),this.dialogNode.classList.add("hidden"),this.backdropNode.classList.remove("active"),this.focusAfterClosed.focus(),aria.OpenDialogList.length>0?aria.getCurrentDialog().addListeners():document.body.classList.remove(aria.Utils.dialogOpenClass)},aria.Dialog.prototype.replace=function(e,t,a){aria.getCurrentDialog(),aria.OpenDialogList.pop(),this.removeListeners(),aria.Utils.remove(this.preNode),aria.Utils.remove(this.postNode),this.dialogNode.classList.add("hidden"),this.backdropNode.classList.remove("active");var i=t||this.focusAfterClosed;new aria.Dialog(e,i,a)},aria.Dialog.prototype.addListeners=function(){document.addEventListener("focus",this.trapFocus,!0)},aria.Dialog.prototype.removeListeners=function(){document.removeEventListener("focus",this.trapFocus,!0)},aria.Dialog.prototype.trapFocus=function(e){if(!aria.Utils.IgnoreUtilFocusChanges){var t=aria.getCurrentDialog();t.dialogNode.contains(e.target)?t.lastFocus=e.target:(aria.Utils.focusFirstDescendant(t.dialogNode),t.lastFocus==document.activeElement&&aria.Utils.focusLastDescendant(t.dialogNode),t.lastFocus=document.activeElement)}},window.openDialog=function(e,t,a){new aria.Dialog(e,t,a)},window.closeDialog=function(e){var t=aria.getCurrentDialog();t.dialogNode.contains(e)&&t.close()},window.replaceDialog=function(e,t,a){var i=aria.getCurrentDialog();i.dialogNode.contains(document.activeElement)&&i.replace(e,t,a)};