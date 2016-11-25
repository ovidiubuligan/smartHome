//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$( document ).ready(function() {
    $('.btn-number').click(function(e){
        e.preventDefault();
        
        var fieldName = $(this).attr('data-field');
        var type      = $(this).attr('data-type');
        var input = $("input[name='"+fieldName+"']");
        console.log(input);
        var currentVal = parseInt(input.val());
        console.log(currentVal);
        if (!isNaN(currentVal)) {
            if(type == 'minus') {
                var minValue = parseInt(input.attr('min')); 
                if(!minValue) minValue = 1;
                if(currentVal > minValue) {
                    input.val(currentVal - 1).change();
                    console.log("min");
                } 
                if(parseInt(input.val()) == minValue) {
                    $(this).attr('disabled', true);
                }
    
            } else if(type == 'plus') {
                var maxValue = parseInt(input.attr('max'));
                if(!maxValue) maxValue = 9999999999999;
                if(currentVal < maxValue) {
                    input.val(currentVal + 1).change();
                                        console.log("max");

                }
                if(parseInt(input.val()) == maxValue) {
                    $(this).attr('disabled', true);
                }
    
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function(){
       $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {
        
        var minValue =  parseInt($(this).attr('min'));
        var maxValue =  parseInt($(this).attr('max'));
        if(!minValue) minValue = 1;
        if(!maxValue) maxValue = 9999999999999;
        var valueCurrent = parseInt($(this).val());
        
        var name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        
        
    });
    $(".input-number").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                 // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
    });
});

$(function(){
    $(".btn-number").click(function(e){
        e.preventDefault();
       var fieldName = $(this).attr('data-field');
        var type      = $(this).attr('data-type');
        var input = $("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());

        var str = "{ temperature : " + currentVal + " }"
        var temp_json = JSON.stringify({temperature: currentVal});
        console.log("Here: " + temp_json);

        $.ajax({
          type: "POST",
          url: "/api/temperature.php",
          data: temp_json,
          success: function(data) {
                    console.log(data);

            var response = JSON.parse(data);
            console.log(data);

            console.log(response);
            if(response["status"] == "success") {
                alert(response["status"]);            }
            else {
                alert(response["reason"]);
            }
          }
      });

    });
});

$(function(){
    $(".switch input").change(function(e){
        var id = $(this).attr("id");
        var state = this.checked;
        var obj = {'switch': id,'state':state };
        console.log(obj);
         $.ajax({
            type: "POST",
            url: "/api/hvac.php",
            data: obj,
            success: function(data) {
                    console.log(data);

            var response = JSON.parse(data);
            console.log(data);

            console.log(response);
            if(response["status"] == "success") {
                alert(response["status"]);           
            }
            else {
                alert(response["reason"]);
            }
          }
      });
       });

    });


// });$(function(){
//     $(".ventillation").click(function(e){
//         var ventillation = document.getElementById("ventillation").checked;
       
//         console.log(ventillation);

//         // $.ajax({
//         //   type: "POST",
//         //   url: "/api/login.php",
//         //   data: formData,
//         //   success: function(data) {
//         //             console.log(data);

//         //     var response = JSON.parse(data);
//         //     console.log(data);

//         //     console.log(response);
//         //     if(response["status"] == "success") {
//         //         window.location.href = "index.php?page=home";           
//         //     }
//         //     else {
//         //         alert(response["reason"]);
//         //     }
//         //   }
//         //   // dataType: dataType
//         // });

//         // console.log(formData);
//     });
// });

// $(function(){
//     $(".ac").click(function(e){
//         var ac = document.getElementById("ac").checked;
       
//         console.log(ac);

//         // $.ajax({
//         //   type: "POST",
//         //   url: "/api/login.php",
//         //   data: formData,
//         //   success: function(data) {
//         //             console.log(data);

//         //     var response = JSON.parse(data);
//         //     console.log(data);

//         //     console.log(response);
//         //     if(response["status"] == "success") {
//         //         window.location.href = "index.php?page=home";           
//         //     }
//         //     else {
//         //         alert(response["reason"]);
//         //     }
//         //   }
//         //   // dataType: dataType
//         // });

//         // console.log(formData);
//     });
// });