/*global require*/
/*
 * Bootstrap-based responsive mashup
 * @owner Erik Wetterberg (ewg)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
//to avoid errors in workbench: you can remove this when you have added an app
var app;
require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );

require( ["js/qlik","./qBlob/qBlob.js",'./qBlob/qBlobpdf.js'], function ( qlik, qBlob, qBlobPDF ) {

	$("#closeerr").on('click',function(){
		$("#errmsg").html("").parent().hide();
	});
	qlik.setOnError( function ( error ) {
		$("#errmsg").append("<div>"+error.message+"</div>").parent().show();
	} );

	//
	function AppUi ( app ) {
		var me = this;
		this.app = app;
		app.global.isPersonalMode( function ( reply ) {
			me.isPersonalMode = reply.qReturn;
		} );
		app.getAppLayout( function ( layout ) {
			$( "#title" ).html( layout.qTitle );
			$( "#title" ).attr("title", "Last reload:" + layout.qLastReloadTime.replace( /T/, ' ' ).replace( /Z/, ' ' ) );
			//TODO: bootstrap tooltip ??
		} );
		app.getList( 'SelectionObject', function ( reply ) {
			$( "[data-qcmd='back']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qBackCount < 1 );
			$( "[data-qcmd='forward']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qForwardCount < 1 );
		} );
		app.getList( "BookmarkList", function ( reply ) {
			var str = "";
			reply.qBookmarkList.qItems.forEach( function ( value ) {
				if ( value.qData.title ) {
					str += '<li><a href="#" data-id="' + value.qInfo.qId + '">' + value.qData.title + '</a></li>';
				}
			} );
			str += '<li><a href="#" data-cmd="create">Create</a></li>';
			$( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function () {
				var id = $( this ).data( 'id' );
				if ( id ) {
					app.bookmark.apply( id );
				} else {
					var cmd = $( this ).data( 'cmd' );
					if ( cmd === "create" ) {
						$('#createBmModal' ).modal();
					}
				}
			} );
		} );
		$( "[data-qcmd]" ).on( 'click', function () {
			var $element = $( this );
			switch ( $element.data( 'qcmd' ) ) {
				//app level commands
				case 'clearAll':
					app.clearAll();
					break;
				case 'back':
					app.back();
					break;
				case 'forward':
					app.forward();
					break;
				case 'lockAll':
					app.lockAll();
					break;
				case 'unlockAll':
					app.unlockAll();
					break;
				case 'createBm':
					var title = $("#bmtitle" ).val(), desc = $("#bmdesc" ).val();
					app.bookmark.create( title, desc );
					$('#createBmModal' ).modal('hide');
					break;
				case 'reload':
					if ( me.isPersonalMode ) {
						app.doReload().then( function () {
							app.doSave();
						} );
					} else {
						qlik.callRepository( '/qrs/app/' + app.id + '/reload', 'POST' ).success( function ( reply ) {
							//TODO:handle errors, remove alert
							alert( "App reloaded" );
						} );
					}
					break;
			}
		} );
	}
	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('Consumer_Sales.qvf', config);
	
  var exportFunctDict={}

	//get objects -- inserted here --
	app.getObject('QV02','fNGRa').then( function( vizModel ) {  
                  
          exportFunctDict['QV02'] = function() {  
      
             vizModel.exportData().then(function( reply ) {  
                console.log('qUrl', reply);  
                window.open(reply.result.qUrl);  
             });  
          }  
       });  
  
	app.getObject('QV01','MEAjCJ').then( function( vizModel ) {  
                  
          exportFunctDict['QV01'] = function() {  
      
             vizModel.exportData().then(function( reply ) {  
                console.log('qUrl', reply);  
                window.open(reply.result.qUrl);  
             });  
          }  
       });  
  
	//create cubes and lists -- inserted here --
	if(app) {
		new AppUi( app );
	}
  	
  	// build the menu
  	var menu = [{
        name: 'Export PNG',
        title: 'Export image button',
        fun: function (data,event) {
            //alert('#'+data.trigger.attr('id'));
            qBlob.saveToFile(data.trigger.attr('id'), 'mychart.jpg'); 
        }
    }, {
        name: 'Export Data',
        title: 'Export data button',
        fun: function (data,event) {
            exportFunctDict[data.trigger.attr('id')]();
        }
    }, {
        name: 'Export PDF',
        title: 'b button',
        fun: function (data,event) {
           qBlobPDF.saveToFile(data.trigger.attr('id'), 'mychart.pdf'); 
        }
    }];
	$('#QV02').contextMenu(menu,{triggerOn:'contextmenu'});
  
  	$('#QV01').contextMenu(menu,{triggerOn:'contextmenu'});

} );

