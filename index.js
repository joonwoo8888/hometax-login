const chrome = require('selenium-webdriver/chrome');
const {Builder, By} = require('selenium-webdriver');

const getDriver = async () => {
    chrome.setDefaultService(
        new chrome.ServiceBuilder(
            require('chromedriver').path
            ).build()
    );
    return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()
            // .headless()
            .windowSize({width: 1000, height: 700})
        ).build();
}

const waitForComplete = async (driver, delay) => {
    const sleep = (delay) => {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }
    await driver.wait(function() {
        return driver.executeScript('return document.readyState')
            .then(function(readyState) {
                return readyState === 'complete';
            });
    })
    sleep(delay)
}

const close = async (driver) => {
    if (driver) {
        await driver.quit();
    }
}

const selector = {
    loginButton: "#textbox81212912",
    certLoginButton: "#trigger38",
    hddAndUsbButton: "#stg_hdd",
    usbSelectButton: "#hdd_driver_2",
    certPwInput: "#input_cert_pw",
    confirmButton: "#btn_confirm_iframe",
};

(async () => {
    const driver = await getDriver();
    await waitForComplete(driver, 500);
    try {
        const pw = process.argv.filter(arg => arg.startsWith("pw=")).map(arg => arg.replace("pw=",""))[0]
        
        await driver.get("https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index.xml");
        await waitForComplete(driver, 500);
        await (await driver.findElement(By.css(selector.loginButton))).click();
        await waitForComplete(driver, 500);
        await driver.switchTo().frame(1);
        await waitForComplete(driver, 5000);
        await (await driver.findElement(By.css(selector.certLoginButton))).click();
        await waitForComplete(driver, 500);
        await driver.switchTo().frame(0);
        await waitForComplete(driver, 5000);
        // 컴퓨터 하드에 저장되어 있을경우.
        await (await driver.findElement(By.css(selector.hddAndUsbButton))).click();
        await waitForComplete(driver, 500);
        // 인증서가 USB에 저장되어 있을 경우 주석해제.
        // await (await driver.findElement(By.css(selector.usbSelectButton))).click();
        // await waitForComplete(driver, 500);
        await driver.executeScript(`document.getElementById("input_cert_pw").value="${pw}";`)
        await waitForComplete(driver, 500);
        await (await driver.findElement(By.css(selector.confirmButton))).click();
        await waitForComplete(driver, 500);

        console.log("Finished.")
    } catch (err) {
        console.error(err)
    } finally {
        await waitForComplete(driver, 5000)
        await close(driver)
    }
})()
