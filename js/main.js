if (typeof console  != "undefined") 
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

console.log = function(message) {
    console.olog(message);
    $('#console').append('<p>' + message + '</p>');
};
console.error = console.debug = console.info =  console.log;

// document.addEventListener('deviceready', function () {
//     // cordova.plugins.email is now available
//     alert('hi');
//     cordova.plugins.email.open({
// 	    to:      'jugglingjon@gmail.com',
// 	    subject: 'Greetings',
// 	    body:    'How are you? Nice greetings from Leipzig'
// 	});
// }, false);

$(document).ready(function(){
	$('#input').change(function(){

		$('#output').val(Base64.encode($('#input').val()));

	});

	$('#download').click(function(){
		var base64 =  $('#output').val();
		var blobx = b64toBlob(base64, 'text/xml');
		//location.href="data:text/xml;base64," + base64;
		//saveAs(blobx,'test.xml');

		var zip = new JSZip();
		zip.file('text.xml',blobx);

		zip.generateAsync({type:"blob"}).then(function (blob) {
			var reader = new FileReader();
			reader.readAsDataURL(blob); 
			reader.onloadend = function() {
				base64data = reader.result;                
				//console.log(base64data);
				console.log( base64data.substr(base64data.indexOf(',')+1) );
				var b64string = 'base64:test.zip//'+ base64data.substr(base64data.indexOf(',')+1);

				cordova.plugins.email.open({
				    to:      'jugglingjon@gmail.com',
				    subject: 'Completion',
				    body:    'send this file for completion',
				    attachments: [b64string]
				});
			}
			//saveAs(blob, "test.zip");
			
		});
		return false;
	});
});
