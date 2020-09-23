/**
 * Test for getting started with Selenium.
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;


// Does not work with WSL!! Use cygwin

function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
        element.click();
    });
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith(target));
    });
}

function assertH1(target) {
    browser.findElement(By.css("h1")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}

function assertH2(target) {
    browser.findElement(By.css("h2")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}


// Test suite
test.describe("ME-APP TESTING", function() {
    this.timeout(0);

    test.beforeEach(function(done) {
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        browser.get("http://localhost:8082/");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test landing page", function(done) {

        browser.getTitle().then(function(title) {
            assert.equal(title, "me-app");
        });

        assertH1("ME-sida i kursen jsramverk");

        matchUrl("/");

        done();
    });

    test.it("Test Report - should be able to click Edit on report Kmom02", function(done) {

        goToNavLink("Redovisning");

        goToNavLink("Kmom02");

        matchUrl("/reports/week/2" );

        goToNavLink("Redigera");

        matchUrl("/reports/week/edit/2" );

        assertH2("Redigera rapport");

        done();
    });



    test.it("Test About-page", function(done) {
        goToNavLink("Om");

        matchUrl("/about");

        done();
    });

});


