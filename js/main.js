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
		//var base64 =  $('#output').val();
		var txt=`<?xml version="1.0" encoding="utf-8"?>
<course_completion>
	<Course_Completion_ID>e395c897-0cc5-4196-b54f-8e0d0f8cc18b</Course_Completion_ID>
	<DODID>1234567890</DODID>
	<Course_Number>CPPD-GMT-DV-1.1</Course_Number>
	<Pre_Test_Score>0</Pre_Test_Score>
	<Post_Test_Score>86.66666</Post_Test_Score>
	<Completion_Date>2018-09-17T11:33:04.9427300-04:00</Completion_Date>
	<Device_Information>
		<Device_Manufacturer>Apple</Device_Manufacturer>
		<Device_Model>iPhone</Device_Model>
		<Device_Type>Phone</Device_Type>
		<Device_OS_Name>iOS</Device_OS_Name>
		<Device_OS_Version>11.1</Device_OS_Version>
	</Device_Information>
</course_completion>`;
		var base64 = Base64.encode(txt);
		var blobx = b64toBlob(base64, 'text/xml');
		//location.href="data:text/xml;base64," + base64;
		//saveAs(blobx,'test.xml');

		var zip = new JSZip();
		zip.file('e395c897-0cc5-4196-b54f-8e0d0f8cc18b.xml',blobx);

		zip.generateAsync({type:"blob"}).then(function (blob) {
			var reader = new FileReader();
			reader.readAsDataURL(blob); 
			reader.onloadend = function() {
				base64data = reader.result;                
				//console.log(base64data);
				console.log( base64data.substr(base64data.indexOf(',')+1) );
				var b64string = 'base64:e395c897-0cc5-4196-b54f-8e0d0f8cc18b.ldk//'+ base64data.substr(base64data.indexOf(',')+1);

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
