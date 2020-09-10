(function () {


  var testTool = window.testTool;
  if (!document.location.search) {}

    let a = atob(document.location.search.toString().split('?')[1])
    let tmpArgs = JSON.parse(a)
    
 
  const API = 'FeTdzTQ7Q_6Jl1MVvdF4Mg'
  const Secret = '3wOkndaKOQL2jxAC23Gigzq5P1zpVtHm6u9i'
  const signature = ZoomMtg.generateSignature({
    meetingNumber: tmpArgs.mid,
    apiKey: API,
    apiSecret: Secret ,
    role: tmpArgs.role,
    success: function (res) {
      console.log(res.result);
      tmpArgs.signature = res.result;
  
    },
  });
  // get meeting args from url
  
  console.log(tmpArgs)
  var meetingConfig = {
    apiKey: API,
    meetingNumber: tmpArgs.mid,
    userName: tmpArgs.f +' '+tmpArgs.l,
    passWord: tmpArgs.pwd,
    leaveUrl: tmpArgs.url,
    role: parseInt(tmpArgs.role, 10),
    userEmail: tmpArgs.email,
    lang: tmpArgs.lang,
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  // a tool use debug mobile device
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.0/lib", "/av"); // CDN version defaul
  if (meetingConfig.china)
    ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/1.8.0/lib", "/av"); // china cdn option
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  function beginJoin(signature) {
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      webEndpoint: meetingConfig.webEndpoint,
      success: function () {
        console.log(meetingConfig);
        console.log("signature", signature);
        $.i18n.reload(meetingConfig.lang);
        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          apiKey: meetingConfig.apiKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            console.log("join meeting success");
            console.log("get attendeelist");
            ZoomMtg.getAttendeeslist({});
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("success getCurrentUser", res.result.currentUser);
              },
            });
          },
          error: function (res) {
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });

    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
      console.log('inMeetingServiceListener onUserJoin', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
      console.log('inMeetingServiceListener onUserLeave', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
      console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
      console.log('inMeetingServiceListener onMeetingStatus', data);
    });
  }

  beginJoin(meetingConfig.signature);
})();
