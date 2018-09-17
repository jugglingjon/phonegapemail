document.addEventListener('deviceready', function () {
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
			}
			//saveAs(blob, "test.zip");
			cordova.plugins.email.open({
			    to:      'jugglingjon@gmail.com',
			    subject: 'Greetings',
			    body:    'How are you? Nice greetings from Leipzig'
			});
		});
		return false;
	});

}, false);
