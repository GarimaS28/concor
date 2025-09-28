/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// function getBase64Str(elem){
//     var str = "HelloWorld.HowruHII";
//     if(elem=="sign") $('#idBase64Str').val(str);
//     else $('#encryptBase64').val(str);
// }


function getPDFBase64Str(fileInput) {
  const file = fileInput.files[0];
  getFileBase64(file, function(base64PDF) {
    // Hash the base64 PDF (use SHA-256 or SHA-1 depending on your PKI)
    const hash = sha256(base64PDF);

    // Call PKI component to sign
    window.PKI.signData(hash, function(signature, certDetails) {
      // Store results in hidden fields or send via API
      $('#pdfBase64').val(base64PDF);
      $('#pdfSignature').val(signature);
      $('#pdfCert').val(certDetails);
    });
  });
}

function getPubKeyStr(elem){
    var str = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAteiEjgB16GFGxr8t2F6vPbi9CKZ9Da7Y+lGwyod+GmP1j/Bwdsq30imHHEF5EcPJ8nObk4W1aMfDcnSzODKHVMqHsqHaxQS9hsAmx1DN8+9P6K1br5g+q+I8caQA6lUMQoim6P63CkVcy5yKZDwAfw26CE8HxcUCzuWpdNwc/c+s06GOZmaiiAZgSjZ3s8gUZCfK1RCpovtNdljWSGQSEN3ibmyqsC6aCqFivoQjvgoBiXVH2tSnegxCpyJ8JBuOMVbu593IjRJkM6L95okhY22akbBRvJPPg8xMQ8IwXU7g94Hp6Ah+g0qXOJZuJoXvrropzZyohuCfFrEkTLCIIQIDAQAB";
    if(elem=="sign") $('#publicKeySign').val(str);
    else $('#publicKeyEncrypt').val(str);
}
function callSignData(textForSign, serverDate){
    //alert ("inside callSignData....");
    //alert(textForSign);
    //alert(serverDate);
    if(textForSign==null || textForSign=="") alert("Please Enter Data");
    else{
       var jsondata = {"methodName": "signData", "textForSign": textForSign, "ServerDate": serverDate}; 
      // alert("Before calling signService from callSignData in pkicomp.js with json data=>"+JSON.stringify(jsondata));
       signService(jsondata);
       //alert("iN call sign data"+responseString);
      
    }
}       
function callVerifyData(dataSign, dataVerify, dataPubKeySign, dataCertString, dataShowDialog, serverDate){
    if (dataSign == null || dataSign == undefined || dataSign == "") {
        alert("Original Data for verification not available");
    } else if (dataVerify == null || dataVerify == undefined || dataVerify == "") {
        alert("Signed Data for verification not available");
    } else if (dataCertString == null || dataCertString == undefined || dataCertString == "") {
        alert("Certificate String for verification not available");
    } else if (dataShowDialog == null || dataShowDialog == undefined || dataShowDialog == "") {
        alert("Dialogbox visiblity for verification not available");
    } else {
        var jsondata = {"methodName": "verifyData", "textForSign": dataSign, "textForVerify": dataVerify, "publicKeySign": dataPubKeySign, "certString": dataCertString, "isShowDialog": "true", "ServerDate": serverDate};
        signService(jsondata); 
    }   
}
function callSignFile(serverDate) {
    var jsondata = {"methodName": "signFile", "ServerDate": serverDate};
    signService(jsondata);
}
function callVerifyFile(serverDate) {
    var jsondata = {"methodName": "verifyFile", "ServerDate": serverDate};
    signService(jsondata);
}
function callSignFileBase64(base64Str, path, serverDate) {
    if (base64Str == null || base64Str == undefined || base64Str == "") {
        alert("Please enter Base 64 string");
    } else if (path == null || path == undefined || path == "") {
        alert("Please save path for file");
    }else{
      var jsondata = {"methodName": "base64Signfile", "base64Str": base64Str, "fileSavedPath": path, "ServerDate": serverDate};
        signService(jsondata);  
    }
}
function selectPdfFile(serverDate) {
    var jsondata = {"methodName": "selectPdfFile", "ServerDate": serverDate};
    signService(jsondata);
}
function saveFile(type,serverDate) {
    var jsondata = {"methodName": "saveFile", "ServerDate": serverDate, "type": type};
    signService(jsondata);
}
function savePdfFile(serverDate) {
    var jsondata = {"methodName": "savePdfFile", "ServerDate": serverDate};
    signService(jsondata);
}
function savePdfBase64File(serverDate) {
    var jsondata = {"methodName": "savePdfBase64File", "ServerDate": serverDate};
    signService(jsondata);
}
function signPdfFileClient(topCoordinate, leftCoordinate, widthCoordinate, heightCoordinate, serverDate) {

//alert('in signpdfClient');
    var pdfFilePath =  $('#pdfFilePath').val();
    
    var pdfFileSavePath = $('#pdfFileSavePath').val();
    
    if (pdfFilePath == null || pdfFilePath == undefined || pdfFilePath == "") {
        alert("Please select PDF file");
    } else if (pdfFileSavePath == null || pdfFileSavePath == undefined || pdfFileSavePath == "") {
        alert("Please save path for PDF file");
    } else {
        var jsondata  = {"methodName": "signPdfFileClient", "pdfFilePath": pdfFilePath, "pdfFileSavePath": pdfFileSavePath, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "signOnPages": "A", "reason": "Test reason", "location": " Test LOcation", "ServerDate": serverDate};
    //    alert(JSON.stringify(jsondata));
        signService(jsondata);
    }
}

function signPdfFileClientCRIS(topCoordinate, leftCoordinate, widthCoordinate, heightCoordinate,pdfFilePath,pdfFileSavePath,serverDate) {

alert('in signpdfClientCRIS');
    
    alert('pdfFilePath is ' +pdfFilePath);
    alert('pdfFileSavePath is ' +pdfFileSavePath);
    if (pdfFilePath == null || pdfFilePath == undefined || pdfFilePath == "") {
        alert("Please select PDF file");
    } else if (pdfFileSavePath == null || pdfFileSavePath == undefined || pdfFileSavePath == "") {
        alert("Please save path for PDF file");
    } else {
        var jsondata  = {"methodName": "signPdfFileClient", "pdfFilePath": pdfFilePath, "pdfFileSavePath": pdfFileSavePath, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "signOnPages": "A", "reason": "Test reason", "location": " Test LOcation", "ServerDate": serverDate};
        //alert(JSON.stringify(jsondata));
        signService(jsondata);
    }
}
function signPdfFileBase64(base64PDFfile, topCoordinate, leftCoordinate, widthCoordinate, heightCoordinate, serverDate) {
    var pdfFileSavePath = $('#pdfFileBase64Path').val();
  // var trmn=$('#trmn').val();
   var trmn="TKD";
   // alert("inside signPdfFileBase64 :" + pdfFileSavePath );
    if (base64PDFfile == null || base64PDFfile == undefined || base64PDFfile == "") {
        alert("Base 64 String is not available");
    } else if (pdfFileSavePath == null || pdfFileSavePath == undefined || pdfFileSavePath == "") {
        alert("Please save path for PDF file1111");
    } else {
        var jsondata = {"methodName": "base64Signfile", "pdfFileBase64": base64PDFfile, "pdfFileSavePath": pdfFileSavePath, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "signOnPages": "L","certserial":"",  "reason": "Secure Document", "location": trmn,  "ServerDate": serverDate};
                        var form_data = {"pdfFileBase64": base64PDFfile, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "reason": "umang from reason", "location": "location umang"};
         //alert("inside signPdfFileBase64 jsonStrng:"+JSON.stringify(jsondata));
        signService(jsondata);
    }
}
function signPdfFileBase641(base64PDFfile, topCoordinate, leftCoordinate, widthCoordinate, heightCoordinate, serverDate) {
    var pdfFileSavePath = $('#pdfFileBase64Path').val();
   var trmn=$('#trmn').val();
   //var trmn="TKD";
   // alert("inside signPdfFileBase64 :" + pdfFileSavePath );
    if (base64PDFfile == null || base64PDFfile == undefined || base64PDFfile == "") {
        alert("Base 64 String is not available");
    } else if (pdfFileSavePath == null || pdfFileSavePath == undefined || pdfFileSavePath == "") {
        alert("Please save path for PDF file1111");
    } else {
        var jsondata = {"methodName": "base64Signfile", "pdfFileBase64": base64PDFfile, "pdfFileSavePath": pdfFileSavePath, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "signOnPages": "L","certserial":"",  "reason": "Secure Document", "location": trmn,  "ServerDate": serverDate};
                        var form_data = {"pdfFileBase64": base64PDFfile, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "reason": "umang from reason", "location": "location umang"};
       //  alert("inside signPdfFileBase64 jsonStrng:"+JSON.stringify(jsondata));
        signService(jsondata);
    }
}
function signPdfFileBase642(base64PDFfile, topCoordinate, leftCoordinate, widthCoordinate, heightCoordinate, serverDate) {
    var pdfFileSavePath = $('#pdfFileBase64Path').val();
   var trmn=$('#trmn').val();
   //var trmn="TKD";
   // alert("inside signPdfFileBase64 :" + pdfFileSavePath );
    if (base64PDFfile == null || base64PDFfile == undefined || base64PDFfile == "") {
        alert("Base 64 String is not available");
    } else if (pdfFileSavePath == null || pdfFileSavePath == undefined || pdfFileSavePath == "") {
        alert("Please save path for PDF file1111");
    } else {
        var jsondata = {"methodName": "base64Signfile", "pdfFileBase64": base64PDFfile, "pdfFileSavePath": pdfFileSavePath, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "signOnPages": "F","certserial":"",  "reason": "Secure Document", "location": trmn,  "ServerDate": serverDate};
                        var form_data = {"pdfFileBase64": base64PDFfile, "topCoordinate": topCoordinate, "leftCoordinate": leftCoordinate, "widthCoordinate": widthCoordinate, "heightCoordinate": heightCoordinate, "reason": "umang from reason", "location": "location umang"};
       //  alert("inside signPdfFileBase64 jsonStrng:"+JSON.stringify(jsondata));
        signService(jsondata);
    }
}
function openEncryptModal(id){
    if($("input[name='encType']:checked").val()=="pubkey"){
       $("input[name='encType'][value='cert']").prop("checked", true);
       $('#publicKeyEncrypt').val('');
       $("#pubKeyDiv").hide();
    }
    if(id=="callEncryptText"){
        var dataEncrypt = $('#textForEncrypt').val();
        if (dataEncrypt == null || dataEncrypt == undefined || dataEncrypt == "") {
            alert("Please enter data for encryption");
        }else {
            $('#encOptions').modal('show');
            $('#encOptions').data('id',id);
        }
    }else if(id=="clEncryptFilebase64"){
        var base64Str = $('#encryptBase64').val();
        var fileSavePath = $('#base64EncFilePath').val();
        if (base64Str == null || base64Str == undefined || base64Str == "") {
            alert("Base 64 String is not available");
        } else if (fileSavePath == null || fileSavePath == undefined || fileSavePath == "") {
            alert("Please save path for file");
        } else {
            $('#encOptions').modal('show');
            $('#encOptions').data('id',id);
        }
    }else {
       $('#encOptions').modal('show');
       $('#encOptions').data('id',id);
    }
}
function startEncrypt(id,encryptKey,type,serverDate){
    var modalHide = true;
    if(id=="callEncryptText"){
        var dataEncrypt = $('#textForEncrypt').val();
        if(type=="cert") callEncryptDataCert(dataEncrypt,serverDate);
        else {
            if (encryptKey == null || encryptKey == undefined || encryptKey == "") modalHide=false;
            else callEncryptData(dataEncrypt,encryptKey,serverDate);
        }
    }else if(id=="clEncryptFilebase64"){
        var base64Str = $('#encryptBase64').val();
        var fileSavePath = $('#base64EncFilePath').val();
        if(type=="cert") callEncryptBase64Cert(base64Str,fileSavePath,serverDate);
        else {
            if (encryptKey == null || encryptKey == undefined || encryptKey == "") modalHide=false;
            else callEncryptBase64(base64Str,fileSavePath,encryptKey,serverDate);
        }
    }else{
        if(type=="cert") callEncryptFileCert(serverDate);
        else {
            if (encryptKey == null || encryptKey == undefined || encryptKey == "") modalHide=false;
            else callEncryptFile(encryptKey,serverDate);
        }
    }
    if(modalHide==false) alert("Public key for encryption is not available");
    else $('#encOptions').modal('hide');
}
function callEncryptData(dataEncrypt,encryptKey,serverDate) {
    if (dataEncrypt == null || dataEncrypt == undefined || dataEncrypt == "") {
        alert("Please enter data for encryption");
    } else if (encryptKey == null || encryptKey == undefined || encryptKey == "") {
        alert("Public key for encryption is not available");
    } else {
        var jsondata = {"methodName":"encryptData","dataForEncrypt": dataEncrypt,"publicKeyEncrypt": encryptKey,"ServerDate":serverDate};
        signService(jsondata); 
    }
}
function callEncryptDataCert(dataEncrypt,serverDate) {
    if (dataEncrypt == null || dataEncrypt == undefined || dataEncrypt == "") {
        alert("Please enter data for encryption");
    } else {
        var jsondata = {"methodName":"encryptData","dataForEncrypt": dataEncrypt,"publicKeyEncrypt": "","ServerDate":serverDate};
        signService(jsondata); 
    }
}
function callEncryptFile(encryptKey,serverDate) {
    if (encryptKey == null || encryptKey == undefined || encryptKey == "") {
        alert("Public key for encryption is not available");
    } else {
        var jsondata = {"methodName":"encryptFile","publicKeyEncrypt": encryptKey,"ServerDate":serverDate};
        signService(jsondata); 
    }
}
function callEncryptFileCert(serverDate) {
    var jsondata = {"methodName":"encryptFile","publicKeyEncrypt": "","ServerDate":serverDate};
    signService(jsondata); 
}
function callEncryptBase64(base64Str, path, encryptKey, serverDate) {
    if (base64Str == null || base64Str == undefined || base64Str == "") {
        alert("Please enter Base 64 string");
    } else if (path == null || path == undefined || path == "") {
        alert("Please save path for file");
    } else if (encryptKey == null || encryptKey == undefined || encryptKey == "") {
        alert("Public key for encryption is not available");
    } else{
      var jsondata = {"methodName": "base64Encryptfile", "base64Str": base64Str, "fileSavedPath": path, "publicKeyEncrypt": encryptKey, "ServerDate": serverDate};
        signService(jsondata);  
    }
}
function callEncryptBase64Cert(base64Str, path, serverDate) {
    if (base64Str == null || base64Str == undefined || base64Str == "") {
        alert("Please enter Base 64 string");
    } else if (path == null || path == undefined || path == "") {
        alert("Please save path for file");
    } else{
      var jsondata = {"methodName": "base64Encryptfile", "base64Str": base64Str, "fileSavedPath": path, "publicKeyEncrypt": "", "ServerDate": serverDate};
        signService(jsondata);  
    }
}
function callDecryptData(dataDecrypt,serverDate) {
    if (dataDecrypt == null || dataDecrypt == undefined || dataDecrypt == "") {
        alert("Encrypted data for decryption is not available");
    } else {
        var jsondata = {"methodName":"decryptData","dataForDecrypt": dataDecrypt,"ServerDate":serverDate};
        signService(jsondata);
    }
}
function callDecryptFile(serverDate) {
    var jsondata = {"methodName":"decryptFile","ServerDate":serverDate};
    signService(jsondata);
}
function callEncryptFileBase64(base64Str,pbkey,path,serverDate) {
    if (base64Str == null || base64Str == undefined || base64Str == "") {
        alert("Please enter Base 64 string");
    } else if (path == null || path == undefined || path == "") {
        alert("Please save path for file");
    } else if (pbkey == null || pbkey == undefined || pbkey == "") {
        alert("Public key for encryption is not available");
    }else{
      var jsondata = {"methodName": "base64Signfile", "base64Str": base64Str, "fileSavedPath": path, "ServerDate": serverDate};
        signService(jsondata);  
    }
}

function changeEncType(){
   if($("input[name='encType']:checked").val()=="pubkey") $("#pubKeyDiv").show();
   else {
       $('#publicKeyEncrypt').val('');
       $("#pubKeyDiv").hide();
   }
};

function signService(jsondata){
    var myurl = "";

        if(location.protocol === "http:") {
            myurl = "http://localhost:12591/signservice/signdata";
        }else{
            myurl = "https://localhost13591/signservice/signdata";
        } 
       
   //alert(JSON.stringify(jsondata));
  //alert("inside sign service with data=>"+JSON.stringify(jsondata));
    $.ajax(
    {
            url: myurl,
            async: false,
            type:'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(jsondata),
            success: function(response){
            var methodName = jsondata.methodName;
            responseData(methodName, response);
            },error: function(){
            alert("Error connecting to PKI Component");
            console.log("Error connecting to PKI Component");
            }
    });
}

// function signService(jsondata) {
//     var myurl = "";

//     if (location.protocol === "http:") {
//         myurl = "http://localhost:12591/signservice/signdata";
//     } else {
//         myurl = "https://localhost:13591/signservice/signdata";
//     }

//     console.log("PKI Request URL:", myurl);
//     console.log("PKI Request Data:", JSON.stringify(jsondata));

//     $.ajax({
//         url: myurl,
//         type: 'POST',
//         dataType: 'json',
//         contentType: 'application/json; charset=utf-8',
//         data: JSON.stringify(jsondata),
//         success: function(response) {
//             var methodName = jsondata.methodName;
//             responseData(methodName, response);
//         },
//         error: function(xhr, status, error) {
//             console.error("PKI Error:", status, error, xhr.responseText);
//             alert("Error connecting to PKI Component. Check console for details.");
//         }
//     });
// }


function responseData(methodName, Data) {

    console.log(JSON.stringify(Data, null, 2));

    var flag = false;
    if (Data.flag == "true") {
        flag = true;
    }
  
    if (methodName == "signData") {
        if (flag) {
            //responseString = Data.hash + "#@#" + Data.version + "#@#" + Data.serialNumber + "#@#" + Data.issuer + "#@#" + Data.subject + "#@#" + Data.pubKey + "#@#" + Data.validFrom + "#@#" + Data.validTo + "#@#" + Data.cnName + "#@#" + Data.thumbPrint + "#@#" + Data.pubkeyLen + "#@#" + Data.subjectAlternativeName + "#@#" + Data.crtString;
            responseString =  Data.serialNumber +  Data.cnName + "#@#" + Data.thumbPrint + "#@#" + Data.validFrom + "#@#" + Data.validTo  ;
            //alert(responseString)
            /*$('#signedTextResponse').val(Data.hash);
            $('#publicKeySign').val(Data.pubKey);
            $('#certString').val(Data.crtString);
            document.getElementById("lblVersion").innerHTML = Data.version;
            document.getElementById("lblSerialNumber").innerHTML = Data.serialNumber;
            document.getElementById("lblIssuedBy").innerHTML = Data.issuer;
            document.getElementById("lblSubject").innerHTML = Data.subject;*/
            document.getElementById("f_srnumb").value = Data.serialNumber;
            document.getElementById("f_cname").value = Data.cnName;
            document.getElementById("f_thumbp").value = Data.thumbPrint;
            document.getElementById("f_VldFrom").value = Data.validFrom ;
            document.getElementById("f_VldUpto").value = Data.validTo;              
            //alert(Data.msg);
            return responseString;
        } else {
            //alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        }
    } else if (methodName == "verifyData") {
        if (flag) {
            if(Data.dialog == false) alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        } else {
            if(Data.dialog == false) alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        }
    } else if (methodName == "signFile") {
        if (flag) {
            alert(Data.msg + "\n" + Data.filePath);
            alert("Signed Base 64 String: " + Data.fileByte);
            responseString = Data.msg + "\n" + Data.filePath;
            return responseString;
        } else {
            alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        }
    } else if (methodName == "verifyFile") {
        if (flag) {
            alert(Data.msg + "\n" + Data.filePath);
            responseString = Data.msg + "\n" + Data.filePath;
            return responseString;
        } else {
            alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        }
    } else if (methodName == "base64Signfile") {
   
        if (flag) {
            document.getElementById("base64StrSign").value=Data.signPDFFileBase64;
            document.getElementById("flag").value="1";
           
      } else {
            alert(Data.msg);
        }
    } else if (methodName == "signDataDotnet") {
        if (flag) {
            $('#publicKeySign').val(Data.certString);
            $('#signedTextResponse').val(Data.msg);
            responseString = Data.msg;
        } else {
            responseString = Data.msg;
        }
    } else if (methodName == "signFileDotnet") {
        if (flag) {
            $('#publicKeySign').val(Data.publicKey);
            responseString = Data.msg;
        } else {
            responseString = Data.msg;
        }
    } else if (methodName == "saveFile") {
        if (flag) {
            if(Data.type=="sign") $('#base64FilePath').val(Data.fileSavePath);
            else $('#base64EncFilePath').val(Data.fileSavePath);
            alert(Data.msg + Data.fileSavePath);
//            document.getElementById("alertFile").innerHTML = Data.msg + Data.fileSavePath;
        } else {
            alert(Data.msg);
//            document.getElementById("alertFile").innerHTML = Data.msg;
        }
    } else if (methodName == "encryptData") {
        if (flag) {
            responseString = Data.encryptedData;
            $('#encrytedDataRes').val(Data.encryptedData);
            $('#publicKeyDecrypt').val(Data.encryptPubKey);
            $('#certSerialNo').val(Data.encryptSerialNumber);
            if(Data.encryptVersion!=null && Data.encryptVersion!="" && typeof Data.encryptVersion!=undefined) document.getElementById("lblVersion").innerHTML = Data.encryptVersion;
            if(Data.encryptSerialNumber!=null && Data.encryptSerialNumber!="" && typeof Data.encryptSerialNumber!=undefined) document.getElementById("lblSerialNumber").innerHTML = Data.encryptSerialNumber;
            if(Data.encryptIssuer!=null && Data.encryptIssuer!="" && typeof Data.encryptIssuer!=undefined) document.getElementById("lblIssuedBy").innerHTML = Data.encryptIssuer;
            if(Data.encryptSubject!=null && Data.encryptSubject!="" && typeof Data.encryptSubject!=undefined) document.getElementById("lblSubject").innerHTML = Data.encryptSubject;
            if(Data.encryptPubKey!=null && Data.encryptPubKey!="" && typeof Data.encryptPubKey!=undefined) document.getElementById("lblPublicKey").value = Data.encryptPubKey;
            alert(Data.msg);
            return responseString;
        } else {
            alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        }
    } else if (methodName == "decryptData") {
        if (flag) {
            responseString = Data.encryptVersion + "@" + Data.encryptSerialNumber + "@" + Data.encryptIssuer + "@" + Data.encryptSubject + "@" + Data.decryptedData + "@" + Data.msg;
            document.getElementById("lblVersion").innerHTML = Data.encryptVersion;
            document.getElementById("lblSerialNumber").innerHTML = Data.encryptSerialNumber;
            document.getElementById("lblIssuedBy").innerHTML = Data.encryptIssuer;
            document.getElementById("lblSubject").innerHTML = Data.encryptSubject;
            document.getElementById("lblPublicKey").value = Data.encryptPubKey;
            alert(Data.msg + "\nDecrypted Data : " + Data.decryptedData);
            return responseString;
        } else {
            alert(Data.msg);
            responseString = Data.msg;
            return responseString;
        }
    } else if (methodName == "encryptFile") {
        if (flag) {
            alert(Data.msg + "\n" + Data.filePath);
            responseString = Data.msg + "\n" + Data.filePath;
        } else {
            alert(Data.msg);
            responseString = Data.msg;
        }
    } else if (methodName == "decryptFile") {
        if (flag) {
            alert(Data.msg + "\n" + Data.filePath);
            responseString = Data.msg + "\n" + Data.filePath;
        } else {
            alert(Data.msg);
            responseString = Data.msg;
        }
    } else if (methodName == "base64Encryptfile") {
        if (flag) {
            alert(Data.msg + "\n" + Data.filePathBase64);
        } else {
            alert(Data.msg);
        }
    } else if (methodName == "encryptPAN") {
        if (flag) {
//            alert(Data.msg);
            responseString = Data.encryptedPAN;
        } else {
            responseString = Data.msg;
        }
    } else if (methodName == "encryptFileServer") {
        responseString = Data.responseStr;
        var ext = Data.encryptExt;
        var srno = Data.encryptCertSrNo;
//        alert(ext);
        $.ajax({
            url: "EncryptionDecryption",
            method: 'POST',
            data: {'BaseStr': responseString, 'extension': ext, 'encryptCertSrNo': srno},
            success: function (response) {
                alert(response);
            }
        });
    } else if (methodName == "selectPdfFile") {
        if (flag) {
            $('#pdfFilePath').val(Data.pdfFilePath);
            alert(Data.msg + Data.pdfFilePath);
//          document.getElementById("alertFile").innerHTML = Data.msg;
        } else {
            alert(Data.msg);
//          document.getElementById("alertFile").innerHTML = Data.msg;
        }
    } else if (methodName == "savePdfFile") {
        if (flag) {
            $('#pdfFileSavePath').val(Data.pdfFileSavePath);
            alert(Data.msg + Data.pdfFileSavePath);
//            document.getElementById("alertFile").innerHTML = Data.msg + Data.pdfFileSavePath;
        } else {
            alert(Data.msg);
//            document.getElementById("alertFile").innerHTML = Data.msg;
        }
    } else if (methodName == "savePdfBase64File") {
        if (flag) {
            $('#pdfFileBase64Path').val(Data.pdfFileSavePath);
            alert(Data.msg + Data.pdfFileSavePath);
//            document.getElementById("alertFile").innerHTML = Data.msg + Data.pdfFileSavePath;
        } else {
            alert(Data.msg);
//            document.getElementById("alertFile").innerHTML = Data.msg;
        }
    } else if (methodName == "signPdfFileClient"){
        if (flag) {
             alert(Data.msg + "\n" + Data.signPDFFilePath);
             alert("Signed Base 64 String: "+Data.signPDFFileByte);
//          document.getElementById("alertFile").innerHTML = Data.msg;
        } else {
            alert(Data.msg);
//          document.getElementById("alertFile").innerHTML = Data.msg;
        }
        
    } else if (methodName == "base64PDFSignfile"){
        if (flag) {
             alert(Data.msg + "\n" + Data.signPDFBase64Path);
//          document.getElementById("alertFile").innerHTML = Data.msg;
        } else {
            alert(Data.msg);
//          document.getElementById("alertFile").innerHTML = Data.msg;
        }
        
    }else {
        alert(Data.msg);
    }
}

/*function saveInvcFile() 
 {
        alert("In saveFile");
         //alert("base64StrSign:"+document.getElementById('base64StrSign').value);
         var baseSignString=document.getElementById('base64StrSign').value;
        //   alert("before inpt in save file of"+baseSignString);
 				var inpt	= "filenames=" +baseSignString + "&invcnumb=" + $('#invcnumb').val() +"&trmn=" +$('#trmn').val()+"";
                               // alert(inpt);
  				//var url		= "/foisweb/view/parichaalan/EmptPlngCall.jsp?"+inpt;
                                var url="saveFile.jsp?"+inpt;
  				var ajax2	= new AJAXInteractionJSON(url, helpCallback);
  				ajax2.doPost();
	    };
            function helpCallback(responseJSON)
		{
                     //alert("Hello CALBACK")
                     window.location.reload();
                   // alert(JSON.stringify(responseJSON));
                    var obj=JSON.parse(responseJSON);
                      alert(obj.rettable);
                      document.getElementById('InvcList').innerHTML = obj.rettable;
			onSaveSuccess( responseJSON);
		}
	    function onSaveSuccess( response) 
	    {
           		   	alert("INVC FILE sucess");
	     }*/