var host = "http://127.0.0.0:8080/voice-api"

var urlConfig = {
    // 语音上传接口
    audioUrl: `${host}/cmd/audio`,
    // 命令上传接口
    callUrl: `${host}/cmd/call`
};

module.exports = urlConfig;1