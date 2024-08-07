(()=>{var t={3867:(t,e,n)=>{var o,i,r,s,a,l,d=n(9567);
/*! jquery.tablednd.js 20-11-2020 */o=d,i=window,r=window.document,s="touchstart mousedown",a="touchmove mousemove",l="touchend mouseup",o(r).ready((function(){function t(t){for(var e={},n=t.match(/([^;:]+)/g)||[];n.length;)e[n.shift()]=n.shift().trim();return e}o("table").each((function(){"dnd"===o(this).data("table")&&o(this).tableDnD({onDragStyle:o(this).data("ondragstyle")&&t(o(this).data("ondragstyle"))||null,onDropStyle:o(this).data("ondropstyle")&&t(o(this).data("ondropstyle"))||null,onDragClass:void 0===o(this).data("ondragclass")?"tDnD_whileDrag":o(this).data("ondragclass"),onDrop:o(this).data("ondrop")&&new Function("table","row",o(this).data("ondrop")),onDragStart:o(this).data("ondragstart")&&new Function("table","row",o(this).data("ondragstart")),onDragStop:o(this).data("ondragstop")&&new Function("table","row",o(this).data("ondragstop")),scrollAmount:o(this).data("scrollamount")||5,sensitivity:o(this).data("sensitivity")||10,hierarchyLevel:o(this).data("hierarchylevel")||0,indentArtifact:o(this).data("indentartifact")||'<div class="indent">&nbsp;</div>',autoWidthAdjust:o(this).data("autowidthadjust")||!0,autoCleanRelations:o(this).data("autocleanrelations")||!0,jsonPretifySeparator:o(this).data("jsonpretifyseparator")||"\t",serializeRegexp:o(this).data("serializeregexp")&&new RegExp(o(this).data("serializeregexp"))||/[^\-]*$/,serializeParamName:o(this).data("serializeparamname")||!1,dragHandle:o(this).data("draghandle")||null})}))})),d.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldX:0,oldY:0,build:function(t){return this.each((function(){this.tableDnDConfig=o.extend({onDragStyle:null,onDropStyle:null,onDragClass:"tDnD_whileDrag",onDrop:null,onDragStart:null,onDragStop:null,scrollAmount:5,sensitivity:10,hierarchyLevel:0,indentArtifact:'<div class="indent">&nbsp;</div>',autoWidthAdjust:!0,autoCleanRelations:!0,jsonPretifySeparator:"\t",serializeRegexp:/[^\-]*$/,serializeParamName:!1,dragHandle:null},t||{}),o.tableDnD.makeDraggable(this),this.tableDnDConfig.hierarchyLevel&&o.tableDnD.makeIndented(this)})),this},makeIndented:function(t){var e,n,i=t.tableDnDConfig,r=t.rows,s=o(r).first().find("td:first")[0],a=0,l=0;if(o(t).hasClass("indtd"))return null;n=o(t).addClass("indtd").attr("style"),o(t).css({whiteSpace:"nowrap"});for(var d=0;d<r.length;d++)l<o(r[d]).find("td:first").text().length&&(l=o(r[d]).find("td:first").text().length,e=d);for(o(s).css({width:"auto"}),d=0;d<i.hierarchyLevel;d++)o(r[e]).find("td:first").prepend(i.indentArtifact);for(s&&o(s).css({width:s.offsetWidth}),n&&o(t).css(n),d=0;d<i.hierarchyLevel;d++)o(r[e]).find("td:first").children(":first").remove();return i.hierarchyLevel&&o(r).each((function(){(a=o(this).data("level")||0)<=i.hierarchyLevel&&o(this).data("level",a)||o(this).data("level",0);for(var t=0;t<o(this).data("level");t++)o(this).find("td:first").prepend(i.indentArtifact)})),this},makeDraggable:function(t){var e=t.tableDnDConfig;e.dragHandle&&o(e.dragHandle,t).each((function(){o(this).bind(s,(function(n){return o.tableDnD.initialiseDrag(o(this).parents("tr")[0],t,this,n,e),!1}))}))||o(t.rows).each((function(){o(this).hasClass("nodrag")?o(this).css("cursor",""):o(this).bind(s,(function(n){if("TD"===n.target.tagName)return o.tableDnD.initialiseDrag(this,t,this,n,e),!1})).css("cursor","move")}))},currentOrder:function(){var t=this.currentTable.rows;return o.map(t,(function(t){return(o(t).data("level")+t.id).replace(/\s/g,"")})).join("")},initialiseDrag:function(t,e,n,i,s){this.dragObject=t,this.currentTable=e,this.mouseOffset=this.getMouseOffset(n,i),this.originalOrder=this.currentOrder(),o(r).bind(a,this.mousemove).bind(l,this.mouseup),s.onDragStart&&s.onDragStart(e,n)},updateTables:function(){this.each((function(){this.tableDnDConfig&&o.tableDnD.makeDraggable(this)}))},mouseCoords:function(t){return t.originalEvent.changedTouches?{x:t.originalEvent.changedTouches[0].clientX,y:t.originalEvent.changedTouches[0].clientY}:t.pageX||t.pageY?{x:t.pageX,y:t.pageY}:{x:t.clientX+r.body.scrollLeft-r.body.clientLeft,y:t.clientY+r.body.scrollTop-r.body.clientTop}},getMouseOffset:function(t,e){var n,o;return e=e||i.event,o=this.getPosition(t),{x:(n=this.mouseCoords(e)).x-o.x,y:n.y-o.y}},getPosition:function(t){for(var e=0,n=0;t.offsetParent;)e+=t.offsetLeft,n+=t.offsetTop,t=t.offsetParent;return{x:e+=t.offsetLeft,y:n+=t.offsetTop}},autoScroll:function(t){var e=this.currentTable.tableDnDConfig,n=i.pageYOffset,o=i.innerHeight?i.innerHeight:r.documentElement.clientHeight?r.documentElement.clientHeight:r.body.clientHeight;r.all&&(void 0!==r.compatMode&&"BackCompat"!==r.compatMode?n=r.documentElement.scrollTop:void 0!==r.body&&(n=r.body.scrollTop)),t.y-n<e.scrollAmount&&i.scrollBy(0,-e.scrollAmount)||o-(t.y-n)<e.scrollAmount&&i.scrollBy(0,e.scrollAmount)},moveVerticle:function(t,e){0!==t.vertical&&e&&this.dragObject!==e&&this.dragObject.parentNode===e.parentNode&&(0>t.vertical&&this.dragObject.parentNode.insertBefore(this.dragObject,e.nextSibling)||0<t.vertical&&this.dragObject.parentNode.insertBefore(this.dragObject,e))},moveHorizontal:function(t,e){var n,i=this.currentTable.tableDnDConfig;if(!i.hierarchyLevel||0===t.horizontal||!e||this.dragObject!==e)return null;n=o(e).data("level"),0<t.horizontal&&n>0&&o(e).find("td:first").children(":first").remove()&&o(e).data("level",--n),0>t.horizontal&&n<i.hierarchyLevel&&o(e).prev().data("level")>=n&&o(e).children(":first").prepend(i.indentArtifact)&&o(e).data("level",++n)},mousemove:function(t){var e,n,i,r,s,a=o(o.tableDnD.dragObject),l=o.tableDnD.currentTable.tableDnDConfig;return t&&t.preventDefault(),!!o.tableDnD.dragObject&&("touchmove"===t.type&&event.preventDefault(),l.onDragClass&&a.addClass(l.onDragClass)||a.css(l.onDragStyle),r=(n=o.tableDnD.mouseCoords(t)).x-o.tableDnD.mouseOffset.x,s=n.y-o.tableDnD.mouseOffset.y,o.tableDnD.autoScroll(n),e=o.tableDnD.findDropTargetRow(a,s),i=o.tableDnD.findDragDirection(r,s),o.tableDnD.moveVerticle(i,e),o.tableDnD.moveHorizontal(i,e),!1)},findDragDirection:function(t,e){var n=this.currentTable.tableDnDConfig.sensitivity,o=this.oldX,i=this.oldY,r={horizontal:t>=o-n&&t<=o+n?0:t>o?-1:1,vertical:e>=i-n&&e<=i+n?0:e>i?-1:1};return 0!==r.horizontal&&(this.oldX=t),0!==r.vertical&&(this.oldY=e),r},findDropTargetRow:function(t,e){for(var n=0,i=this.currentTable.rows,r=this.currentTable.tableDnDConfig,s=0,a=null,l=0;l<i.length;l++)if(a=i[l],s=this.getPosition(a).y,n=parseInt(a.offsetHeight)/2,0===a.offsetHeight&&(s=this.getPosition(a.firstChild).y,n=parseInt(a.firstChild.offsetHeight)/2),e>s-n&&e<s+n)return t.is(a)||r.onAllowDrop&&!r.onAllowDrop(t,a)||o(a).hasClass("nodrop")?null:a;return null},processMouseup:function(){if(!this.currentTable||!this.dragObject)return null;var t=this.currentTable.tableDnDConfig,e=this.dragObject,n=0,i=0;o(r).unbind(a,this.mousemove).unbind(l,this.mouseup),t.hierarchyLevel&&t.autoCleanRelations&&o(this.currentTable.rows).first().find("td:first").children().each((function(){(i=o(this).parents("tr:first").data("level"))&&o(this).parents("tr:first").data("level",--i)&&o(this).remove()}))&&t.hierarchyLevel>1&&o(this.currentTable.rows).each((function(){if((i=o(this).data("level"))>1)for(n=o(this).prev().data("level");i>n+1;)o(this).find("td:first").children(":first").remove(),o(this).data("level",--i)})),t.onDragClass&&o(e).removeClass(t.onDragClass)||o(e).css(t.onDropStyle),this.dragObject=null,t.onDrop&&this.originalOrder!==this.currentOrder()&&o(e).hide().fadeIn("fast")&&t.onDrop(this.currentTable,e),t.onDragStop&&t.onDragStop(this.currentTable,e),this.currentTable=null},mouseup:function(t){return t&&t.preventDefault(),o.tableDnD.processMouseup(),!1},jsonize:function(t){var e=this.currentTable;return t?JSON.stringify(this.tableData(e),null,e.tableDnDConfig.jsonPretifySeparator):JSON.stringify(this.tableData(e))},serialize:function(){return o.param(this.tableData(this.currentTable))},serializeTable:function(t){for(var e="",n=t.tableDnDConfig.serializeParamName||t.id,o=t.rows,i=0;i<o.length;i++){e.length>0&&(e+="&");var r=o[i].id;r&&t.tableDnDConfig&&t.tableDnDConfig.serializeRegexp&&(e+=n+"[]="+(r=r.match(t.tableDnDConfig.serializeRegexp)[0]))}return e},serializeTables:function(){var t=[];return o("table").each((function(){this.id&&t.push(o.param(o.tableDnD.tableData(this)))})),t.join("&")},tableData:function(t){var e,n,i,r,s=t.tableDnDConfig,a=[],l=0,d=0,c=null,h={};if(t||(t=this.currentTable),!t||!t.rows||!t.rows.length)return{error:{code:500,message:"Not a valid table."}};if(!t.id&&!s.serializeParamName)return{error:{code:500,message:"No serializable unique id provided."}};r=s.autoCleanRelations&&t.rows||o.makeArray(t.rows),e=function(t){return t&&s&&s.serializeRegexp?t.match(s.serializeRegexp)[0]:t},h[i=n=s.serializeParamName||t.id]=[],!s.autoCleanRelations&&o(r[0]).data("level")&&r.unshift({id:"undefined"});for(var u=0;u<r.length;u++)if(s.hierarchyLevel){if(0===(d=o(r[u]).data("level")||0))i=n,a=[];else if(d>l)a.push([i,l]),i=e(r[u-1].id);else if(d<l)for(var f=0;f<a.length;f++)a[f][1]===d&&(i=a[f][0]),a[f][1]>=l&&(a[f][1]=0);l=d,o.isArray(h[i])||(h[i]=[]),(c=e(r[u].id))&&h[i].push(c)}else(c=e(r[u].id))&&h[i].push(c);return h}},d.fn.extend({tableDnD:o.tableDnD.build,tableDnDUpdate:o.tableDnD.updateTables,tableDnDSerialize:o.proxy(o.tableDnD.serialize,o.tableDnD),tableDnDSerializeAll:o.tableDnD.serializeTables,tableDnDData:o.proxy(o.tableDnD.tableData,o.tableDnD)})},9567:t=>{"use strict";t.exports=window.jQuery}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={exports:{}};return t[o](r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};(()=>{"use strict";n.r(o);
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */const t={deleteCategories:".js-delete-categories-bulk-action",deleteCategoriesModal:t=>`#${t}_grid_delete_categories_modal`,checkedCheckbox:".js-bulk-action-checkbox:checked",deleteCustomers:".js-delete-customers-bulk-action",deleteCustomerModal:t=>`#${t}_grid_delete_customers_modal`,submitDeleteCategories:".js-submit-delete-categories",submitDeleteCustomers:".js-submit-delete-customers",categoriesToDelete:"#delete_categories_categories_to_delete",customersToDelete:"#delete_customers_customers_to_delete",actionSelectAll:".js-bulk-action-select-all",bulkActionCheckbox:".js-bulk-action-checkbox",bulkActionBtn:".js-bulk-actions-btn",openTabsBtn:".js-bulk-action-btn.open_tabs",tableChoiceOptions:"table.table .js-choice-options",choiceOptions:".js-choice-options",modalFormSubmitBtn:".js-bulk-modal-form-submit-btn",submitAction:".js-bulk-action-submit-btn",ajaxAction:".js-bulk-action-ajax-btn",gridSubmitAction:".js-grid-action-submit-btn"},e={categoryDeleteAction:".js-delete-category-row-action",customerDeleteAction:".js-delete-customer-row-action",linkRowAction:".js-link-row-action",linkRowActionClickableFirst:".js-link-row-action[data-clickable-row=1]:first",clickableTd:"td.clickable",imageTypeDeleteAction:".js-delete-image-type-row-action",deleteImageTypeModal:t=>`#${t}_grid_delete_image_type_modal`,submitDeleteImageType:".js-submit-delete-image-type"},i={showQuery:".js-common_show_query-grid-action",exportQuery:".js-common_export_sql_manager-grid-action",showModalForm:t=>`#${t}_common_show_query_modal_form`,showModalGrid:t=>`#${t}_grid_common_show_query_modal`,modalFormSubmitBtn:".js-bulk-modal-form-submit-btn",submitModalFormBtn:".js-submit-modal-form-btn",bulkInputsBlock:t=>`#${t}`,tokenInput:t=>`input[name="${t}[_token]"]`,ajaxBulkActionConfirmModal:(t,e)=>`${t}-ajax-${e}-confirm-modal`,ajaxBulkActionProgressModal:(t,e)=>`${t}-ajax-${e}-progress-modal`},r=t=>`${t}-grid-confirm-modal`,s=".js-grid-table",a=".js-drag-handle",l="js-drag-handle",d=t=>`#${t}_grid`,c=".js-grid-panel",h=".js-grid-header",u=t=>`.js-grid-table .js-${t}-position`,f=t=>`.js-${t}-position:first`,m="table.table",b=".header-toolbar",p=".breadcrumb-item",g=".js-reset-search",v=".column-filters",w=".grid-search-button",y=".grid-reset-button",D="input:not(.js-bulk-action-select-all), select",_=".js-common_refresh_list-grid-action",C=t=>`#${t}_filter_form`,k="position-row-while-drag",x=".btn-sql-submit",{$:O}=window;class T{constructor(t){this.id=t,this.$container=O(d(this.id))}getId(){return this.id}getContainer(){return this.$container}getHeaderContainer(){return this.$container.closest(c).find(h)}addExtension(t){t.extend(this)}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:j}=window;const E=class{constructor(t){var e;this.selector=".ps-sortable-column",this.idTable=null!=(e=t.attr("id"))?e:"",this.columns=t.find(this.selector)}attach(){this.columns.on("click",(t=>{const e=j(t.delegateTarget);this.sortByColumn(e,this.getToggledSortDirection(e))}))}sortBy(t,e){if(!this.columns.is(`[data-sort-col-name="${t}"]`))throw new Error(`Cannot sort by "${t}": invalid column`);this.sortByColumn(this.columns,e)}sortByColumn(t,e){window.location.href=this.getUrl(t.data("sortColName"),"desc"===e?"desc":"asc",t.data("sortPrefix"))}getToggledSortDirection(t){return"asc"===t.data("sortDirection")?"desc":"asc"}getUrl(t,e,n){const o=new URL(window.location.href),i=o.searchParams;return n?(i.set(`${n}[orderBy]`,t),i.set(`${n}[sortOrder]`,e)):(i.set("orderBy",t),i.set("sortOrder",e)),o.hash=this.idTable,o.toString()}};
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
class A{extend(t){const e=t.getContainer().find(m);new E(e).attach()}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:B}=window,S=function(t,e){B.post(t).then((()=>window.location.assign(e)))},{$:M}=window;class L{extend(t){t.getContainer().on("click",g,(t=>{S(M(t.currentTarget).data("url"),M(t.currentTarget).data("redirect"))}))}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
class P{extend(t){t.getHeaderContainer().on("click",_,(()=>{window.location.reload()}))}}var $=n(9567),R=Object.defineProperty,I=Object.getOwnPropertySymbols,z=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,F=(t,e,n)=>e in t?R(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,N=(t,e)=>{for(var n in e||(e={}))z.call(e,n)&&F(t,n,e[n]);if(I)for(var n of I(e))H.call(e,n)&&F(t,n,e[n]);return t};
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
class q{constructor(t){const e=N({id:"confirm-modal",closable:!1},t);this.buildModalContainer(e)}buildModalContainer(t){this.container=document.createElement("div"),this.container.classList.add("modal","fade"),this.container.id=t.id,this.dialog=document.createElement("div"),this.dialog.classList.add("modal-dialog"),t.dialogStyle&&Object.keys(t.dialogStyle).forEach((e=>{this.dialog.style[e]=t.dialogStyle[e]})),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.message=document.createElement("p"),this.message.classList.add("modal-message"),this.header=document.createElement("div"),this.header.classList.add("modal-header"),t.modalTitle&&(this.title=document.createElement("h4"),this.title.classList.add("modal-title"),this.title.innerHTML=t.modalTitle),this.closeIcon=document.createElement("button"),this.closeIcon.classList.add("close"),this.closeIcon.setAttribute("type","button"),this.closeIcon.dataset.dismiss="modal",this.closeIcon.innerHTML="×",this.body=document.createElement("div"),this.body.classList.add("modal-body","text-left","font-weight-normal"),this.title&&this.header.appendChild(this.title),this.header.appendChild(this.closeIcon),this.content.append(this.header,this.body),this.body.appendChild(this.message),this.dialog.appendChild(this.content),this.container.appendChild(this.dialog)}}class G{constructor(t){const e=N({id:"confirm-modal",closable:!1,dialogStyle:{}},t);this.initContainer(e)}initContainer(t){this.modal||(this.modal=new q(t)),this.$modal=$(this.modal.container);const{id:e,closable:n}=t;this.$modal.modal({backdrop:!!n||"static",keyboard:void 0===n||n,show:!1}),this.$modal.on("hidden.bs.modal",(()=>{const n=document.querySelector(`#${e}`);n&&n.remove(),t.closeCallback&&t.closeCallback()})),document.body.appendChild(this.modal.container)}setTitle(t){return this.modal.title||(this.modal.title=document.createElement("h4"),this.modal.title.classList.add("modal-title"),this.modal.closeIcon?this.modal.header.insertBefore(this.modal.title,this.modal.closeIcon):this.modal.header.appendChild(this.modal.title)),this.modal.title.innerHTML=t,this}render(t){return this.modal.message.innerHTML=t,this}show(){return this.$modal.modal("show"),this}hide(){return this.$modal.modal("hide"),this.$modal.on("shown.bs.modal",(()=>{this.$modal.modal("hide"),this.$modal.off("shown.bs.modal")})),this}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
function W(t){return void 0===t}var Y=Object.defineProperty,Q=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable,U=(t,e,n)=>e in t?Y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
class J extends q{constructor(t){super(t)}buildModalContainer(t){super.buildModalContainer(t),this.message.classList.add("confirm-message"),this.message.innerHTML=t.confirmMessage,this.footer=document.createElement("div"),this.footer.classList.add("modal-footer"),this.closeButton=document.createElement("button"),this.closeButton.setAttribute("type","button"),this.closeButton.classList.add("btn","btn-outline-secondary","btn-lg"),this.closeButton.dataset.dismiss="modal",this.closeButton.innerHTML=t.closeButtonLabel,this.confirmButton=document.createElement("button"),this.confirmButton.setAttribute("type","button"),this.confirmButton.classList.add("btn",t.confirmButtonClass,"btn-lg","btn-confirm-submit"),this.confirmButton.dataset.dismiss="modal",this.confirmButton.innerHTML=t.confirmButtonLabel,this.footer.append(this.closeButton,...t.customButtons,this.confirmButton),this.content.append(this.footer)}}class K extends G{constructor(t,e,n){var o;let i;i=W(t.confirmCallback)?W(e)?()=>{console.error("No confirm callback provided for ConfirmModal component.")}:e:t.confirmCallback;super(((t,e)=>{for(var n in e||(e={}))X.call(e,n)&&U(t,n,e[n]);if(Q)for(var n of Q(e))V.call(e,n)&&U(t,n,e[n]);return t})({id:"confirm-modal",confirmMessage:"Are you sure?",closeButtonLabel:"Close",confirmButtonLabel:"Accept",confirmButtonClass:"btn-primary",customButtons:[],closable:!1,modalTitle:t.confirmTitle,dialogStyle:{},confirmCallback:i,closeCallback:null!=(o=t.closeCallback)?o:n},t))}initContainer(t){this.modal=new J(t),this.modal.confirmButton.addEventListener("click",t.confirmCallback),super.initContainer(t)}}var Z=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var n=-1;return t.some((function(t,o){return t[0]===e&&(n=o,!0)})),n}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var n=t(this.__entries__,e),o=this.__entries__[n];return o&&o[1]},e.prototype.set=function(e,n){var o=t(this.__entries__,e);~o?this.__entries__[o][1]=n:this.__entries__.push([e,n])},e.prototype.delete=function(e){var n=this.__entries__,o=t(n,e);~o&&n.splice(o,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,o=this.__entries__;n<o.length;n++){var i=o[n];t.call(e,i[1],i[0])}},e}()}(),tt="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,et=void 0!==n.g&&n.g.Math===Math?n.g:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),nt="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(et):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)};var ot=["top","right","bottom","left","width","height","size","weight"],it="undefined"!=typeof MutationObserver,rt=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var n=!1,o=!1,i=0;function r(){n&&(n=!1,t()),o&&a()}function s(){nt(r)}function a(){var t=Date.now();if(n){if(t-i<2)return;o=!0}else n=!0,o=!1,setTimeout(s,e);i=t}return a}(this.refresh.bind(this),20)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){tt&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),it?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){tt&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;ot.some((function(t){return!!~n.indexOf(t)}))&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),st=function(t,e){for(var n=0,o=Object.keys(e);n<o.length;n++){var i=o[n];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},at=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||et},lt=mt(0,0,0,0);function dt(t){return parseFloat(t)||0}function ct(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce((function(e,n){return e+dt(t["border-"+n+"-width"])}),0)}function ht(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return lt;var o=at(t).getComputedStyle(t),i=function(t){for(var e={},n=0,o=["top","right","bottom","left"];n<o.length;n++){var i=o[n],r=t["padding-"+i];e[i]=dt(r)}return e}(o),r=i.left+i.right,s=i.top+i.bottom,a=dt(o.width),l=dt(o.height);if("border-box"===o.boxSizing&&(Math.round(a+r)!==e&&(a-=ct(o,"left","right")+r),Math.round(l+s)!==n&&(l-=ct(o,"top","bottom")+s)),!function(t){return t===at(t).document.documentElement}(t)){var d=Math.round(a+r)-e,c=Math.round(l+s)-n;1!==Math.abs(d)&&(a-=d),1!==Math.abs(c)&&(l-=c)}return mt(i.left,i.top,a,l)}var ut="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof at(t).SVGGraphicsElement}:function(t){return t instanceof at(t).SVGElement&&"function"==typeof t.getBBox};function ft(t){return tt?ut(t)?function(t){var e=t.getBBox();return mt(0,0,e.width,e.height)}(t):ht(t):lt}function mt(t,e,n,o){return{x:t,y:e,width:n,height:o}}var bt=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=mt(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=ft(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),pt=function(t,e){var n,o,i,r,s,a,l,d=(o=(n=e).x,i=n.y,r=n.width,s=n.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,l=Object.create(a.prototype),st(l,{x:o,y:i,width:r,height:s,top:i,right:o+r,bottom:s+i,left:o}),l);st(this,{target:t,contentRect:d})},gt=function(){function t(t,e,n){if(this.activeObservations_=[],this.observations_=new Z,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof at(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new bt(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof at(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new pt(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),vt="undefined"!=typeof WeakMap?new WeakMap:new Z,wt=function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=rt.getInstance(),o=new gt(e,n,this);vt.set(this,o)};["observe","unobserve","disconnect"].forEach((function(t){wt.prototype[t]=function(){var e;return(e=vt.get(this))[t].apply(e,arguments)}}));void 0!==et.ResizeObserver&&et.ResizeObserver;const yt=class extends Event{constructor(t,e={}){super(yt.parentWindowEvent),this.eventName=t,this.eventParameters=e}get name(){return this.eventName}get parameters(){return this.eventParameters}};yt.parentWindowEvent="IframeClientEvent";Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */const Dt=K,{$:_t}=window;class Ct{extend(t){t.getContainer().on("click",".js-submit-row-action",(e=>{e.preventDefault();const n=_t(e.currentTarget),o=n.data("confirmMessage"),i=n.data("title"),r=n.data("method");if(i)this.showConfirmModal(n,t,o,i,r);else{if(o.length&&!window.confirm(o))return;this.postForm(n,r)}}))}postForm(t,e){const n=["GET","POST"].includes(e),o=_t("<form>",{action:t.data("url"),method:n?e:"POST"}).appendTo("body");n||o.append(_t("<input>",{type:"hidden",name:"_method",value:e})),o.submit()}showConfirmModal(t,e,n,o,i){const s=t.data("confirmButtonLabel"),a=t.data("closeButtonLabel"),l=t.data("confirmButtonClass");new K({id:r(e.getId()),confirmTitle:o,confirmMessage:n,confirmButtonLabel:s,closeButtonLabel:a,confirmButtonClass:l},(()=>this.postForm(t,i))).show()}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:kt}=window;class xt{extend(e){e.getContainer().on("click",t.submitAction,(t=>{this.submit(t,e)}))}submit(t,e){const n=kt(t.currentTarget),o=n.data("confirm-message"),i=n.data("confirmTitle");void 0!==o&&o.length>0?void 0!==i?this.showConfirmModal(n,e,o,i):window.confirm(o)&&this.postForm(n,e):this.postForm(n,e)}showConfirmModal(t,e,n,o){const i=t.data("confirmButtonLabel"),s=t.data("closeButtonLabel"),a=t.data("confirmButtonClass");new Dt({id:r(e.getId()),confirmTitle:o,confirmMessage:n,confirmButtonLabel:i,closeButtonLabel:s,confirmButtonClass:a},(()=>this.postForm(t,e))).show()}postForm(t,e){const n=kt(C(e.getId()));n.attr("action",t.data("form-url")),n.attr("method",t.data("form-method")),n.submit()}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:Ot}=window;class Tt{extend(t){this.handleBulkActionCheckboxStatus(t),this.handleBulkActionCheckboxSelect(t),this.handleBulkActionSelectAllCheckbox(t)}handleBulkActionCheckboxStatus(e){e.getContainer().find(t.actionSelectAll).prop("disabled",0===e.getContainer().find(t.bulkActionCheckbox).length)}handleBulkActionSelectAllCheckbox(e){e.getContainer().on("change",t.actionSelectAll,(n=>{const o=Ot(n.currentTarget).is(":checked");o?this.enableBulkActionsBtn(e):this.disableBulkActionsBtn(e),e.getContainer().find(t.bulkActionCheckbox).prop("checked",o)}))}handleBulkActionCheckboxSelect(e){e.getContainer().on("change",t.bulkActionCheckbox,(()=>{e.getContainer().find(t.checkedCheckbox).length>0?this.enableBulkActionsBtn(e):this.disableBulkActionsBtn(e)}))}enableBulkActionsBtn(e){e.getContainer().find(t.bulkActionBtn).prop("disabled",!1)}disableBulkActionsBtn(e){e.getContainer().find(t.bulkActionBtn).prop("disabled",!0)}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:jt}=window;class Et{extend(t){t.getHeaderContainer().on("click",i.showQuery,(()=>this.onShowSqlQueryClick(t))),t.getHeaderContainer().on("click",i.exportQuery,(()=>this.onExportSqlManagerClick(t)))}onShowSqlQueryClick(t){const e=jt(i.showModalForm(t.getId()));this.fillExportForm(e,t);const n=jt(i.showModalGrid(t.getId()));n.modal("show"),n.on("click",x,(()=>e.submit()))}onExportSqlManagerClick(t){const e=jt(i.showModalForm(t.getId()));this.fillExportForm(e,t),e.submit()}fillExportForm(t,e){const n=e.getContainer().find(s).data("query");t.find('textarea[name="sql"]').val(n),t.find('input[name="name"]').val(this.getNameFromBreadcrumb())}getNameFromBreadcrumb(){const t=jt(b).find(p);let e="";return t.each(((t,n)=>{const o=jt(n),i=o.find("a").length>0?o.find("a").text():o.text();e.length>0&&(e=e.concat(" > ")),e=e.concat(i)})),e}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
class At{extend(t){const e=t.getContainer().find(v);e.find(w).prop("disabled",!0),e.find(D).on("input dp.change",(()=>{e.find(w).prop("disabled",!1),e.find(y).prop("hidden",!1)}))}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:Bt}=window;class St{constructor(t){this.id=t,this.$container=Bt(`#${this.id}`)}getContainer(){return this.$container}addExtension(t){t.extend(this)}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:Mt}=window;class Lt{extend(t){const e=t.getContainer();e.on("click",".js-remove-helper-block",(t=>{e.remove();const n=Mt(t.target),o=n.data("closeUrl"),i=n.data("cardName");o&&Mt.post(o,{close:1,name:i})}))}}n(3867);
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:Pt}=window;class $t{constructor(t){this.grid=t}extend(t){this.grid=t,this.addIdsToGridTableRows(),t.getContainer().find(s).tableDnD({onDragClass:k,dragHandle:a,onDrop:(t,e)=>this.handlePositionChange(e)}),t.getContainer().find(".js-drag-handle").on("mouseenter",(function(){Pt(this).closest("tr").addClass("hover")})).on("mouseleave",(function(){Pt(this).closest("tr").removeClass("hover")})),this.setReorderButtonLabel(),this.getReorderButton().on("click",(t=>this.oncClickReorderButton(t)))}handlePositionChange(t){const e=Pt(t).find(f(this.grid.getId())),n=e.data("update-url"),o=e.data("update-method"),i={positions:this.getRowsPositions()};this.updatePosition(n,i,o)}getRowsPositions(){const t=JSON.parse(Pt.tableDnD.jsonize())[`${this.grid.getId()}_grid_table`],e=[];let n;for(let o=0;o<t.length;o+=1)n=this.grid.getContainer().find(`#${t[o]}`),e.push({rowMarker:t[o],offset:n.data("dragAndDropOffset")});return this.computeMappingBetweenOldAndNewPositions(e)}addIdsToGridTableRows(){let t=0;this.grid.getContainer().find(u(this.grid.getId())).each(((e,n)=>{const o=Pt(n),i=`row_${o.data("id")}_${o.data("position")}`;o.closest("tr").attr("id",i),o.closest("td").addClass(l),o.closest("tr").data("dragAndDropOffset",t),t+=1}))}updatePosition(t,e,n){const o=["GET","POST"].includes(n),i=Pt("<form>",{action:t,method:o?n:"POST"}).appendTo("body"),r=e.positions.length;let s;for(let t=0;t<r;t+=1)s=e.positions[t],i.append(Pt("<input>",{type:"hidden",name:`positions[${t}][rowId]`,value:s.rowId}),Pt("<input>",{type:"hidden",name:`positions[${t}][oldPosition]`,value:s.oldPosition}),Pt("<input>",{type:"hidden",name:`positions[${t}][newPosition]`,value:s.newPosition}));o||i.append(Pt("<input>",{type:"hidden",name:"_method",value:n})),i.submit()}computeMappingBetweenOldAndNewPositions(t){var e;const n=new RegExp("^row_(?<rowId>\\d+)_(?<oldPosition>\\d+)$"),o=[];for(let i=0;i<t.length;i+=1){const r=n.exec(t[i].rowMarker);if(r&&!W(r.groups)&&!W(r.groups.rowId)&&!W(r.groups.oldPosition)){const t=parseInt(null==(e=null==r?void 0:r.groups)?void 0:e.oldPosition,10);o[i]={rowId:r.groups.rowId,oldPosition:t,newPosition:t}}for(let e=0;e<t.length;e+=1)W(t[e])||W(t[e].offset)||W(o[t[e].offset])||W(o[e])||(o[t[e].offset].newPosition=o[e].oldPosition)}return o}isPositionsReorderActive(){return this.grid.getContainer().find('.ps-sortable-column[data-sort-col-name="position"]').first().data("sort-is-current")}getReorderButton(){return this.grid.getContainer().find(".js-btn-reorder-positions").first()}setReorderButtonLabel(){const t=this.getReorderButton();this.isPositionsReorderActive()?t.hide():t.data("label-reorder")}oncClickReorderButton(t){t.preventDefault(),this.isPositionsReorderActive()?this.grid.getContainer().find(".ps-sortable-column").first().click():this.grid.getContainer().find('.ps-sortable-column[data-sort-col-name="position"]').first().click()}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:Rt}=window;class It{constructor(t){this.onClick=t}extend(t){this.initRowLinks(t),this.initConfirmableActions(t)}initConfirmableActions(t){t.getContainer().on("click",e.linkRowAction,(t=>{const e=Rt(t.currentTarget).data("confirm-message");e.length&&!window.confirm(e)&&t.preventDefault()}))}initRowLinks(t){const n=this.onClick;Rt("tr",t.getContainer()).each((function(){const t=Rt(this);Rt(e.linkRowActionClickableFirst,t).each((function(){const o=Rt(this),i=o.closest("td"),r=Rt(e.clickableTd,t).not(i);let s=!1;r.addClass("cursor-pointer").on("mousedown",(()=>{Rt(window).on("mousemove",(()=>{s=!0,Rt(window).off("mousemove")}))})),r.on("mouseup",(()=>{const t=s;if(s=!1,Rt(window).off("mousemove"),!t){const t=o.data("confirm-message");(!t.length||window.confirm(t)&&o.attr("href"))&&(W(n)||W(o.get(0))?document.location.href=o.attr("href"):n(o.get(0)))}}))}))}))}}
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
const{$:zt}=window;zt((()=>{const t=new T("attribute_group");t.addExtension(new Et),t.addExtension(new P),t.addExtension(new A),t.addExtension(new L),t.addExtension(new Ct),t.addExtension(new xt),t.addExtension(new Tt),t.addExtension(new At),t.addExtension(new $t(t)),t.addExtension(new It);new St("attributesShowcaseCard").addExtension(new Lt)}))})(),window.attribute_group=o})();