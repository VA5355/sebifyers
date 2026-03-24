var JsDartInteropService = /** @class */ (function () {
    class JsDartInteropService {
      async getCameraPermissionDetails(callback) {
        var val = await window.navigator.permissions?.query({"name": "camera"});
        callback(val?.state == "granted")
        return val?.state == "granted";
      }
    }
    return JsDartInteropService
  })()
  