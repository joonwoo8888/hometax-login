## 소개

홈택스 로그인 selenium 입니다.

인증서 위치는 기본 하드디스크입니다. USB를 원하실경우 index.js 파일의 주석을 해지하세요.

```
// 인증서가 USB에 저장되어 있을 경우 주석해제.
// await (await driver.findElement(By.css(selector.usbSelectButton))).click();
// await waitForComplete(driver, 500);
```


## 설치방법

pw 파라미터는 인증서의 비밀번호입니다. 인증서 목록 중 첫번째 인증서가 선택됩니다.
* 인증서 선택 기능은 없습니다.

```
npm install
npm start pw=password
```


