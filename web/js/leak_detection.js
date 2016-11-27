$(function(){
  $(".sensor").click(function(e){
    e.preventDefault();

    var _this = $(this);
    var name=document.forms["new_sens_form"]["name"].value;
    var min=parseInt(document.forms["new_sens_form"]["min"].value);
    var max=parseInt(document.forms["new_sens_form"]["max"].value);
    var low=parseInt(document.forms["new_sens_form"]["low"].value);
    var high=parseInt(document.forms["new_sens_form"]["high"].value);
    var value = (low + high)/2;


    sendToDBLeakDet(name, min, max, low, high, value);
  });
});

function sendToDBLeakDet(name, min, max, low, high, value){
    var data = {"name": name, "min" : min, "max" : max, "low" : low, "high" : high, "value" : value};
    
    $.ajax({
        type: "POST",
        url:"/api/leak_detection.php",
        data: data,
        success:function(data2){
         var response = JSON.parse(data2);
         if (response["status"] == "success"){

                createSensor(name, min, max, low, high, value);
            }
            else{
             alert("Cannot add switch\n" + response['reason']);
            }
        }
    }
    );
}

function createSensor(name, min, max, low, high, value){

    console.log(name + min + max + low + high + value);
    var container = document.createElement("DIV");
    container.className = "progress";

    var zone = document.createElement("DIV");
    zone.className = "progress-bar progress-bar-success";
    zone.role="progressbar";
    zone.id = "prog-" + name;
    var id = "#" + zone.id;
    console.log(zone);

    var div = document.createElement("DIV");
    var head1 = document.createElement("H1");
    head1.innerHTML = name;

    div.appendChild(head1);
    container.appendChild(zone);
    div.appendChild(container);

    document.getElementById("progress-bar-area").appendChild(div);
    $(id).attr('aria-valuenow', value);
    $(id).attr('aria-valuemin', min);
    $(id).attr('aria-valuemax', max); 
    console.log(value);
    var percent = value*100/(max-min) + "%";
    $(id).css("width",percent);
    zone.innerHTML = percent;
    console.log(document.getElementById("progress-bar-area"));

    document.forms["new_sens_form"]["name"].value = "";
    document.forms["new_sens_form"]["min"].value = "";
    document.forms["new_sens_form"]["max"].value = "";
    document.forms["new_sens_form"]["low"].value = "";
    document.forms["new_sens_form"]["high"].value = "";
}

function loadLeakDetection(){
        var ids = ["leak_detection_tb","*"];
        var val;
        var jsonArr = JSON.stringify(ids);
            $.ajax({
            type: "POST",
            url: "/api/refresh.php",
            data: {data:jsonArr},
            success: function(data) {

            var response = JSON.parse(data);

            if(response["status"] == "success") {
                $.each(response, function(key, value){
                    if (key != "status"){

                        createSensor(key, parseInt(value["MIN"]), parseInt(value["MAX"]), parseInt(value["LOW"]),
                         parseInt(value["HIGH"]), parseInt(value["VALUE"]));
                    }
                });
            }
            else {
                alert(response["reason"]);
            }
          }
      });
}