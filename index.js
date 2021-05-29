$(document).ready(function(){

	$('input[type=radio][name=sch]').change(function() {
	    if (this.value == 'yes') {
	        $("#datetime").addClass('show');
	        $("#datetime").removeClass('hide');
	    }
	    else if (this.value == 'no') {
	    	$("#datetime").removeClass('show');
	        $("#datetime").addClass('hide');
	    }
	});

	$.ajax({
        url: `https://api.classiq.in/api/getuser`,
        type: 'GET',
        success: function(obj) {
            if (obj.response) {
            	var data = obj.data;
            	var htmlString = "";
            	for (var i = 0; i < data.length; i++) {
            		htmlString += '<input type="checkbox" name="email" value="'+data[i].email+'">\
		  		<label>'+data[i].name+" - "+data[i].email+'</label><br>';
            	}
            	$("#userscheckbox").html(htmlString);
            }else{
            	swal(obj.responseString);
            }        
        },
        error: function(error) {
            swal("Error");
        }
    })

    
	document.querySelector('#submit').addEventListener("click",()=>{

		function getCheckboxValues() {
		  var values = [];
		  var email_chk = $("#userscheckbox input");

		  for (var i=0, iLen=email_chk.length; i<iLen; i++) {
		    if (email_chk[i].checked) {
		      values.push(email_chk[i].value);
		    }
		  }
		  return values;
		}
		var data_obj ={};
		var email_arr = getCheckboxValues();
		if (email_arr.length > 0) {
			data_obj.msg_title=$("#sbj").val();
			data_obj.message_body=$("#body").val();
			data_obj.to_emails= JSON.stringify(email_arr);
			data_obj.schedule_flag=$('input[type=radio][name=sch]:checked').val();
			data_obj.schedule_date=$("#scheduletime").val();
		  	$.ajax({
		        url: `https://api.classiq.in/api/sendmessage`,
		        type: 'POST',
		        cache: 'false',
		        data: data_obj,
		        success: function(obj) {
		            if (obj.response) {
		            	swal(obj.responseString);
		            }else{
		            	swal(obj.responseString);
		            }        
		        },
		        error: function(error) {
		            swal("Error");
		        }
		    })
		}else{
			swal("Please select user");
		}
	})
});