// script.js

// 이 함수는 웹 페이지 로드 시 실행됩니다.
document.addEventListener("DOMContentLoaded", function () {
  // 센서 데이터를 업데이트하는 함수를 호출
  updateSensorData();

  // LED 슬라이더 값 업데이트
  updateColor("red");
  updateColor("green");
  updateColor("blue");

  // 워터 펌프 및 팬 제어 버튼 클릭 이벤트 처리
  document
    .getElementById("waterPumpBtn")
    .addEventListener("click", function () {
      // 워터 펌프 제어 코드 작성
      // 아두이노에 제어 명령을 보낼 수 있습니다.
    });

  document.getElementById("fanBtn").addEventListener("click", function () {
    // 팬 제어 코드 작성
    // 아두이노에 제어 명령을 보낼 수 있습니다.
  });
});

// 센서 데이터를 가져와 HTML 요소에 업데이트하는 함수
function updateSensorData() {
  // AJAX 또는 Fetch API를 사용하여 아두이노로부터 센서 데이터를 가져옵니다.
  // 가져온 데이터는 아래의 방법을 사용하여 HTML 요소에 업데이트합니다.
  // 예를 들어, 센서 데이터를 JSON 형식으로 받았다고 가정합니다.
  fetch("/getSensorData") // 아두이노에서 센서 데이터를 가져올 엔드포인트를 설정합니다.
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("temperature").textContent =
        data.temperature + "°C";
      document.getElementById("humidity").textContent = data.humidity + "%";
      document.getElementById("soilHumidity").textContent =
        data.soilHumidity + "%";
    })
    .catch((error) => {
      console.error("Error fetching sensor data:", error);
    });
}

// LED 슬라이더 값을 아두이노로 보내는 함수
function updateColor(color) {
  const sliderValue = document.getElementById(color + "Slider").value;

  // AJAX 또는 Fetch API를 사용하여 슬라이더 값을 아두이노로 보냅니다.
  // 적절한 엔드포인트와 데이터를 전송할 수 있습니다.
  fetch(`/controlLED?color=${color}&value=${sliderValue}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(`${color} LED updated to ${sliderValue}`);
      } else {
        console.error(`${color} LED update failed`);
      }
    })
    .catch((error) => {
      console.error("Error updating LED color:", error);
    });
}
